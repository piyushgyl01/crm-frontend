import React, { useState, useEffect } from "react";

function Form({ lead, salesAgent, onSave, type = "edit" }) {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: 0,
    priority: "",
  });

  const sources = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];
  const statusOptions = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];
  const priorityOptions = ["High", "Medium", "Low"];

  useEffect(() => {
    if (type === "edit" && lead) {
      setFormData({
        name: lead?.name || "",
        source: lead?.source || "",
        salesAgent: lead?.salesAgent?._id || "",
        status: lead?.status || "",
        tags: lead?.tags || [],
        timeToClose: lead?.timeToClose || 0,
        priority: lead?.priority || "",
      });
    }
  }, [lead, type]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "tagsField") {
      setFormData({
        ...formData,
        tags: value.split(",").map((tag) => tag.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white">
        <h2 className="h5 mb-0">
          {type === "edit" ? `Edit ${lead?.name}` : "Add New Lead"}
        </h2>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {/* Name Field */}
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              id="name"
              required
            />
          </div>

          {/* Sales Agent Field */}
          <div className="col-md-6">
            <label htmlFor="salesAgent" className="form-label">Sales Agent</label>
            <select
              className="form-select"
              name="salesAgent"
              value={formData.salesAgent}
              onChange={handleInputChange}
              id="salesAgent"
              required
            >
              <option value="">Choose Sales Agent</option>
              {salesAgent?.map((agent) => (
                <option value={agent._id} key={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          {/* Source Field */}
          <div className="col-md-6">
            <label htmlFor="source" className="form-label">Source</label>
            <select
              className="form-select"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              id="source"
              required
            >
              <option value="">Select Source</option>
              {sources.map((source) => (
                <option value={source} key={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          {/* Status Field */}
          <div className="col-md-6">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              id="status"
              required
            >
              <option value="">Select Status</option>
              {statusOptions.map((sts) => (
                <option value={sts} key={sts}>
                  {sts}
                </option>
              ))}
            </select>
          </div>

          {/* Time to Close */}
          <div className="col-md-6">
            <label htmlFor="timeToClose" className="form-label">Time to Close (hours)</label>
            <input
              className="form-control"
              name="timeToClose"
              value={formData.timeToClose}
              onChange={handleInputChange}
              type="number"
              id="timeToClose"
              min="0"
              required
            />
          </div>

          {/* Priority Field */}
          <div className="col-md-6">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              id="priority"
              required
            >
              <option value="">Select Priority</option>
              {priorityOptions.map((prior) => (
                <option value={prior} key={prior}>
                  {prior}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Field */}
          <div className="col-12">
            <label htmlFor="tagsField" className="form-label">Tags</label>
            <input
              className="form-control"
              name="tagsField"
              value={formData.tags.join(",")}
              onChange={handleInputChange}
              type="text"
              id="tagsField"
              placeholder="Enter tags separated by commas"
            />
            <small className="form-text text-muted">
              Separate tags with commas (e.g., "urgent, follow-up, new-client")
            </small>
          </div>

          {/* Submit Button */}
          <div className="col-12 mt-4">
            <button 
              className="btn btn-primary w-100"
              onClick={() => onSave(formData)}
            >
              {type === "edit" ? "Save Changes" : "Add Lead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
