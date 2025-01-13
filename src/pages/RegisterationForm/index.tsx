import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../components/SideBar"
import submitRegistration from "../../services/submitRegistration"
import { AppState } from "../../reducers/AppStateInterface";
import { prefences, questionaire } from "../../actions/AppActions";
import SongBanner from "../SongBanner";
const RegistrationForm : React.FC =() =>{
  const data = useSelector((state: AppState) => state.appReducer);
  console.log(data)
  const dispatch=useDispatch()
  const handlesPreferences=()=>{
        dispatch(prefences({'1':'0', '2':'1'}))
  }
  const handleQuestionarie=()=>{
    dispatch(questionaire({"Q1":"ANS1", "Q2":"ANS2"}))
  }
    return(
        <>
          <SongBanner />
           <SideBar/> 
           <button onClick={()=>handleQuestionarie()}>Questions</button>
           <button onClick={()=>handlesPreferences()}>prefences</button>
           <button onClick={()=>submitRegistration(data)}>submit</button>
        </>
    )
}

export default RegistrationForm
