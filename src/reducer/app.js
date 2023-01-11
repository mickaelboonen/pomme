import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: 'mboone01',
  signature: null,
  vehicles: [
    {
      id: 0,
      name: 'Véhicule personnel, de prêt'
    },
  ],
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      getVehicles: () => {},
      getSignature: () => {},
      saveSignature: (state, action) => {
        state.signature = action.payload.url;
      },
      saveVehicles: (state, action) => {
        action.payload.forEach((vehicle) => state.vehicles.push(vehicle));
      },
    },
});

export const { getSignature, saveSignature, getVehicles, saveVehicles } = omFormSlice.actions;

export default omFormSlice.reducer;
