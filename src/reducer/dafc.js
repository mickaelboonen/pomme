import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';


const initialState = {
  loader: false,
  pendingDocs: [],
};
const dafcSlice = createSlice({
    name: 'dafc',
    initialState,
    reducers: {
      fetchPendingsAdvances: (state) => {
        state.loader= true;
      },
      savePendingAdvances: (state, action) => {
        state.pendingDocs = action.payload;
        state.loader= false;

      },
    }
});

export const {
  fetchPendingsAdvances,
  savePendingAdvances
} = dafcSlice.actions;

export default dafcSlice.reducer;
