import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './RegisterForm.module.scss';
import config from "../../config";

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

    if (formData.password.length < 6) {
      setError("Mật khẩu phải từ 6 kí tự trở lên");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    setError("");

    try {
      console.log("Dữ liệu gửi đi:", formData);

      const response = await fetch("https://rtk9rj-8080.csb.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        console.error("Chi tiết lỗi:", errorDetail);
        throw new Error(errorDetail.message || "Đăng ký thất bại");
      }

      const result = await response.json();
      console.log("Kết quả đăng ký:", result);

      if (result && result.accessToken) {
        localStorage.setItem("token", result.accessToken);
        setData(result);
        console.log("Đăng ký thành công:", result);
        navigate(config.routes.verifyPhone);
      } else {
        throw new Error("Không nhận được access token");
      }
    } catch (error) {
      setError(error.message || "Lỗi khi đăng ký");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.container}`}>
      <h2>Register</h2>

      <p>Họ Và Tên</p>
      <input
        className={`${styles.name}`}
        type="text"
        name="name"
        placeholder="Họ và Tên"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <p>Số điện thoại</p>
      <input
        className={`${styles.phone}`}
        type="tel"
        name="phone"
        placeholder="Số điện thoại"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <p>Password</p>
      <input
        className={`${styles.passwords}`}
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <p>Confirm Password</p>
      <input
        className={`${styles.confirmPassword}`}
        type="password"
        name="confirmPassword"
        placeholder="Xác nhận mật khẩu"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">Đăng ký</button>
      {data && <p>Đăng ký thành công</p>}
    </form>
  );
}
