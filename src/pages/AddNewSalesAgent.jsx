import { useState } from "react";

export default function AddNewSalesAgent() {
  const [salesAgentData, setSalesAgentData] = useState({
    name: "",
    email: "",
  });

  const handleAddSalesAgent = async () => {
    try {
      await fetch("https://crmables-backend.vercel.app/salesAgent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesAgentData),
      });
      console.log("Added");
      // Clear form after submission
      setSalesAgentData({ name: "", email: "" });
    } catch (error) {
      console.error("Error occurred while adding sales agent", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">Add New Sales Agent</h2>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-12">
              <label htmlFor="nameField" className="form-label">
                Sales Agent's Name
              </label>
              <input
                type="text"
                className="form-control"
                value={salesAgentData.name}
                onChange={(e) =>
                  setSalesAgentData({ ...salesAgentData, name: e.target.value })
                }
                id="nameField"
                required
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="emailField" className="form-label">
                Sales Agent's Email
              </label>
              <input
                type="email"
                className="form-control"
                value={salesAgentData.email}
                onChange={(e) =>
                  setSalesAgentData({ ...salesAgentData, email: e.target.value })
                }
                id="emailField"
                required
              />
            </div>

            <div className="col-12 mt-4">
              <button 
                className="btn btn-primary w-100" 
                onClick={handleAddSalesAgent}
                disabled={!salesAgentData.name || !salesAgentData.email}
              >
                Add Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}