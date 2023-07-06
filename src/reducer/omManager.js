import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';


const initialState = {
  loader: false,
  pendingDocs: [],
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
      }
    }
});

export const {
  fetchPendingOms,
  savePendingOms
} = omManagerSlice.actions;

export default omManagerSlice.reducer;
