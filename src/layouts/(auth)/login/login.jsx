import FormLogin from "./LoginForm";
import styles from "../../(auth)/login/LoginForm.module.scss";
function Login() {

    return(
       <div  className={`${styles.container}`}> 
            <h1>Đăng nhập</h1>
            <FormLogin/>
       </div>
    )
}
export default Login;