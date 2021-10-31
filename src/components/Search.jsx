import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <TextField
      fullWidth
      onChange={handleSearch}
      inputRef={searchInput}
      value={search}
      label="Search a character"
      id="outlined-start-adornment"
      sx={{ m: 1, width: "25ch" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
