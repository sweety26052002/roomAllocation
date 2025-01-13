/* eslint-disable react/prop-types */

import { DraggableProvided } from "react-beautiful-dnd";
import styles from "../DragNDropItem/index.module.scss";
import dots from "../../../assets/images/dots.svg";
// import line from '../../../assets/images/line.svg';
export interface DragNDropItemInterface {
  provided: DraggableProvided;
  program: { [key: string]: string };
}

const DragNDropItem: React.FC<DragNDropItemInterface> = ({
  provided,
  program,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={styles.draggableItem}
    >
      <div className={styles.content}>
        <span className={styles.programName}>{program.content}</span>
        <div className={styles.programDetails}>
        <span >{program.days}</span>
        <span className={styles.line}></span>
        {/* <img src={line} alt="separator" /> */}
        <span >{program.date}</span>
        </div>
      </div>
      <div className={styles.icons}>
        <img src={dots} />
      </div>
    </div>
  );
};
export default DragNDropItem;
