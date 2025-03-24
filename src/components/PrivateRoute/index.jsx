import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component }) {
  const token = localStorage.getItem("token");
  return token ? <Component /> : <Navigate to="/login" replace />;
}
export default PrivateRoute