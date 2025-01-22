import useFetch from "../useFetch";
import CustomizedTables from "../components/LeadTable";
import Error from "../components/Error";
import Loading from "../components/Loading";
const leadColumns = [
  { id: "name", label: "Name" },
  { id: "source", label: "Source", align: "left" },
  {
    id: "salesAgent",
    label: "Sales Agent",
    align: "left",
    render: (row) => row.salesAgent.name,
  },
  { id: "status", label: "Status", align: "left" },
  { id: "timeToClose", label: "Time To Close", align: "left" },
  { id: "priority", label: "Priority", align: "left" },
];

export default function LeadList() {
  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );
  const leadColumns = [
    { 
      id: "name", 
      label: "Name",
      linkTo: (row) => `/lead-details/${data.name}/${row._id}`,
    },
    { 
      id: "source", 
      label: "Source", 
      align: "left",
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

  return (
    <main>
      <CustomizedTables 
        data={data} 
        columns={leadColumns} 
        type="leads" 
        loading={loading}
        error={error}
        specificFilters={["status", "salesAgent"]}
        />
    
      </main>
  );
}
