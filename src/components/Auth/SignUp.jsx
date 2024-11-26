import { useState } from "react";
import AuthForm from "./AuthForm";
import { signup } from "../../api/authApi";
import Loader from "../Layout/Loader";
import { useNavigate } from "react-router-dom";
import { showSweetAlert } from "../../utils/sweetAlertUtil";
import backgroundImage from "../../assets/bg_image.jpg";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (userData) => {
    setIsLoading(true);
    try {
      const response = await signup(userData);
      showSweetAlert({
        icon: "success",
        title: "Sign up successful!",
      });
      navigate("/login");
    } catch (error) {
      showSweetAlert({
        icon: "error",
        title: error.message || "Login failed!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLogin = () => {
    navigate("/login");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AuthForm
        title="Sign Up"
        submitHandler={handleSignUp}
        switchText="Already have an account?"
        switchHandler={switchToLogin}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SignUp;
