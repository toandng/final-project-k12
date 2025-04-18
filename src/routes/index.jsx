import { Navigate } from "react-router-dom";
import config from "../config";
import LoginForm from "../pages/Login/LoginForm";
import Register from "../pages/Register/RegisterForm";
import VerifyPhone from "../pages/VerifyPhone/phone/VerifyPhoneForm";
import HomePage from "../pages/Home/HomePage";
import PrivateRoute from "../components/PrivateRoute";
import ProfilePage from "../pages/Account/Profile/ProfilePage";
import History from "../pages/History";
// import DefaultLayout from "../layouts/DefaultLayout";
import Features from "../pages/Account/Component/Features";
import Footer from "../layouts/DefaultLayout/Component/Footer/Footer";
import EditProfile from "../pages/Account/Profile/Component/EditProfile/EditProfile";
import DefaultLayout from "../layouts/DefaultLayout";
import NoHeader from "../layouts/DefaultLayout/Component/NoHeader";
import VerifyCard from "../pages/VerifyIndentity/VerifyCard/VerifyCard";


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
    layout: DefaultLayout
  },
  {
    path: "/p/:username", // Đường dẫn cho ProfilePage
    component: ProfilePage, // Component của ProfilePage
    protected: false,
    layout: null
  },
  // history
  {
    path: "/history", // Định nghĩa đường dẫn /profile
    component: History, // Gán ProfilePage cho /profile
    protected: false,
    layout: NoHeader,
  },
  // Profile
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
    layout: NoHeader,
  },
  {
    path: "/edit", 
    component: EditProfile, 
    protected: false,
    layout: null
  },

  // Auth
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
  // Verify
  {
    path: config.routes.verifyPhone,
    component: VerifyPhone,
    protected: false,
    layout: null
  },
  {
    path: config.routes.verifyCard,
    component: VerifyCard,
    protected: false,
    layout: null
  },
];

export default routes;
