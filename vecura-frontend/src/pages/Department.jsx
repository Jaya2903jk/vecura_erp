import React, { useState } from "react";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

export default function Departments() {
    const [showModal, setShowModal] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(""), 2000);
    };

    // Department data
    const departments = [
        { id: "DEP-01", name: "Dermatology", status: "Active" },
        { id: "DEP-02", name: "Reception", status: "Active" },
        { id: "DEP-03", name: "Finance", status: "Inactive" },
        { id: "DEP-04", name: "Support", status: "Active" },
    ];

    // Filter logic
    const filteredDepartments = departments.filter((d) => {
        const matchSearch =
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.head.toLowerCase().includes(search.toLowerCase());

        const matchFilter = filter === "All" || d.status === filter;

        return matchSearch && matchFilter;
    });

    return (
        <div className="page1">
            <Toast message={toastMsg} />

            {/* HEADER */}
            <div className="anim-up" style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800 }}>Department Management</h1>
                    <p style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
                        Manage departments and teams
                    </p>
                </div>
                <button className="btn-sm" onClick={openModal} style={{ padding: "9px 18px", fontSize: 13 }}>
                    + Add Department
                </button>

            </div>

            {/* SEARCH + FILTER */}
            <div
                className="anim-up"
                style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 15,
                }}
            >
                <input
                    className="inp"
                    placeholder="Search department or head..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: 1 }}
                />

                <select
                    className="inp"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ width: 150 }}
                >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* TABLE */}
            <div className="card anim-up">
                <table className="tbl" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            {/* <th>Dept ID</th> */}
                            <th>Department Name</th>
                            {/* <th>Head</th>
                            <th>Employees</th> */}
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredDepartments.map((d, index) => (
                            <tr key={d.id}>
                                <td>{index + 1}</td>
                                {/* <td style={{ color: "var(--accent)", fontWeight: 700 }}>{d.id}</td> */}
                                <td>{d.name}</td>
                                {/* <td>{d.head}</td>
                                <td>{d.employees}</td> */}
                                <td>
                                    <span className={`badge ${d.status === "Active" ? "b-green" : "b-red"}`}>
                                        {d.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn-sm"
                                        onClick={() => navigate(`/departmentview/${d.id}`, { state: d })}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="modal-bg open">
                    <div className="modal">

                        {/* HEADER */}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 800 }}>Add Department</h3>
                            <button
                                onClick={closeModal}
                                style={{
                                    background: "var(--bg-hover)",
                                    border: "none",
                                    width: 30,
                                    height: 30,
                                    borderRadius: 7,
                                    cursor: "pointer",
                                    fontSize: 17,
                                    color: "var(--text-secondary)",
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {/* FORM */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>

                            <div>
                                <label className="label-text">Department Name</label>
                                <input className="inp" placeholder="Enter department name" />
                            </div>

                            {/* <div>
                                <label className="label-text">Department Head</label>
                                <input className="inp" placeholder="Enter head name" />
                            </div> */}

                            {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}> */}

                            {/* <div>
                                    <label className="label-text">No. of Employees</label>
                                    <input className="inp" type="number" placeholder="Enter count" />
                                </div> */}

                            <div>
                                <label className="label-text">Status</label>
                                <select className="inp">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>

                            {/* </div> */}

                            <div>
                                <label className="label-text">Description</label>
                                <textarea className="inp" rows={3} placeholder="Department details..." />
                            </div>

                        </div>

                        {/* ACTIONS */}
                        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                            <button onClick={closeModal} className="btn-outline" style={{ flex: 1 }}>
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    closeModal();
                                    showToast("✓ Department added!");
                                }}
                                className="btn-primary"
                                style={{ flex: 1 }}
                            >
                                Save Department
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
