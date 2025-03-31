import { Navigate } from "react-router-dom";
import config from "../config";
import LoginForm from "../pages/Login/LoginForm";
import Register from "../pages/Register/RegisterForm";
import VerifyPhone from "../pages/VerifyPhone/phone/VerifyPhoneForm";
import HomePage from "../pages/Home/HomePage";
import PrivateRoute from "../components/PrivateRoute";
import ProfilePage from "../pages/Account/Profile/ProfilePage";
// import DefaultLayout from "../layouts/DefaultLayout";
import Features from "../pages/Account/Component/Features";
import Footer from "../layouts/DefaultLayout/Component/Footer/Footer";
import DefaultLayout from "../layouts/DefaultLayout";
import EditProfile from "../pages/Account/Profile/Component/EditProfile/EditProfile";




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
    layout: Footer
  },
  {
    path: "/p/:username", // Đường dẫn cho ProfilePage
    component: ProfilePage, // Component của ProfilePage
    protected: false,
    layout: null
  },
  {
    path: "/profile", // Định nghĩa đường dẫn /profile
    component: ProfilePage, // Gán ProfilePage cho /profile
    protected: false,
    layout: null
  },
  {
    path: "/features", 
    component: Features, 
    protected: false,
    layout: DefaultLayout
  },
  {
    path: "/edit", 
    component: EditProfile, 
    protected: false,
    layout: null
  },
  {
    path: config.routes.login,
    component: LoginForm,
    protected: false,
    layout: null
  },
  {
    path: config.routes.register,
    component: Register,
    protected: false,
    layout:null
  },
  {
    path: config.routes.verifyPhone,
    component: VerifyPhone,
    protected: false,
    layout: null
  },
];

export default routes;
