import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";

export default function NestedList() {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Add New
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <Link className="text-decoration-none text-dark" to={"/add-new-lead"}>
          <ListItemText primary="Lead" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <Link
          className="text-decoration-none text-dark"
          to={"/add-new-sales-agent"}
        >
          <ListItemText primary="Sales Agent" />
        </Link>
      </ListItemButton>
    </List>
  );
}
