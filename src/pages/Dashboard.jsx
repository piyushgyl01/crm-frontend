import useFetch from "../useFetch";
import Lead from "../components/Lead";
import Error from "../components/Error";
import Loading from "../components/Loading";
export default function Dashboard() {
  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  const newLead = data?.filter((lead) => lead.status === "New").length || 0;
  const contactedLead =
    data?.filter((lead) => lead.status === "Contacted").length || 0;
  const qualifiedLead =
    data?.filter((lead) => lead.status === "Qualified").length || 0;

  return (
    <>
      <main>
        <Lead />
        <h1>Lead Status</h1>
        {loading && (
          <>
            
            <Loading />
          </>
        )}
        {error && (
          <Error/>
        )}
        {data && (
          <ul>
            <li>New: {newLead} Leads</li>
            <li>Contacted: {contactedLead} Leads</li>
            <li>Qualified: {qualifiedLead} Leads</li>
          </ul>
        )}
      </main>
    </>
  );
}
