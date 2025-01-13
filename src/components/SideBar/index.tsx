// import sidebar from "../SideBar/index.module.scss";
// import pillar from "../../assets/images/pillars.png";
// import ProfileConfirmation from "../ProfileConfirmation";
// const SideBar: React.FC = () =>{
//     return(
//         <div className={sidebar.box}>
//         <div className={sidebar.container}>
//             <div className={sidebar.content}>
//                 <div className={sidebar.pillars}>
//                     <img src={pillar} />
//                 </div>
//                 <p className={sidebar.text}>May wisdom, strength, and clarity lead my way.</p>
//             </div>
//             <div className={sidebar.stepper}>
//                 <h1>hguj</h1>
//             </div>
//         </div>
//                 <ProfileConfirmation />
//         </div>
//     )
// }

// export default SideBar;

import React from 'react';
import sidebar from '../SideBar/index.module.scss';
import ProfileConfirmation from '../ProfileConfirmation';
import { useSelector } from 'react-redux';
// import { AppState } from '../../common/constants/stringConstants';
import { AppState } from '../../reducers/AppStateInterface';
import images from '../../constants/images';

const SideBar: React.FC = () => {
  
  const myDetailsCompleted = useSelector((state: AppState) => state.appReducer.myDetailsCompleted);
  const programPreferencesCompleted = useSelector((state: AppState) => state.appReducer.programPreferencesCompleted);
  const questionnaireCompleted = useSelector((state: AppState) => state.appReducer.questionnaireCompleted);
  console.log(questionnaireCompleted,"questionnaireCompleted")
  const videoSubmitted = useSelector((state: AppState) => state.appReducer.videoSubmitted);
  const data = useSelector((state: AppState) => state.appReducer);
  console.log(data)
   const calculateProgress = () => {
    const totalSections = 4; // Total number of sections to complete
    let completedSections = 0;

    if (myDetailsCompleted) completedSections++;
    if (programPreferencesCompleted) completedSections++;
    if (questionnaireCompleted) completedSections++;
    if (videoSubmitted) completedSections++;

    return (completedSections / totalSections) * 100;
  };

  return (
    <div className={sidebar.box}>
      {/* <div className={sidebar.container}> */}
        <div className={sidebar.content}>
          {/* Your sidebar content */}
        </div>
        <div className={sidebar.stepper}>
          <div className={sidebar.percentageContainer}><div>{calculateProgress()}%</div> Form Filled</div>
          <div className={sidebar.progressBarContainer}>
            <div
              className={sidebar.progressBar}
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <ul className={sidebar.progressList}>
            <li>
              <img src={myDetailsCompleted? images.list_black : images.list_white} />
              My Details
              { myDetailsCompleted &&
              <img src={images.complete_tick} />
}
            </li>
            <li>
              <img src={programPreferencesCompleted? images.list_black : images.list_white} />
              Program Preferences
              { programPreferencesCompleted &&
              <img src={images.complete_tick} />
}
            </li>
            <li>
              <img src={questionnaireCompleted? images.list_black : images.list_white} />
              Questionnaire
              { questionnaireCompleted &&
              <img src={images.complete_tick} />
}
            </li>
            <li >
              <img src={videoSubmitted? images.list_black : images.list_white} />
              Video Submission
              { videoSubmitted &&
              <img src={images.complete_tick} />
}
            </li>
          </ul>
        </div>
      {/* </div> */}
      <ProfileConfirmation />
    </div>
  );
};

export default SideBar;
