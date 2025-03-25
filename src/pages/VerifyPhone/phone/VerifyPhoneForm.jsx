

import  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import styles from './VerifyPhoneForm.module.scss'
import {NavLink} from "react-router-dom"
import config from "../../../config";
const steps = [' ', ' ', ' '];

const VerifyPhoneForm = () => {
  const [activeStep] = useState(0);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; 

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`)?.focus();
    } else if (!value && index > 0) {
      document.getElementById(`code-input-${index - 1}`)?.focus();
    }
  };

  const handleResend = () => {
    setResendTimer(30);
    console.log('Đang gửi lại mã...');
  };

  const handleSubmit = () => {
    const enteredCode = code.join('');
    if (enteredCode === '123456') {
      alert('Xác minh thành công!');
    } else {
      alert('Mã xác nhận không hợp lệ. Vui lòng thử lại.');
    }
  };

  return (
    <div className={`${styles.container}`}>
      <p>
        Step {activeStep + 1} of {steps.length}
      </p>

      <Box>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((_, index) => (
            <Step key={index}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div >
        <h2>Verify email number</h2>
        <p>
          Enter the 6-digit code sent to <span>email</span>
        </p>

        <div className={`${styles.input}`}>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
            />
          ))}
        </div>

        <div className={`${styles.sendMessage}`}>
          {resendTimer > 0 ? (
            <p >
              Gửi lại mã sau <span >{resendTimer}</span> giây
            </p>
          ) : (
            <button onClick={handleResend} >
              Gửi lại mã
            </button>
          )}
        </div>

        <Button variant="contained"  className={`${styles.submit}`} fullWidth onClick={handleSubmit}>
            <NavLink to={config.routes.verifyPhone}>Verify Code</NavLink>
        </Button>

        <footer >
          <NavLink>Need help? Contact Support</NavLink>
        </footer>
      </div>
    </div>
  );
};

export default VerifyPhoneForm;
