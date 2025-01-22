import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import CustomizedTables from "../components/LeadTable";

export default function SalesAgentView() {
  const { salesAgentID } = useParams();

  const { data: agents, loading: agentsLoading, error: agentsError } = useFetch(
    "https://crmables-backend.vercel.app/salesAgent"
  );

  const { data: leads, loading: leadsLoading, error: leadsError } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  // Find the agent
  const agent = agents?.find((agent) => agent._id === salesAgentID);

  // Filter leads by the agent's name
  const leadByAgent = leads?.filter((lead) => lead.salesAgent.name === agent?.name) || [];

  // Columns for the leads table
  const agentLeadColumns = [
    { 
      id: "name", 
      label: "Name",
      linkTo: (row) => `/lead-details/${row.name}/${row._id}`,
    },
    { 
      id: "status", 
      label: "Status", 
      align: "left",
    },
    { 
      id: "timeToClose", 
      label: "Time To Close", 
      align: "left",
    },
    { 
      id: "priority", 
      label: "Priority", 
      align: "left",
    }
  ];

  if (agentsLoading || leadsLoading) return <div>Loading...</div>;
  if (agentsError || leadsError) return <div>Error loading data</div>;
  if (!agent) return <div>Sales Agent Not Found</div>;

  return (
    <>
      <CustomizedTables 
        data={leadByAgent} 
        columns={agentLeadColumns} 
        type="leads"
        title={`Lead List by ${agent.name}`}
        showFilters={false} 
      />
    </>
  );
}