// import React, { useEffect, useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import styles from "../Preferences/index.module.scss";
// import { DropResult } from 'react-beautiful-dnd';
// import DragNDropItem from '../../common/components/DragNDropItem';
// import { useDispatch } from 'react-redux';
// import { updateProgress } from '../../store/AppActions';

// // Initial mock data for the programs in two separate containers
// const initialProgramsLeft = [
//   { id: 'left-1', content: 'HDB1', days:'8 days', date:'10th Oct’24 - 17th Oct’24' },
//   { id: 'left-2', content: 'HDB2' , days:'7 days', date:'29th Sept’24 - 6th Oct’24'},
// ];
// const initialProgramsRight = [
//   { id: 'right-1', content: 'HDB1' , days:'5 days', date:'21th Oct’24 - 28th Oct’24'},
//   { id: 'right-2', content: 'HDB2' , days:'4 days', date:'10th Oct’24 - 17th Oct’24'},
// ];

// const Preferences: React.FC = () => {
//   const dispatch = useDispatch();
//   const [leftPrograms, setLeftPrograms] = useState(initialProgramsLeft);
//   const [rightPrograms, setRightPrograms] = useState(initialProgramsRight);

//   useEffect(() => {
//     // Calculate completion status
//     const completed = leftPrograms.length > 0 || rightPrograms.length > 0;
//     dispatch(updateProgress({ programPreferencesCompleted: completed }));
//   }, [leftPrograms, rightPrograms, dispatch]);

//   const onDragEnd = (result: DropResult) => {
//     const { source, destination } = result;
//     if (!destination) {
//       return;
//     }

//     // Moving within the same list
//     if (source.droppableId === destination.droppableId) {
//       const items = source.droppableId === 'left' ? Array.from(leftPrograms) : Array.from(rightPrograms);
//       const [reorderedItem] = items.splice(source.index, 1);
//       items.splice(destination.index, 0, reorderedItem);

//       if (source.droppableId === 'left') {
//         setLeftPrograms(items);
//       } else {
//         setRightPrograms(items);
//       }
//     } else {
//       // Moving between lists
//       const sourceItems = source.droppableId === 'left' ? Array.from(leftPrograms) : Array.from(rightPrograms);
//       const destItems = destination.droppableId === 'left' ? Array.from(leftPrograms) : Array.from(rightPrograms);
//       const [movedItem] = sourceItems.splice(source.index, 1);
//       destItems.splice(destination.index, 0, movedItem);

//       if (source.droppableId === 'left') {
//         setLeftPrograms(sourceItems);
//         setRightPrograms(destItems);
//       } else {
//         setLeftPrograms(destItems);
//         setRightPrograms(sourceItems);
//       }
//     }
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className={styles.container}> {/* Use Flexbox or Grid to layout the containers in a row */}
//         <Droppable droppableId="left">
//           {(provided) => (
//             <div {...provided.droppableProps} ref={provided.innerRef} className={styles.droppableColumn}>
//               {leftPrograms.map((program, index) => (
//                 <Draggable key={program.id} draggableId={program.id} index={index}>
//                   {(provided) => (
//                     <DragNDropItem provided={provided} program={program}/>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//         <Droppable droppableId="right">
//           {(provided) => (
//             <div {...provided.droppableProps} ref={provided.innerRef} className={styles.dropArea}>
//             <div className={styles.droppableColumn}>
//               {rightPrograms.map((program, index) => (
//                 <Draggable key={program.id} draggableId={program.id} index={index}>
//                   {(provided) => (
//                     <DragNDropItem provided={provided} program={program}/>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//             <p className={styles.reset}>Mahatria’s choice has been disabled as you have added other preferences, you can drag them back to re-enable them. <span>Reset preference</span></p>
//           </div>

//           )}
//         </Droppable>
//       </div>
//     </DragDropContext>
//   );
// };

// export default Preferences;


import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from "../Preferences/index.module.scss";
import { DropResult } from 'react-beautiful-dnd';
import DragNDropItem from '../../common/components/DragNDropItem';
import { useDispatch } from 'react-redux';
import { changeCount, updateProgress } from '../../actions/AppActions';
// import { updateProgress } from '../../store/AppActions';
interface ProgramInterface {
  id: string;
  content: string;
  days: string;
  date: string;
}
// Initial mock data for the programs in two separate containers
const initialProgramsLeft = [
  { id: 'left-1', content: 'HDB1', days: '8 days', date: '10th Oct’24 - 17th Oct’24' },
  { id: 'left-2', content: 'HDB2', days: '7 days', date: '29th Sept’24 - 6th Oct’24' },
  { id: 'left-3', content: 'HDB3', days: '5 days', date: '21th Oct’24 - 28th Oct’24' },
  { id: 'left-4', content: 'HDB4', days: '4 days', date: '10th Oct’24 - 17th Oct’24' },
  { id: 'left-5', content: 'HDB5', days: '4 days', date: '10th Oct’24 - 17th Oct’24' },
];
const initialProgramsRight :ProgramInterface[]= [
 
];
const rightLength:number = initialProgramsLeft.length ;

const Preferences: React.FC = () => {
  const dispatch = useDispatch();
  const [leftPrograms, setLeftPrograms] = useState(initialProgramsLeft);
  const [rightPrograms, setRightPrograms] = useState(initialProgramsRight);

  useEffect(() => {
    // Calculate completion status
    const completed = rightPrograms.length > 0 || rightPrograms.length > 0;
    dispatch(updateProgress({ programPreferencesCompleted: completed }));
  }, [leftPrograms, rightPrograms, dispatch]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      const items = source.droppableId === 'left' ? Array.from(leftPrograms) : Array.from(rightPrograms);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      if (source.droppableId === 'left') {
        console.log("itemsleft",items)
        setLeftPrograms(items);
      } else {
        console.log("itemsright",items)
        setRightPrograms(items);
      }
    } else {
      // Moving between lists
      const sourceItems = source.droppableId === 'left' ? Array.from(leftPrograms) : Array.from(rightPrograms);
      const destItems = destination.droppableId === 'left' ? Array.from(leftPrograms) : Array.from(rightPrograms);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
      
      if (source.droppableId === 'left') {
        console.log("sourceItems",sourceItems)
        setLeftPrograms(sourceItems);
        dispatch(changeCount(destItems.length))
        setRightPrograms(destItems);
      } else {
        console.log("sourceItems",sourceItems)
        dispatch(changeCount(sourceItems.length))
        setLeftPrograms(destItems);
        setRightPrograms(sourceItems);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.container}> {/* Use Flexbox or Grid to layout the containers in a row */}
        <Droppable droppableId="left">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={styles.droppableColumn}>
              {leftPrograms.map((program, index) => (
                <Draggable key={program.id} draggableId={program.id} index={index}>
                  {(provided) => (
                    <DragNDropItem provided={provided} program={program} />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="right">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={styles.droppableColumn}>
              {rightPrograms.map((program, index) => (
                <Draggable key={program.id} draggableId={program.id} index={index}>
                  {(provided) => (
                    <DragNDropItem provided={provided} program={program} />
                  )}
                </Draggable>
              ))}
              {Array.from({ length: rightLength - rightPrograms.length }).map((_, index) => (
                <div key={`placeholder-${index}`} className={styles.placeholderBox}>
                  {/* Additional styles for dashed border */}
                </div>
              ))}
              {provided.placeholder}
              <p className={styles.reset}>
                Mahatria’s choice has been disabled as you have added other preferences, you can drag them back to re-enable them.
                <span>Reset preference</span>
              </p>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Preferences;
