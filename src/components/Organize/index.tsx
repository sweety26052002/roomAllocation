// // import React from 'react';
// // // import { useHistory } from 'react-router-dom';
// // import './OrganizeStyles.scss';
// // import {images} from '../../constants/images';
// // import { useNavigate } from 'react-router-dom';
// // const OrganizePage: React.FC = () => {
// //     const navigate = useNavigate();
// //   const handleFlightCardClick = () => {
// //     navigate('/flight')
// //   };

// //   return (
// //     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //       <div className="organize-card">
// //         <div>Would be using my own transport</div>
// //       </div>
// //       <div className="organize-card">
// //         <div>Would be needing city pick and drop off</div>
// //       </div>
// //       <div className="organize-card" onClick={handleFlightCardClick}>
// //         <div>Would be travelling via flight</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrganizePage;

// import React from 'react';
// import './OrganizeStyles.scss';
// import { useNavigate } from 'react-router-dom';
// import images from '../../constants/images';
// const OrganizePage: React.FC = () => {
//   const navigate = useNavigate();
//   const handleFlightCardClick = () => {
//     navigate('/flight')
//   };

//   const handleOwnTransport = () => {
//     navigate('/ownTransport')
//   };
//   const handlePickUpAndDrop = () => {
//     navigate('/ownTransport')
//   };
//   const handleBack = () => {
//     navigate(-1)
//   }
//   return (
//     <div>
//       <div className='back'><img src={images.back} onClick={handleBack}/><div className='travelOrganizeText'>Organize Travel Plan</div></div>
//      <div className='locationText'> How are you travelling to and from the location?</div>
//      <div className='plan'>
//       <div className="organize-card">
//         <img src={images.car} alt="Car" onClick = {handleOwnTransport} />
//         <div>Would be using my own transport</div>
//       </div>
//       <div className="organize-card">
//         <img src={images.van} alt="Van" onClick={handlePickUpAndDrop}/>
//         <div>Would be needing city pick and drop off</div>
//       </div>
//       <div className="organize-card" onClick={handleFlightCardClick}>
//         <img src={images.air_plane} alt="Airplane" />
//         <div>Would be travelling via flight</div>
//       </div>
//       </div>
//       <footer className='organizeFooter'>
//       Venue: Leonia Resort, Hyderabad, Telangana
//       <a href="https://www.google.com/maps/search/?api=1&query=Leonia+Resort+Hyderabad+Telangana" target="_blank" rel="noopener noreferrer">Open in Maps</a>
//     </footer>
//     </div>
//   );
// };

// export default OrganizePage;
import React from 'react';
import styles from './index.module.scss'; 
import { useNavigate } from 'react-router-dom';
import images from '../../constants/images';

const OrganizePage: React.FC = () => {
  const navigate = useNavigate();

  const handleFlightCardClick = () => {
    navigate('/flight');
  };

  const handleOwnTransport = () => {
    navigate('/ownTransport');
  };

  const handlePickUpAndDrop = () => {
    navigate('/ownTransport');
  };

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
      <div className={styles.plan}>
        <div className={styles.organize_card} onClick={handleOwnTransport}>
          <img src={images.car} alt="Car" />
          <div>Would be using my own transport</div>
        </div>
        <div className={styles.organize_card} onClick={handlePickUpAndDrop}>
          <img src={images.van} alt="Van" />
          <div>Would be needing city pick and drop off</div>
        </div>
        <div className={styles.organize_card} onClick={handleFlightCardClick}>
          <img src={images.air_plane} alt="Airplane" />
          <div>Would be travelling via flight</div>
        </div>
      </div>
      <footer className={styles.organizeFooter}>
        Venue: Leonia Resort, Hyderabad, Telangana
        <a href="https://www.google.com/maps/search/?api=1&query=Leonia+Resort+Hyderabad+Telangana" target="_blank" rel="noopener noreferrer">Open in Maps</a>
      </footer>
    </div>
  );
};

export default OrganizePage;
