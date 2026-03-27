import React from "react";
import { useNavigate } from "react-router-dom";

// ─── helpers ────────────────────────────────────────────────────────────────

const showToast = (msg, type) => {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-msg");
    toastMsg.textContent = msg;
    toast.className = "on " + (type || "");
    setTimeout(() => { toast.className = ""; }, 2500);
};

// ─── sub-components (zero new CSS — all global classes) ──────────────────────

const Pill = ({ color = "gray", dot, children }) => {
    const styles = {
        red: { background: "rgba(239,68,68,.1)", color: "#dc2626" },
        yellow: { background: "rgba(234,179,8,.1)", color: "#b45309" },
        blue: { background: "rgba(59,130,246,.1)", color: "#1d4ed8" },
        gray: { background: "var(--bg-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" },
    };
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 11px",
            borderRadius: 20, fontSize: 12, fontWeight: 500, ...styles[color]
        }}>
            {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />}
            {children}
        </span>
    );
};

const SLabel = ({ children, mb = 10 }) => (
    <p style={{
        fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em",
        color: "var(--text-muted)", fontFamily: "'Saira',sans-serif", marginBottom: mb
    }}>
        {children}
    </p>
);

const SDivider = () => (
    <div style={{ height: 1, background: "var(--border-soft)", margin: "18px 0" }} />
);

const TimelineItem = ({ text, time, dotColor, last = false }) => (
    <div style={{ display: "flex", gap: 12, paddingBottom: last ? 0 : 16 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
                width: 8, height: 8, borderRadius: "50%", background: dotColor,
                marginTop: 4, flexShrink: 0
            }} />
            {!last && <div style={{ width: 1, flex: 1, background: "var(--border-soft)", marginTop: 4 }} />}
        </div>
        <div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: text }} />
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{time}</div>
        </div>
    </div>
);

// ─── main component ──────────────────────────────────────────────────────────

