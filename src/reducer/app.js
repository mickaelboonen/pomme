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
  currentStep: 0,
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      getVehicles: () => {},
      getSignature: () => {},
      saveSignature: (state, action) => {
        state.userSignature = action.payload.url;
      },
      advanceToNextStep: (state, action) => {
        state.currentStep = action.payload;
      },
      saveVehicles: (state, action) => {
        action.payload.forEach((vehicle) => state.vehicles.push(vehicle));
      },
    },
});

export const { advanceToNextStep, getSignature, saveSignature, getVehicles, saveVehicles } = omFormSlice.actions;

export default omFormSlice.reducer;
