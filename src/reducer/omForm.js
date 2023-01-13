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
    }, 
    {
      id: 6,
      step: 'more',
      data: {},
    }, 
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
  userOms: [],
  loader: false,
};
const omFormSlice = createSlice({
    name: 'omForm',
    initialState,
    reducers: {
      saveOm: () => {},
      fetchOm: () => {},
      addNewOM: () => {},
      fetchOMs: () => {},
      uploadFile: () => {},
      getMission: (state) => {
        state.loader = true
      },
      getTransports: () => {},
      getAccomodations: () => {},
      getAdvance: () => {},
      getSignature: () => {},
      updateMore: () => {},
      updateOmName: () => {},
      updateAdvance: () => {},
      updateSignature: () => {},
      updateTransports: () => {},
      updateAccomodations: () => {},
      updateMission: (state, action) => {
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
      saveOm: (state, action) => {
        state.currentOM = action.payload;
      },
      saveNewOm: (state, action) => {
        state.currentOM = action.payload;
        state.nextOMTarget = `/nouveau-document/ordre-de-mission?etape=1&id=${action.payload.id}`;
      },
      fetchOMs: () => {},
      saveUserOms: (state, action) => {
        state.userOms = action.payload;
      },
      saveMission: (state, action) => {
        state.omForm[0].data = action.payload;
        state.loader = false;
      },
    },
});

export const {
  fetchOm,
  saveOm,
  updateOmName,
  updateSignature,
  saveUserOms,
  fetchOMs,
  addNewOM,
  updateMission,
  uploadFile,
  updateTransports,
  saveNewOm,
  updateAdvance,
  updateMore,
  getMission,
  saveMission,
  updateAccomodations
} = omFormSlice.actions;

export default omFormSlice.reducer;
