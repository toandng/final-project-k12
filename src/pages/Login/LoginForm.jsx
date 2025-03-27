import { useState } from "react";
import styles from './LoginForm.module.scss'
import { useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import config from "../../config";
import httpRequest from "../../utils/httpRequest";
import authServices from "../../services/authServices";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = await authServices.login(formData)
    if(data.status === "success") {
      httpRequest.setToken(data.access_token)
      navigate(config.routes.home)
    }
    else{
      setError(true)
    }
    setIsLoading(false)
  };


  return (
    <><div className={`${styles.img}`}> <img src="/img/7.jpg" alt="" /></div>
    <form onSubmit={handleSubmit} className={`${styles.container}`}>

      <div>
        <h2>Welcome to Scrap Plan</h2>
        <p>Create an account or login to join your orders</p>
      </div>
      <div>
        <p className={`${styles.login}`}>Email</p>
        <input
          className={`${styles.email}`}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required />
        <p className={`${styles.login}`}>Password</p>
        <input
          className={`${styles.password}`}
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button size="lg" type="submit" isLoading={isLoading}>
        LOGIN
      </Button>
      <div className={styles.needAccount}>
        <span className={styles.span}>Don&apos;t have account?</span>
        <Button type="Link" to={config.routes.register}> Register here!</Button>
      </div>
     
    </form></>
    
  );
}