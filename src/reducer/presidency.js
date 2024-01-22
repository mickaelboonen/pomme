import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';

var lodash = require('lodash/collection');
var lodashArray = require('lodash/array');


const initialState = {
  loader: false,
  presidencyUsers: [],
  presidencyVehicles: [],
  currentOm: null,
  pdfsToCreate: [],
  proceedToPdf: false,
};
const presidencySlice = createSlice({
    name: 'presidency',
    initialState,
    reducers: {
      setPresidencyLoader: (state, action) => {
        state.loader = action.payload
      },
      fetchPresidencyUsers: (state,) => {
        state.loader = true
      },
      savePresidencyUsers: (state, action) => {
        state.presidencyUsers = action.payload;
        state.loader = false;
      },
      fetchPresidencyVehicles: (state,) => {
        // state.loader = true
      },
      savePresidencyVehicles: (state, action) => {
        state.presidencyVehicles = action.payload;
        // state.loader = false;
      },
      createPermOm: () => {

      },
      proceedToPdfPage: (state, action) => {
        state.proceedToPdf = true;
        state.pdfsToCreate = action.payload.docs;
        state.currentOm = action.payload.om;
        localStorage.setItem('permanentOm', JSON.stringify(action.payload.om));
        localStorage.setItem('pdfsToCreate', JSON.stringify(action.payload.docs));
      },
      createPermOmPDF: () => {}
    }
});

export const {
  setPresidencyLoader,
  fetchPresidencyUsers,
  savePresidencyUsers,
  fetchPresidencyVehicles,
  savePresidencyVehicles,
  createPermOm,
  createPermOmPDF,
  proceedToPdfPage
} = presidencySlice.actions;

export default presidencySlice.reducer;
