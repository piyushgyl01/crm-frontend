import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../useFetch";
import Loading from "./Loading";
import Error from "./Error";
import BasicSelect from "./Filter";
import SalesAgentFilter from "./SalesAgentFilter";
import SortByPriority from "./SortByPriority";
import SortByTimeToClose from "./SortByTimeToClose";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [status, setStatus] = React.useState("All");
  const [agent, setAgent] = React.useState("None");
  const [prioritySort, setPrioritySort] = React.useState("");
  const [timeRange, setTimeRange] = React.useState([0, 100]);

  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleAgentChange = (selectedAgent) => {
    setAgent(selectedAgent);
  };

  const handlePrioritySort = (event) => {
    setPrioritySort(event.target.value);
  };

  const handleTimeRangeChange = (event, newRange) => {
    setTimeRange(newRange);
  };

  const filteredData = data?.filter((lead) => {
    const statusMatch = status === "All" || lead.status === status;
    const agentMatch = agent === "None" || lead.salesAgent.name === agent;
    return statusMatch && agentMatch;
  });

  const processedData = React.useMemo(() => {
    if (!data) return [];

    // First apply filters
    let result = data.filter((lead) => {
      const statusMatch = status === "All" || lead.status === status;
      const agentMatch = agent === "None" || lead.salesAgent.name === agent;
      const timeMatch =
        lead.timeToClose >= timeRange[0] && lead.timeToClose <= timeRange[1];
      return statusMatch && agentMatch && timeMatch;
    });

    // Then apply priority sorting
    if (prioritySort) {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      result = [...result].sort((a, b) => {
        if (prioritySort === "highToLow") {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        } else {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
      });
    }

    return result;
  }, [data, status, agent, prioritySort, timeRange]);

  return (
    <>
      <div className="row py-3">
        <h1 className="col-md-12">Lead List</h1>
        <span className="col-md-12">
          <div className="row">
            <span className="col-md-3 my-4">
              <BasicSelect onFilterChange={handleStatusChange} />
            </span>
            <span className="col-md-3 my-4">
              <SalesAgentFilter onFilterChange={handleAgentChange} />
            </span>
            <span className="col-md-3">
              <SortByPriority
                onSort={handlePrioritySort}
                value={prioritySort}
              />
            </span>
            <span className="col-md-3">
              <SortByTimeToClose
                value={timeRange}
                onChange={handleTimeRangeChange}
              />
            </span>
          </div>
        </span>
      </div>
      {loading && <Loading />}
      {error && <Error />}
      {processedData && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Source</StyledTableCell>
                <StyledTableCell align="right">Sales Agent</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">
                  Time To Close (in days)
                </StyledTableCell>
                <StyledTableCell align="right">Priority</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processedData?.map((lead) => (
                <StyledTableRow key={lead._id}>
                  <StyledTableCell component="th" scope="row">
                    {lead.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{lead.source}</StyledTableCell>
                  <StyledTableCell align="right">
                    {lead.salesAgent.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{lead.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    {lead.timeToClose}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {lead.priority}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
