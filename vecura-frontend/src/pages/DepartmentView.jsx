import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../custom.css";

export default function DepartmentView() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const dept = state || {
        name: "Dermatology",
        status: "Active",
        description: "Handles all skin related treatments and consultations"
    };

    return (
        <div className="view-page">

            {/* HEADER */}
            <div className="view-header">
                <div>
                    <h1 className="view-title">{dept.name}</h1>
                    <p className="view-sub">Department Overview</p>
                </div>

                <button className="btn-outline" onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </div>

            {/* MAIN CARD */}
            <div className="card view-card">

                {/* TOP SECTION */}
                <div className="view-top">
                    <div className="view-avatar">
                        {dept.name.charAt(0)}
                    </div>

                    <div>
                        <h2>{dept.name}</h2>
                        <span
                            className={`badge ${dept.status === "Active" ? "b-green" : "b-red"
                                }`}
                        >
                            {dept.status}
                        </span>
                    </div>
                </div>

                {/* DETAILS GRID */}
                <div className="view-grid">

                    <div className="view-box">
                        <span className="view-label">Department Name</span>
                        <p className="view-value">{dept.name}</p>
                    </div>

                    <div className="view-box">
                        <span className="view-label">Status</span>
                        <p className="view-value">{dept.status}</p>
                    </div>

                    <div className="view-box full">
                        <span className="view-label">Description</span>
                        <p className="view-value">{dept.description}</p>
                    </div>

                </div>

            </div>
        </div>
    );
}
