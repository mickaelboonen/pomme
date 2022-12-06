import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  steps: [
    {
      name: 'Mission',
      id: 1,
    },
    {
      name: 'Transports',
      id: 2,
    },
    {
      name: 'Hébergements',
      id: 3,
    },
    {
      name: 'Avance',
      id: 4,
    },
    {
      name: 'Signature',
      id: 5,
    },
  ],
  omForm : [
    {
      id: 1,
      step: 'mission',
      data: {},
    },
    {
      id: 2,
      step: 'transports',
      data: {},
    },
    {
      id: 3,
      step: 'hebergements',
      data: {},
    },
    {
      id: 4,
      step: 'avance',
      data: {},
    },
    {
      id: 5,
      step: 'signature',
      data: {},
    }
  ],
  id: 1245,

};
const omFormSlice = createSlice({
    name: 'omForm',
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
        


      }
    },
});

export const { saveMissionFormData } = omFormSlice.actions;

export default omFormSlice.reducer;
