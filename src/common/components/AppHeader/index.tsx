import mahatriaIcon from "../../../assets/images/hamburger-menu.svg";
import mahatriaLogo from "../../../assets/images/mahatria-logo.svg";
import profileIcon from "../../../assets/images/mahatria.svg";
import styles from "../AppHeader/index.module.scss";
// import dropdown from "../../../assets/images/dropdown.svg"
import { Outlet, useNavigate } from "react-router-dom";
import { STRINGS } from "../../constants/stringConstants";
import { getItemInLocalStorage } from "../../../services/localStorage";
import { Tooltip } from '@mui/material';
import signoutIcon from '../../../assets/images/sign-out.svg';
interface IProps {
  variant: string;
}

const AppHeader = (props: IProps) => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const signOut = () => {
    navigate("/");
    localStorage.clear();
  };
  // const adminName = () => {
  //   return (
  //     location.includes('/room-allocation') 
  //   );
  // };

  const logoutButton = () => {
    return (
      location.includes('/room-allocation') 
    );
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.appIconSection}>
          <img src={mahatriaIcon} alt="mahatria" />
          <div className={styles.appTitle}>{STRINGS.APP_TITLE}</div>
        </div>
        <div className={styles.mahatriaDots}>
        <img src={mahatriaLogo} alt="logo" />
        </div>
        {/* {props.variant == "primary" ? ()} */}
        <div className={styles.profileSection}>
          {/* {adminName() && window?.innerWidth >= 1024 && ( */}
          {props.variant == "primary" ? (
          <>
          <img
            src={profileIcon}
            alt="profile"
            className={styles.profileIcon}
          />
            <div className={styles.containerNames}>
              {getItemInLocalStorage('userName')?.length > 15 ? (
                <Tooltip
                  title={getItemInLocalStorage('userName') || ''}
                  arrow
                >
                  <p className={styles.userNameEcllipse}>
                    {getItemInLocalStorage('userName') || ''}
                  </p>
                </Tooltip>
              ) : (
                <p className={styles.userName}>
                  {getItemInLocalStorage('userName') || ''}
                </p>
              )}
            </div>
            {logoutButton() && (
                <>
                  <Tooltip title="sign out" arrow>
                    <div className={styles.logout} onClick={signOut}>
                      <img src={signoutIcon} alt="sign out" loading="lazy" />
                    </div>
                  </Tooltip>
                  {/* </div> */}
                </>
              )}
        
          </>
                 ) : null}


        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AppHeader;
