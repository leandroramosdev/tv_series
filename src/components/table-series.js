import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const columns = [
  { id: "image_url", label: "Image", minWidth: 170 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "channel", label: "Channel", minWidth: 100 },
  { id: "gender", label: "Genders", minWidth: 100 },
  { id: "week_day", label: "Show day", minWidth: 100 },
  { id: "show_time", label: "Show time", minWidth: 100 },
];

export default function TableSeries({series, weekday}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(series.length > 0) {
      loopSeries(series);
    }
  }, [series]); 

  function loopSeries(series){
    let arr = [];
    let next = '';
    series.map((serie) => {
      if(weekday.length === 0){
        if(next === ''){
          next = serie.show_time;
        }
      }

      arr.push(
        createData(
          serie.image_url,
          serie.title, 
          serie.channel,
          serie.gender, 
          serie.week_day,
          serie.show_time,
          serie.next = (next === serie.show_time) ? true : false
        )
      );
    })

    setRows(arr)
  }

  function createData(image_url, title, channel, gender, week_day, show_time, next) {
    return { image_url, title, channel, gender, week_day, show_time, next };
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>

      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, row_id) => {
                return (
                  <TableRow key={row_id} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'image_url' ? 
                            <img className="image-serie" src={value} alt={value} />
                          : column.id === 'show_time' ? 
                            <>{
                              row['next'] === true ?
                              <Typography>
                                {value} - <small className="next">Next <CheckCircleOutlineIcon className="icon-next" color="success" /></small>
                              </Typography>
                              :
                              <Typography>
                                {value}
                              </Typography>
                              
                            }</>
                          : <>{value}</>
                        }  
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
