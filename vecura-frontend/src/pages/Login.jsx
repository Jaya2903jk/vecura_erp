import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";

export default function Login() {
    const navigate = useNavigate();
    const [toastMsg, setToastMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const fetchMenu = async (token) => {
        const res = await axios.get("http://127.0.0.1:8000/api/menu", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        localStorage.setItem("menu", JSON.stringify(res.data));
    };
    const doLogin = async () => {
        setLoading(true);
        setError(false);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/login", {
                login: email,
                password: password
            });

            const data = res.data;

            if (data.status) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                await fetchMenu(data.token);

                setToastMsg("Login successful!");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 800);
            } else {
                setError(true);
                setToastMsg(data.message);
            }

        } catch (err) {
            setError(true);
            setToastMsg("Server error");
        }

        setLoading(false);
    };
    // const doLogin = async () => {
    //     setLoading(true);
    //     setError(false);

    //     try {
    //         const res = await fetch("http://127.0.0.1:8000/api/login", {

    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 login: email,
    //                 password: password,
    //             }),
    //         });

    //         const data = await res.json();

    //         if (data.status) {
    //             localStorage.setItem("token", data.token);
    //             localStorage.setItem("user", JSON.stringify(data.user));
    //             await fetchMenu();

    //             setToastMsg("Login successful!");

    //             setTimeout(() => {
    //                 navigate("/dashboard");
    //             }, 800);
    //         } else {
    //             setError(true);
    //             setToastMsg(data.message);
    //         }
    //     } catch (err) {
    //         setError(true);
    //         setToastMsg("Server error");
    //     }

    //     setLoading(false);
    // };
    return (
        <div id="login-screen">
            {/* ORBS */}
            <div
                className="login-orb orb-1"
                style={{ position: "absolute" }}
            ></div>
            <div
                className="login-orb orb-2"
                style={{ position: "absolute" }}
            ></div>

            <div className="login-card">
                {/* HEADER */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "56px",
                            height: "56px",
                            background: "var(--accent)",
                            borderRadius: "14px",
                            marginBottom: "14px",
                            boxShadow: "0 8px 24px var(--accent-glow)",
                        }}
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.2"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>

                    <h1
                        style={{
                            fontSize: "26px",
                            fontWeight: "800",
                            color: "var(--text-primary)",
                            fontFamily: "Outfit",
                        }}
                    >
                        VeCura Wellness
                    </h1>

                    <p
                        style={{
                            fontSize: "13px",
                            color: "var(--text-muted)",
                        }}
                    >
                        Admin Portal
                    </p>
                </div>

                {/* THEME SWITCH */}
                {/* <div style={{
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
                </div> */}

                {/* ERROR */}
                {error && (
                    <div
                        style={{
                            background: "rgba(239,68,68,.1)",
                            border: "1px solid rgba(239,68,68,.3)",
                            borderRadius: "9px",
                            padding: "11px",
                            color: "#ef4444",
                            marginBottom: "16px",
                        }}
                    >
                        Invalid credentials
                    </div>
                )}

                {/* USER ID */}
                <div style={{ marginBottom: "14px" }}>
                    <label className="label-text">User ID</label>
                    <input
                        type="text"
                        className="inp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && doLogin()}
                        placeholder="Enter User ID"
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
                        placeholder="Enter User Password"
                    />
                </div>

                {/* REMEMBER */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "24px",
                    }}
                >
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
                    {loading ? (
                        <span className="spin-el"></span>
                    ) : (
                        "Sign In to Portal"
                    )}
                </button>

                <p
                    style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "var(--text-muted)",
                        marginTop: "18px",
                    }}
                >
                    admin@vecura.com / vecura123
                </p>
            </div>
        </div>
    );
}
