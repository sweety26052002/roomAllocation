import React from 'react';

interface CommonTextFieldProps {
    placeholder: string;
    name: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonTextField: React.FC<CommonTextFieldProps> = ({ placeholder, name, ...props }) => {
    return (
        <input
            name={name}
            placeholder={placeholder}
            {...props}
            className={`common-text-field ${props.className}`}
            onChange={props.onChange}
        />
    );
};

export default CommonTextField;