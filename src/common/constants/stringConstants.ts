// all static data should declare here as strings
// check below example

export const STRINGS={
    // STATIC_STRING_VARIABLE: "static example string"
    APP_TITLE: "HDB",
    MY_PROFILE: "My Profile",
    LOGOUT:"Logout"
}
export interface AppState {
    // appReducer: {
    //     questionaire: { [key: string]: string };
    //   };
    count: number;
    preference: object; // Update with actual type
    questionaire: object; // Update with actual type
    reg_response: object; // Update with actual type
    myDetailsCompleted: boolean; // Add this property
    programPreferencesCompleted: boolean; // Add if needed
    questionnaireCompleted: boolean; // Add if needed
    videoSubmitted: boolean; // Add if needed
  }
  