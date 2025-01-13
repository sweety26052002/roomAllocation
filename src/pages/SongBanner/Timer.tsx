import React from "react";
import styles from "./index.module.scss";

interface TimerProps {
  timeLeft: number;
}

const Timer = ({ timeLeft }: TimerProps) => {
    const radius = 49; // Adjusted for 1px border
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = ((60 - timeLeft) / 60) * circumference;
  
    return (
      <div className={styles.timer}>
        <svg className={styles.svg}>
          <circle
            className={styles.circleBackground}
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth="1"
          />
          <circle
            className={styles.circleProgress}
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth="1"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className={styles.timeContainer}>
          <span className={styles.time}>{timeLeft}</span>
          <span>sec</span>
        </div>
      </div>
    );
  };
  
  export default Timer;