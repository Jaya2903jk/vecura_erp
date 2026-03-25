import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="page act">

            {/* HEADER */}
            <div
                className="anim-up"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "22px"
                }}
            >
                <div>
                    <p style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                        Tuesday, 23 March 2026
                    </p>

                    <h1 style={{ fontSize: "23px", fontWeight: "800" }}>
                        Good morning, Dr. Priya 👋
                    </h1>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        className="btn-outline"
                        onClick={() => navigate("/appointments")}
                    >
                        📅 Schedule
                    </button>

                    <button
                        className="btn-sm"
                        onClick={() => alert("Open Add Client Modal")}
                    >
                        + New Client
                    </button>
                </div>
            </div>

            {/* KPI CARDS */}
            <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(185px,1fr))",
        gap: "13px",
        marginBottom: "20px",
      }}
    >
      {/* CARD 1 */}
      <div className="card anim-up d1">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div className="stat-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="badge b-green">▲ 14%</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-1px", fontFamily: "'Outfit',sans-serif" }}>
          2,847
        </div>
        <div style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "3px" }}>
          Total Clients
        </div>
      </div>

      {/* CARD 2 */}
      <div className="card anim-up d2">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div className="stat-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <span className="badge b-green">▲ 8%</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-1px", fontFamily: "'Outfit',sans-serif" }}>
          143
        </div>
        <div style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "3px" }}>
          Today's Appointments
        </div>
      </div>

      {/* CARD 3 */}
      <div className="card anim-up d3">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div className="stat-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="badge b-green">▲ 21%</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-1px", fontFamily: "'Outfit',sans-serif" }}>
          ₹4.8L
        </div>
        <div style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "3px" }}>
          Monthly Revenue
        </div>
      </div>

      {/* CARD 4 */}
      <div className="card anim-up d4">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div className="stat-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="badge b-green">▲ 5%</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-1px", fontFamily: "'Outfit',sans-serif" }}>
          389
        </div>
        <div style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "3px" }}>
          Sessions This Month
        </div>
      </div>

      {/* CARD 5 */}
      <div className="card anim-up d5">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div className="stat-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
          </div>
          <span className="badge b-accent">96%</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-1px", fontFamily: "'Outfit',sans-serif" }}>
          4.9★
        </div>
        <div style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "3px" }}>
          Client Satisfaction
        </div>
      </div>
    </div>
        </div>
    );
}
