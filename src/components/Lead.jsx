import useFetch from "../useFetch";
import * as React from "react";
import { AvatarGenerator } from "random-avatar-generator";
import Error from "./Error";
import Loading from "./Loading";
import SelectFilter from "./Filter";

function RecipeReviewCard({
  name,
  source,
  salesAgent,
  status,
  tags,
  timeToClose,
  priority,
}) {
  const generator = new AvatarGenerator();
  const priorityColors = {
    High: "danger",
    Medium: "warning",
    Low: "success"
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-white d-flex align-items-center">
        <img 
          src={generator.generateRandomAvatar()}
          className="rounded-circle me-3"
          alt="Avatar"
          style={{ width: "40px", height: "40px" }}
        />
        <h5 className="mb-0">{name}</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <span className="text-muted">Source:</span>
          <span className="ms-2 fw-semibold">{source}</span>
        </div>
        <div className="mb-3">
          <span className="text-muted">Sales Agent:</span>
          <span className="ms-2 fw-semibold">{salesAgent}</span>
        </div>
        <div className="mb-3">
          <span className="text-muted">Status:</span>
          <span className={`badge bg-${status === 'Closed' ? 'success' : 'primary'} ms-2`}>
            {status}
          </span>
        </div>
        <div className="mb-3">
          <span className="text-muted">Tags:</span>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {tags.split(", ").map((tag, index) => (
              <span key={index} className="badge bg-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <span className="text-muted">Time to close:</span>
          <span className="ms-2 fw-semibold">{timeToClose} Days</span>
        </div>
        <div className="mb-0">
          <span className="text-muted">Priority:</span>
          <span className={`badge bg-${priorityColors[priority]} ms-2`}>
            {priority}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Lead({ title }) {
  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  const [status, setStatus] = React.useState("All");
  const [visibleLeads, setVisibleLeads] = React.useState(3);
  const itemsPerPage = 3;

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
    setVisibleLeads(3); // Reset to initial state when filter changes
  };

  const statusOptions = ["New", "Contacted", "Qualified", "Closed"];

  const filteredData =
    status === "All" ? data : data?.filter((lead) => lead.status === status);

  const loadMore = () => {
    setVisibleLeads(prev => prev + itemsPerPage);
  };

  return (
    <div className="container-fluid my-4">
      <div className="row mb-3 align-items-center">
        <div className="col-md-6">
          <h1 className="h2 mb-0">{title}</h1>
        </div>
        <div className="col-md-6 ">
          <SelectFilter
            label="Filter By Status"
            options={statusOptions}
            onFilterChange={handleStatusChange}
          />
        </div>
      </div>

      {loading && <Loading />}
      {error && <Error />}

      {filteredData && (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredData.slice(0, visibleLeads).map((lead) => (
              <div key={lead.id} className="col">
                <RecipeReviewCard
                  name={lead.name}
                  source={lead.source}
                  salesAgent={lead.salesAgent.name}
                  status={lead.status}
                  tags={lead.tags.join(", ")}
                  timeToClose={lead.timeToClose}
                  priority={lead.priority}
                />
              </div>
            ))}
          </div>

          {visibleLeads < filteredData.length && (
            <div className="text-center mt-4">
              <button 
                onClick={loadMore}
                className="btn btn-primary px-5"
              >
                Show More ({filteredData.length - visibleLeads} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}