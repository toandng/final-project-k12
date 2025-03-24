import { useState } from "react";
import styles from './LoginForm.module.scss'
import {NavLink, useNavigate} from "react-router-dom"
import config from "../../config";
export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api01.f8team.dev/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
      }

      const result = await response.json();

      
      const token = result.access_token || result.accessToken || result.token || result.jwtToken;
      console.log("Token nhận được:", token);

      if (token) {
        localStorage.getItem("accessToken", token);
        console.log("Đăng nhập thành công:", result);
        navigate(config.routes.home);
      } else {
        throw new Error("Không nhận được token từ server");
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <form onSubmit={handleSubmit}  className={`${styles.container}`}>
       <div>
            <h2>Welcome to Scrap Plan</h2>
            <p>Create an account or login to join your orders</p>
        </div>
      <div>
        <p  className={`${styles.login}`}>Email</p>
        <input
          className={`${styles.email}`}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <p  className={`${styles.login}`}>Password</p>
        <input
          className={`${styles.password}`}
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit">Đăng Nhập</button>

      <NavLink to={config.routes.register}>Don&apos;t have account? Register here!</NavLink>
    </form>
    
  );
}