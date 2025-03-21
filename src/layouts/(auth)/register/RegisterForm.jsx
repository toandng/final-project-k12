import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../../(auth)/register/RegisterForm.module.scss'
import config from "../../../config";
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password.length < 6) {
      setError("Mật khẩu phải từ 6 kí tự trở lên")
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    setError("");
    
    try {
      const response = await fetch("https://rtk9rj-8080.csb.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error("Đăng ký thất bại");
      }
      
      // const result = await response.json();
      navigate(config.routes.verifyPhone)
      setData(result);
      console.log("Đăng ký thành công");
    } catch (error) {
      setError("Lỗi khi đăng ký");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.container}`}>
      <h2>Register</h2>
        <p>Họ Và Tên</p> <input className={`${styles.name}`}
        type="text"
        name="name"
        placeholder="Họ và Tên"
        value={formData.name}
        onChange={handleChange}
        required
      /> 
      <p>Số điện thoại</p>
      <input className={`${styles.phone}`}
        type="tel"
        name="phone"
        placeholder="Số điện thoại"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <p>Password</p>
      <input className={`${styles.passwords}`}
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <p>ConfirmPassword</p>
      <input className={`${styles.confirmPassword}`}
        type="password"
        name="confirmPassword"
        placeholder="Xác nhận mật khẩu"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
     {error && <p className={styles.error}>{error}</p>}
      <button type="submit" >Đăng kí</button>
      {data && <p>Đăng ký thành công</p>}
      
    </form>
  );
}
