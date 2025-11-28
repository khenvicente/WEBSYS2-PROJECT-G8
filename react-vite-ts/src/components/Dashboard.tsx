// import React from "react";
import "../style/Dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="card-grid">
                <div className="card">
                    <h3 className="card-title">User Requests</h3>
                    {/* <p className="card-value"></p> */}
                </div>
                <div className="card">
                    <h3 className="card-title">Familiar Groups</h3>
                    {/* <p className="card-value"></p> */}
                </div>
                <div className="card">
                    <h3 className="card-title">Familiars</h3>
                    {/* <p className="card-value"></p> */}
                </div>
            </div>
        </div>
    );
}
