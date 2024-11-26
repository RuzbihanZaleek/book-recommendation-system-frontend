export const validateForm = (formData, title) => {
  let isValid = true;
  const errors = {};

  if (!formData.email) {
    errors.email = "Email is required";
    isValid = false;
  }

  if (!formData.password) {
    errors.password = "Password is required";
    isValid = false;
  }

  if (title === "Sign Up" && !formData.username) {
    errors.username = "Username is required";
    isValid = false;
  }

  return { isValid, errors };
};
