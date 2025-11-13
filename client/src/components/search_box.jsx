import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function SearchBox({ onSearch, onClear, refreshPage }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value === "") {
      handleClear();
      return;
    } else {
      setQuery(value);
      if (onSearch) onSearch(value);
      refreshPage();
    }

  };

  const handleClear = () => {
    setQuery("");
    if (onClear) onClear();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }}>
      <TextField
        fullWidth
        placeholder="Search Projects or Tasks"
        value={query}
        onChange={handleSearch}
        variant="outlined"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderColor: "#343434FF",
            borderRadius: 10,
            "&.Mui-focused fieldset": {
              borderColor: "#5D5D5DFF",
            },
          },
          "& input": {
            paddingY: 1,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#5D5D5DFF" }} />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
