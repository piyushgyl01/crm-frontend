import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormLabel from '@mui/material/FormLabel';

function valuetext(value) {
  return `${value}°C`;
}

export default function SortByTimeToClose({ value, onChange }) {
  return (
    <Box sx={{ width: 300 }}>
      <FormLabel>
        Sort by Time to Close (in days)
      </FormLabel>
      <Slider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        min={0}
        max={100} // Adjust based on your data
      />
    </Box>
  );
}