export default function TicketPage({
    id = "TKT-0042",
    title = "Unable to process monthly invoice — payment gateway error",
    priority = "high",
    status = "open",
    category = "Billing",
    slaLabel = "SLA: 18h left",
    slaPercent = 28,
    client = "Acme Corp",
    clientTier = "Enterprise · Tier 1",
    assignee = "Sarah R.",
    assigneeRole = "Support Engineer",
    createdAt = "Mar 24, 2026 · 9:41 AM",
    slaDeadline = "Mar 26, 2026 · 9:41 AM",
    lastUpdated = "Today · 9:45 AM",
    description = "Client reports billing failures at checkout. Error PG_502_TIMEOUT is returned after 30s. Affects all 3 active subscriptions since the Mar 23 infrastructure update.",
    tags = ["billing", "gateway", "enterprise"],
    activity = [
        { text: "<strong>Sarah R.</strong> was assigned to this ticket", time: "Today · 9:45 AM", color: "var(--accent)" },
        { text: "Priority escalated to <span class='badge b-red' style='font-size:11px;padding:1px 7px;'>High</span>", time: "Today · 9:43 AM", color: "#eab308" },
        { text: "Ticket opened by <strong>Acme Corp</strong>", time: "Today · 9:41 AM", color: "var(--text-muted)" },
    ],
}) {
    const navigate = useNavigate();

    const priorityPill = {
        high: { color: "red", dot: "#ef4444", label: "High priority" },
        medium: { color: "yellow", dot: "#eab308", label: "Medium priority" },
        low: { color: "gray", dot: null, label: "Low priority" },
    }[priority?.toLowerCase()] ?? { color: "gray", label: priority };

    const statusPill = {
        open: { color: "yellow", dot: "#eab308", label: "Open" },
        resolved: { color: "blue", dot: "#3b82f6", label: "Resolved" },
        closed: { color: "gray", dot: null, label: "Closed" },
    }[status?.toLowerCase()] ?? { color: "gray", label: status };

    const initials = (name) =>
        name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

    return (
        <>
            {/* ── Two-column card ── */}
            <div style={{
                display: "grid", gridTemplateColumns: "1fr 264px",
                border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden",
                background: "var(--bg-surface)", boxShadow: "var(--shadow)"
            }}>

                {/* ════ LEFT ════ */}
                <div style={{ padding: "28px 28px 24px", borderRight: "1px solid var(--border-soft)" }}>

                    {/* breadcrumb row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                        <button className="btn-outline" style={{ padding: "6px 12px", fontSize: 12 }}
                            onClick={() => navigate(-1)}>
                            ← Back
                        </button>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                            Support / Tickets /{" "}
                            <span style={{ color: "var(--text-secondary)" }}>{id}</span>
                        </span>
                        <div style={{ marginLeft: "auto" }}>
                            <button className="btn-outline" style={{ fontSize: 12, padding: "6px 12px" }}>
                                ⋯ More actions
                            </button>
                        </div>
                    </div>

                    {/* id + title */}
                    <p style={{
                        fontSize: 10.5, fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: ".1em", color: "var(--text-muted)", fontFamily: "'Saira',sans-serif",
                        marginBottom: 5
                    }}>
                        {id}
                    </p>
                    <h2 style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.4, marginBottom: 14 }}>
                        {title}
                    </h2>

                    {/* status pills */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
                        <Pill color={priorityPill.color} dot={priorityPill.dot}>{priorityPill.label}</Pill>
                        <Pill color={statusPill.color} dot={statusPill.dot}>{statusPill.label}</Pill>
                        {category && <Pill color="blue">{category}</Pill>}
                        {slaLabel && <Pill color="gray">{slaLabel}</Pill>}
                    </div>

                    {/* description */}
                    <div style={{
                        background: "var(--bg-surface2)", borderRadius: 10,
                        padding: "14px 16px", marginBottom: 24, fontSize: 13.5,
                        color: "var(--text-secondary)", lineHeight: 1.65
                    }}>
                        {description}
                    </div>

                    {/* activity timeline */}
                    <SLabel>Activity</SLabel>
                    <div>
                        {activity.map((ev, i) => (
                            <TimelineItem key={i} text={ev.text} time={ev.time}
                                dotColor={ev.color} last={i === activity.length - 1} />
                        ))}
                    </div>

                    {/* action buttons */}
                    <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
                        <button
                            style={{
                                flex: 1, padding: 11, borderRadius: 9, border: "none",
                                background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 700,
                                cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all .2s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = "0 6px 20px var(--accent-glow)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                            onClick={() => showToast("Ticket approved", "success")}>
                            ✓ Approve ticket
                        </button>
                        <button
                            style={{
                                flex: 1, padding: 11, borderRadius: 9,
                                border: "1.5px solid #ef4444", background: "transparent",
                                color: "#ef4444", fontSize: 13, fontWeight: 700, cursor: "pointer",
                                fontFamily: "'Outfit',sans-serif", transition: "all .2s"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,.07)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            onClick={() => showToast("Ticket rejected", "danger")}>
                            ✕ Reject
                        </button>
                    </div>
                </div>

                {/* ════ RIGHT: sidebar ════ */}
                <div style={{
                    background: "var(--bg-surface2)", padding: "24px 20px",
                    display: "flex", flexDirection: "column"
                }}>

                    {/* client */}
                    <SLabel>Client</SLabel>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div className="av av-1" style={{ width: 32, height: 32, fontSize: 11 }}>
                            {initials(client)}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{client}</div>
                            {clientTier && (
                                <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 1 }}>{clientTier}</div>
                            )}
                        </div>
                    </div>

                    <SDivider />

                    {/* assignee */}
                    <SLabel>Assigned to</SLabel>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div className="av av-2" style={{ width: 32, height: 32, fontSize: 11 }}>
                            {initials(assignee)}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{assignee}</div>
                            {assigneeRole && (
                                <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 1 }}>{assigneeRole}</div>
                            )}
                        </div>
                    </div>

                    <SDivider />

                    {/* meta */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div>
                            <SLabel mb={3}>Created</SLabel>
                            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{createdAt}</div>
                        </div>
                        <div>
                            <SLabel mb={3}>SLA deadline</SLabel>
                            <div style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>{slaDeadline}</div>
                        </div>
                        <div>
                            <SLabel mb={3}>Last updated</SLabel>
                            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{lastUpdated}</div>
                        </div>
                    </div>

                    <SDivider />

                    {/* SLA progress bar — uses existing .prog / .prog-fill classes */}
                    <SLabel>SLA progress</SLabel>
                    <div className="prog">
                        <div className="prog-fill"
                            style={{ width: `${slaPercent}%`, background: slaPercent < 30 ? "#ef4444" : "var(--accent)" }} />
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between",
                        fontSize: 11, color: "var(--text-muted)", marginTop: 4
                    }}>
                        <span>{slaPercent}% remaining</span>
                        <span>{slaLabel}</span>
                    </div>

                    {/* tags */}
                    {tags.length > 0 && (
                        <>
                            <SDivider />
                            <SLabel>Tags</SLabel>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                {tags.map((tag) => (
                                    <span key={tag} className="badge b-gray">{tag}</span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* toast — reuses global #toast styles */}
            <div id="toast">
                <span id="toast-msg" />
            </div>
        </>
    );
}
