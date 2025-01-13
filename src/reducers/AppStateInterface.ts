export interface AppState {
    appReducer: {
      count: number;
      preference: object; // Update with actual type
      questionaire: object; // Update with actual type
      reg_response: object; // Update with actual type
      myDetailsCompleted: boolean; // Add this property
      programPreferencesCompleted: boolean; // Add if needed
      questionnaireCompleted: boolean; // Add if needed
      videoSubmitted: boolean;

    };
  }