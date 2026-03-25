import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const navigate = useNavigate();
    const [showTheme, setShowTheme] = useState(false);

    const gotoPage = (page) => {
        navigate("/" + page);
    };

    const toggleThemePanel = () => {
        setShowTheme(!showTheme);
    };

    const setTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        setShowTheme(false);
    };

    const toggleSidebar = () => {
        document.querySelector(".sidebar")?.classList.toggle("slim");
    };

    const toast = (msg) => {
        alert(msg); // you can replace with custom toast later
    };

    return (
        <header className="topbar">

            {/* Sidebar Toggle */}
            <button onClick={toggleSidebar} className="icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            {/* Search */}
            <div style={{ position: "relative" }}>
                <svg
                    style={{
                        position: "absolute",
                        left: "11px",
                        top: "50%",
                        transform: "translateY(-50%)"
                    }}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--text-muted)"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input className="srch" placeholder="Search clients, treatments..." />
            </div>

            <div style={{ flex: 1 }}></div>

            {/* Active Sessions */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    background: "var(--accent-light)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)"
                }}
            >
                <div className="pdot"></div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)" }}>
                    12 Active Sessions
                </span>
            </div>

            {/* Theme Switch */}
            {/* <div style={{ position: "relative" }}>
                <button className="icon-btn" onClick={toggleThemePanel}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                </button>

                {showTheme && (
                    <div className="theme-panel open">
                        <div style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "var(--text-muted)",
                            marginBottom: "12px"
                        }}>
                            Choose Theme
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div onClick={() => setTheme("light")} className="theme-row">VeCura Blue</div>
                            <div onClick={() => setTheme("dark")} className="theme-row">Midnight</div>
                            <div onClick={() => setTheme("ocean")} className="theme-row">Deep Ocean</div>
                            <div onClick={() => setTheme("forest")} className="theme-row">Forest Night</div>
                            <div onClick={() => setTheme("rose")} className="theme-row">Rose Garden</div>
                        </div>
                    </div>
                )}
            </div> */}

            {/* Notification */}
            {/* <button className="icon-btn" onClick={() => toast("No new notifications")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <div className="ndot"></div>
            </button> */}
            <button
                className="icon-btn"
                style={{ position: "relative" }}
                onClick={() => toast("No new notifications")}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>

                <div className="ndot"></div>
            </button>
            <div style={{ width: "1px", height: "26px", background: "var(--border)" }}></div>

            {/* Profile */}
            <div
                onClick={() => gotoPage("settings")}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    cursor: "pointer",
                    padding: "5px 9px",
                    borderRadius: "9px"
                }}
            >
                <div className="av av-1" style={{ width: "34px", height: "34px" }}>Dr</div>
                <div>
                    <div style={{ fontSize: "13px", fontWeight: 700 }}>
                        Dr. Priya Sharma
                    </div>
                    <div style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>
                        Chief Admin
                    </div>
                </div>
            </div>

        </header>
    );
}
