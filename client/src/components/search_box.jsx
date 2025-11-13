import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState, forwardRef, useImperativeHandle } from "react";

const SearchBox = forwardRef(({ onSearch, onClear }, ref) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.trim() !== "" && onSearch) {
      await onSearch(value);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onClear) onClear();
  };

  // ✅ Expose this method to parent
  useImperativeHandle(ref, () => ({
    triggerSearch(value) {
      handleSearch(value);
    },
    clear() {
      handleClear();
    },
    getValue() {
      return query;
    },
  }));

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }}>
      <TextField
        fullWidth
        placeholder="Search Projects or Tasks"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
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
});

export default SearchBox;
