import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';

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
  dataToSelect: [],
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
      selectData: (state, action) => {
        console.log(action.payload);

        const status = action.payload === 'ec' ? 1 : 8;
        state.dataToSelect = state.userOms.filter((om) => om.status === status);

      },
      displayOmStatus: (state, action) => {
        const omToDisplay = state.userOms.find((om) => om.id === Number(action.payload));
        state.currentOM = omToDisplay ? omToDisplay : {};
      },
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
      clearOMTarget: (state) => {
        state.nextOMTarget = '';
      },
      fetchOMs: () => {},
      saveUserOms: (state, action) => {
        state.userOms = action.payload;
      },
      saveMission: (state, action) => {
        
        state.omForm[0].data.omId = action.payload.om.id;

        const formattedValues = declareCamelCaseKeys(action.payload);
        state.omForm[0].data = formattedValues;
        
        state.loader = false;
      },
      saveTransports: (state, action) => {
        
        const dataForTheComponent = turnTransportsDataToAppFormat(action.payload);
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
  clearOMTarget,
  selectData,
  displayOmStatus,
} = omFormSlice.actions;

export default omFormSlice.reducer;
