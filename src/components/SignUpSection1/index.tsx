import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import styles from "../SignUpSection1/index.module.scss";
import icon4 from "../../assets/images/icons4.svg"
import flagpack from "../../assets/images/flagpack.svg"
import icon from "../../assets/images/icons.svg"
import line from "../../assets/images/line.svg"
const SignUpSection1: FunctionComponent = () => {
  return (
    <div className={styles.signUpSection1}>
      <div className={styles.signUpContainer}>
        <h1 className={styles.signUp}>Sign up / Login</h1>
        <p className={styles.howWouldYou}>
          How would you like to receive an OTP?
        </p>
        <img className={styles.icons1} alt="" src={icon4} />
      </div>
      <div className={styles.tabsAndForm}>
        <div className={styles.tabs}>
          <Button
            className={styles.mobileNumber}
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#051b46",
              fontSize: 14,
              background: "#f3f9ff",
              border: "#1859b4 solid 1px",
              borderRadius: "4px 0px 0px 4px",
              "&:hover": { background: "#f3f9ff" },
              height: 40,
            }}
          >
            Mobile Number
          </Button>
          <div className={styles.email}>
            <div className={styles.email1}>Email</div>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.mobile}>Mobile</div>
          <div className={styles.formContainer}>
            <div className={styles.countryDropdown}>
              <img
                className={styles.flagPackIcon}
                loading="lazy"
                alt=""
                src={flagpack}
              />
              <img
                className={styles.icons2}
                loading="lazy"
                alt=""
                src={icon}
              />
            </div>
            <img
              className={styles.formContainerChild}
              loading="lazy"
              alt=""
              src={line}
            />
            <div className={styles.div}>+91 6647667467</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSection1;
