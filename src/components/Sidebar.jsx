import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="border-end">
        <ul>
            <li>
                <Link>Leads</Link>
            </li>
            <li >
                <Link>Sales Agent</Link>
            </li>
            <li>
                <Link>Reports</Link>
            </li>
        </ul>
      </div>
    </>
  );
}
