import useFetch from "../useFetch";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { AvatarGenerator } from "random-avatar-generator";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img
              src={generator.generateRandomAvatar()}
              style={{ width: "100%", height: "100%" }}
              alt=""
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
      />
      <CardContent>
        <p>
          <strong>Source: </strong>
          {source}
        </p>
        <p>
          <strong>Sales Agent: </strong>
          {salesAgent}
        </p>
        <p>
          <strong>Status: </strong>
          {status}
        </p>
        <p>
          <strong>Tags: </strong>
          {tags}
        </p>
        <p>
          <strong>Time to close: </strong>
          {timeToClose} Days
        </p>
        <p>
          <strong>Priority: </strong>
          {priority}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Lead({ title }) {
  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  const [status, setStatus] = React.useState("All");

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const statusOptions = ["New", "Contacted", "Qualified", "Closed"];

  const filteredData =
    status === "All" ? data : data?.filter((lead) => lead.status === status);

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <h1 className="col-md-6">{title}</h1>
          <span className="col-md-6">
            <SelectFilter
              label="Filter By Status"
              options={statusOptions}
              onFilterChange={handleStatusChange}
            />
          </span>
        </div>
        {loading && (
          <>
            <Loading />
          </>
        )}
        {error && (
          <>
            <Error />
          </>
        )}
        {filteredData && (
          <div className="row">
            {filteredData?.map((lead) => (
              <>
                <div className="col-md-4 py-5">
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
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
