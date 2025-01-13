import { FunctionComponent, useState } from "react";
import styles from "./index.module.scss";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Controller, useForm } from "react-hook-form";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import OtpScreen from "../OtpScreen/index";
import editIconImage from "../../assets/images/edit-icon-image.svg";
import cloudFadeEffectImage from "../../assets/images/cloud-fade-effect@2x.png";
// import { set } from "lodash";

const SignIn: FunctionComponent = () => {
  const navigation = useNavigate();
  const { control } = useForm();
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [invalidOtp, setInvalidOtp] = useState<boolean>(false);
  const [otpEntered, setOtpEntered] = useState<boolean>(false);
  const [phNum, setPhNum] = useState<string>("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [finalOtp, setFinalOtp] = useState<string>("");

  const sendOTP = async () => {
    try {
      if (!phNum) {
        alert("Please enter a valid phone number.");
        return;
      }
      if (!auth) {
        console.error("Firebase auth not initialized");
        return;
      }
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phNum, recaptcha);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setOtpEntered(false);
      localStorage.setItem("phoneNumber", phNum);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async (pin: string) => {
    try {
      setFinalOtp(pin);
      console.log(finalOtp);
      
      const result = await confirmationResult.confirm(pin);
      console.log("OTP verified successfully:", result);
      navigation("/edit-profile");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setInvalidOtp(true);
    }
  };

  // Function to handle editing phone number
  const handleEdit = () => {
    setInvalidOtp(false);
    setOtpEntered(true);
    setOtpSent(false);
    setPhNum("");
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapperCloudFadeEffect}>
        <img
          className={styles.cloudFadeEffect}
          alt=""
          src={cloudFadeEffectImage}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.cards}>
          <div className={styles.signUpSection1}>
            <div className={styles.signUpContainer}>
              <div className={styles.signUp}>Sign up / Login</div>
              <div className={styles.howWouldYou}>
                How would you like to receive an OTP?
              </div>
            </div>
            <div className={styles.tabsForms}>
              <div className={styles.tabs}>
                <button className={styles.mobileNumber}>Mobile Number</button>
                <div className={styles.email}>
                  <div className={styles.email1}>Email</div>
                </div>
              </div>
              <div className={styles.form}>
                {!otpSent ? (
                  <>
                    <div className={styles.mobile}>Mobile</div>
                    <div className={styles.formContainer}>
                      <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Phone number is required",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message:
                              "Invalid phone number, must be 10 digits and start with 6-9",
                          },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <div className={styles.phoneInputContainer}>
                            <PhoneInput
                              {...field}
                              international
                              defaultCountry="IN"
                              placeholder="Enter phone number"
                              className={styles.phoneInput}
                              data-testid="phoneInput"
                              value={phNum}
                              onChange={(value?: string) =>
                                setPhNum(value || "")
                              }
                            />
                            {error && (
                              <span className={styles.error}>
                                {error.message}
                              </span>
                            )}
                          </div>
                        )}
                      />
                    </div>
                    <div id="recaptcha"></div>
                    <div className={styles.signUpSection2}>
                      <div className={styles.textIcon}>
                        <div className={styles.weWillSend}>
                          We will send you a 6 digit verification code
                        </div>
                      </div>
                    </div>
                    <div className={styles.buttonWrapper}>
                      <button className={styles.otpButton} onClick={sendOTP}>
                        Send OTP
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.otpScreen}>
                    <div className={styles.signUpTop}>
                      <div className={styles.edit}>
                        <div className={styles.mobileHeading}>
                          Enter the OTP sent to {phNum}
                        </div>
                        <button
                          className={styles.editButton}
                          onClick={handleEdit}
                        >
                          <img
                            className={styles.editIcon}
                            src={editIconImage}
                            alt="Edit Icon"
                            loading="lazy"
                          />
                        </button>
                      </div>
                      <div className={styles.mobileLabel}>
                        <OtpScreen
                          length={6}
                          onComplete={verifyOTP}
                          invalidOtp={invalidOtp}
                        />
                      </div>
                    </div>
                    <div className={styles.signUpBottom}>
                      <div className={styles.otpText}>
                        {invalidOtp
                          ? `The OTP is invalid! Resend (30s)`
                          : `Didn't receive OTP? Resend (30s)`}
                      </div>
                      <button
                        className={`${styles.resendOtpButton} ${
                          otpEntered
                            ? styles.resendOtpButtonEnabled
                            : styles.resendOtpButtonDisabled
                        }`}
                        onClick={sendOTP}
                        disabled={invalidOtp}
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
