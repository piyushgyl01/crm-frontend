import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loading from "./Loading";
import Error from "./Error";
import SelectFilter from "./Filter";
import SortByPriority from "./SortByPriority";
import SortByTimeToClose from "./SortByTimeToClose";
import { Link } from "react-router-dom";

// Styled components for table cells and rows
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({
  data,
  columns,
  type = "leads",
  title,
  loading,
  error,
  showFilters = true,
  specificFilters = [], // New prop for more granular filter control
}) {
  // State for various filters
  const [status, setStatus] = React.useState("All");
  const [agent, setAgent] = React.useState("None");
  const [priority, setPriority] = React.useState("All");
  const [prioritySort, setPrioritySort] = React.useState("");
  const [timeRange, setTimeRange] = React.useState([0, 100]);

  // Filter options
  const statusOptions = ["All", "New", "Contacted", "Qualified", "Closed"];
  const priorityOptions = ["All", "Low", "Medium", "High"];

  // Handler functions for filter changes
  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleAgentChange = (selectedAgent) => {
    setAgent(selectedAgent);
  };

  const handlePriorityChange = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  const handlePrioritySort = (event) => {
    setPrioritySort(event.target.value);
  };

  const handleTimeRangeChange = (event, newRange) => {
    setTimeRange(newRange);
  };

  // Memoized data processing with filters
  const processedData = React.useMemo(() => {
    if (!data) return [];

    if (type === "leads") {
      let result = data.filter((lead) => {
        const statusMatch = status === "All" || lead.status === status;
        const agentMatch = agent === "None" || lead.salesAgent.name === agent;
        const priorityMatch = priority === "All" || lead.priority === priority;
        const timeMatch =
          lead.timeToClose >= timeRange[0] && lead.timeToClose <= timeRange[1];
        return statusMatch && agentMatch && priorityMatch && timeMatch;
      });

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
    }

    return data;
  }, [data, status, agent, priority, prioritySort, timeRange, type]);

  return (
    <>
      {type === "leads" && (
        <div className="row py-3">
          <h1 className="col-md-12">{title || "Lead List"}</h1>
          <span className="col-md-12">
            <div className="row">
              {/* Status Filter */}
              {(specificFilters.length === 0 || specificFilters.includes('status')) && (
                <span className="col-md-3 my-4">
                  <SelectFilter
                    label="Filter By Status"
                    options={statusOptions}
                    onFilterChange={handleStatusChange}
                  />
                </span>
              )}

              {/* Priority Filter */}
              {(specificFilters.length === 0 || specificFilters.includes('priority')) && (
                <span className="col-md-3 my-4">
                  <SelectFilter
                    label="Filter By Priority"
                    options={priorityOptions}
                    onFilterChange={handlePriorityChange}
                  />
                </span>
              )}

              {/* Sales Agent Filter */}
              {(showFilters || specificFilters.includes('salesAgent')) && (
                <span className="col-md-3 my-4">
                  <SelectFilter
                    label="Filter By Sales Agent"
                    options={data?.map((item) => item.salesAgent?.name) || []}
                    onFilterChange={handleAgentChange}
                    defaultValue="None"
                  />
                </span>
              )}

              {/* Priority Sort */}
              {(showFilters || specificFilters.includes('prioritySort')) && (
                <span className="col-md-3">
                  <SortByPriority
                    onSort={handlePrioritySort}
                    value={prioritySort}
                  />
                </span>
              )}

              {/* Time To Close Filter */}
              <span className="col-md-3">
                <SortByTimeToClose
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                />
              </span>
            </div>
          </span>
        </div>
      )}

      {/* Loading and Error Handling */}
      {loading && <Loading />}
      {error && <Error />}

      {/* Table Rendering */}
      {processedData && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align || "left"}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {processedData?.map((row) => (
                <StyledTableRow key={row._id}>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align || "left"}
                    >
                      {column.linkTo ? (
                        <Link to={column.linkTo(row)}>
                          {column.render ? column.render(row) : row[column.id]}
                        </Link>
                      ) : column.render ? (
                        column.render(row)
                      ) : (
                        row[column.id]
                      )}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}