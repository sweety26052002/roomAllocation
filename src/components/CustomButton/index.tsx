/* eslint-disable react/prop-types */
import styles from "./index.module.scss";

interface CustomButtonProps {
  text: string;
  variant?: "filled" | "outlined";
  handleClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  variant = "filled",
  handleClick,
}) => {
  const buttonClass = `${variant === "filled" ? styles.filled : variant === "outlined" ? styles.outlined : ""}`;

  return (
    <button onClick={handleClick} className={buttonClass}>
      {text}
    </button>
  );
};

export default CustomButton;
