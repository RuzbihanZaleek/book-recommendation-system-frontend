import { API } from "./constants";
import { showSweetAlert } from "./sweetAlertUtil";

export const handleApiError = (
  error,
  icon = API.ERROR_ICON,
  title = API.ERROR_TITLE
) => {
  console.error(error);

  const errorMessage =
    error.response?.data?.message || error.message || API.ERROR_MESSAGE;

  showSweetAlert({
    icon: icon,
    title: title,
    text: errorMessage,
  });
};
