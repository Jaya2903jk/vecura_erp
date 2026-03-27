export default function Alert({ type = "info", message }) {
    const styles = {
        info: "text-fg-brand-strong bg-brand-softer",
        danger: "text-fg-danger-strong bg-danger-soft",
        success: "text-fg-success-strong bg-success-soft",
        warning: "text-fg-warning bg-warning-soft",
        dark: "text-heading bg-neutral-secondary-medium"
    };

    const titles = {
        info: "Info",
        danger: "Error",
        success: "Success",
        warning: "Warning",
        dark: "Alert"
    };

    if (!message) return null;

    return (
        <div className={`p-4 mb-4 text-sm rounded-base ${styles[type]}`} role="alert">
            <span className="font-medium">{titles[type]}!</span> {message}
        </div>
    );
}
