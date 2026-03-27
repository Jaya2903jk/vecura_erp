import toast from "react-hot-toast";

// ✅ Promise toast
export const toastPromise = (promise, messages) => {
    return toast.promise(promise, {
        loading: messages.loading || "Processing...",
        success: messages.success || "Success!",
        error: messages.error || "Something went wrong"
    });
};

// ✅ Simple toast
export const toastSuccess = (msg) => toast.success(msg);
export const toastError = (msg) => toast.error(msg);
export const toastLoading = (msg) => toast.loading(msg);
