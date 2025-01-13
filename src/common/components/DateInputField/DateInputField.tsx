import React from 'react';

interface DateInputFieldProps {
  label: string;
  name: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  className?: string;
  classLabel?:string;
  classInput?:string
}

export const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  name,
  onChange,
  defaultValue,
  className,
  classLabel,
  classInput,
}) => (
  <div className={className}>
    <label htmlFor={name} className={classLabel}>{label}</label>
    <input
      type="date"
      name={name}
      defaultValue={defaultValue}
      onChange={e => onChange(e.target.value)}
      className={classInput}
    />
  </div>
);