import Swal from "sweetalert2";

/**
 * @param {string} icon - The icon type ('success', 'error', 'warning', 'info', 'question').
 * @param {string} title - The title of the alert.
 * @param {string} text - The text to display in the alert.
 * @param {string} position - The position of the alert ('top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end').
 * @param {number} timer - The duration in milliseconds before the alert closes automatically (optional).
 * @param {boolean} toast - Whether to show the alert as a toast (optional).
 * @param {boolean} showConfirmButton - Whether to show the confirm button (optional).
 */
export const showSweetAlert = ({
  icon = "success",
  title = "",
  text = "",
  position = "bottom-end",
  timer = 3000,
  toast = true,
  showConfirmButton = false,
}) => {
  Swal.fire({
    icon,
    title,
    text,
    position,
    toast,
    showConfirmButton,
    timer,
  });
};
