import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useState } from "react";
import { useEffect } from "react";
import Form from "../components/Form";

export default function LeadDetails() {
  const { leadID } = useParams();

  const [commentContent, setCommentContent] = useState({
    lead: "",
    author: "",
    commentText: "",
  });

  const [editedLead, setEditedLead] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [""],
    timeToClose: 0,
    priority: "",
  });

  const [showEditForm, setShowEditForm] = useState(false);

  const { data, loading, error } = useFetch(
    "https://crmables-backend.vercel.app/leads"
  );

  const {
    data: commentData,
    loading: commentLoading,
    error: commentError,
  } = useFetch(`https://crmables-backend.vercel.app/leads/${leadID}/comments`);

  const {
    data: salesAgent,
    loading: salesAgentLoading,
    error: salesAgentError,
  } = useFetch(`https://crmables-backend.vercel.app/salesAgent`);

  const lead = data?.find((lead) => lead._id == leadID);

  const handleAddComment = async () => {
    try {
      await fetch(
        `https://crmables-backend.vercel.app/leads/${leadID}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...commentContent,
            lead: leadID,
          }),
        }
      );
      setShowEditForm(false);
      console.log("YOU ARE THE BEST IN THE WORLD");
      setCommentContent({
        author: "",
        commentText: "",
      });
    } catch (error) {
      console.log("LMAO YOU SUCK CANT EVEN ADD ONE COMMENT", error);
    }
  };

  const handleEdit = async (editedLeadData) => {
    try {
      await fetch(`https://crmables-backend.vercel.app/leads/${leadID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedLeadData),
      });
      console.log("Lead details updated successfully");
      setShowEditForm(false); 
    } catch (error) {
      console.error("Error updating lead details:", error);
    }
  };

  const handleEditClick = () => {
    setShowEditForm(!showEditForm);
  };

  useEffect(() => {
    if (showEditForm) {
      setEditedLead({
        name: lead?.name || "",
        source: lead?.source || "",
        salesAgent: lead?.salesAgent._id || "",
        status: lead?.status || "",
        tags: lead?.tags || [""],
        timeToClose: lead?.timeToClose || 0,
        priority: lead?.priority || "",
      });
    }
  }, [showEditForm, lead]);

  return (
    <div className="container mt-4">
      {error && <Error />}
      {loading && <Loading />}

      <div className="card mb-4 shadow">
        <div className="card-header bg-primary text-white">
          <h1 className="h4 mb-0">Lead Details: {lead?.name}</h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <dl className="row">
                <dt className="col-sm-4">Name:</dt>
                <dd className="col-sm-8">{lead?.name}</dd>

                <dt className="col-sm-4">Sales Agent:</dt>
                <dd className="col-sm-8">{lead?.salesAgent.name}</dd>

                <dt className="col-sm-4">Source:</dt>
                <dd className="col-sm-8">{lead?.source}</dd>
              </dl>
            </div>
            <div className="col-md-6">
              <dl className="row">
                <dt className="col-sm-4">Status:</dt>
                <dd className="col-sm-8">
                  <span className={`badge bg-${lead?.status === 'Closed' ? 'success' : 'primary'}`}>
                    {lead?.status}
                  </span>
                </dd>

                <dt className="col-sm-4">Priority:</dt>
                <dd className="col-sm-8">
                  <span className={`badge bg-${priorityColors[lead?.priority]}`}>
                    {lead?.priority}
                  </span>
                </dd>

                <dt className="col-sm-4">Time to Close:</dt>
                <dd className="col-sm-8">{lead?.timeToClose} hours</dd>
              </dl>
            </div>
          </div>

          <button 
            onClick={handleEditClick}
            className={`btn ${showEditForm ? 'btn-secondary' : 'btn-primary'} mt-3`}
          >
            {showEditForm ? "Cancel Edit" : "Edit Details"}
          </button>

          {showEditForm && (
            <div className="mt-4">
              <Form
                lead={lead}
                salesAgent={salesAgent}
                onSave={handleEdit}
                type="edit"
              />
            </div>
          )}
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h2 className="h5 mb-0">Comment Section</h2>
        </div>
        <div className="card-body">
          <div className="mb-4">
            {commentData?.map((comment) => (
              <div key={comment._id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{comment.author.name}</h5>
                    <small className="text-muted">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="card-text">{comment.commentText}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-top pt-4">
            <div className="mb-3">
              <label htmlFor="commentAuthor" className="form-label">Comment Author</label>
              <select
                className="form-select"
                onChange={(event) =>
                  setCommentContent({ ...commentContent, author: event.target.value })
                }
                id="commentAuthor"
                value={commentContent.author}
              >
                <option value="">Select Author</option>
                {salesAgent?.map((agent) => (
                  <option value={agent._id} key={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="commentInput" className="form-label">New Comment</label>
              <textarea
                className="form-control"
                rows="3"
                value={commentContent.commentText}
                id="commentInput"
                onChange={(event) =>
                  setCommentContent({
                    ...commentContent,
                    commentText: event.target.value,
                  })
                }
              />
            </div>

            <button 
              onClick={handleAddComment}
              className="btn btn-primary"
              disabled={!commentContent.author || !commentContent.commentText}
            >
              Submit Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add priority colors mapping at the bottom if not already present
const priorityColors = {
  High: "danger",
  Medium: "warning",
  Low: "success"
};
