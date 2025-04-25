import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  const publicPaths = [
    "/login",
    "/register",
    "/verify-phone",
    "/verify-card",
    "/dirver-form",
    "/vehicle",
  ];

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    const isPublic = publicPaths.some((path) =>
      location.pathname.startsWith(path)
    );
    if (isPublic) {
      return children;
    }
    const redirectPath = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
  }
  if (auth.user && publicPaths.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
