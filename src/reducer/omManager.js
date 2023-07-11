import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';


const initialState = {
  loader: false,
  pendingDocs: [],
  channels: [],
};
const omManagerSlice = createSlice({
    name: 'omManager',
    initialState,
    reducers: {
      fetchPendingOms: (state,) => {
        state.loader = true
      },
      savePendingOms: (state, action) => {
        state.pendingDocs = action.payload;
        state.loader = false;
      },
      fetchValidationChannels: () => {},
      saveValidationChannels: (state, action) => {
        state.channels = action.payload;
      }
    }
});

export const {
  fetchPendingOms,
  savePendingOms,
  fetchValidationChannels,
  saveValidationChannels
} = omManagerSlice.actions;

export default omManagerSlice.reducer;
