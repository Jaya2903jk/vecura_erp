import Swal from "sweetalert2";

// ✅ Popup (center)
export const showPopup = (type, message) => {
    Swal.fire({
        icon: type, // success | error | warning | info
        title: message,
        confirmButtonColor: "#51a3e3"
    });
};

// ✅ Toast (top right)
export const showToast = (type, message) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });
};
