import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { validateForm } from "../../utils/handleAuthFormErrors";
import { NAMES } from "../../utils/constants";

const AuthForm = ({
  title,
  submitHandler,
  switchText,
  switchHandler,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors } = validateForm(formData, title);
    if (isValid) {
      submitHandler(formData);
    } else {
      setErrors(errors);
    }
  };

  return (
    <Box className="flex flex-col items-center gap-6 w-full max-w-md p-6 bg-gray-200 bg-opacity-70 shadow-lg rounded-lg">
      <Typography variant="h4">{title}</Typography>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        {title === NAMES.AUTH_FORM.SIGN_UP && (
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
        )}
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={isLoading}
          className="mt-4"
        >
          {isLoading ? <CircularProgress size={24} /> : title}
        </Button>
      </form>
      <Typography>
        {switchText}{" "}
        <span
          className="text-purple-800 cursor-pointer hover:underline text-lg font-bold"
          onClick={switchHandler}
        >
          {title === NAMES.AUTH_FORM.LOG_IN
            ? NAMES.AUTH_FORM.SIGN_UP
            : NAMES.AUTH_FORM.LOG_IN}
        </span>
      </Typography>
    </Box>
  );
};

export default AuthForm;
