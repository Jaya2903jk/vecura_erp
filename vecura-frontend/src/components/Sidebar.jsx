import { useNavigate } from "react-router-dom";
import logo from "../assets/Updated Logo-19.png"; // Adjust path if needed

export default function Sidebar() {
    const navigate = useNavigate();

    const gotoPage = (page) => {
        navigate("/" + page);
    };

    const doLogout = () => {
        navigate("/");
    };

    return (
        <aside className="sidebar">

            <div className="logo-area">
                <div
                    style={{
                        width: "36px",
                        height: "36px",
                        background: "var(--accent)",
                        borderRadius: "9px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 4px 12px var(--accent-glow)"
                    }}
                >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                </div>

                <div className="logo-txt" style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: "var(--text-primary)" }}>
                        VeCura
                    </div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                        Wellness Admin
                    </div>
                </div>
            </div>

            <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>

                <div className="nav-section-title">Overview</div>

                <div className="nav-item act" onClick={() => gotoPage("dashboard")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>

                    <span className="nav-lbl">Dashboard</span>
                </div>

                <div className="nav-item" onClick={() => gotoPage("analytics")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>

                    <span className="nav-lbl">Analytics</span>
                </div>

                <div className="nav-section-title">Clinic</div>

                <div className="nav-item" onClick={() => gotoPage("clients")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>

                    <span className="nav-lbl">Clients</span>
                    <span className="nav-pill">8</span>
                </div>

                <div className="nav-item" onClick={() => gotoPage("doctors")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>

                    <span className="nav-lbl">Doctors</span>
                </div>

                <div className="nav-item" onClick={() => gotoPage("appointments")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>

                    <span className="nav-lbl">Appointments</span>
                    <span className="nav-pill">5</span>
                </div>

                <div className="nav-item" onClick={() => gotoPage("treatments")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>

                    <span className="nav-lbl">Treatments</span>
                </div>

                <div className="nav-item" onClick={() => gotoPage("sessions")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>

                    <span className="nav-lbl">Sessions</span>
                </div>

                <div className="nav-item" onClick={() => gotoPage("consultation")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>

                    <span className="nav-lbl">Consultation</span>
                </div>

                <div className="nav-section-title">Finance & Support</div>

                <div className="nav-item" onClick={() => gotoPage("invoices")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>

                    <span className="nav-lbl">Invoices</span>
                </div>

                <div className="nav-item" onClick={() => navigate("/tickets")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" /></svg>

                    <span className="nav-lbl">Tickets</span>
                    <span className="nav-pill">3</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/department")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" /></svg>

                    <span className="nav-lbl">Department</span>
                </div>


                <div className="nav-item" onClick={() => gotoPage("calendar")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>

                    <span className="nav-lbl">Calendar</span>
                </div>

                <div className="nav-item" onClick={() => gotoPage("uploads")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>

                    <span className="nav-lbl">Image Uploads</span>
                </div>

                <div className="nav-item" onClick={() => gotoPage("settings")}>
                    <svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>

                    <span className="nav-lbl">Settings</span>
                </div>

            </nav>

            <div style={{ padding: "12px", borderTop: "1px solid var(--border-soft)" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "9px",
                        transition: "0.2s"
                    }}
                    onClick={doLogout}
                >
                    <div className="av av-1" style={{ width: "32px", height: "32px" }}>
                        Dr
                    </div>

                    <div className="nav-lbl" style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: 700 }}>
                            Dr. Priya Sharma
                        </div>
                        <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                            Chief Administrator
                        </div>
                    </div>
                    <svg class="nav-lbl" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth={2}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>

                </div>
            </div>

        </aside>
    );
}
