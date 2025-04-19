import config from "../config";
import LoginForm from "../pages/Login/LoginForm";
import Register from "../pages/Register/RegisterForm";
import VerifyPhone from "../pages/VerifyPhone/phone/VerifyPhoneForm";
import HomePage from "../pages/Home/HomePage";
import ProfilePage from "../pages/Account/Profile/ProfilePage";
import History from "../pages/History";
import Features from "../pages/Account/Component/Features";
import EditProfile from "../pages/Account/Profile/Component/EditProfile/EditProfile";
import DefaultLayout from "../layouts/DefaultLayout";
import NoHeader from "../layouts/DefaultLayout/Component/NoHeader";
import VerifyCard from "../pages/VerifyIndentity/VerifyCard/VerifyCard";

const routes = [
  {
    path: config.routes.home,
    component: HomePage,
    layout: DefaultLayout,
  },
  {
    path: "/p/:username", // Đường dẫn cho ProfilePage
    component: ProfilePage, // Component của ProfilePage
    layout: null,
  },
  // history
  {
    path: "/history", // Định nghĩa đường dẫn /profile
    component: History, // Gán ProfilePage cho /profile
    layout: NoHeader,
  },
  // Profile
  {
    path: "/profile", // Định nghĩa đường dẫn /profile
    component: ProfilePage, // Gán ProfilePage cho /profile
    layout: null,
  },
  {
    path: "/features",
    component: Features,
    layout: NoHeader,
  },
  {
    path: "/edit",
    component: EditProfile,
    layout: null,
  },

  // Auth
  {
    path: config.routes.login,
    component: LoginForm,
    protected: false,
    layout: null,
  },
  {
    path: config.routes.register,
    component: Register,
    layout: null,
  },
  // Verify
  {
    path: config.routes.verifyPhone,
    component: VerifyPhone,
    layout: null,
  },
  {
    path: config.routes.verifyCard,
    component: VerifyCard,
    layout: null,
  },
];

export default routes;
