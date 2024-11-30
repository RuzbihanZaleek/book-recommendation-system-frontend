import { useState } from "react";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import { showSweetAlert } from "../../utils/sweetAlertUtil";
import Loader from "../Layout/Loader";
import backgroundImage from "../../assets/bg_image.jpg";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../../context/UserContext";
import { MESSAGES, NAMES } from "../../utils/constants";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await login(credentials);
      localStorage.setItem("authToken", response.data);

      const decodedToken = jwtDecode(response.data);
      const userId = decodedToken.userId;

      setUserId(userId);

      showSweetAlert({
        icon: "success",
        title: MESSAGES.LOGIN_SUCCESS,
      });

      navigate("/", { replace: true });
    } catch (error) {
      showSweetAlert({
        icon: "error",
        title: error.message || MESSAGES.LOGIN_FAIL,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchToSignUp = () => {
    navigate("/signup");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AuthForm
        title={NAMES.AUTH_FORM.LOG_IN}
        submitHandler={handleLogin}
        switchText="Don't have an account?"
        switchHandler={switchToSignUp}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Login;
