
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("admin@vecura.com");
    const [password, setPassword] = useState("vecura123");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [theme, setThemeState] = useState("light");

    // INIT THEME
    useEffect(() => {
        const savedTheme = localStorage.getItem("vecura-theme") || "light";
        setThemeState(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    // THEME CHANGE
    const setTheme = (t) => {
        setThemeState(t);
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("vecura-theme", t);
    };

    // LOGIN
    const doLogin = () => {
        setLoading(true);

        setTimeout(() => {
            if (email === "admin@vecura.com" && password === "vecura123") {
                setError(false);
                navigate("/dashboard");
            } else {
                setError(true);
            }
            setLoading(false);
        }, 900);
    };

    return (
        <div id="login-screen">

            {/* ORBS */}
            <div className="login-orb orb-1" style={{ position: "absolute" }}></div>
            <div className="login-orb orb-2" style={{ position: "absolute" }}></div>

            <div className="login-card">

                {/* HEADER */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "56px",
                        height: "56px",
                        background: "var(--accent)",
                        borderRadius: "14px",
                        marginBottom: "14px",
                        boxShadow: "0 8px 24px var(--accent-glow)"
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>

                    <h1 style={{
                        fontSize: "26px",
                        fontWeight: "800",
                        color: "var(--text-primary)",
                        fontFamily: "Outfit"
                    }}>
                        VeCura Wellness
                    </h1>

                    <p style={{
                        fontSize: "13px",
                        color: "var(--text-muted)"
                    }}>
                        Clinical Admin Portal
                    </p>
                </div>

                {/* THEME SWITCH */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginBottom: "24px",
                    padding: "10px",
                    background: "var(--bg-surface2)",
                    borderRadius: "10px",
                    border: "1px solid var(--border)"
                }}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        Theme:
                    </span>

                    <div className={`theme-dot ${theme==="light"?"active":""}`}
                        style={{ background: "linear-gradient(135deg,#51a3e3,#00467d)" }}
                        onClick={() => setTheme("light")} />

                    <div className={`theme-dot ${theme==="dark"?"active":""}`}
                        style={{ background: "linear-gradient(135deg,#30363d,#161b22)" }}
                        onClick={() => setTheme("dark")} />

                    <div className={`theme-dot ${theme==="ocean"?"active":""}`}
                        style={{ background: "linear-gradient(135deg,#38bdf8,#0a1628)" }}
                        onClick={() => setTheme("ocean")} />

                    <div className={`theme-dot ${theme==="forest"?"active":""}`}
                        style={{ background: "linear-gradient(135deg,#4ade80,#0f1a12)" }}
                        onClick={() => setTheme("forest")} />

                    <div className={`theme-dot ${theme==="rose"?"active":""}`}
                        style={{ background: "linear-gradient(135deg,#f472b6,#1a0a0f)" }}
                        onClick={() => setTheme("rose")} />
                </div>

                {/* ERROR */}
                {error && (
                    <div style={{
                        background: "rgba(239,68,68,.1)",
                        border: "1px solid rgba(239,68,68,.3)",
                        borderRadius: "9px",
                        padding: "11px",
                        color: "#ef4444",
                        marginBottom: "16px"
                    }}>
                        ❌ Invalid credentials
                    </div>
                )}

                {/* EMAIL */}
                <div style={{ marginBottom: "14px" }}>
                    <label className="label-text">Email Address</label>
                    <input
                        type="email"
                        className="inp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && doLogin()}
                    />
                </div>

                {/* PASSWORD */}
                <div style={{ marginBottom: "18px" }}>
                    <label className="label-text">Password</label>
                    <input
                        type="password"
                        className="inp"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && doLogin()}
                    />
                </div>

                {/* REMEMBER */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "24px"
                }}>
                    <label style={{ fontSize: "13px" }}>
                        <input type="checkbox" defaultChecked /> Remember me
                    </label>

                    <span style={{ color: "var(--accent)", fontWeight: "600" }}>
                        Forgot password?
                    </span>
                </div>

                {/* BUTTON */}
                <button
                    className="btn-primary"
                    onClick={doLogin}
                    disabled={loading}
                >
                    {loading ? <span className="spin-el"></span> : "Sign In to Portal"}
                </button>

                <p style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    marginTop: "18px"
                }}>
                    admin@vecura.com / vecura123
                </p>

            </div>
        </div>
    );
}
