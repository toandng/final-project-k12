import FormLogin from "./LoginForm";
import styles from "../../(auth)/login/LoginForm.module.scss";
function Login() {

    return(
       <div  className={`${styles.container}`}> 
            <FormLogin/>
       </div>
    )
}
export default Login;