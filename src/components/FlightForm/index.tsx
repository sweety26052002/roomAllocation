
import React from 'react';
import styles from './index.module.scss';

type Flight = {
  city: string;
  date: string;
  airline: string;
  flightNumber: string;
};

type FlightFormProps = {
  selectedComingFlight: Flight | null;
  selectedLeavingFlight: Flight | null;
  section:string;
};

const FlightForm: React.FC<FlightFormProps> = ({ selectedComingFlight, selectedLeavingFlight,section }) => (
  <div className={styles.formContainer}>
    <div>
     {section === 'coming' && (
      <form>
        <div className={styles.flight_card}>
          <h4>Coming to Hyderabad</h4>
          <label>
            Airline Name:
            <input type="text" name="airline" value={selectedComingFlight?.airline || ""} readOnly />
          </label>
          <label>
            Flight No:
            <input type="text" name="flightNumber" value={selectedComingFlight?.flightNumber|| ""} readOnly />
          </label>
          <label>
            Coming From:
            <input type="text" name="comingFrom" value={selectedComingFlight?.city|| ""} readOnly />
          </label>
          <label>
            Arrival Date:
            <input type="text" name="arrivalDate" value={selectedComingFlight?.date.split(' - ')[0]|| ""} readOnly />
          </label>
          <label>
            Arrival Time:
            <input type="text" name="arrivalTime" value={selectedComingFlight?.date.split(' - ')[1]|| ""} readOnly />
          </label>
        </div>
      </form>
     )}
     </div>
     <div>
   {section === 'leaving' && (
      <form>
        <div className={styles.flight_card}>
          <h4>Leaving Hyderabad</h4>
          <label>
            Airline Name:
            <input type="text" name="airline" value={selectedLeavingFlight?.airline||""} readOnly />
          </label>
          <label>
            Flight No:
            <input type="text" name="flightNumber" value={selectedLeavingFlight?.flightNumber||""} readOnly />
          </label>
          <label>
            Going to:
            <input type="text" name="comingFrom" value={selectedLeavingFlight?.city||""} readOnly />
          </label>
          <label>
            Arrival Date:
            <input type="text" name="arrivalDate" value={selectedLeavingFlight?.date.split(' - ')[0]||""} readOnly />
          </label>
          <label>
            Arrival Time:
            <input type="text" name="arrivalTime" value={selectedLeavingFlight?.date.split(' - ')[1]|| ""} readOnly />
          </label>
        </div>
      </form>
   )}
   </div>
  </div>
);

export default FlightForm;
