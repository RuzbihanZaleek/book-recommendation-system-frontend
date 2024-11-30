import { NAMES, VALIDATIONS } from "./constants";

export const validateForm = (formData, title) => {
  let isValid = true;
  const errors = {};

  if (!formData.email) {
    errors.email = VALIDATIONS.EMAIL_REQUIRED;
    isValid = false;
  }

  if (!formData.password) {
    errors.password = VALIDATIONS.PASSWORD_REQUIRED;
    isValid = false;
  }

  if (title === NAMES.AUTH_FORM.SIGN_UP && !formData.username) {
    errors.username = VALIDATIONS.USERNAME_REQUIRE;
    isValid = false;
  }

  return { isValid, errors };
};
