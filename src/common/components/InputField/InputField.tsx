import React from 'react';

interface InputFieldProps {
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  className?: string;       
  inputClassName?: string;  
  labelClassName?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  onChange,
  defaultValue,
className,
 inputClassName,
  labelClassName,
  placeholder,
  disabled
}) => (
 <div className={className}>
    <label htmlFor={name} className={labelClassName}>{label}</label>
    <input
    placeholder={placeholder}
      type={type}
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
      onChange={e => onChange(e.target.value)}
      className={inputClassName}
    />
  </div>
);
