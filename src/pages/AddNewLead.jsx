import useFetch from "../useFetch";
import Form from "../components/Form";

export default function AddNewLead() {
    const {
        data: salesAgent,
        loading: salesAgentLoading,
        error: salesAgentError,
      } = useFetch(`https://crmables-backend.vercel.app/salesAgent`);
      
    const handleAddLead = async (formData) => {
      try {
        await fetch("https://crmables-backend.vercel.app/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        // Handle success (e.g., redirect or show message)
      } catch (error) {
        console.error("Error saving the lead:", error);
      }
    };
  
    return (
      <>
        <Form 
          salesAgent={salesAgent} 
          onSave={handleAddLead}
          type="add"
        />
      </>
    );
  }
  