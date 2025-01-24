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
    <>
      <h1>
        {type === "edit" ? `Edit Details of ${lead?.name}` : "Add New Lead"}
      </h1>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        id="name"
      />
      <br />
      <br />

      <label htmlFor="salesAgent">Choose Sales Agent: </label>
      <select
        name="salesAgent"
        value={formData.salesAgent}
        onChange={handleInputChange}
        id="salesAgent"
      >
        <option value="">Choose Sales Agent</option>
        {salesAgent?.map((agent) => (
          <option value={agent._id} key={agent._id}>
            {agent.name}
          </option>
        ))}
      </select>
      <br />
      <br />

      <label htmlFor="source">Source: </label>
      <select
        name="source"
        value={formData.source}
        onChange={handleInputChange}
        id="source"
      >
        <option value="">Select Source</option>
        {sources.map((source) => (
          <option value={source} key={source}>
            {source}
          </option>
        ))}
      </select>
      <br />
      <br />

      <label htmlFor="status">Status: </label>
      <select
        name="status"
        value={formData.status}
        onChange={handleInputChange}
        id="status"
      >
        <option value="">Select Status</option>
        {statusOptions.map((sts) => (
          <option value={sts} key={sts}>
            {sts}
          </option>
        ))}
      </select>
      <br />
      <br />

      <label htmlFor="timeToClose">Time To Close: </label>
      <input
        name="timeToClose"
        value={formData.timeToClose}
        onChange={handleInputChange}
        type="number"
        id="timeToClose"
      />
      <br />
      <br />

      <label htmlFor="priority">Priority: </label>
      <select
        name="priority"
        value={formData.priority}
        onChange={handleInputChange}
        id="priority"
      >
        <option value="">Select Priority</option>
        {priorityOptions.map((prior) => (
          <option value={prior} key={prior}>
            {prior}
          </option>
        ))}
      </select>
      <br />
      <br />

      <label htmlFor="tagsField">Tags:</label>
      <input
        name="tagsField"
        value={formData.tags.join(",")}
        onChange={handleInputChange}
        type="text"
        id="tagsField"
        placeholder="Enter tags separated by commas"
      />
      <br />
      <br />

      <button onClick={() => onSave(formData)}>
        {type === "edit" ? "Save Changes" : "Add Lead"}
      </button>
    </>
  );
}

export default Form;
