// NameInput.tsx
import React from 'react';
import styles from './index.module.scss'; // Import the styles from a CSS module

interface NameInputProps {
  register: any; // Replace with the correct type from react-hook-form
}

const NameInput: React.FC<NameInputProps> = ({ register }) => (
  <div className={styles.nameInput} data-testid="nameInput">
    <select
      defaultValue="Miss"
      className={styles.nameTitle}
      data-testid="nameTitle"
      {...register("title", { required: true })}
    >
      <option value="Mr">Mr</option>
      <option value="Mrs">Mrs</option>
      <option value="Miss">Miss</option>
    </select>
    <input
      type="text"
      className={styles.nameInputField}
      data-testid="nameInputField"
      {...register("fullName", {
        required: true,
        minLength: 3,
      })}
    />
  </div>
);

export default NameInput;