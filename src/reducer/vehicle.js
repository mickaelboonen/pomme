import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [],
  unimesVehicles: [],
  vehicleTypes: [
    {
      id: 0,
      name: 'Véhicule personnel, de prêt'
    },
    {
      id: 1,
      name: 'Covoiturage (passager)'
    },
    {
      id: 2,
      name: 'Véhicule de service'
    },
    {
      id: 3,
      name: 'Véhicule de location'
    },
  ],
  documents: [],
  currentVehicle: {},
  formDefaultValues: {
    carType: null,
    selectedVehicle: null,
    make: null,
    licensePlate: null,
    rating: null,
    insurance: null,
    police: null,
    registrationFile: null,
    insuranceFile: null,
    reasons: [],
    otherReason: null,
    savedRegistration: false,
    carRegistrationFile: null,
    savedRegistration: false,
    carInsuranceFile: null,
    signature: null,
    externalSignature: null,
  },
  loader: true,
  needsPdf: false,
  message: null,
  savedAuthorization: {},
  authorizationFile: null,
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
        state.loader = false;
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
        state.formDefaultValues.make= vehicleToShow ? vehicleToShow.make : '';
        state.formDefaultValues.licensePlate= vehicleToShow ? vehicleToShow.licensePlate : '';
        state.formDefaultValues.rating= vehicleToShow ? vehicleToShow.rating : '';
        state.formDefaultValues.insurance= vehicleToShow ? vehicleToShow.insurance : '';
        state.formDefaultValues.police= vehicleToShow ? vehicleToShow.police : '';
        state.formDefaultValues.insuranceFile= vehicleToShow ? vehicleToShow.insuranceFile : '';
        state.formDefaultValues.registrationFile= vehicleToShow ? vehicleToShow.registrationFile : '';
        state.currentVehicle = vehicleToShow;
        
        state.currentVehicle = vehicleToShow ? vehicleToShow : {};
      },
      createVehicle: () => {
      },
      requestVehicleAuthorization: () => {
      },
      stayOnAuthorizationForm: (state, action) => {
        state.needsPdf = true;
        state.savedReasons = action.payload.reasons;
      },
      resetPdfNeed: (state) => {
        state.needsPdf = false;
        state.savedAuthorization= {};
        state.message= null,
        state.formDefaultValues= {
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
        };
      },
      setMessage: (state, action) => {
        delete action.payload.headers;
        delete action.payload.config;
        delete action.payload.statusText;
        delete action.payload.request;
        state.message = action.payload;
      },
      clearMessage: (state) => {
        state.message = null;
      },
      updateVehicle: () => {

      },
      deleteVehicle: () => {

      },
      saveAuthorization: (state, action) => {
        state.savedAuthorization = action.payload;
      },
      saveAuthorizationFile: (state, action) => {
        state.authorizationFile = action.payload
      },
      fetchVehicle: () => {

      },
      saveVehicle: (state, action) => {
        state.currentVehicle = action.payload;
        state.loader = false;
      },
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
  clearMessage,
  updateVehicle,
  deleteVehicle,
  saveAuthorization,
  saveAuthorizationFile,
  fetchVehicle,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
