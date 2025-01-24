import CustomizedTables from "../components/LeadTable";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";

export default function SalesAgent() {
  const { data } = useFetch("https://crmables-backend.vercel.app/salesAgent");

  const agentColumns = [
    {
      id: "name",
      label: "Name",
      linkTo: (row) => `/sales-agent-details/${row._id}`,
    },
    {
      id: "email",
      label: "Email",
      align: "left",
    },
  ];

  return (
    <>
      <h1>Sales Agents</h1>
      <CustomizedTables data={data} columns={agentColumns} type="agents" />
    </>
  );
}
