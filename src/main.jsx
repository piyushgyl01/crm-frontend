import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import ResponsiveDrawer from "./components/HeaderAndSidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddNewLead from "./pages/AddNewLead.jsx";
import AddNewSalesAgent from "./pages/AddNewSalesAgent.jsx";
import LeadByStatus from "./pages/LeadByStatus.jsx";
import LeadDetails from "./pages/LeadDetails.jsx";
import LeadList from "./pages/LeadList.jsx";
import Reports from "./pages/Reports.jsx";
import SalesAgent from "./pages/SalesAgent.jsx";
import SalesAgentView from "./pages/SalesAgentView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsiveDrawer />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/add-new-lead",
        element: <AddNewLead />,
      },
      {
        path: "/add-new-sales-agent",
        element: <AddNewSalesAgent />,
      },
      {
        path: "/lead-by-status",
        element: <LeadByStatus />,
      },
      {
        path: "/lead-details/:lead-name/:leadID",
        element: <LeadDetails />,
      },
      {
        path: "/lead-list",
        element: <LeadList />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/sales-agent-list",
        element: <SalesAgent />,
      },
      {
        path: "/sales-agent-details/:salesAgentID",
        element: <SalesAgentView />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
