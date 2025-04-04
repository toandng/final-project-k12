import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const userContext = useContext()

  if(userContext.loading) {
    return <div>Loading...</div>
  }
  if(userContext.user) {
    const path = encodeURIComponent(location.pathname);
    return <Navigate to={`${config.routes.login}?continue${path}`} />
  }


  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  return children;
}
  
ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
