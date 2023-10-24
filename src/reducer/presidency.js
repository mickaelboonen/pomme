import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';

var lodash = require('lodash/collection');
var lodashArray = require('lodash/array');


const initialState = {
  loader: false,
  presidencyUsers: [],
  presidencyVehicles: []
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
    }
});

export const {
  setPresidencyLoader,
  fetchPresidencyUsers,
  savePresidencyUsers,
  fetchPresidencyVehicles,
  savePresidencyVehicles
} = presidencySlice.actions;

export default presidencySlice.reducer;
