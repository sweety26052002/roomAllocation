// import React, { useState } from 'react';
// import styles from './index.module.scss'; // Import the CSS module

// interface Flight {
//   city: string;
//   date: string;
//   airline: string;
//   flightNumber: string;
// }

// interface RowProps {
//   flight: Flight;
//   isSelected: boolean;
//   names: string;
//   onSelect: () => void;
// }

// const Row: React.FC<RowProps> = ({ flight, isSelected, names, onSelect }) => (
//   <div className={`${styles.row} ${isSelected ? styles.selected : ''}`}>
//     <input type="radio" name={names} onChange={onSelect} />
//     <div className={styles.flightInfo}>{flight.city}</div>
//     <div className={styles.flightInfo}>{flight.date}</div>
//     <div className={styles.flightInfo}>{flight.airline}</div>
//     <div className={styles.flightInfo}>{flight.flightNumber}</div>
//   </div>
// );

// interface FlightSelectionPageProps {
//   onComingFlightSelect: (flight: Flight) => void;
//   onLeavingFlightSelect: (flight: Flight) => void;
// }

// const FlightSelectionPage: React.FC<FlightSelectionPageProps> = ({ onComingFlightSelect, onLeavingFlightSelect }) => {
//   const [selectedComingFlight, setSelectedComingFlight] = useState<Flight | null>(null);
//   const [selectedLeavingFlight, setSelectedLeavingFlight] = useState<Flight | null>(null);

//   const flightsToHyderabad: Flight[] = [
//     { city: 'Mumbai', date: '10th Oct - 12:00', airline: 'Indigo', flightNumber: '6E 297' },
//     { city: 'Chennai', date: '11th Oct - 14:00', airline: 'SpiceJet', flightNumber: 'SG 101' },
//     { city: 'Goa', date: '12th Oct - 16:00', airline: 'Air India', flightNumber: 'AI 102' },
//     // Add more flights as needed
//   ];

//   const flightsFromHyderabad: Flight[] = [
//     { city: 'Mumbai', date: '10th Oct - 12:00', airline: 'Indigo', flightNumber: '6E 297' },
//     { city: 'Chennai', date: '11th Oct - 14:00', airline: 'SpiceJet', flightNumber: 'SG 101' },
//     { city: 'Goa', date: '12th Oct - 16:00', airline: 'Air India', flightNumber: 'AI 102' },
//     // Add more flights as needed
//   ];

//   const handleComingFlightSelect = (flight: Flight) => {
//     setSelectedComingFlight(flight);
//     onComingFlightSelect(flight);
//   };

//   const handleLeavingFlightSelect = (flight: Flight) => {
//     setSelectedLeavingFlight(flight);
//     onLeavingFlightSelect(flight);
//   };

//   return (
//     <div className={styles.modal}>
//       <div className={styles.travelOrganizeText}>Travel Organizer</div>
//       <div className={styles.upload}>
//         <div className={styles.preferences}>Preferences</div>
//         <div className={styles.flightList}>
//           <div className={styles.column}>
//             <div className={styles.title}>Coming to Hyderabad</div>
//             {flightsToHyderabad.map((flight, index) => (
//               <Row
//                 key={index}
//                 flight={flight}
//                 names="coming"
//                 isSelected={selectedComingFlight === flight}
//                 onSelect={() => handleComingFlightSelect(flight)}
//               />
//             ))}
//           </div>
//           <div className={styles.column}>
//             <div className={styles.title}>Leaving Hyderabad</div>
//             {flightsFromHyderabad.map((flight, index) => (
//               <Row
//                 key={index}
//                 flight={flight}
//                 names="leaving"
//                 isSelected={selectedLeavingFlight === flight}
//                 onSelect={() => handleLeavingFlightSelect(flight)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlightSelectionPage;
import React, { useState } from 'react';
import styles from './index.module.scss'; // Make sure this path is correct
import images from '../../constants/images';

interface Flight {
  city: string;
  date: string;
  airline: string;
  flightNumber: string;
}

interface RowProps {
  flight: Flight;
  isSelected: boolean;
  // names: string;
  onSelect: () => void;
}

const Row: React.FC<RowProps> = ({ flight, isSelected, onSelect }) => (
  <div className={`${styles.row} ${isSelected ? styles.selected : ''}`}>
    {/* <input type="radio" name={names} onChange={onSelect} /> */}
    <img src={images.radio_button} alt="Flight" onClick={onSelect}/>
 
    <div style={{ marginLeft: '10px' }}>{flight.city}</div>
    <div style={{ marginLeft: '10px' }}>{flight.date}</div>
    <div style={{ marginLeft: '10px' }}>{flight.airline}</div>
    <div style={{ marginLeft: '10px' }}>{flight.flightNumber}</div>
  </div>
);

interface FlightSelectionPageProps {
  onComingFlightSelect: (flight: Flight) => void;
  onLeavingFlightSelect: (flight: Flight) => void;
}

const FlightSelectionPage: React.FC<FlightSelectionPageProps> = ({ onComingFlightSelect, onLeavingFlightSelect }) => {
  const [selectedComingFlight, setSelectedComingFlight] = useState<Flight | null>(null);
  const [selectedLeavingFlight, setSelectedLeavingFlight] = useState<Flight | null>(null);

  const flightsToHyderabad: Flight[] = [
    { city: 'Mumbai', date: '10th Oct - 12:00', airline: 'Indigo', flightNumber: '6E 297' },
    { city: 'Chennai', date: '11th Oct - 14:00', airline: 'SpiceJet', flightNumber: 'SG 101' },
    { city: 'Goa', date: '12th Oct - 16:00', airline: 'Air India', flightNumber: 'AI 102' },
  ];

  const flightsFromHyderabad: Flight[] = [
    { city: 'Mumbai', date: '10th Oct - 12:00', airline: 'Indigo', flightNumber: '6E 297' },
    { city: 'Chennai', date: '11th Oct - 14:00', airline: 'SpiceJet', flightNumber: 'SG 101' },
    { city: 'Goa', date: '12th Oct - 16:00', airline: 'Air India', flightNumber: 'AI 102' },
  ];

  const handleComingFlightSelect = (flight: Flight) => {
    setSelectedComingFlight(flight);
    onComingFlightSelect(flight);
  };

  const handleLeavingFlightSelect = (flight: Flight) => {
    setSelectedLeavingFlight(flight);
    onLeavingFlightSelect(flight);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
        <div>Coming to Hyderabad</div>
        {flightsToHyderabad.map((flight, index) => (
          <Row
            key={index}
            flight={flight}
            // names="coming"
            isSelected={selectedComingFlight === flight}
            onSelect={() => handleComingFlightSelect(flight)}
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Leaving Hyderabad</div>
        {flightsFromHyderabad.map((flight, index) => (
          <Row
            key={index}
            flight={flight}
            // names="leaving"
            isSelected={selectedLeavingFlight === flight}
            onSelect={() => handleLeavingFlightSelect(flight)}
          />
        ))}
      </div>
    </div>
  );
};

export default FlightSelectionPage;
