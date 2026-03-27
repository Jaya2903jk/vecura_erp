export default function Alert({ type = "error", message, onClose }) {
    const styles = {
        error: {
            bg: "rgba(239,68,68,.1)",
            border: "1px solid rgba(239,68,68,.3)",
            color: "#ef4444",
        },
    };

    return (
        <div style={{
            background: styles[type].bg,
            border: styles[type].border,
            borderRadius: "9px",
            padding: "11px",
            color: styles[type].color,
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <span>{message}</span>
            {onClose && (
                <span onClick={onClose} style={{ cursor: "pointer" }}>✕</span>
            )}
        </div>
    );
}
