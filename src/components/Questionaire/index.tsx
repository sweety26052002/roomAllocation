// // import { useSelector } from "react-redux";
// import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
// import question from "../Questionaire/index.module.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { questionaire, removeQuestion } from "../../actions/AppActions";
// import { Controller, useForm } from "react-hook-form";
// import { AppState } from "../../reducers/AppStateInterface";
// import Preferences from "../Preferences";
// import { useEffect, useState } from "react";
// import { updateProgress } from "../../store/AppActions";

// // import { AppState } from "../../reducers/AppStateInterface";
// const ques: { [key: string]: string } = {
//   "1": "ques1",
//   "2": "ques2",
//   "3": "ques3",
//   "4": "ques4",
//   "5": "ques5",
//   "6": "ques6",
//   "7": "ques7",
//   "8": "ques8",
//   "9": "ques9",
//   "10": "ques10",
//   "11": "ques11",
// };
// const Questiones: React.FC = () => {
//   const {
//     control,
//     // register,
//     handleSubmit,
//     // formState: { errors },
//     // setValue,
//     // getValues,
//   } = useForm();
//  const [answered, setAnswered] = useState<number>(0);
//   const onSubmit = () => {
//     console.log("Form Data:");
//   };
//   const dispatch = useDispatch();
//   const data = useSelector((state: AppState) => state.appReducer.questionaire);

//   useEffect(() => {
//     const completed = Object.keys(data).length === 11; // Adjust based on your logic
//     dispatch(updateProgress({ questionnaireCompleted: completed }));
//   }, [data, dispatch]);
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     id: string,
//   ) => {
//     if (e.target.value == "") {
//       console.log(e.target.value, "Empty value");
//       dispatch(removeQuestion({ [id]: e.target.value }));
//     } else {
//       console.log("full value");
//       setAnswered(Object.keys(data).length + 1);
//       dispatch(questionaire({ [id]: e.target.value }));
//     }
//   };
//   return (
//     <div className={question.container}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className={question.heading}>
//           <span>Program Prefernces</span>
//           <span className={question.count}>{answered}/11 answers completed</span>
//         </div>
//         <label className={question.headingCaption}>
//           Select the Programs you would like to choose
//         </label>

//         <Preferences />
//         <label>Enter your preferred roommate’s name - not guaranteed (optional)</label>
        
//         <div className={question.heading}>
//           <span>Questionaire</span>
//             <span className={question.count}>{answered}/11 answers completed</span>
//         </div>
//         {Object.keys(ques).map((each) => (
//           <div key={each}>
//             <label>{ques[each]}</label>
//             {each != "3" ? (
//              <Controller
//              name={each}
//              control={control}
//              // rules={{ required: "This field is required" }}
//              render={({ field, fieldState: { error } }) => (
//                <TextField
//                 //  {...register(each, { required: "This field is required" })}
//                  {...field}
//                  id={each}
//                  variant="outlined"
//                  multiline
//                  rows={2} 
//                  fullWidth
//                  onChange={(e) => handleChange(e, each)}
//                  error={!!error}
//                  helperText={error ? error.message : ""}
//                />
//              )}
//            />
//             ) : (
//               <>
//                 <Controller
//                   name={each}
//                   control={control}
//                   rules={{ required: "This field is required" }}
//                   render={({ field }) => (
//                     <RadioGroup
//                       aria-labelledby="Ques-3"
//                       {...field}
//                       onChange={(e) => handleChange(e, each)}
//                     >
//                       <FormControlLabel
//                         value="1"
//                         control={<Radio />}
//                         label=""
//                       />
//                       <FormControlLabel
//                         value="2"
//                         control={<Radio />}
//                         label=""
//                       />
//                       <FormControlLabel
//                         value="3"
//                         control={<Radio />}
//                         label=""
//                       />
//                     </RadioGroup>
//                   )}
//                 />
//               </>
//             )}
//           </div>
//         ))}
//         <div className={question.videoContainer}>
//           <p className={question.videoText}>
//             Talk about your 3 most dominant emotions and how you manage them
//           </p>
//           <p className={question.caption}>
//             (Your video should range between 2-5 minutes and under 5MB in size)
//           </p>
//           <button className={question.button}>View Video Guidelines</button>
//           <label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => handleChange(e, e.target.value)}
//             ></input>
//           </label>
//         </div>
//         <button type="submit" className={question.button}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
// export default Questiones;
// import React, { useEffect, useState } from "react";
// import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
// import question from "../Questionaire/index.module.scss";
// import { useDispatch} from "react-redux";
// import { questionaire, removeQuestion } from "../../actions/AppActions";
// import { Controller, useForm } from "react-hook-form";
// // import { AppState } from "../../reducers/AppStateInterface";
// import Preferences from "../Preferences";
// import { updateProgress } from "../../store/AppActions";
// interface FormData {
//   [key: string]: string;
// }
// const ques: { [key: string]: string } = {
//   "1": "ques1",
//   "2": "ques2",
//   "3": "ques3",
//   "4": "ques4",
//   "5": "ques5",
//   "6": "ques6",
//   "7": "ques7",
//   "8": "ques8",
//   "9": "ques9",
//   "10": "ques10",
//   "11": "ques11",
// };

