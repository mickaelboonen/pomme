import { createSlice } from '@reduxjs/toolkit';
import { extractUserData } from '../selectors/dataToDbFormat';

const initialState = {
  apiMessage: {},
  appLoader: false,
  isModalOpen: false,
  isAuthenticated: false,
  agentDocuments:{
    rib: false,
  },
  countries: [],
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      pouet: () => {},
      authenticate: () => {},
      saveUser: () => {},
      // getSignature: () => {},
      logout: (state) => {
        state.isAuthenticated= false;
        state.user = '';
      },
      setApiResponse: (state, action) => {
        
        if (action.payload.name === 'AxiosError') {
          const newError = {
            response: {
              data: action.payload.response.data,
              status: action.payload.response.status,
              statusText:action.payload.response.statusText, 
            },
            message: action.payload.message,
          }
          
          state.apiMessage = newError;
        }
        else {
          state.apiMessage = action.payload;
        }
      },
      
      clearMessage: (state) => {
        state.apiMessage = {};
      },
      toggleModal:(state) => {
        
        state.isModalOpen = !state.isModalOpen;
        
      },
      fetchUserData: (state) => {
        // state.appLoader = true;
      },
      saveUserData: (state, action) => {
        const data = extractUserData(action.payload.agent);
        state.agent = data;
        // state.appLoader = false;
        
      },
      getDocument: () => {},
      saveDocument: (state, action) => {
        state.agentDocuments[action.payload.type] = action.payload.url;
      },
      fetchCountries: () => {},
      saveCountries: (state, action) => {
        state.countries = action.payload;
      },
      addSteps: () => {

      },
      handleSteps: () => {

      },
      deleteStep: () => {

      },
    },
});

export const {
  authenticate, 
  saveUser,
  clearMessage,
  setApiResponse,
  // getSignature,
  // saveSignature,
  toggleModal,
  logout,
  // validateAuthentication,
  fetchUserData,
  saveUserData,
  getDocument,
  saveDocument,
  fetchCountries,
  saveCountries,
  addSteps,
  handleSteps,
  pouet,
  deleteStep,
} = omFormSlice.actions;

export default omFormSlice.reducer;
