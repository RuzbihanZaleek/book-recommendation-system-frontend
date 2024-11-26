import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />;
};

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

export default ProtectedRoute;
