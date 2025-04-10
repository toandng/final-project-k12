import { Navigate } from "react-router-dom";
import config from "../../config";
import PropTypes from "prop-types"

function PrivateRoute({ component: Component}) {
  const token = localStorage.getItem("accessToken" )
  
  return token ? <Component/> : <Navigate to={config.routes.login} />

}
PrivateRoute.propTypes = {
  component: PropTypes.any
}
export default PrivateRoute;


