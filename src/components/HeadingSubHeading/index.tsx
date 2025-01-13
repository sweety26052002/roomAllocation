import React from "react";
import styles from "./index.module.scss";
import { updateNumberFormat } from "../../utils/functions";

interface HeadingSubheadingProps {
  subheading: string;
  mainHeading: string;
  additionalClassName?: string;
  handleClick?: () => void;
  isActive?: boolean; 
}

const HeadingSubHeading: React.FC<HeadingSubheadingProps> = ({
  subheading,
  mainHeading,
  additionalClassName,
  handleClick,
  isActive = false, // Default to false
}) => {
  return (
    <div
      onClick={handleClick}
      className={`${styles.headingSubheadingContainer} ${additionalClassName} ${
        isActive ? styles.active : ""
      }`}
    >
      <h5 className={styles.headingText}>{subheading}</h5>
      <h3 className={styles.subHeadingText}>{updateNumberFormat(mainHeading)}</h3>
    </div>
  );
};

export default HeadingSubHeading;
