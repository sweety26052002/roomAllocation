import { combineReducers } from "redux";
import appReducer from "./AppReducer";
import FilterData from "./FilterReducer";

const rootReducer = combineReducers({
  appReducer,
  FilterData,

  // Add more reducers as needed
});

export default rootReducer;
