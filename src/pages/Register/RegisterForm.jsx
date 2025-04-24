import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import httpRequest from "@/utils/httpRequest";
import authServices from "@/services/authServices";
import useLoading from "@/hooks/useLoading";
import Button from "@/components/Button";
import Form, { TextInput } from "@/components/Forms";
import config from "@/config";
import registerSchema from "@/schema/registerSchema";
import styles from "./RegisterForm.module.scss";

const steps = [" ", " ", " "];
export default function RegisterForm() {
  const [activeStep] = useState(0);

  const { setLoading } = useLoading();
  // Move this before emailValue
  const navigate = useNavigate();

  const onSubmit = async (userInfo) => {
    setLoading(true);
    console.log(userInfo);
    const data = await authServices.register(userInfo);

    if (data.status === "success") {
      httpRequest.setToken(data.access_token);
      navigate(config.routes.verifyPhone);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.activeStep}>
        <p>
          Step {activeStep + 1} of {steps.length}
        </p>
        <Box>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((_, index) => (
              <Step key={index}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <h1>Register</h1>
      <Form
        schema={registerSchema}
        formProps={{ mode: "onChange" }}
        onSubmit={onSubmit}
        className={styles.schema}
      >
        <p>First Name</p>
        <TextInput
          name="firstName"
          placeholder="First name..."
          className={styles.firstName}
        />

        <p>Username</p>
        <p>Last Name</p>
        <TextInput name="lastName" placeholder="Last name..." />
        <p>Email</p>
        <TextInput name="email" placeholder="Email..." />

        <p>Password</p>
        <TextInput name="password" placeholder="Password..." type="password" />
        <p>Confirm Password</p>
        <TextInput
          name="password_confirmation"
          placeholder="Password confirmation..."
          type="password"
        />
        <Button className={styles.buttonRegster} size="lg" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
