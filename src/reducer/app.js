import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: 'mboone01',
  userSignature: null,
  vehicles: [
    {
      id: 0,
      name: 'Véhicule personnel, de prêt'
    },
  ],
  currentStep: 1,
  apiMessage: {},
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      getVehicles: () => {},
      getVehicle: () => {},
      getSignature: () => {},
      saveSignature: (state, action) => {
        state.userSignature = action.payload.url;
      },
      saveVehicles: (state, action) => {
        action.payload.forEach((vehicle) => state.vehicles.push(vehicle));
      },
      saveVehicle: (state, action) => {
        // action.payload.forEach((vehicle) => state.vehicles.push(vehicle));
      },
      setApiResponse: (state, action) => {
        state.apiMessage = action.payload;
      },
      clearMessage: (state) => {
        state.apiMessage = {};
      },
    },
});

export const { clearMessage, setApiResponse, getSignature, saveSignature, getVehicles, getVehicle, saveVehicle, saveVehicles } = omFormSlice.actions;

export default omFormSlice.reducer;
