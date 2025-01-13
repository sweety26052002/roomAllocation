// /* eslint-disable react/prop-types */
// import { Avatar } from "@mui/material";
// import styles from "./index.module.scss";
// import defaultProfileIcon from "../../assets/images/defulat-profile.svg";
// export interface SeekerCardProps {
//   profile: string | null;
//   gender: string;
//   name: string;
//   age: number;
//   city: string;
// }

// const SeekerCard: React.FC<SeekerCardProps> = ({
//   profile,
//   gender,
//   name,
//   age,
//   city,
// }) => {
//   return (
//     <div className={styles.container}>
//       <Avatar
//         alt="Remy Sharp"
//         src={profile.length > 0 ? profile : defaultProfileIcon}
//         sx={{ width: 56, height: 56, border: "0.57px solid #00000014" }}
//       />
//       <div className={styles.seekerContainer}>
//         <p className={styles.seekerName}>{name}</p>
//         <div className={styles.seekerDetails}>
//           <p className={styles.gender}>{gender}</p>
//           <p className={styles.age}>{age} yrs</p>
//           <p className={styles.city}>{city}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SeekerCard;

/* eslint-disable react/prop-types */
import { Avatar, Tooltip } from "@mui/material";
import styles from "./index.module.scss";
import defaultProfileIcon from "../../assets/images/defulat-profile.svg";
import menuIcon from "../../assets/images/3-dot-menu.svg";
import pairedIcon from "../../assets/images/pairedIcon.svg";
import unpairIcon from "../../assets/images/UnpairIcon.svg";
import { unpairYetToAssignSeekers } from "../Preferences/AllocateRooms/allocateRoomsUtils";
import React from "react";

interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  id: string;
  name: string;
  age: number;
  city: string;
  profile: string | null;
  gender: string;
}
export interface SeekerCardProps {
  profile: string | null;
  gender: string;
  name: string;
  age: number;
  city: string;
  selectedSeekerIds?: Array<string>;
  userId?: string;
  pairCodes?: Array<number>;
  index: number;
  userPairCode: number;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckReload: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSeekers: React.Dispatch<React.SetStateAction<User[]>>;
}

const SeekerCard: React.FC<SeekerCardProps> = ({
  profile,
  gender,
  name,
  age,
  city,
  selectedSeekerIds,
  userId,
  pairCodes,
  index,
  userPairCode,
  setLoader,
  setCheckReload,
  setSelectedSeekers,
}) => {

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
  // console.log("selectedSeeker or not", selectedSeekerIds?.includes(userId));
  return (
    <>
      {name ? (
        <div
          className={
            `${styles.container}` +
            (selectedSeekerIds?.includes(userId)
              ? ` ${styles.occupantDetailsColor}`
              : "") +
            (pairCodes?.includes(userPairCode) && index % 2 === 0
              ? ` ${styles.marginBottom}`
              : "")
          }
        >
          <img src={menuIcon} alt="menu" className={styles.menuIcon} />
          <div className={styles.profileContainer}>
            <Avatar
              alt="Remy Sharp"
              src={profile?.length > 0 ? profile : defaultProfileIcon}
              sx={{ width: 48, height: 48, border: "1px solid #DDDDDD" }}
            />
            <div className={styles.seekerContainer}>
              {/* {name && name.length > 21 ? ( */}
              <Tooltip title={name} ref={tipRef}
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
            }} className={styles.tooltip}>
            <p className={styles.seekerName}>{name}</p>
          </Tooltip>
              {/* ) : (
            <p className={styles.seekerName}>{name}</p>
           
           }) */}
              <div className={styles.seekerDetails}>
                <p className={styles.gender}>{gender}</p>
                <p className={`${styles.age} ${city ? styles.ageBorder : ""}`}>
                  {age} yrs
                </p>
                {/* {city && city.length >= 9 ? ( */}
                <Tooltip title={city} ref={tipRef}
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
              className={styles.tooltip}>
              <p className={styles.city}>{city}</p>
            </Tooltip>
                {/* ) : (
              <p className={styles.city}>{city}</p>
             )
            } */}
              </div>
            </div>
          </div>
          {pairCodes?.includes(userPairCode) && index % 2 === 0 && (
            <>
              {selectedSeekerIds?.includes(userId) ? (
                <div className={styles.pairedUnallocateUnpairIcon}>
                  <img
                    src={unpairIcon}
                    alt="unpair icon"
                    className={styles.unpairIcon}
                    onClick={() =>
                      unpairYetToAssignSeekers(
                        selectedSeekerIds,
                        setLoader,
                        setCheckReload,
                        setSelectedSeekers,
                      )
                    }
                  />
                </div>
              ) : (
                <div className={styles.pairedUnallocateIcon}>
                  <img src={pairedIcon} alt="paired icon" />
                </div>
              )}
            </>
          )}
        </div>
      ) : null}
    </>
  );
};
export default SeekerCard;
