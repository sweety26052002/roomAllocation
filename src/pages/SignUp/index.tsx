
import mahatria from "../../assets/images/mahatriaimage2x.png"
import { FunctionComponent } from "react";
import Header from "../../common/components/Header"
import WelcomeMessage from "../../components/WelcomeMessage";
import SignUpForm from "../../components/SignUpForm";
import styles from "../SignUp/index.module.scss";

const SignUpHill: FunctionComponent = () => {
  return (
    <div className={styles.signUpHill}>
      <img
        className={styles.mahatriaImageIcon}
        alt=""
        src={mahatria}
      />
      <Header />
      <section className={styles.signUpHillInner}>
        <div className={styles.frameParent}>
          <WelcomeMessage />
          <SignUpForm />
        </div>
      </section>
    </div>
  );
};

export default SignUpHill;
