import React from "react";
import successIcon from "../../../assets/images/success-icon.png";
import styles from './index.module.scss'

const index = () => {
  return (
    <div className={styles.successPage}>
<div className={styles.successMessage}>
      <img src={successIcon} alt="successIcon" data-testid="successIcon" />
      <p> Thank You for Registering. </p>
    </div>
    </div>
    
  );
};

export default index;
