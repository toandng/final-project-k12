import config from "../config";
import Login from "../layouts/(auth)/login/login";
import Register from "../layouts/(auth)/register/register";
import VerifyPhone from "../layouts/(verify)/phone/VerifyPhoneForm";
const routes = [
    {
        path: config.routes.login,
        component: Login
    },
    {
        path: config.routes.register,
        component: Register
    },
    {
        path: config.routes.verifyPhone,
        component: VerifyPhone
    }
]
export default routes;