// const Questiones: React.FC = () => {

//   const {
//     control,
//     handleSubmit,
//     watch
   
//     // formState: { errors },
//   } = useForm();
//   const [answered, setAnswered] = useState<number>(0);
//  const [formData, setFormData]=useState<FormData>({});
//   const onSubmit = (data: FormData) => {
//    setFormData(data);
//     console.log("Form Data:", data);
//   };

//   const dispatch = useDispatch();
//   // const data = useSelector((state: AppState) => state.appReducer.questionaire);

  
//   const handleChange = (
//     id: string,
//     value: string
//   ) => {
//     if (value === "") {
//       dispatch(removeQuestion({ [id]: value }));
//     } else {
//       dispatch(questionaire({ [id]: value }));
//     }
//   };

//   useEffect(() => {
//     console.log(formData)
//     console.log("changed data")
//     const completed = (Object.keys(formData).length=== 11?true:false);
//     console.log(completed)
//     dispatch(updateProgress({ questionnaireCompleted: completed }));
//     setAnswered(Object.keys(formData).length);
//   }, [formData]);
//   useEffect(() => {
//     const completed = (answered === 11?true:false);
//     console.log(completed)
//     // dispatch(updateProgress({ questionnaireCompleted: completed }));
//   }, [formData, dispatch]);


//   return (
//     <div className={question.container}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className={question.heading}>
//           <span>Program Prefernces</span>
//           <span className={question.count}>{answered}/11 answers completed</span>
//         </div>
//         <label className={question.headingCaption}>
//           Select the Programs you would like to choose
//         </label>

//         <Preferences />
//         <label>Enter your preferred roommate’s name - not guaranteed (optional)</label>
        
//         <div className={question.heading}>
//           <span>Questionaire</span>
//           <span className={question.count}>{answered}/11 answers completed</span>
//         </div>
//         {Object.keys(ques).map((each) => (
//           <div key={each}>
//             <label>{ques[each]}</label>
//             {each !== "3" ? (
//               <Controller
//                 name={each}
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     id={each}
//                     variant="outlined"
//                     multiline
//                     rows={2}
//                     fullWidth
//                     onChange={(e) => {
//                       field.onChange(e);
//                       handleChange(each, e.target.value);
//                     }}
//                   />
//                 )}
//               />
//             ) : (
//               <Controller
//                 name={each}
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     aria-labelledby="Ques-3"
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e);
//                       handleChange(each, e.target.value);
//                     }}
//                   >
//                     <FormControlLabel value="1" control={<Radio />} label="Option 1" />
//                     <FormControlLabel value="2" control={<Radio />} label="Option 2" />
//                     <FormControlLabel value="3" control={<Radio />} label="Option 3" />
//                   </RadioGroup>
//                 )}
//               />
//             )}
//           </div>
//         ))}
//         <div className={question.videoContainer}>
//           <p className={question.videoText}>
//             Talk about your 3 most dominant emotions and how you manage them
//           </p>
//           <p className={question.caption}>
//             (Your video should range between 2-5 minutes and under 5MB in size)
//           </p>
//           <button className={question.button}>View Video Guidelines</button>
//           <label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => handleChange("video", e.target.value)}
//             />
//           </label>
//         </div>
//         <button type="submit" className={question.button}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Questiones;
import React, { useEffect, useState } from "react";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import question from "../Questionaire/index.module.scss";
import { useDispatch } from "react-redux";
import { questionaire, removeQuestion, updateProgress } from "../../actions/AppActions";
import { Controller, useForm } from "react-hook-form";
import Preferences from "../Preferences";
import { useSelector } from "react-redux";
import { AppState } from "../../reducers/AppStateInterface";


