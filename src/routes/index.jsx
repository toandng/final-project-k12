import { Navigate } from "react-router-dom";
import config from "../config";
import LoginForm from "../pages/Login/LoginForm";
import Register from "../pages/Register/RegisterForm";
import VerifyPhone from "../pages/VerifyPhone/phone/VerifyPhoneForm";
import HomePage from "../pages/HomePage";
import PrivateRoute from "../components/PrivateRoute";

const routes = [
  {
    path: "/",
    component: () => <Navigate to={config.routes.login} replace />,
    protected: false,
  },
  {
    path: config.routes.home,
    component: () => <PrivateRoute component={HomePage} />,
    private: true,
  },
  {
    path: config.routes.login,
    component: LoginForm,
    protected: false,
  },
  {
    path: config.routes.register,
    component: Register,
    protected: false,
  },
  {
    path: config.routes.verifyPhone,
    component: VerifyPhone,
    protected: false,
  },
];

export default routes;
