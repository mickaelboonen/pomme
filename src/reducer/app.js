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
  currentVehicle: {},
  formDefaultValues: {
    carType: null,
    selectedVehicle: null,
    carBrand: null,
    carRegistration: null,
    carRating: null,
    carInsurance: null,
    policeNumber: null,
    reasons: null,
    otherReason: null,
    carRegistrationFile: null,
    carInsuranceFile: null,
    signature: null,
    externalSignature: null
  }
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
      displayVehicle: (state, action) => {
        
        const vehicleToShow = state.vehicles.find((vehicle) => vehicle.id === Number(action.payload))
        
        state.formDefaultValues. carBrand= vehicleToShow.make;
        state.formDefaultValues. carRegistration= vehicleToShow.licensePlate;
        state.formDefaultValues. carRating= vehicleToShow.rating;
        state.formDefaultValues. carInsurance= vehicleToShow.insurance;
        state.formDefaultValues. policeNumber= vehicleToShow.police;
        
        
        state.currentVehicle = vehicleToShow;
      }
    },
});

export const { displayVehicle, clearMessage, setApiResponse, getSignature, saveSignature, getVehicles, getVehicle, saveVehicle, saveVehicles } = omFormSlice.actions;

export default omFormSlice.reducer;
