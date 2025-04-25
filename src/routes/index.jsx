import config from "@/config";
import LoginForm from "@/pages/Login/LoginForm";
import Register from "@/pages/Register/RegisterForm";
import VerifyPhone from "@/pages/VerifyPhone/phone/VerifyPhoneForm";
import HomePage from "@/pages/Home/HomePage";
import ProfilePage from "@/pages/Account/Profile/ProfilePage";
import VerifyDriver from "@/pages/VerifyIndentity/VerifyCard/VerifyDriver";
import VerifyCard from "@/pages/VerifyIndentity/VerifyCard/VerifyCard";
import Vehicle from "@/pages/Vehicle/Vehicle";
import EditProfile from "@/pages/Account/Profile/Component/EditProfile/EditProfile";
import History from "@/pages/History";
import Notify from "@/pages/Home/Component/Notification";
import Features from "@/pages/Account/Component/Features";
import DefaultLayout from "@/layouts/DefaultLayout";
import NoHeader from "@/layouts/DefaultLayout/Component/NoHeader";

const routes = [
  // Trang chủ
  {
    path: config.routes.home,
    component: HomePage,
    layout: DefaultLayout,
  },
  // Trang profile (của người khác)
  {
    path: "/users/:username",
    component: ProfilePage,
    layout: null,
  },
  {
    path: "/users/:username",
    component: EditProfile,
    layout: null,
  },
  // Trang lịch sử
  {
    path: "/history",
    component: History,
    layout: NoHeader,
  },
  {
    path: "/notify",
    component: Notify,
    layout: NoHeader,
  },
  // Profile của chính mình
  {
    path: "/profile",
    component: ProfilePage,
    layout: null,
  },
  // Các chức năng trong profile
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

  // Xác minh
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
  {
    path: config.routes.driverForm,
    component: VerifyDriver,
    layout: null,
  },
  {
    path: config.routes.vehicle,
    component: Vehicle,
    layout: null,
  },
];

export default routes;
