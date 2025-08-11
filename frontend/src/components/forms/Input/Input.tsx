import React from 'react';

import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} >
        {label}
      </label>
      <input
        {...props}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
