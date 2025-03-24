import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Chưa đăng nhập, chuyển về /login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Đã đăng nhập, render children
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
