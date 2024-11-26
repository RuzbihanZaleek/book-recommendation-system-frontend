export const handleBookReadStatus = (status) => {
  switch (status) {
    case "reading":
      return { text: "Reading", color: "primary" };
    case "finished":
      return { text: "Finished", color: "success" };
    case "plan_to_read":
      return { text: "Plan to Read", color: "warning" };
    default:
      return { text: "Unknown Status", color: "default" };
  }
};
