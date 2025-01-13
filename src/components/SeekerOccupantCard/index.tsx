import React, { useState } from "react";
import dragIcon from "../../assets/images/drag-icon.svg";
import styles from "./index.module.scss";
import defaultImage from "../../assets/images/defulat-profile.svg";
// import selectedImage from "../../assets/images/checkbox-selection.svg";
import dragIconFilled from "../../assets/images/drag-icon-filled.svg";
import dotsIcon from "../../assets/images/3-dot-menu.svg";
import { Avatar, Tooltip } from "@mui/material";
// import {
//   withStyles
// } from "@material-ui/core/styles";
export interface OccupantDetailsProps {
  occupantProfile: string | null;
  occupantGender: string;
  occupantName: string;
  occupantAge: number;
  occupantCity: string;
  isClicked: boolean;
  onCardClick: () => void;
  seekerPaired: boolean;
}
// const TextOnlyTooltip = withStyles({
//   tooltip: {
//     color: "black",
//     backgroundColor: "transparent",
//     zIndex: -1,
//   }
// })(Tooltip);

const SeekerOccupantCard: React.FC<OccupantDetailsProps> = ({
  occupantProfile,
  occupantGender,
  occupantName,
  occupantAge,
  occupantCity,
  isClicked,
  onCardClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!isClicked) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isClicked) setIsHovered(false);
  };

  // const [click, setClick] = useState(true);

  const tipRef = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  const cb = (entries) => {
    const [entry] = entries;
    entry.isIntersecting ? setInView(true) : setInView(false);
  };

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px"
    };
    const ref = tipRef.current;
    const observer = new IntersectionObserver(cb, options);

    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [tipRef]);

  return (
    <div className={styles.cardContainer} onClick={onCardClick}>
      <div className={styles.dragIconContainer}>
        {isClicked ? (
          <img src={dragIconFilled} alt="drag" className={styles.dragIcon} />
        ) : (
          <img src={dragIcon} alt="drag" className={styles.dragIcon} />
        )}
      </div>
      {/* {isClicked && (
        <div className={styles.selectedImage}>
          <img src={selectedImage} alt="selected" />
        </div>
      )} */}
      <div
        className={`${styles.occupantCard} ${isClicked ? styles.clickedborder : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={
            `${styles.occupantDetails}` +
            (isClicked ? ` ${styles.occupantDetailsColor}` : "")
          }
          style={{
            borderBottomLeftRadius: isHovered || isClicked ? "0px" : "2px",
            borderTopLeftRadius: isHovered || isClicked ? "0px" : "2px",
          }}
        >
          <div className={styles.profileContainer}>
            <div className={styles.profileDots}>
              <img src={dotsIcon} alt="menu" className={styles.menuIcon} />
              <div className={styles.profileContainer}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    occupantProfile.length > 0 ? occupantProfile : defaultImage
                  }
                  sx={{ width: 64, height: 64, border: "1px solid #DDDDDD" }}
                />
              </div>
            </div>
          </div>
          <div className={styles.seekerContainer}>
            {/* {occupantName && occupantName.length > 25 ? ( */}
            <Tooltip title={occupantName} ref={tipRef}
              arrow
              PopperProps={{
                sx: { display: inView ? "block" : "none" },
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -8]
                    }
                  }
                ]
              }}>
              <p className={styles.seekerName}>{occupantName}</p>
            </Tooltip>
            {/* ) : (
              <p className={styles.seekerName}>{occupantName}</p>
            )} */}
            <div className={styles.seekerDetails}>
              <p className={styles.gender}>{occupantGender}</p>
              <div className={styles.separator}></div>
              <p className={styles.age}>{occupantAge} yrs</p>
              {occupantCity && (
                <>
                  <div className={styles.separator}></div>
                  {/* {
                    occupantCity.length > 9 ? ( */}
                  <Tooltip
                    title={occupantCity}
                    ref={tipRef}
                    arrow
                    PopperProps={{
                      sx: { display: inView ? "block" : "none" },
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -8]
                          }
                        }
                      ]
                    }}
                  >
                    <p className={styles.city}>{occupantCity}</p>
                  </Tooltip>
                  {/* ) : (
                      <p className={styles.city}>{occupantCity}</p>
                    )
                 } */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerOccupantCard;
