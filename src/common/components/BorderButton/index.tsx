import React from 'react';
import styles from './index.module.scss';

interface BorderButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

const BorderButton: React.FC<BorderButtonProps> = ({ text, onClick }) => {
    return (
        <div onClick={onClick} className={styles.clearButton}>
            {text}
        </div>
    );
};

export default BorderButton;