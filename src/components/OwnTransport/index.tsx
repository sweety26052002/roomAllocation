
import { useNavigate } from "react-router-dom";
import images from "../../constants/images";
import styles from './index.module.scss'; 

const OwnTransport = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className={styles.back}>
                <img src={images.back} alt="Back" onClick={handleBack} />
                <div className={styles.travelOrganizeText}>Organize Travel Plan</div>
            </div>
            <div className={styles.locationText}>How are you travelling to and from the location?</div>
            <div className={styles.transport}>
                <img src={images.car} alt="Car" className={styles.vehicle} />
                <div className={styles.transportText}>Would be using my own transport</div>
            </div>
            <div className={styles.mapDiv}>
                <img src={images.map_pin} alt="Map Pin" />
                <div className={styles.transportText}>Address</div>
            </div>
            <div className={styles.addressDiv}>
                <div>Leonia Resort</div>
                <div>Bommarasipet Village Shamirpet Mandal</div>
                <div>Hyderabad – 500078</div>
                <div>Telangana, India</div>
            </div>
            <div className={styles.mapDiv}>
                <img src={images.map_pin} alt="Map Pin" />
                <div className={styles.transportText}>Timings</div>
            </div>
            <div className={styles.addressDiv}>
                <div>Reporting Time - 19 Jun’24 at 5:00 a.m. IST</div>
                <div>Checkout Time - 26 Jun’24 at 7:00 a.m. IST</div>
            </div>
        </div>
    );
};

export default OwnTransport;
