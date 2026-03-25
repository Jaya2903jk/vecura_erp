
import React, { useState } from "react";
import Toast from "../components/Toast";

export default function Tickets() {
    const [showModal, setShowModal] = useState(false);
    const [toastMsg, setToastMsg] = useState("");

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(""), 2000);
    };

    // Ticket data
    const tickets = [
        {
            id: "#TKT-0091",
            client: "Riya Mehta",
            subject: "Post-session swelling complaint",
            priority: "High",
            assigned: "Dr. Deepa",
            created: "Mar 22",
            status: "In Progress",
            badgeClass: "b-yellow",
        },
        {
            id: "#TKT-0090",
            client: "Sunita Pillai",
            subject: "Reschedule request",
            priority: "Medium",
            assigned: "Reception",
            created: "Mar 21",
            status: "Open",
            badgeClass: "b-blue",
        },
        {
            id: "#TKT-0089",
            client: "Arun Kumar",
            subject: "Invoice issue",
            priority: "Low",
            assigned: "Finance",
            created: "Mar 20",
            status: "Resolved",
            badgeClass: "b-green",
        },
    ];

    return (
        <div className="page1">
            {/* <Toast message={toastMsg} /> */}
            {/* HEADER */}
            <div
                className="anim-up"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}
            >
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800 }}>Support Tickets</h1>
                    <p style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Raise and track client support issues</p>
                </div>

                <button className="btn-sm" onClick={openModal} style={{ padding: "9px 18px", fontSize: 13 }}>
                    + Raise Ticket
                </button>
            </div>

            {/* KPI CARDS */}
            <div
                className="anim-up d1"
                style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 11, marginBottom: 15 }}
            >
                {/* <div style={{ background: "var(--bg-surface2)", padding: 14, borderRadius: 12, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)" }}>Open</div>
                    <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>7</div>
                </div> */}
                <div
                    style={{
                        background: "var(--bg-surface2)",
                        padding: 14,
                        borderRadius: 12,
                        border: "1px solid var(--border)"
                    }}
                >
                    <div
                        style={{
                            fontSize: 10.5,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                            fontFamily: "'Saira', sans-serif"
                        }}
                    >
                        Open
                    </div>

                    <div
                        style={{
                            fontSize: 26,
                            fontWeight: 800,
                            marginTop: 4,
                            color: "var(--text-primary)",
                            fontFamily: "'Outfit', sans-serif"
                        }}
                    >
                        7
                    </div>
                </div>
                <div style={{ background: "rgba(234,179,8,.08)", padding: 14, borderRadius: 12, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", color: "#eab308" }}>In Progress</div>
                    <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4, color: "#eab308" }}>4</div>
                </div>

                <div style={{ background: "rgba(34,197,94,.08)", padding: 14, borderRadius: 12, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", color: "#22c55e" }}>Resolved</div>
                    <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4, color: "#22c55e" }}>43</div>
                </div>

                <div style={{ background: "rgba(239,68,68,.08)", padding: 14, borderRadius: 12, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", color: "#ef4444" }}>Critical</div>
                    <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4, color: "#ef4444" }}>1</div>
                </div>
            </div>

            {/* TABLE */}
            <div className="card anim-up d2">
                <table className="tbl" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Ticket ID</th>
                            <th>Client</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>Assigned</th>
                            <th>Created</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((t, index) => (
                            <tr key={t.id}>
                                <td>{index + 1}</td>
                                <td style={{ color: "var(--accent)", fontWeight: 700 }}>{t.id}</td>
                                <td>{t.client}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{t.subject}</td>
                                <td>
                                    <span className={`badge ${t.badgeClass}`}>{t.priority}</span>
                                </td>
                                <td style={{ color: "var(--text-secondary)" }}>{t.assigned}</td>
                                <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.created}</td>
                                <td>
                                    <span className={`badge ${t.badgeClass}`}>{t.status}</span>
                                </td>
                                <td>
                                    <button className="btn-sm" onClick={() => showToast("Ticket opened!")}>
                                        Open
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className={`modal-bg open`}>
                    <div className="modal">
                        {/* HEADER */}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 800 }}>Raise Support Ticket</h3>
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
                                <label className="label-text">Client Name</label>
                                <input className="inp" placeholder="Search client..." />
                            </div>

                            <div>
                                <label className="label-text">Subject</label>
                                <input className="inp" placeholder="Brief description" />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
                                <div>
                                    <label className="label-text">Priority</label>
                                    <select className="inp">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Critical</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="label-text">Assign To</label>
                                    <select className="inp">
                                        <option>Dr. Priya</option>
                                        <option>Dr. Deepa</option>
                                        <option>Reception</option>
                                        <option>Finance</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="label-text">Description</label>
                                <textarea className="inp" rows={3} />
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
                                    showToast("✓ Ticket raised!");
                                }}
                                className="btn-primary"
                                style={{ flex: 1 }}
                            >
                                Raise Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
