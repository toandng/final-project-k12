import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import Button from "../../components/Button";
import config from "../../config";
import authServices from "../../services/authServices";
import loginSchema from "../../schema/loginSchema";
import httpRequest from "../../utils/httpRequest";
import useLoading from "../../hooks/useLoading";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [error, setGeneralError] = useState("");
  const { setLoading } = useLoading();
  const onSubmit = async (data) => {
    setLoading(true);
    setGeneralError(""); // Reset lỗi trước khi gửi request

    try {
      const res = await authServices.login(data)
      const token = res?.data?.access_token
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
  };

  return (
    <>
      <div className={styles.img}>
        <img src="/img/7.jpg" alt="Background" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div>
          <h2>Welcome to Scrap Plan</h2>
          <p>Create an account or login to join your orders</p>
        </div>
        <div>
          <label className={styles.login}>Email</label>
          <input className={styles.email} type="email" {...register("email")} />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}

          <label className={styles.login}>Password</label>
          <input className={styles.password} type="password" {...register("password")} />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <Button size="lg" type="submit">
          LOGIN
        </Button>
        <div className={styles.needAccount}>
          <span className={styles.span}>Don&apos;t have an account?</span>
          <Button type="Link" to={config.routes.register}> Register here!</Button>
        </div>
      </form>
    </>
  );
}