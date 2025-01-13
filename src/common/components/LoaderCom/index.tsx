import React from "react";
import styles from "./index.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
