import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import BasicPopover from "../components/AddButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PersonIcon from "@mui/icons-material/Person";
import { Outlet } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <SpaceDashboardIcon />,
    },
    {
      name: "Leads",
      path: "/lead-list",
      icon: <CardTravelIcon />,
    },
    {
      name: "Sales Agent",
      path: "/sales-agent-list",
      icon: <AttachMoneyIcon />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <SummarizeIcon />,
    },
    {
      name: "Lead By Status",
      path: "/lead-by-status",
      icon: <PersonIcon />,
    },
  ];

  const drawer = (
    <div>
      <IconButton
        className=" ms-4 p-3"
        onClick={handleDrawerClose}
        sx={{ display: { sm: "none" } }} 
        style={{ color: "#000000" }}
      >
        <CloseIcon />
      </IconButton>
      <Toolbar
        sx={{ display: { xs: "none", sm: "block" } }}
      />

      <Divider />
      <List className="px-4">
        {navigationItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link className="text-decoration-none text-dark" to={item.path}>
              <ListItemButton onClick={handleDrawerClose}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="container">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #e0e0e0",
          }}
          position="fixed"
          elevation={0}
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar className="d-flex justify-content-between">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              style={{ color: "#000000" }}
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              style={{ color: "#000000" }}
              noWrap
              component="div"
            >
              <Link className="text-decoration-none text-dark" to={"/"}>
                {" "}
                CRMables CRM Dashboard
              </Link>
            </Typography>
            <BasicPopover />
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, 
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
