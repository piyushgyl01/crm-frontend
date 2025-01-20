import Header from "../components/Header";
import Lead from "../components/Lead";
import SideBar from "../components/SideBar";

export default function Dashboard() {
  return (
    <>
      <Header heading={"CRMables CRM Dashboard"} />
      <div className="row">
        <div className="col-md-4">
          <SideBar />
        </div>
        <div className="col-md-8">
          <h1>Leads</h1>
        </div>
      </div>
      <Lead />
    </>
  );
}
