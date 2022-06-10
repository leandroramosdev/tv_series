<?php          
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    class Tv_series{
        public $conn = null;
        public $host = 'localhost';
        public $db_user = 'root';
        public $db_password = 'root';
        public $db = 'series';

        public $series = [];
        public $request = null;

        function __construct() {
            $this->connect();
        }

        function connect(){
            $this->conn = mysqli_connect(
                $this->host, 
                $this->db_user, 
                $this->db_password,
                $this->db
            );

            if (!$this->conn) die('Error with database');

            if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
            $this->request = json_decode(file_get_contents('php://input'), true);

            if(!$this->db_is_populated()){
                $this->populate_database();
            } else {
                $this->main_query();
            }

            $this->print_series();
        }

        public function main_query(){
            $filters = $this->set_filters();
            $sql = "SELECT DISTINCT
                title, channel, gender, week_day, 
                DATE_FORMAT(show_time, '%H:%S') as show_time, image_url 
                FROM tv_series 
                INNER JOIN tv_series_intervals ON id = id_tv_series"
                .$filters." 
                ORDER BY show_time
                ";
            $result = [];
            $query = $this->conn->query($sql);

            if($query){
                $next = null;
                while ($row = $query->fetch_object()){
                    $result[] = $row;
                } 
                $query->close();
                $this->conn->next_result();
            } 

            $this->series = $result;
            return $result;
        }

        public function set_filters(){
            $filters = "";
            if(isset($this->request['searchText'])){
                $filters = " WHERE title LIKE '%". $this->request['searchText'] ."%'";
            } else {

                if(isset($this->request['week_day']) && !empty($this->request['week_day'])){
                    $this->request['week_day'] = $this->extract_value_array($this->request['week_day']);
                } else {
                    $this->request['week_day'] = date('l');
                }

                $filters = " WHERE week_day REGEXP '". $this->request['week_day'] ."'";
            
                if(isset($this->request['gender']) && !empty($this->request['gender'])){
                    $this->request['gender'] = $this->extract_value_array($this->request['gender']);
                    $filters = $filters ." AND gender REGEXP '". $this->request['gender'] ."'";
                }

                if(isset($this->request['time']) && !empty($this->request['time'])){
                    $this->request['time'] = $this->extract_value_array($this->request['time']);
                    $filters = $filters ." AND show_time = '". $this->request['time'] ."'";
                } else if($this->request['week_day'] == date('l')) {
                    $now = $this->request['current_hour'] . ":00";
                    $filters = $filters ." AND show_time > '". $now ."'";
                }
            } 
            return $filters;
        }

        public function extract_value_array($value){
            if(is_array($value)){
                if(count($value) == 1){
                    $value = array_shift($value);
                } else {
                    $value = implode('|', $value);
                }
            }

            return $value;
        }

        public function db_is_populated(){
            $result = $this->main_query();
            return !empty($result) ? true : false;
        }

        public function populate_database(){
            $content = $this->read_file("data/series.json");
            $json_series = json_decode($content);  

            foreach($json_series as $serie){
                $genres = implode(',', $serie->genres);
                $channel = $serie->network ? $serie->network->name : null;
                $image = $serie->image->medium;

                $sql = "INSERT INTO tv_series ( title, channel, gender, image_url ) 
                VALUES (
                    '$serie->name', 
                    '$channel', 
                    '$genres',
                    '$image'
                )";

                $this->conn->query($sql);

                $lastId = $this->conn->insert_id;
                $time = $serie->schedule->time;
                $week_day = implode(',', $serie->schedule->days);

                $sql = "INSERT INTO tv_series_intervals ( id_tv_series, week_day, show_time ) 
                VALUES 
                    (
                    $lastId, 
                    '$week_day',
                    '$time'
                )";
                $this->conn->query($sql);
            }

            $this->series = $this->main_query();
            $this->conn->close();
        }

        public function read_file($file){
            $content = '';
            $json_series = fopen($file, 'r');
            if($json_series != null){
                $content = fread($json_series, filesize ($file));                
                fclose ($json_series);
            }

            return $content;
        }

        public function print_series() {
            echo json_encode($this->series);
        }
    }

    $tv_series = new Tv_series();
?>

