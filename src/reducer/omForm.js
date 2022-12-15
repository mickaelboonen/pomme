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
  currentOM: {},
  nextOMTarget: '',
  OMTabs: [
    {
      id: 'ec',
      name: 'En cours',
    },
    {
      id: 'ok',
      name: 'Validés',
    }
  ],
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
        


      },
      addNewOM: (state, action) => {

      },
      saveNewOm: (state, action) => {
        state.currentOM = action.payload;
        state.nextOMTarget = `/nouveau-document/ordre-de-mission?etape=1&id=${action.payload.id}`;
      },
      fetchOMs: (state, action) => {
      }
    },
});

export const { fetchOMs, addNewOM, saveMissionFormData, saveNewOm } = omFormSlice.actions;

export default omFormSlice.reducer;
