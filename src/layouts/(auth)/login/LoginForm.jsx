import { useState } from "react";
import styles from '../../(auth)/login/LoginForm.module.scss'
import {NavLink} from "react-router-dom"
import config from "../../../config";
export default function LoginForm() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch("https://rtk9rj-8080.csb.app/users");
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu người dùng");
      }
      
      const users = await response.json();
      const user = users.find(u => u.phone === formData.phone && u.password === formData.password);
      
      if (!user) {
        setError("Số điện thoại hoặc mật khẩu không đúng");
        return;
      }
      
      setData(user);
      console.log("Đăng nhập thành công", user);
    } catch (error) {
      setError("Lỗi khi đăng nhập");
    }
  };

  return (
    <form onSubmit={handleSubmit}  className={`${styles.container}`}>
       <div>
            <h2>Welcome to Scrap Plan</h2>
            <p>Create an account or login to join your orders</p>
        </div>
      <div>
        <p  className={`${styles.login}`}>Số điện thoại</p>
        <input
          className={`${styles.phone}`}
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
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
      {data && <p>Đăng nhập thành công:</p>}

      <NavLink to={config.routes.register}>Don't have account? Register here!</NavLink>
    </form>
    
  );
}