import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SortByPriority({ onSort, value }) {
  return (
    <FormControl>
      <FormLabel id="priority-sort-label">Sort by Priority</FormLabel>
      <RadioGroup
        row
        value={value}
        onChange={onSort}
        aria-labelledby="priority-sort-label"
      >
        <FormControlLabel
          value="lowToHigh"
          control={<Radio />}
          label="Low to High"
        />
        <FormControlLabel
          value="highToLow"
          control={<Radio />}
          label="High to Low"
        />
      </RadioGroup>
    </FormControl>
  );
}
