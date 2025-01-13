import * as types from "./ActionTypes";

export const incrementCount = () => ({
  type: types.INCREMENT_COUNT,
});

export const prefences =(preferences:object)=>({
  type: types.PREFERENCES,
  payload:preferences
})

export const setRegistrationResponse =(response:object)=>(
  {
    type:types.REGISTRATION_RESPONSE,
    payload:response
  }
)
export const questionaire=(questions:object)=>({
  type:types.QUESTIONAIRE,
  payload:questions
})
export const removeQuestion=(question:object)=>({
  type:types.REMOVE_QUESTION,
  payload:question
})
export const updateProgress=(progress:object)=>({
  type:types.UPDATE_PROGRESS,
  payload:progress
})
export const changeCount=(count:number)=>({
  type:types.CHANGE_COUNT,
  payload:count
})