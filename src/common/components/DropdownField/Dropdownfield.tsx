import React from 'react';

interface DropdownFieldProps {
  label: string;
  options: { value: string; label: string }[];
  name: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  className?: string;           
  labelClassName?: string;      
  selectClassName?: string; 
}    

export const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  options,
  name,
  onChange,
  defaultValue,
  className,
  labelClassName,
  selectClassName,
}) => (
  <div className={className}>
    <label htmlFor={name} className={labelClassName}>
      {label}
    </label>
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={e => onChange(e.target.value)}
      className={selectClassName}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
