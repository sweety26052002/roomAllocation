import { FunctionComponent } from "react";
import styles from "../SignUpSection2/index.module.scss";
import icon8 from "../../assets/images/icons8.svg"
import { useNavigate } from "react-router-dom";

const SignUpSection2: FunctionComponent = () => {
  const navigate = useNavigate();
  const navigateToForm = () => {
    navigate("/registrationform");
  };
  return (
    <div className={styles.signUpSection2}>
      <div className={styles.textIcon}>
        <img className={styles.icons3} alt="" src={icon8} />
        <div className={styles.weWillSendContainer}>
          <span>{`We will send you a `}</span>
          <span className={styles.digit}>4 digit</span>
          <span> verification code</span>
        </div>
      </div>
      <button className={styles.button} onClick={navigateToForm}>
        <div className={styles.sendOtp}>send OTP</div>
      </button>
    </div>
  );
};

export default SignUpSection2;
