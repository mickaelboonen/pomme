import { createSlice } from '@reduxjs/toolkit';

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
      data: {
        vehicleAuthorization: null,
        transportDispensation: null,
        publicTransports: true,
        taxi: false,
        parking: false,
        transportType: null,
        transportPayment: null,
        transportClass: null,
    },
    },
    {
      id: 3,
      step: 'accomodations',
      data: {
        omId: null,
        hotel: false,
        nightsNumber: null,
        hotelPayment: null,
        mealsPaidByAgent: null,
        mealsInAdminRestaurants: null,
      },
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
      getTransports: (state) => {
        state.loader = true},
      getAccomodations: (state) => {
        state.loader = true},
      getAdvance: (state) => {
        state.loader = true},
      getSignature: (state) => {
        state.loader = true},
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
        state.omForm[0].data.omId = action.payload.om.id;
        state.loader = false;
      },
      saveTransports: (state, action) => {
        // state.omForm[1].data = action.payload;
        console.log('-------------------------------------------------------', action.payload);

        const trucbis =  {
          trainClass: null,
          trainPayment: null,
          planeClass: null,
          planePayment: null,
          vehicle: action.payload.vehicle ? action.payload.vehicle.id : null,
          publicTransports: action.payload.publicTransports,
          others:  [action.payload.taxi],
          omId: 62,
          vehicleAuthorizationFile: {},
          vehicleAuthorizationFileForValidation: false
        }

        if (action.payload.taxi) {
          trucbis.others.push('taxi');
        }
        if (action.payload.parking) {
          trucbis.others.push('parking');
        }
        if (action.payload.transportClass.length === 1) {
          if (action.payload.transportClass[0].includes('first')) {
            trucbis.trainClass = action.payload.transportClass[0];
          }
          else if (action.payload.transportClass[0].includes('business')) {
            trucbis.planeClass = action.payload.transportClass[0];
          }
        }
        else if (action.payload.transportClass.length === 2) {
          trucbis.trainClass = action.payload.transportClass.find((trainClass) => trainClass === "first-class");
          trucbis.planeClass = action.payload.transportClass.find((planeClass) => planeClass === "business-class");
          
        }









        console.log(trucbis, '-------------------------------------------------');
        state.omForm[0].data = trucbis;

        state.omForm[1].data.omId = action.payload.om.id;
        state.loader = false;
      },
      saveAccomodations: (state, action) => {
        state.omForm[2].data = action.payload;
        state.omForm[2].data.omId = action.payload.om.id;
        state.loader = false;
      },
      saveMore: (state, action) => {
        state.omForm[5].data = action.payload;
        state.omForm[5].data.omId = action.payload.om.id;
        state.loader = false;
      },
      saveAdvance: (state, action) => {
        state.omForm[4].data = action.payload;
        state.omForm[4].data.omId = action.payload.om.id;
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
  getTransports,
  getAdvance,
  getAccomodations,
  getMore,
  saveMission,
  saveTransports,
  saveAccomodations,
  saveAdvance,
  saveMore,
  updateAccomodations
} = omFormSlice.actions;

export default omFormSlice.reducer;
