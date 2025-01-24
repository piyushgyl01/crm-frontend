import CustomizedTables from "../components/LeadTable";
import useFetch from "../useFetch";

export default function LeadByStatus() {
  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  const leadColumns = [
    {
      id: "name",
      label: "Name",
      linkTo: (row) => `/lead-details/${row.name}/${row._id}`,
    },
    {
      id: "salesAgent",
      label: "Sales Agent",
      align: "left",
      render: (row) => row.salesAgent.name,
    },
    {
      id: "status",
      label: "Status",
      align: "left",
    },
    {
      id: "priority",
      label: "Priority",
      align: "left",
    },
  ];

  return (
    <>
      <CustomizedTables
        data={data}
        columns={leadColumns}
        type="leads"
        title="Leads By Status"
        loading={loading}
        error={error}
        specificFilters={["status", "priority", "salesAgent"]}
      />
    </>
  );
}
