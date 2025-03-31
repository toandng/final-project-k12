import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './RegisterForm.module.scss';
import config from "../../config";
import authServices from "../../services/authServices"
import httpRequest from "../../utils/httpRequest";
import Button from "../../components/Button";
import registerSchema from "../../schema/registerSchema";
let timer;
export default function RegisterForm() {
  const { 
    register, 
    handleSubmit,
    watch,
    trigger,
    setError,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const [error, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    setIsLoading(true);
    setGeneralError('');


    const requestData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation, 
    };

    try {
      const response = await authServices.register(requestData);
      if (response.status === 'success') {
        httpRequest.setToken(response.access_token);
        navigate(config.routes.verifyPhone);
      } else {
  
        setGeneralError(response.message?.general || 'Đăng ký thất bại');
      }
    } catch (error) {
      console.log(error);
      
      
    } finally {
      setIsLoading(false);
    }
  };

  const emailValue = watch("email");
  
  useEffect(() => {
    clearTimeout(timer);
    if (!emailValue) return;
    
    timer = setTimeout(async () => {
      const isValid = await trigger("email");
      if (isValid) {
        console.log("Kiểm tra email:", emailValue);
        const exists = await authServices.checkEmail(emailValue);
        console.log("Kết quả check email:", exists);
        if(exists) {
          setError("email", {
            type: "manual",
            message: "Email này đã tồn tại..."
          })
        }
      }
    }, 800);
  
  }, [emailValue, trigger, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.container}`}>
      <h2>Register</h2>

      <p>First Name</p>
      <input
        className={`${styles.firstName}`}
        type="text"
        {...register('firstName')}
        required
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      <p>Last Name</p>
      <input
        className={`${styles.lastName}`}
        type="text"
        name="lastName"
        placeholder="Last Name"
        {...register('lastName')}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <p>Email</p>
      <input
        className={`${styles.email}`}
        type="email"
        name="email"
        {...register('email')}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <p>Password</p>
      <input
        className={`${styles.password}`}
        type="password"
        name="password"
        {...register('password')}
      />
       {errors.password && <p>{errors.password.message}</p>}
      <p>Confirm Password</p>
      <input
        className={`${styles.confirmPassword}`}
        type="password"
        {...register('password_confirmation')}
      />
     {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <Button size="lg" type="submit" isLoading={isLoading}>
            REGISTER
      </Button>
    </form>
  );
}
