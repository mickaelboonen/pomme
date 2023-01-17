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
        publicTransports: false,
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
      step: 'advance',
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
        
        const dataForTheComponent =  {
          trainClass: null,
          trainPayment: null,
          planeClass: null,
          planePayment: null,
          vehicle: action.payload.vehicle ? action.payload.vehicle.id : null,
          publicTransports: action.payload.publicTransports,
          others:  [],
          omId: action.payload.om.id,
          vehicleAuthorizationFile: null,
          vehicleAuthorizationFileForValidation: false,
          dispensation: null,
          dispensationForValidation: false,
        }
        

        if (action.payload.taxi) {
          dataForTheComponent.others.push('taxi');
        }
        if (action.payload.parking) {
          dataForTheComponent.others.push('parking');
        }
        
        action.payload.transportClass.forEach((service) => {
          if (service === 'first-class' || service === 'second-class') {
            dataForTheComponent.trainClass = service;
          }
          else if (service === 'business-class' || service === 'eco-class') {
            dataForTheComponent.planeClass = service;
            
          }
        })
        action.payload.transportPayment.forEach((service) => {

          if (service === 'train-paid-by-unimes-t' || service === 'train-paid-by-agent') {
            dataForTheComponent.trainPayment = service.slice(14);
          }
          else if (service === 'plane-paid-by-unimes-t' || service === 'plane-paid-by-user') {
            dataForTheComponent.planePayment = service.slice(14);
            
          }
        })

        if (action.payload.vehicleAuthorization === 'pending') {
          dataForTheComponent.vehicleAuthorizationFileForValidation = true;
        }
        else if (action.payload.vehicleAuthorization !== null) {
          dataForTheComponent.vehicleAuthorizationFile = action.payload.vehicleAuthorization;
        }

        if (action.payload.transportDispensation === 'pending') {
          dataForTheComponent.dispensationForValidation = true;
        }
        else if (action.payload.transportDispensation !== null) {
          dataForTheComponent.dispensation = action.payload.transportDispensation;
        }

        state.omForm[1].data = dataForTheComponent;
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
        const dataForTheComponent =  {
          advance: action.payload.advanceAmount ? true : false,
          omId: action.payload.om.id,
          total: action.payload.totalAmount,
          advanceAmount: action.payload.advanceAmount,
          hotelQuotation: action.payload.hotelQuotation,
          otherExpensesAmount: action.payload.otherExpensesAmount,
          otherExpensesNames: action.payload.otherExpensesJustitication,
          rib: action.payload.agentRib,
        }
        console.log(dataForTheComponent);
        state.omForm[3].data = dataForTheComponent;
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
