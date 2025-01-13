/* eslint-disable react/prop-types */
import { Checkbox } from "@mui/material";
import { ChangeEvent } from "react";
import styles from "./index.module.scss";
interface CheckboxWithTextProps {
  text: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxWithText: React.FC<CheckboxWithTextProps> = ({
  text,
  checked,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <Checkbox
        sx={{
          padding: "0px !important",
        }}
        checked={checked}
        onChange={onChange}
        inputProps={{ "aria-label": `Checkbox for ${text}` }}
        color="default"
      />
      <p className={styles.checkboxText}>{text}</p>
    </div>
  );
};

export default CheckboxWithText;
