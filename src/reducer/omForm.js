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
      data: {
        country: "",
        abroadCosts: null,
        departure: null,
        departurePlace: null,
        workAdress: null,
        missionAdress: null,
        missionPurpose: null,
        missionPurposeFile: null,
        region: null,
        comeback: null,
        comebackPlace: null},
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
  refusal: '',
  adresses: [
    'adresse Vauban', 
    'adresse Carmes', 
    'adresse Hoche', 
    'adresse XYZ', 
  ],
  isSideFormInDB: false,
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
      createDerogation: () => {},
      clearSideForm: (state) => {
        state.isSideFormInDB = false;
      },
      validateSideForm: (state) => {
        state.isSideFormInDB = true;
      },
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
        state.loader = true
      },
      getMore: (state) => {
        state.loader = true;
      },
      updateMore: () => {},
      updateOmName: () => {},
      updateAdvance: () => {},
      updateSignature: () => {},
      updateTransports: () => {},
      updateAccomodations: () => {},
      updateMission: () => {},
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
        state.loaderType = '';
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
          dispensations:  action.payload.dispensations,
          authorizations:  action.payload.authorizations,
          omId: action.payload.om.id,
          vehicleAuthorizationFile: null,
          vehicleAuthorizationFileForValidation: false,
          dispensation: null,
          dispensationForValidation: false,
          taxiDispensation: null,
          taxiDispensationForValidation: false,
        }

        action.payload.dispensations.forEach((dispensation) => {

          if (dispensation && (dispensation.type.includes('train') || dispensation.type.includes('avion'))) {
      
            dataForTheComponent.dispensationForValidation = true;
          }
          else if (dispensation && dispensation.type.includes('taxi')) {
            if (dataForTheComponent.others.indexOf('taxi') === -1) {
              dataForTheComponent.taxiDispensationForValidation = true;
              dataForTheComponent.others.push('taxi');
            }
            
      
          }
          
        });
        

        if (action.payload.taxi) {
          dataForTheComponent.others.push('taxi');
        }
        if (action.payload.parking) {
          dataForTheComponent.others.push('parking');
        }
        
        action.payload.transport_class.forEach((service) => {
          if (service === 'first-class' || service === 'second-class') {
            dataForTheComponent.trainClass = service;
          }
          else if (service === 'business-class' || service === 'eco-class') {
            dataForTheComponent.planeClass = service;
            
          }
        })
        action.payload.transport_payment.forEach((service) => {

          if (service === 'train-paid-by-unimes-t' || service === 'train-paid-by-agent') {
            dataForTheComponent.trainPayment = service.slice(14);
          }
          else if (service === 'plane-paid-by-unimes-t' || service === 'plane-paid-by-user') {
            dataForTheComponent.planePayment = service.slice(14);
            
          }
        })

        if (action.payload.vehicle_authorization === 'pending') {
          dataForTheComponent.vehicleAuthorizationFileForValidation = true;
        }
        else if (action.payload.vehicle_authorization !== null) {
          dataForTheComponent.vehicleAuthorizationFile = action.payload.vehicle_authorization;
        }

        if (action.payload.transport_dispensation === 'pending') {
          dataForTheComponent.dispensationForValidation = true;
        }
        else if (action.payload.transport_dispensation !== null) {
          dataForTheComponent.dispensation = action.payload.transport_dispensation;
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
        console.log('-------------------------');
        console.log(action.payload);
        const { signature, more } = action.payload;
        const dataForTheComponent =  {
            savedSignature: signature.agentSignature ? true : false,
            signature: signature.agentSignature ,
            omId: signature.om.id,
            otherInfos: more.informations,
            otherFiles: more.files,
        }
        console.log(dataForTheComponent);
        console.log('-------------------------');
        state.omForm[4].data = dataForTheComponent;
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
  updateAccomodations,
  createDerogation,
  clearSideForm,
  validateSideForm,
} = omFormSlice.actions;

export default omFormSlice.reducer;
