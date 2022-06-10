import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

import api from "../services/api";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({setSeries, setLoad}) {
  const [searchText, setSearchText] = useState('');

  const search = function () {
    setLoad(true)
    getSeries();
  };

  async function getSeries(){
    let url = "api/";
    let data = { 
      searchText: searchText
    };

    const response = await api.post(url, data);
    setLoad(false)
    setSeries(response.data)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          TV Series
        </Typography>
        <Search>
          <IconButton onClick={() => search()}>
            <SearchIcon  />
          </IconButton>
        
          <StyledInputBase
            onChange={(value) => setSearchText(value.target.value) }
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
