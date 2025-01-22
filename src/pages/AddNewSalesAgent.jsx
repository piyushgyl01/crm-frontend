import { useState } from "react";

export default function AddNewSalesAgent() {
  const [salesAgentData, setSalesAgentData] = useState({
    name: "",
    email: "",
  });

  const handleAddSalesAgent = async () => {
    try {
      fetch("https://crmables-backend.vercel.app/salesAgent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesAgentData),
      });
      console.log("Added");
    } catch (error) {
      console.error("Error occured while adding sales agent", error);
    }
  };

  return (
    <>
      <h1>Add New Sales Agent</h1>
      <label htmlFor="nameField">Sales Agent's Name:</label> <br />
      <input
        type="text"
        value={salesAgentData.name}
        onChange={(e) =>
          setSalesAgentData({ ...salesAgentData, name: e.target.value })
        }
        id="emailField"
      />
      <br /> <br />
      <label htmlFor="emailField">Sales Agent's Email:</label> <br />
      <input
        onChange={(e) =>
          setSalesAgentData({ ...salesAgentData, email: e.target.value })
        }
        type="text"
        value={salesAgentData.email}
        id="emailField"
      />
      <br /> <br />
      <button onClick={handleAddSalesAgent}>Add Agent</button>
    </>
  );
}
