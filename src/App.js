import "./App.css";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import SearchAppBar from "./components/appbar";
import TableSeries from "./components/table-series";
import MultiSect from "./components/multi-select";

import Button from "@mui/material/Button";
import ReactLoading from "react-loading";

import { genders } from "./data/genders";
import { weekdays } from "./data/week-days";
import { times } from "./data/times";

import api from "./services/api";
import { Typography } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function App() {
  const [series, setSeries] = useState({});
  const [weekday, setWeekday] = useState([]);
  const [time, setTime] = useState([]);
  const [gender, setGenders] = useState([]);
  const [load, setLoad] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (load === true) {
      getSeries();
    }
  }, []);

  async function getSeries() {
    const d = new Date();
    let current_hour = d.getHours();

    let url = "api/";
    let data = {
      gender: gender,
      week_day: weekday,
      time: time,
      current_hour: current_hour
    };

    const response = await api.post(url, data);
    if (response.data.length > 0) {
      setSeries(response.data);
      setNotFound(false);
    } else {
      setNotFound(true);
    }

    setLoad(false);
  }

  function filter() {
    setLoad(true);
    getSeries();
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <SearchAppBar setSeries={setSeries} setLoad={setLoad} />
        <Box sx={{ m: 1, flexDirection: "row", display: "flex" }}>
          <Box sx={{ width: "30%" }}>
            <MultiSect
              name="Genres:"
              val={gender}
              setValue={setGenders}
              data={genders}
              multiple={true}
            />
          </Box>

          <Box sx={{ width: "30%" }}>
            <MultiSect
              name="Week day:"
              val={weekday}
              setValue={setWeekday}
              data={weekdays}
              multiple={true}
            />
          </Box>

          <Box sx={{ width: "30%" }}>
            <MultiSect
              name="Time:"
              val={time}
              setValue={setTime}
              data={times}
              multiple={false}
            />
          </Box>

          <Box sx={{ width: "10%", marginTop: 3 }}>
            <Box sx={{ m: 1 }}>
              <Button
                onClick={() => filter()}
                className="button"
                variant="outlined"
              >
                Filter
              </Button>
            </Box>
          </Box>
        </Box>
        {load === true ? (
          <Box className="load">
            <ReactLoading
              type={"spin"}
              color={"#0984e3"}
              height={"8%"}
              width={"8%"}
            />
          </Box>
        ) : (
          <Box sx={{ padding: 2 }}>
            {notFound === false ? (
              <TableSeries series={series} weekday={weekday} />
            ) : (
              <Box className="not-found">
                <Typography className="message">Opss nothing here...</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
