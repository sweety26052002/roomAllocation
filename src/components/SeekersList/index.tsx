/* eslint-disable react/prop-types */
import SeekerCard, { SeekerCardProps } from "../SeekerCard";
import styles from "./index.module.scss";
interface SeekerListProps {
  seekersList: SeekerCardProps[];
}
const SeekersList: React.FC<SeekerListProps> = ({ seekersList }) => {
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Yet To Assign ({seekersList.length})</p>
      <div className={styles.seekersList}>
        {seekersList.map((seeker, index) => (
          <SeekerCard
            key={index}
            profile={seeker.profile}
            gender={seeker.gender}
            name={seeker.name}
            age={seeker.age}
            city={seeker.city}
          />
        ))}
      </div>
    </div>
  );
};
export default SeekersList;
