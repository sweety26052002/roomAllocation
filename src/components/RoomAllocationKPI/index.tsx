import React from "react";
import HeadingSubHeading from "../HeadingSubHeading";
import styles from "./index.module.scss";
import ihgLogo from "../../assets/images/leonia-icong.svg";

export interface HeadingsData {
  subheading: string;
  mainHeading: string;
  type: string;
}
interface RoomAllocationKPIProps {
  headingsData: HeadingsData[];
  activeKpi: string; // Add activeKpi prop to indicate which KPI is active
  handleKpiClick?: (type: string) => void;
}
const RoomAllocationKPI: React.FC<RoomAllocationKPIProps> = ({
  headingsData,
  activeKpi, // Receive the activeKpi as a prop
  handleKpiClick,
}) => {
  const handleKpiClickWithState = (type: string) => {
    if (handleKpiClick) {
      handleKpiClick(type); // Call the external click handler
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.kpiContainer}>
        {headingsData.map((item, index) => (
          <HeadingSubHeading
            key={index}
            handleClick={() => handleKpiClickWithState(item.type)}
            subheading={item.subheading}
            mainHeading={item.mainHeading}
            additionalClassName={styles.headingSubheadingContainer}
            isActive={item.type === activeKpi} // Check if the item matches activeKpi
          />
        ))}
      </div>
      <div className={styles.logoIcon}>
        <img src={ihgLogo} alt="ihglogo" />
      </div>
    </div>
  );
};

export default RoomAllocationKPI;
