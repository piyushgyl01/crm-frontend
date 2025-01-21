import useFetch from "../useFetch";
import CustomizedTables from "../components/LeadTable";
import Error from "../components/Error";
import Loading from "../components/Loading";

export default function LeadList() {
  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  return (
    <>
      <main>
        <CustomizedTables />
      </main>
    </>
  );
}
