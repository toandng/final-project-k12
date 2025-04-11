import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import Button from "../../components/Button";
import config from "../../config";
import httpRequest from "../../utils/httpRequest";
import useLoading from "../../hooks/useLoading";
import Form, { TextInput } from "../../components/Forms";
import authServices from "../../services/authServices";

export default function LoginForm() {
  const [error, setGeneralError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const handleSubmit = async( data) => {
    setLoading(true);
    setGeneralError("");
    const formData = {
      email: data.email,
      password: data.password
    };

    console.log(data);
    
    
    try {
      const res = await authServices.login(formData)
      const token = res.data?.access_token
      if (token) {
        console.log("wasjdh");
        
        httpRequest.setToken(res?.data?.access_token);
        navigate(config.routes.home)
      } else {
        setGeneralError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
      }
    } catch (err) {
      setGeneralError(err.res?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
    } finally {
      setTimeout(() =>{
        setLoading(false)
      },500)
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src="/img/7.jpg" alt="Background" />
      </div>

      <Form onSubmit={handleSubmit}>
        <div>
          <h2>Welcome to Scrap Plan</h2>
          <p  className={styles.p}>Create an account or login to join your orders</p>
        </div>

        <label className={styles.login}>Email</label>
        <TextInput
          name="email"
          className={styles.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <label className={styles.login}>Password</label>
        <TextInput
          name="password"
          type="password"
          className={styles.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

       <div className={styles.buttonLogin}>
        <Button size="lg" type="submit">
              LOGIN
          </Button>
       </div>

        <div className={styles.needAccount}>
          <span className={styles.span}>Don&apos;t have an account?</span>
          <Button  className={styles.newAccount} type="Link" to={config.routes.register}> Register here!</Button>
        </div>
      </Form>
    </div>
  );
}
