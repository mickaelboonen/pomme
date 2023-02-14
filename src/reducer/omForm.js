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
    {
      name: 'Missionnaire',
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
  omLoader: false,
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
        console.log(action.payload);
        state.userOms = action.payload;
      },
      saveMission: (state, action) => {
        
        state.omForm[0].data.omId = action.payload.om.id;

        const formattedValues = declareCamelCaseKeys(action.payload);
        formattedValues.streetNumber = formattedValues.address.streetNumber;
        formattedValues.bis = formattedValues.address.bis;
        formattedValues.streetType = formattedValues.address.streetType;
        formattedValues.streetName = formattedValues.address.streetName;
        formattedValues.postCode = formattedValues.address.postCode;
        formattedValues.city = formattedValues.address.city;
        formattedValues.addressId = formattedValues.address.id;
        delete formattedValues.address;

        state.omForm[0].data = formattedValues;
        
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
        const dataForTheComponent =  {
          advance: false,
          omId: dataForApp.om.id,
          total: dataForApp.totalAmount,
          advanceAmount: dataForApp.advanceAmount,
          hotelQuotation: dataForApp.hotelQuotation,
          otherExpensesAmount: dataForApp.otherExpensesAmount,
          otherExpensesNames: dataForApp.otherExpensesJustitication,
          rib: dataForApp.agentRib,
        }

        if (dataForApp.advanceAmount > 0
          || dataForApp.total > 0
          || dataForApp.otherExpensesAmount > 0) {
            dataForTheComponent.advance = true;
          }
        console.log(dataForTheComponent);
        state.omForm[3].data = dataForTheComponent;
        state.omLoader = false;
      },
      setLoader: (state, action) => {
        state.omLoader = action.payload;
      }
    },
});

export const {
  setLoader,
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
  createDerogation,
  clearSideForm,
  validateSideForm,
  clearOMTarget,
  selectData,
  displayOmStatus,
} = omFormSlice.actions;

export default omFormSlice.reducer;
