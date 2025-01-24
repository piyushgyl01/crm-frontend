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
    <>
      {error && <Error />}
      {loading && <Loading />}
      <h1 className="text-center">Lead Details: {lead?.name}</h1>
      <h3>Lead Name: {lead?.name}</h3>
      <h3>Sales Agent: {lead?.salesAgent.name}</h3>
      <h3>Lead Source: {lead?.source}</h3>
      <h3>Lead Status: {lead?.status}</h3>
      <h3>Priority: {lead?.priority}</h3>
      <h3>Time to Close: {lead?.timeToClose} hours</h3>
      <button onClick={handleEditClick}>
        {showEditForm ? "Cancel Edit" : "Edit Details"}
      </button>
      {showEditForm && (
        <Form
          lead={lead}
          salesAgent={salesAgent}
          onSave={handleEdit}
          type="edit"
        />
      )}
      <h1 className="text-center">Comment Section</h1>
      {commentData?.map((comment) => (
        <>
          <div key={comment._id}>
            <h3>
              {comment.author.name} - {comment.createdAt}
            </h3>
            <h3>Comment Text: {comment.commentText}</h3>
          </div>
        </>
      ))}
      <label htmlFor="commentAuthor">Comment Author:</label> <br />
      <select
        onChange={(event) =>
          setCommentContent({ ...commentContent, author: event.target.value })
        }
        id="commentAuthor"
      >
        <option value="">Choose author</option>
        {salesAgent?.map((agent) => (
          <option value={agent._id} key={agent._id}>
            {agent.name}
          </option>
        ))}
      </select>
      <br /> <br />
      <label htmlFor="commentInput">Add New Comment:</label> <br />
      <textarea
        type="text"
        value={commentContent.commentText}
        id="commentInput"
        onChange={(event) =>
          setCommentContent({
            ...commentContent,
            commentText: event.target.value,
          })
        }
      />
      <br /> <br />
      <button onClick={handleAddComment}>Submit</button>
    </>
  );
}
