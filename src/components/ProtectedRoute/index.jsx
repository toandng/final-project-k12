import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import config from "../../config";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    const path = encodeURIComponent(location.pathname);
    console.log(path);
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
