import { Link } from "react-router-dom";
import "../style/Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">Familiar Management System</Link>
        <Link to="/user-request" className="navbar-link">User Request</Link>
        <Link to="/familiar-group" className="navbar-link">Familiar Groups</Link>
        <Link to="/familiar" className="navbar-link">Familiars</Link>
        <Link to="/contracts" className="navbar-link">Contracts</Link>
      </div>
      <div className="navbar-right">
        <button className="logout-btn">Log Out</button>
      </div>
    </nav>
  );
}
