import RegisterForm from "./RegisterForm";
import styles from "../../(auth)/register/RegisterForm.module.scss";


function Register() {
    return(
        <div className={`${styles.container}`}>
            <RegisterForm />
        </div>
    )
}   
export default Register;