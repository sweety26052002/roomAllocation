import styles from "./index.module.scss";
interface RoomCardProps {
  floorName: string;
  roomNumber: string;
}
// eslint-disable-next-line react/prop-types
const RoomCard: React.FC<RoomCardProps> = ({ floorName, roomNumber }) => {
  return (
    <div className={styles.container}>
      <div className={styles.floorRoom}>
      <p className={styles.roomNumber}>{roomNumber}</p>
      <p className={styles.floorName}>{floorName}</p>
      </div>
      <p className={styles.line}></p>
    </div>
  );
};
export default RoomCard;
