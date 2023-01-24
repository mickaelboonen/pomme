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
  unimesVehicles: [],
  documents: [],
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
    reasons: [],
    otherReason: null,
    savedRegistration: false,
    carRegistrationFile: null,
    savedRegistration: false,
    carInsuranceFile: null,
    signature: null,
    externalSignature: null
  },
  loader: true,
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      getVehicles: () => {},
      getVehicleDocuments: () => {},
      getSignature: () => {},
      saveVehicleDocuments: (state, action) => {
        state.documents= action.payload;

        action.payload.forEach((doc) => {
          if (doc.type === 'registration') {
            state.formDefaultValues.carRegistrationFile = doc.url;
            state.formDefaultValues.savedRegistration = true;
          }
          if (doc.type === 'insurance') {
            state.formDefaultValues.carInsuranceFile = doc.url;
            state.formDefaultValues.savedInsurance = true;

          }
        })
        state.loader = false;
      },
      saveSignature: (state, action) => {
        state.userSignature = action.payload.url;
      },
      saveVehicles: (state, action) => {



        action.payload.forEach((vehicle) => {
          if (vehicle.user === 'unimes') {
            state.unimesVehicles.push(vehicle)
          }
          else {
            state.vehicles.push(vehicle)
          }
        });
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
        
        state.formDefaultValues.carType= 'personal-car';
        state.formDefaultValues.selectedVehicle= vehicleToShow.id;
        state.formDefaultValues.carBrand= vehicleToShow.make;
        state.formDefaultValues.carRegistration= vehicleToShow.licensePlate;
        state.formDefaultValues.carRating= vehicleToShow.rating;
        state.formDefaultValues.carInsurance= vehicleToShow.insurance;
        state.formDefaultValues.policeNumber= vehicleToShow.police;
        
        state.currentVehicle = vehicleToShow;
      },
      createVehicle: () => {
        
      },
      requestVehicleAuthorization: () => {
        
      },
    },
});

export const {
  saveVehicleDocuments,
  displayVehicle,
  clearMessage,
  setApiResponse,
  getSignature,
  saveSignature,
  getVehicles,
  getVehicleDocuments,
  saveVehicle,
  saveVehicles,
  createVehicle,
  requestVehicleAuthorization
} = omFormSlice.actions;

export default omFormSlice.reducer;
