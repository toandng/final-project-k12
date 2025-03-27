import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import styles from './RegisterForm.module.scss';
import config from "../../config";
import authServices from "../../services/authServices"
import httpRequest from "../../utils/httpRequest";
import Button from "../../components/Button";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
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
    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword, 
    };
   
    try {
      const data = await authServices.register(requestData);
      if (data.status === "success") {
        httpRequest.setToken(data.access_token);
        navigate(config.routes.verifyPhone);
      } else {
        setError(data.message || "Đăng ký thất bại");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
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
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <p>Confirm Password</p>
      <input
        className={`${styles.confirmPassword}`}
        type="password"
        name="confirmPassword"
        placeholder="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      {error && <p className={styles.error}>{error}</p>}
      <Button size="lg" type="submit" isLoading={isLoading}>
            REGISTER
      </Button>
    </form>
  );
}
