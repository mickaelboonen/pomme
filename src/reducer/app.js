import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: 'mboone01',
  signature: null,
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      getSignature: (state, action) => {

      },
      saveSignature: (state, action) => {
        state.signature = action.payload.url;
      },
    },
});

export const { getSignature, saveSignature } = omFormSlice.actions;

export default omFormSlice.reducer;
