import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cap from "../../assets/images/Confetti.svg";
import hdbPoster from "../../assets/images/HDB-poster.png";

const ProfileDetails: React.FC = () => {
  const navigate = useNavigate();

  const navigateToInvestment = () => {
    navigate("/make-investment");
  };

  return (
    <div className={styles.mainblock} data-testid="mainBlock">
      <div
        className={styles.congratulationsMessage}
        data-testid="congratulationMessage"
      >
        <img src={cap} alt="congratulation cap" className={styles.image} data-testid="congratulationCap"/>
        <h1 className={styles.greetings} data-testid="greetings">Congratulations Preeti </h1>
      </div>

      <img
        src={hdbPoster}
        alt="Organization Poster"
        className={styles.organizationPoster}
        data-testid="organizationPoster"
      />
      <div className={styles.qoute} data-testid="quoteBlock">
        <p data-testid="quoteMessage">
          Your time to return to the womb of your spiritual rebirth has come.
          In concurrence to your request, <span className={styles.mahatria} data-testid="mahatriaName">Mahatria </span> invites you
          to dissolve <span className={styles.letters} data-testid="higher">H</span>igher 
          <span className={styles.letters} data-testid="deeper">D</span>eep
          <span className={styles.letters} data-testid="beyond">B</span>eyond.
        </p>
        <p className={styles.qouteDate} data-testid="quoteDate">
          You have been offered a seat in <span className={styles.mahatria} data-testid="eventTitle">HDB 1</span> - 30-Nov-2023 to
          08-Dec-2023
        </p>
      </div>
      <div className={styles.venue} data-testid="venue">
        <p>
          Venue : Leonia Resort, Hyderabad, Telangana 
          <span data-testid="mapsLink"><a>Open in Maps</a></span>
        </p>
      </div>

      <div className={styles.contentBlocks} data-testid="contentBlocks">
        <div className={styles.investmentBlock} data-testid="investmentBlock">
          <div className={styles.headerBlock} data-testid="headerBlock">
            <p className={styles.header} data-testid="investmentHeader">Investment</p>
            <a className={styles.amount} data-testid="investmentAmount">INR 2,34,000 Incl. Taxes</a>
          </div>
          <div className={styles.dueDate} data-testid="dueDate">
            Due Date
            <p className={styles.date} data-testid="dueDateValue">20-Nov-2023</p>
          </div>
          <div className={styles.inclusions} data-testid="inclusions">
            Inclusions
            <ul className={styles.list} data-testid="inclusionsList">
              <li data-testid="inclusion1">Travel from/to Hyderabad airport</li>
              <li data-testid="inclusion2">Food</li>
              <li data-testid="inclusion3">Accommodation</li>
            </ul>
          </div>
          <button
            onClick={navigateToInvestment}
            className={styles.investmentButton}
            data-testid="investmentButton"
          >
            Make Investment
          </button>
        </div>
        <div className="organizationBlock" data-testid="organizationBlock">
          <h2 data-testid="organizeHeader">Organize</h2>
          <p data-testid="organizeMessage">Help us organize events and spread the word.</p>
          <button className={styles.investmentButton} data-testid="organizeButton">Organise</button>
        </div>
      </div>
      <div className={styles.swapProgram} data-testid="swapProgram">
        <p>
          Changed your mind about the program? <a data-testid="swapProgramLink">Swap program</a>
        </p>
      </div>
    </div>
  );
};

export default ProfileDetails;