
import { programs } from "../../constants/constants";
import styles from './index.module.scss';
import { mahatria } from "../../constants/constants";
import React from "react";
import images from "../../constants/images";
import { useNavigate } from "react-router-dom";
interface footerContent {
  images: string;
  value: string;
  flag: boolean;
}
const FooterDetails: React.FC<footerContent> = ({ images, value, flag }) => {
  return (
    <div className={styles.footerElement}>
      <img src={images} alt="phone" className={styles.footerImage} />
      <div className={flag ? styles.footerValue : styles.footerValueColor}>{value}</div>
    </div>
  )


}


const Programs = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/registrationform')
  }
  return (
    <div className={styles.programs}>
      <div className={styles.programsContainer}>
        <div className={styles.welcomeText}><div>Welcome to</div>
          <div className={styles.mahatriaText}>{mahatria}</div>
          <div>HDB program, an invite-only experience</div></div>
        <div className={styles.programContent}>HDB is an unparalleled 8-day residential spiritual retreat with Mahatria. Thousands of seekers who have had the privilege to experience HDB, consider it a re-birth in all dimensions of human life - psychological, emotional, and spiritual.</div>
        <div className={styles.availableProgramsText}>Here are the available program details</div>
        <div className={styles.app}>
          <div className={styles.tableContainer}>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div className={styles.tableRow}>
                  <div className={styles.programCell}>Program Name</div>
                  <div className={styles.programCell}>Timeline</div>
                  <div className={styles.scheduleCell}>Schedule</div>
                  <div className={styles.investmentCell}>Investment (Inc. Taxes)</div>
                </div>
              </div>
              <div className={styles.tableBody}>
                {programs.map((program, index) => (
                  <div className={styles.tableRows} key={index}>
                    <div className={styles.programCell}>{program.program_name}</div>
                    <div className={styles.programCell}>{program.timeline}</div>
                    <div className={styles.scheduleCell}>{program.schedule}</div>
                    <div className={styles.investmentCell}>{program.investment}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.location}>
          <div className={styles.address}>
            <img src={images.map_pin} alt="mapPin" />
            <div className={styles.addressText}>Venue : Leonia Resort, Hyderabad, Telangana</div>
            <div className={styles.divider}></div>
            <div className={styles.viewText}>View On map</div>
          </div>
          <img src={images.registerButton} alt="register" onClick={handleRegister} />
        </div>
      </div>

      <footer className={styles.organizeFooter}>
        <div className={styles.footerDiv}>
          <FooterDetails images={images.phone} value="(+91) 9841670000" flag={true} />
          <div className={styles.divider}></div>
          <FooterDetails images={images.email} value=" hdb@infinitheism.com" flag={true} />
          <div className={styles.divider}></div>
          <FooterDetails images={images.details} value="Infinitheism Details" flag={false} />
        </div>
      </footer>
    </div>
  );
};

export default Programs;
