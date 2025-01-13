import headericon from "../../../assets/images/image2x.png"
import user2 from "../../../assets/images/user2.png"
import icon from "../../../assets/images/icons.svg"
import { FunctionComponent } from "react";
import styles from "./index.module.scss";

const Header: FunctionComponent = () => {
  return (
    <header className={styles.topNav}>
      <div className={styles.topNavDropdown}>
        <img
          className={styles.imageIcon}
          loading="lazy"
          alt=""
          src={headericon}
        />
        <div className={styles.hdbWrapper}>
          <a className={styles.hdb}>HDB</a>
        </div>
      </div>
      <div className={styles.rahatriaDotsWrapper}>
        <div className={styles.rahatriaDots}>
          <div className={styles.rahatriaDotsChild} />
          <div className={styles.rahatriaDotsItem} />
          <div className={styles.rahatriaDotsInner} />
        </div>
      </div>
      <div className={styles.topNavDropdown1}>
        <div className={styles.imagePlaceholder}>
          <img
            className={styles.centreFinal3}
            alt=""
            src={user2}
          />
        </div>
        <div className={styles.dropdown}>
          <div className={styles.myProfile}>My Profile</div>
          <img className={styles.icons} alt="" src={icon} />
        </div>
      </div>
    </header>
  );
};

export default Header;

