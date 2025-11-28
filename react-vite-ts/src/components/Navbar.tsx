// import React from "react";
import "../style/Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-title">Familiar Management System</h1>
                <a href="#user-request" className="navbar-link">User Request</a>
                <a href="#familiar-groups" className="navbar-link">Familiar Groups</a>
                <a href="#familiars" className="navbar-link">Familiars</a>
            </div>
            <div className="navbar-right">
                <button className="logout-btn">Log Out</button>
            </div>
        </nav>
    );
}

