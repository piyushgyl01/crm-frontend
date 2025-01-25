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
    <main className="container-fluid py-4">
      <Lead title={"Leads"} />
      
      <div className="row mb-4">
        <div className="col">
          <h2 className="h4 mb-3">Lead Status Overview</h2>
          {loading && <Loading />}
          {error && <Error />}
          {data && (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {/* New Leads Card */}
              <div className="col">
                <div className="card h-100 border-start border-primary border-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <span className="text-muted small">New Leads</span>
                        <h3 className="mb-0">{newLead}</h3>
                      </div>
                      <div className="bg-primary text-white rounded-circle p-3">
                        <i className="bi bi-plus-lg fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contacted Leads Card */}
              <div className="col">
                <div className="card h-100 border-start border-warning border-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <span className="text-muted small">Contacted</span>
                        <h3 className="mb-0">{contactedLead}</h3>
                      </div>
                      <div className="bg-warning text-white rounded-circle p-3">
                        <i className="bi bi-telephone-outbound fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Qualified Leads Card */}
              <div className="col">
                <div className="card h-100 border-start border-success border-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <span className="text-muted small">Qualified</span>
                        <h3 className="mb-0">{qualifiedLead}</h3>
                      </div>
                      <div className="bg-success text-white rounded-circle p-3">
                        <i className="bi bi-check2-circle fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}