import React, { useEffect, useRef } from "react";
import success from "../../assets/images/success.svg";
import editProfile from "./index.module.scss";

const Overlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      overlayRef.current &&
      !overlayRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={editProfile.overlayMain}>
      <div className={editProfile.overlay} ref={overlayRef}>
        <div className={editProfile.overlayContent}>
          <img src={success} alt="success" className={editProfile.overlayimage} />
          <h2>Congratulations!</h2>
          <p>Your investment has been processed successfully!</p>
          <button onClick={onClose} className={editProfile.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
