


// import React, { useState } from 'react';
// import styles from './index.module.scss';
// import FlightSelectionPage from '../FlightSelectionPage';
// import FlightForm from '../FlightForm';
// import images from '../../constants/images';
// import { useNavigate } from 'react-router-dom';

// type Flight = {
//   city: string;
//   date: string;
//   airline: string;
//   flightNumber: string;
// };

// const FlightPage: React.FC = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedComingFlight, setSelectedComingFlight] = useState<Flight | null>(null);
//   const [selectedLeavingFlight, setSelectedLeavingFlight] = useState<Flight | null>(null);
//   const [flightType, setFlightType] = useState('domestic');
//   const [idUploaded, setIdUploaded] = useState(false);

//   const handleSubmit = () => {
//     if (idUploaded && (selectedComingFlight || selectedLeavingFlight)) {
//       setShowModal(true);
//     }
//   };
// const navigate = useNavigate();
//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const handleFlightTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFlightType(event.target.value);
//   };

//   const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIdUploaded(event.target.files !== null && event.target.files.length > 0);
//  };

//   const isFormComplete = idUploaded && (selectedComingFlight || selectedLeavingFlight);
//   const handleBack = () => {
//     navigate(-1)
//   }
//   return (
//     <div> 
//       <div className='back'><img src={images.back} onClick={handleBack}/><div className='travelOrganizeText'>Organize Travel Plan</div></div>

//       {/* Upload ID section */}
//       <div className={styles.upload}>
//         <div>Upload your ID</div>
//         <input type="file" onChange={handleIdUpload} />
//       </div>

//       {/* Flight preferences section */}
//       <div className={styles.preferences}>
//         <div>Here are some flight preferences for you. Select the flight to update the details.</div>
//         <div>
//         <label>
//           <input type="radio" value="domestic" checked={flightType === 'domestic'} onChange={handleFlightTypeChange} />
//           Domestic
//         </label>
//         <label>
//           <input type="radio" value="international" checked={flightType === 'international'} onChange={handleFlightTypeChange} />
//           International
//         </label>
//         </div>
//       </div>

//       {/* Flight details section */}
//       <FlightSelectionPage
//         onComingFlightSelect={setSelectedComingFlight}
//         onLeavingFlightSelect={setSelectedLeavingFlight}
//       />
//       <div style={{ display: 'flex', flexDirection: 'row' }}>
//       <div>
//         <h2>Coming to Hyderabad</h2>
//         <FlightForm
//           selectedComingFlight={selectedComingFlight}
//           selectedLeavingFlight={null}
//           section='coming'

//         />
//       </div>
//       <div>
//         <h2>Leaving Hyderabad</h2>
//         <FlightForm
//           selectedComingFlight={null}
//           selectedLeavingFlight={selectedLeavingFlight}
//           section="leaving"
//         />
//       </div>
//       </div>

//       {/* Footer section */}
//       <div>
//         <button>Back</button>
//         <button onClick={handleSubmit} disabled={!isFormComplete}>Submit</button>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className={styles.modal}>
//           <h2>Your plan has been updated</h2>
//           <button onClick={handleModalClose}>Okay, got it</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlightPage;

import React, { useState } from 'react';
import styles from './index.module.scss';
import FlightSelectionPage from '../FlightSelectionPage';
import FlightForm from '../FlightForm';
import images from '../../constants/images';
import { useNavigate } from 'react-router-dom';

type Flight = {
  city: string;
  date: string;
  airline: string;
  flightNumber: string;
};

const FlightPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedComingFlight, setSelectedComingFlight] = useState<Flight | null>(null);
  const [selectedLeavingFlight, setSelectedLeavingFlight] = useState<Flight | null>(null);
  const [flightType, setFlightType] = useState('domestic');
  const [idUploaded, setIdUploaded] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (idUploaded && (selectedComingFlight || selectedLeavingFlight)) {
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFlightTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlightType(event.target.value);
  };

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdUploaded(event.target.files !== null && event.target.files.length > 0);
  };

  const isFormComplete = idUploaded && (selectedComingFlight || selectedLeavingFlight);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className={styles.back}>
        <img src={images.back} alt="Back" onClick={handleBack} />
        <div className={styles.travelOrganizeText}>Organize Travel Plan</div>
      </div>
      <div className={styles.transport}>
                <img src={images.air_plane} alt="Car" className={styles.vehicle} />
                <div className={styles.transportText}>Would be using my own transport</div>
            </div>

      {/* Upload ID section */}
      <div className={styles.upload}>
        <div>Upload your ID</div>
        <input type="file" onChange={handleIdUpload} />
      </div>

      {/* Flight preferences section */}
      <div className={styles.preferences}>
        <div>Here are some flight preferences for you. Select the flight to update the details.</div>
        <div>
          <label>
            <input type="radio" value="domestic" checked={flightType === 'domestic'} onChange={handleFlightTypeChange} />
            Domestic
          </label>
          <label>
            <input type="radio" value="international" checked={flightType === 'international'} onChange={handleFlightTypeChange} />
            International
          </label>
        </div>
      </div>

      {/* Flight details section */}
      <FlightSelectionPage
        onComingFlightSelect={setSelectedComingFlight}
        onLeavingFlightSelect={setSelectedLeavingFlight}
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <h2>Coming to Hyderabad</h2>
          <FlightForm
            selectedComingFlight={selectedComingFlight}
            selectedLeavingFlight={null}
            section='coming'
          />
        </div>
        <div>
          <h2>Leaving Hyderabad</h2>
          <FlightForm
            selectedComingFlight={null}
            selectedLeavingFlight={selectedLeavingFlight}
            section="leaving"
          />
        </div>
      </div>

      {/* Footer section */}
      <div className={styles.footer}>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleSubmit} disabled={!isFormComplete}>Submit</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modal}>
          <h2>Your plan has been updated</h2>
          <button onClick={handleModalClose}>Okay, got it</button>
        </div>
      )}
    </div>
  );
};

export default FlightPage;
