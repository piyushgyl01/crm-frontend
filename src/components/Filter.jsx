// Select.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectFilter({ label, options, onFilterChange, defaultValue = "All" }) {
  const [filter, setFilter] = React.useState(defaultValue);

  const handleChange = (event) => {
    setFilter(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={filter}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value={defaultValue}>{defaultValue}</MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}