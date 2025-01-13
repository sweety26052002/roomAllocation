import { FunctionComponent } from "react";
import SignUpSection1 from "../SignUpSection1/index";
import SignUpSection2 from "../SignUpSection2/index";
import styles from "../SignUpForm/index.module.scss"

const SignUpForm: FunctionComponent = () => {
  return (
    <div className={styles.cards}>
      <SignUpSection1 />
      <SignUpSection2 />
    </div>
  );
};

export default SignUpForm;
