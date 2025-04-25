import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./Component/VerifyCard.module.scss";
import Button from "@/components/Button";
import { NavLink } from "react-router-dom";
import config from "@/config";

const steps = [" ", " ", " "];

const VerifyPhoneForm = () => {
  const [activeStep] = useState(1);
  const [frontImg, setFrontImg] = useState(null);
  const [frontPreview, setFrontPreview] = useState("");
  const [backImg, setBackImg] = useState(null);
  const [backPreview, setBackPreview] = useState("");

  useEffect(() => {
    return () => {
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      if (backPreview) URL.revokeObjectURL(backPreview);
    };
  }, [frontPreview, backPreview]);

  const handleImgChange = (e, side) => {
    const file = e.target.files[0];
    if (!file) return;

    const blob = URL.createObjectURL(file);
    if (side === "front") {
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      setFrontPreview(blob);
      setFrontImg(file);
    } else {
      if (backPreview) URL.revokeObjectURL(backPreview);
      setBackPreview(blob);
      setBackImg(file);
    }
  };

  return (
    <div className={styles.container}>
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

      <h2>Verify driver identity</h2>
      <p>
        Please upload a photo of your ID card & driver license to confirm your
        identity
      </p>

      <h4>Upload driver’s license</h4>
      <div className={styles.grid}>
        {/* Front side */}
        <p>Front Side</p>
        <label className={styles.uploadBox}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImgChange(e, "front")}
            hidden
          />
          {frontPreview ? (
            <img
              src={frontPreview}
              alt="Front Preview"
              className={styles.previewImg}
            />
          ) : (
            <div className={styles.placeholder}>
              <FontAwesomeIcon icon={faCamera} className={styles.cameraIcon} />
            </div>
          )}
        </label>

        {/* Back side */}
        <p>Back Side</p>
        <label className={styles.uploadBox}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImgChange(e, "back")}
            hidden
          />
          {backPreview ? (
            <img
              src={backPreview}
              alt="Back Preview"
              className={styles.previewImg}
            />
          ) : (
            <div className={styles.placeholder}>
              <FontAwesomeIcon icon={faCamera} className={styles.cameraIcon} />
            </div>
          )}
        </label>
        <Button variant="contained" className={styles.submit}>
          <NavLink to={config.routes.driverForm}>Verify ID Card</NavLink>
        </Button>
      </div>
    </div>
  );
};

export default VerifyPhoneForm;
