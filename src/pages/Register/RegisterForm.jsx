
import { useNavigate } from "react-router-dom";
import styles from './RegisterForm.module.scss';
import config from "../../config";
import authServices from "../../services/authServices";
import httpRequest from "../../utils/httpRequest";
import Button from "../../components/Button";
import registerSchema from "../../schema/registerSchema"

import useLoading from "../../hooks/useLoading";
import Form,{ TextInput } from "../../components/Forms";

export default function RegisterForm() {



  const { setLoading } = useLoading();
  // Move this before emailValue
  const navigate = useNavigate();

  const onSubmit = async (userInfo) => {
    setLoading(true)
    console.log(userInfo);
    const data = await authServices.register(userInfo);

    if (data.status === "success") {
      httpRequest.setToken(data.access_token);
      navigate(config.routes.verifyPhone);
    }
  };


  return (
    <div className={styles.container}>
    <h1>Register</h1>
    <Form
      schema={registerSchema}
      formProps={{ mode: "onChange" }}
      onSubmit={onSubmit}
    >
       <p>First Name</p>
      <TextInput name="firstName" placeholder="First name..."  className={styles.firstName}/>
      <p>Last Name</p>
      <TextInput name="lastName" placeholder="Last name..." />
      <p>Email</p>
      <TextInput name="email" placeholder="Email..." />

      <p>Password</p>
      <TextInput name="password" placeholder="Password..."  type="password" />
      <p>Confirm Password</p>
      <TextInput
        name="password_confirmation"
        placeholder="Password confirmation..."
        type="password"
      />
      <Button  className={styles.buttonRegster}   size="lg" type="submit">Register</Button>
    </Form>

   
  </div>
  );
}
