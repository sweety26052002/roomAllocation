/* eslint-disable react/prop-types */
import { Checkbox } from "@mui/material";
import styles from "./index.module.scss";
import dragIcon from "../../assets/images/drag-icon.svg";
import { useState } from "react";
import defaultImage from "../../assets/images/defulat-profile.svg";
interface PairedSeekerCardProps {
  seeker1Profile?: string;
  seeker1Name?: string;
  seeker1Gender?: string;
  seeker1Age?: number;
  seeker1City?: string;
  seeker2Profile?: string;
  seeker2Name?: string;
  seeker2Gender?: string;
  seeker2Age?: number;
  seeker2City?: string;
  isChecked: boolean;
  onCheckboxClick: () => void;
}
const PairedSeekerCard: React.FC<PairedSeekerCardProps> = ({
  seeker1Profile,
  seeker1Age,
  seeker1City,
  seeker1Gender,
  seeker1Name,
  seeker2Age,
  seeker2City,
  seeker2Gender,
  seeker2Name,
  seeker2Profile,
  isChecked,
  onCheckboxClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const handleMouseEnter = () => {
    if (!isChecked) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isChecked) setIsHovered(false);
  };


  // const handleCheckboxClick = () => {
  //   setIsChecked((prevChecked) => !prevChecked);
  // };
  return (
    <div
      className={styles.cardContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.dragIconContainer}>
        <img src={dragIcon} alt="drag" className={styles.dragIcon} />
      </div>
      <div className={styles.checkboxCardContainer}>
        <div
          className={styles.checkboxContainer}
          style={{
            visibility: isHovered || isChecked ? "visible" : "hidden",
            opacity: isHovered || isChecked ? 1 : 0,
            transition: "visibility 0.3s ease-in-out, opacity 0.3s ease-in-out",
            backgroundColor: isHovered || isChecked ? "#ffffff" : "transparent",
            borderTopLeftRadius: isHovered || isChecked ? "2px" : "0px",
            borderBottomLeftRadius: isHovered || isChecked ? "2px" : "0px",
            border: isHovered || isChecked ? "0.5px solid #bfbfbf" : "none",
          }}
        >
          <Checkbox
            sx={{
              width: "25px",
              height: "41px",
              "& .MuiSvgIcon-root": {
                width: "16px",
                height: "16px",
              },
            }}
            color="default"
            checked={isChecked}
            onClick={onCheckboxClick}
          />
        </div>
        <div
          style={{
            borderRadius: isHovered || isChecked ? "0px" : "2px",
          }}
          className={styles.container}
        >
          <div className={styles.occupantContainer}>
            <div className={styles.profileImage}>
              <img
                src={seeker1Profile.length > 0 ? seeker1Profile : defaultImage}
                alt="profile"
              />
            </div>
            <div className={styles.occupantDetailsContainer}>
              <p className={styles.occupantDetail}>{seeker1Name}</p>
              <div className={styles.occupantDetails}>
                <p className={styles.occupantDetail}>{seeker1Gender}</p>
                <p className={styles.line}></p>
                <p className={styles.occupantDetail}>{seeker1Age} Yrs</p>
                <p className={styles.line}></p>
                <p className={styles.occupantDetail}>{seeker1City}</p>
              </div>
            </div>
          </div>
          <div className={styles.occupantSecondContainer}>
            <div className={styles.profileImage}>
              <img
                src={seeker2Profile.length > 0 ? seeker2Profile : defaultImage}
                alt="profile"
              />
            </div>
            <div className={styles.occupantDetailsContainer}>
              <p className={styles.occupantDetail}>{seeker2Name}</p>
              <div className={styles.occupantDetails}>
                <p className={styles.occupantDetail}>{seeker2Gender}</p>
                <p className={styles.line}></p>
                <p className={styles.occupantDetail}>{seeker2Age} Yrs</p>
                <p className={styles.line}></p>
                <p className={styles.occupantDetail}>{seeker2City}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PairedSeekerCard;
