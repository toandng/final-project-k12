import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './RegisterForm.module.scss';
import config from "../../config";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

    if (formData.firstName.trim() === "") {
      setError("Trường họ không được để trống");
      return;
    }
    if (formData.lastName.trim() === "") {
      setError("Trường tên không được để trống");
      return;
    }
    if (formData.email.trim() === "") {
      setError("Email không được để trống");
      return;
    }
    if (formData.password.length < 8) {
      setError("Mật khẩu phải từ 8 kí tự trở lên");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    setError("");

    try {
      console.log("Dữ liệu gửi đi:", formData);
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      };

      const response = await fetch("https://api01.f8team.dev/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Kết quả đăng ký:", result);

      if (!response.ok) {
        console.error("Chi tiết lỗi:", result);
        throw new Error(result.message || "Đăng ký thất bại");
      }

      // Kiểm tra token rõ ràng
      const token = result.access_token || result.accessToken || result.token || result.jwtToken;
      console.log("Token nhận được:", token);

      if (token) {
        localStorage.setItem("accessToken", token);
        setData(result);
        console.log("Đăng ký thành công:", result);
        navigate(config.routes.verifyPhone);
      } else {
        throw new Error("Không nhận được token từ server");
      }

    } catch (error) {
      setError(error.message || "Lỗi khi đăng ký");
      console.error("Lỗi từ catch:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.container}`}>
      <h2>Register</h2>

      <p>First Name</p>
      <input
        className={`${styles.firstName}`}
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <p>Last Name</p>
      <input
        className={`${styles.lastName}`}
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <p>Email</p>
      <input
        className={`${styles.email}`}
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <p>Password</p>
      <input
        className={`${styles.password}`}
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