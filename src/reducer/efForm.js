import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMissionFormDisabled: true,

};
const omFormSlice = createSlice({
    name: 'efForm',
    initialState,
    reducers: {
      saveMissionFormData: (state, action) => {
        
        let currentIndex;
        state.omForm.forEach((step) => {
          if (step.step === "mission") {
            currentIndex = state.omForm.indexOf(step);
          }
        });

        if (currentIndex !== -1) {
          state.omForm[currentIndex].data = action.payload;
        }
        


      },
      enableMissionFormFields: (state, action) => {
        state.isMissionFormDisabled = !action.payload;
      }
    },
});

export const { saveMissionFormData, enableMissionFormFields } = omFormSlice.actions;

export default omFormSlice.reducer;
