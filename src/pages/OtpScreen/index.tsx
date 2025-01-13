import React, {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
  invalidOtp: boolean;
};

const OtpScreen: React.FC<InputProps> = ({
  length = 6,
  onComplete,
  invalidOtp,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

  
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const isComplete = newOtp.every((digit) => digit !== "");
    console.log(isComplete, "new otp");
    
    if (isComplete) {
      onComplete(newOtp.join(""));
    } else {
      // onComplete("");
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, length);
    const newOtp = Array(length).fill("");

    for (let i = 0; i < length; i++) {
      if (pasteData[i]) {
        newOtp[i] = pasteData[i];
      } else {
        break;
      }
    }
    setOtp(newOtp);

    onComplete(newOtp.join(""));

    // Focus the first empty input after paste
    const firstEmptyIndex = newOtp.indexOf("");
    if (firstEmptyIndex !== -1) {
      inputRefs.current[firstEmptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }
  };
  useEffect(() => {
    if (invalidOtp) {
      setOtp(Array(length).fill(""));
      inputRefs.current[0]?.focus();
    }
  }, [invalidOtp, length]);
  return (
    <div className={styles.otpContainer}>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          ref={(input) => inputRefs.current[index] = input}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={styles.otpInput}
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OtpScreen;
