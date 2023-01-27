import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [],
  unimesVehicles: [],
  documents: [],
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
  needsPdf: false,
  message: null,
};
const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
      getVehicles: () => {},
      getVehicleDocuments: () => {},
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
      saveVehicles: (state, action) => {
        state.unimesVehicles = [];
        state.vehicles = [];
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
      displayVehicle: (state, action) => {
        
        const vehicleToShow = state.vehicles.find((vehicle) => vehicle.id === Number(action.payload))
        let isUnimeVehicle = false;

        state.unimesVehicles.find((vehicle) => {
          if (vehicleToShow && vehicle.id === vehicleToShow.id) {
            isUnimeVehicle = true;
          }
        });
        
        state.formDefaultValues.carType= isUnimeVehicle ? 'company-car': 'personal-car';
        state.formDefaultValues.selectedVehicle= vehicleToShow ? vehicleToShow.id : '';
        state.formDefaultValues.carBrand= vehicleToShow ? vehicleToShow.make : '';
        state.formDefaultValues.carRegistration= vehicleToShow ? vehicleToShow.licensePlate : '';
        state.formDefaultValues.carRating= vehicleToShow ? vehicleToShow.rating : '';
        state.formDefaultValues.carInsurance= vehicleToShow ? vehicleToShow.insurance : '';
        state.formDefaultValues.policeNumber= vehicleToShow ? vehicleToShow.police : '';
        state.currentVehicle = vehicleToShow;
        
        state.currentVehicle = vehicleToShow ? vehicleToShow : {};
      },
      createVehicle: () => {
      },
      requestVehicleAuthorization: () => {
      },
      stayOnAuthorizationForm: (state, action) => {
        state.needsPdf = true;
        state.successMessage = action.payload;
      },
      resetPdfNeed: (state) => {
        state.needsPdf = false;
      },
      setMessage: (state, action) => {
        state.message = action.payload;
      },
      clearMessage: (state) => {
        state.message = null;
      }
    },
});

export const {
  saveVehicleDocuments,
  displayVehicle,
  getVehicles,
  getVehicleDocuments,
  saveVehicle,
  saveVehicles,
  createVehicle,
  requestVehicleAuthorization,
  stayOnAuthorizationForm,
  resetPdfNeed,
  setMessage,
  clearMessage
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
