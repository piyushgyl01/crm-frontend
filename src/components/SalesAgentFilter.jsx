import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFetch from "../useFetch";

export default function SalesAgentFilter({ onFilterChange }) {
  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );
  const [filter, setFilter] = React.useState("None");

  const handleChange = (event) => {
    setFilter(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Filter By Sales Agent
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter By Sales Agent"
          onChange={handleChange}
        >
          <MenuItem value={"None"}>None</MenuItem>
          {data?.map((agent) => (
            <MenuItem key={agent.salesAgent.name} value={agent.salesAgent.name}>
              {agent.salesAgent.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
