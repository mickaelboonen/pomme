import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';


const initialState = {
  steps: [
    {
      name: 'Mission',
      property: 'mission',
      id: 1,
    },
    {
      name: 'Transports',
      property: 'transports',
      id: 2,
    },
    {
      name: 'Hébergement & Repas',
      property: 'accomodations',
      id: 3,
    },
    {
      name: 'Avance',
      property: 'advance',
      id: 4,
    },
    {
      name: 'Autre',
      property: 'signature',
      id: 5,
    },
    {
      name: 'Missionnaire',
      property: 'missioner',
      id: 6,
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
  ],
  omPdf: "null",
  currentOM: {},
  nextOMTarget: '',
  OMTabs: [
    {
      id: 'ec',
      name: 'En cours',
    },
    {
      id: 'sub',
      name: 'En attente de validation',
    },
    {
      id: 'ok',
      name: 'Validés',
    },
    {
      id: 'perm',
      name: 'Permanents',
    }
  ],
  userOms: [],
  dataToSelect: [],
  omLoader: false,
  isSideFormInDB: false,
  services: [],
  departments: [],
};
const omFormSlice = createSlice({
    name: 'omForm',
    initialState,
    reducers: {
      selectOmData: (state, action) => {

        let status = 1;
        if (action.payload === 'ec') {
          status = 1;
        }
        else if (action.payload === 'sub') {
          status = 2;
          
        }
        else if (action.payload === 'ok') {
          status = 8;
        }
        
        state.dataToSelect = action.payload.filter((om) => om.status === status);
        state.currentOM = {};
      },
      displayOmStatus: (state, action) => {
        const omToDisplay = action.payload.data.find((om) => om.id === Number(action.payload.om));
        state.currentOM = omToDisplay ? omToDisplay : {};

      },
      // saveOm: () => {},
      saveOmPdf: (state, action) => {
        state.omPdf= action.payload
      },
      fetchOm: (state) => {
        state.omLoader = true
      },
      addNewOM: () => {},
      fetchOMs: () => {},
      uploadFile: () => {},
      createDispensation: () => {},
      clearSideForm: (state) => {
        state.isSideFormInDB = false;
      },
      validateSideForm: (state) => {
        state.isSideFormInDB = true;
      },
      getMission: (state) => {
        state.omLoader = true
      },
      getTransports: (state) => {
        state.omLoader = true},
      getAccomodations: (state) => {
        state.omLoader = true},
      getAdvance: (state) => {
        state.omLoader = true},
      getSignature: (state) => {
        state.omLoader = true
      },
      getMore: (state) => {
        state.omLoader = true;
      },
      updateMoreAndSignature: () => {},
      updateOm: () => {},
      updateOmName: () => {},
      updateAdvance: () => {},
      // updateSignature: () => {},
      updateTransports: () => {},
      updateAccomodations: () => {},
      updateMission: () => {},
      saveOm: (state, action) => {
        state.currentOM = action.payload;
        state.omForm[0].data = declareCamelCaseKeys(action.payload.mission);
        state.omForm[1].data = turnTransportsDataToAppFormat(declareCamelCaseKeys(action.payload.transports));
        state.omForm[2].data = declareCamelCaseKeys(action.payload.accomodations);
        state.omForm[3].data = declareCamelCaseKeys(action.payload.advance);
        state.omForm[4].data = declareCamelCaseKeys({...action.payload.signature, ...action.payload.more});
        
        state.omLoader = false;
      },
      saveNewOm: (state, action) => {
        state.currentOM = action.payload;
        state.nextOMTarget = `/modifier-un-document/ordre-de-mission?etape=1&id=${action.payload.id}`;
      },
      clearOMTarget: (state) => {
        state.nextOMTarget = '';
      },
      fetchOMs: (state) => {
        state.currentOM = {};
      },
      saveUserOms: (state, action) => {
        state.userOms = action.payload;
        state.dataToSelect = state.userOms.filter((om) => om.status === 1);
        
        state.omLoader = false;
      },
      saveMission: (state, action) => {
        
        state.omForm[0].data.omId = action.payload.om.id;        
        state.omForm[0].data = declareCamelCaseKeys(action.payload);
        
        state.omLoader = false;
      },
      saveTransports: (state, action) => {
        
        const dataForApp = declareCamelCaseKeys(action.payload);
        const dataForTheComponent = turnTransportsDataToAppFormat(dataForApp);
        state.omForm[1].data = dataForTheComponent;
        state.omLoader = false;
      },
      saveAccomodations: (state, action) => {
        
        state.omForm[2].data.omId = action.payload.om.id;

        const dataForApp = declareCamelCaseKeys(action.payload);
        state.omForm[2].data = dataForApp;
        
        state.omLoader = false;
      },
      saveMore: (state, action) => {
        const { signature, more } = action.payload;
        const dataForTheComponent =  {
            savedSignature: false,
            signature: signature.agent_signature ,
            omId: signature.om.id,
            otherInfos: more.informations,
            otherFiles: more.files,
        }
        state.omForm[4].data = dataForTheComponent;
        state.omLoader = false;
      },
      saveAdvance: (state, action) => {
        const dataForApp = declareCamelCaseKeys(action.payload);
        console.log("DATA FOR APP = ", dataForApp);
        const dataForTheComponent =  {
          savedRib: false,
          advance: dataForApp.advance,
          omId: dataForApp.om.id,
          total: dataForApp.totalAmount,
          advanceAmount: dataForApp.advanceAmount,
          hotelQuotations: dataForApp.hotelQuotations,
          otherExpensesAmount: dataForApp.otherExpensesAmount,
          otherExpensesJustitication: dataForApp.otherExpensesJustitication,
          rib: dataForApp.agentRib,
        }

        if (dataForApp.advanceAmount > 0
          || dataForApp.total > 0
          || dataForApp.otherExpensesAmount > 0) {
            dataForTheComponent.advance = true;
          }
          
        state.omForm[3].data = dataForTheComponent;
        state.omLoader = false;
      },
      setLoader: (state, action) => {
        state.omLoader = action.payload;
      },
      deleteAddress: () => {},
      createScientificEvent: () => {},
      changeFileStatus: () => {},
      deleteOm: () => {},
    },
});

export const {
  setLoader,
  fetchOm,
  saveOm,
  updateOmName,
  // updateSignature,
  saveUserOms,
  fetchOMs,
  addNewOM,
  updateMission,
  uploadFile,
  updateTransports,
  saveNewOm,
  updateAdvance,
  updateMoreAndSignature,
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
  createDispensation,
  clearSideForm,
  validateSideForm,
  clearOMTarget,
  selectOmData,
  displayOmStatus,
  saveOmPdf,
  updateOm,
  deleteAddress,
  createScientificEvent,
  changeFileStatus,
  deleteOm
} = omFormSlice.actions;

export default omFormSlice.reducer;
