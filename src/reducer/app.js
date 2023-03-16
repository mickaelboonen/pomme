import { createSlice } from '@reduxjs/toolkit';
import { agentDataToAppFormat } from '../selectors/dataToDbFormat';

// const defaultUser = process.env.NODE_ENV === 'development' ? process.env.DEFAULT_USER : '';
// console.log(defaultUser, ' : defaultUser');

const initialState = {
  // user: defaultUser,
  userSignature: null,
  apiMessage: {},
  appLoader: false,
  isModalOpen: false,
  isAuthenticated: false,
  // agent: {},
  agentDocuments:{
    rib: false,
  },
  countries: [],
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      authenticate: () => {},
      saveUser: () => {},
      getSignature: () => {},
      // validateAuthentication: (state, action) => {
        
      //   state.isAuthenticated= true;
      //   state.user = action.payload.user;
      // },
      logout: (state) => {
        state.isAuthenticated= false;
        state.user = '';
      },
      saveSignature: (state, action) => {
        state.userSignature = action.payload.url;
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
        const data = agentDataToAppFormat(action.payload);
        
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
  getSignature,
  saveSignature,
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
  deleteStep,
} = omFormSlice.actions;

export default omFormSlice.reducer;
