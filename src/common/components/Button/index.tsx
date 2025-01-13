import React from 'react';
import styles from './index.module.scss';
export interface iButtonProps {
  onClick?: () => void;
  children?: React.ReactNode | string;
  buttonTextClassName?: string;
  buttonClassName?: string;
  type?: 'button' | 'submit' | 'reset';
  disable?: boolean;
}

 const Button: React.FC<iButtonProps> = ({
  onClick,
  children,
  buttonClassName,
  buttonTextClassName,
  type,
  disable
}) => {
  return (
    //use "buttonClassName" to add custom class to button and "buttonTextClassName" to add custom class to button text in respective component
    //children is the text inside the button and onclick is the function to be called on button click
    <button
      // className={`${buttonClassName} ${styles.button}` || ''}
      className={`${buttonClassName} ${disable === true ? styles.disableButton : styles.button}`}
      onClick={onClick}
      type={type || 'button'}
      disabled={disable}
    >
      <span className={buttonTextClassName || ''}>{children}</span>
    </button>
  );
};

export default Button;