import * as types from "../actions/ActionTypes";
interface AppState {
  prefences: object;
  count: number;
  questionaire: { [key: number]: string }; // Add an index signature to allow accessing properties using numbers as keys
  reg_response: object;
}

interface Action {
  type: string;
  payload: object;
}

const initialState: AppState = {
  prefences: {},
  count: 0,
  questionaire: {},
  reg_response: {},
};

const AppReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    // case types.INCREMENT_COUNT:
    //   return {
    //     ...state,
    //     count: state.count + 1,
    //   };
    case types.PREFERENCES:
      console.log(action.payload);
      return {
        ...state,
        prefences: action.payload,
      };
    case types.REGISTRATION_RESPONSE:
      return {
        ...state,
        reg_response: action.payload,
      };
    case types.QUESTIONAIRE:
      return {
        ...state,
        questionaire: { ...state.questionaire, ...action.payload },
      };
    case types.REMOVE_QUESTION:{
      const quesID=Object.keys(action.payload)
      const newQuestionaire = { ...state.questionaire };
      console.log(newQuestionaire, quesID, "DeleteQuestions")
      console.log(action)
      delete newQuestionaire[parseInt(quesID[0])];
      return {
        ...state,
        questionaire: newQuestionaire,
      };
    }
    case types.UPDATE_PROGRESS:{
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.CHANGE_COUNT:
      return {
        ...state,
        count: state.count + Number(action.payload),
      };

    default:
      return state;
  }
};

export default AppReducer;
