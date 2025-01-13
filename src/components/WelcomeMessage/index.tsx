import { FunctionComponent } from "react";
import styles from "../WelcomeMessage/index.module.scss"

const WelcomeMessage: FunctionComponent = () => {
  return (
    <div className={styles.welcomeToMahatriasHdbProgWrapper}>
      <h1 className={styles.welcomeToMahatriasContainer}>
        <span>{`Welcome to `}</span>
        <span className={styles.mahatrias}>Mahatrias</span>
        <span> HDB program, an invite-only experience.</span>
      </h1>
    </div>
  );
};

export default WelcomeMessage;
