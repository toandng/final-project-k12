import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./LoginForm.module.scss";
import Button from "@/components/button";
import config from "@/config";
import Form, { TextInput } from "@/components/Forms";
import useUser from "@/hooks/useUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUser, fetchAuthUser } from "../../features/auth/authSlice";

export default function LoginForm() {
  const [error, setGeneralError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useUser();

  useEffect(() => {
    if (user) {
      navigate(config.routes.home, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (data) => {
    setGeneralError("");

    if (!data.email) {
      toast.error("Email is required to sign in");
      return;
    } else if (!data.password) {
      toast.error("Password is required to sign in");
      return;
    }

    try {
      const resultAction = await dispatch(
        loginUser({ email: data.email, password: data.password })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login successful!");
        dispatch(fetchAuthUser()); // get user data
        navigate(config.routes.home);
      } else {
        setGeneralError(resultAction.payload || "Login failed.");
      }
    } catch (err) {
      console.log(err);

      setGeneralError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src="/img/7.jpg" alt="Background" />
      </div>

      <Form onSubmit={handleSubmit}>
        <div>
          <h2>Welcome to Scrap Plan</h2>
          <p className={styles.p}>
            Create an account or login to join your orders
          </p>
        </div>

        <label className={styles.login}>Email</label>
        <TextInput
          name="email"
          className={styles.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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
          <Button
            className={styles.newAccount}
            type="Link"
            to={config.routes.register}
          >
            Register here!
          </Button>
        </div>
      </Form>
    </div>
  );
}