interface FormData {
  [key: string]: string;
}

const ques: { [key: string]: string } = {
  "1": "ques1",
  "2": "ques2",
  "3": "ques3",
  "4": "ques4",
  "5": "ques5",
  "6": "ques6",
  "7": "ques7",
  "8": "ques8",
  "9": "ques9",
  "10": "ques10",
  "11": "ques11",
};

const Questiones: React.FC = () => {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [preferenceCount, setPreferenceCount] = useState<number>(0);
  // const [preferenceCount, setPreferenceCount] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const data = useSelector((state: AppState) => state.appReducer.questionaire);
  const dispatch = useDispatch();
  // const count_preference = useSelector((state: AppState) => state.appReducer.);

  const onSubmit = (data: FormData) => {
    setFormData(data);
    console.log("Form Data:", data);
  };
  
  const handleChange = (id: string, value: string) => {
    const updatedFormData = { ...formData, [id]: value };
    setFormData(updatedFormData);
    console.log(id,"this is id")
    if(id === "video"){
      const checkVideo = value?true:false;
      dispatch(updateProgress({ videoSubmitted: checkVideo }));
    }
    else if (value === "") {
      dispatch(removeQuestion({ [id]: value }));
    } else {
      dispatch(questionaire({ [id]: value }));
    }
    
  };

  useEffect(() => {
    const completed = Object.keys(data).length === 11?true:false;
    console.log(completed)
    console.log(data, "data is here")
    setAnsweredCount(Object.keys(data).length);
    dispatch(updateProgress({ questionnaireCompleted: completed }));
   
  }, [data, dispatch]);
  
  return (
    <div className={question.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={question.heading}>
          <span>Program Preferences</span>
          <span className={question.count}>{answeredCount}/11 answers completed</span>
        </div>
        <label className={question.headingCaption}>
          Select the Programs you would like to choose
        </label>

        <Preferences />
        <label>Enter your preferred roommate’s name - not guaranteed (optional)</label>

        <div className={question.heading}>
          <span>Questionnaire</span>
          <span className={question.count}>{answeredCount}/11 answers completed</span>
        </div>
        {Object.keys(ques).map((each) => (
          <div key={each}>
            <label>{ques[each]}</label>
            {each !== "3" ? (
              <Controller
                name={each}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id={each}
                    variant="outlined"
                    multiline
                    rows={2}
                    fullWidth
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange(each, e.target.value);
                    }}
                  />
                )}
              />
            ) : (
              <Controller
                name={each}
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    aria-labelledby="Ques-3"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange(each, e.target.value);
                    }}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Option 1" />
                    <FormControlLabel value="2" control={<Radio />} label="Option 2" />
                    <FormControlLabel value="3" control={<Radio />} label="Option 3" />
                  </RadioGroup>
                )}
              />
            )}
          </div>
        ))}
        <div className={question.videoContainer}>
          <p className={question.videoText}>
            Talk about your 3 most dominant emotions and how you manage them
          </p>
          <p className={question.caption}>
            (Your video should range between 2-5 minutes and under 5MB in size)
          </p>
          <button className={question.button}>View Video Guidelines</button>
          <Controller
  control={control}
  name="video"
  render={({ field }) => (
    <input
      type="file"
      // accept="video/*"
      onChange={(e) => {
        field.onChange(e.target.files?e.target.files[0]:null); // update the state with the selected file
        handleChange("video", e.target.value);
      }}
    />
  )}
/>
        </div>
        <button type="submit" className={question.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Questiones;
