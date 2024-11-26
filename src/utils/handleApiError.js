import { showSweetAlert } from "./sweetAlertUtil";

export const handleApiError = (error, icon = "error", title = "Oops...") => {
  console.error(error);

  const errorMessage =
    error.response?.data?.message || error.message || "Something went wrong!";

  showSweetAlert({
    icon: icon,
    title: title,
    text: errorMessage,
  });
};
