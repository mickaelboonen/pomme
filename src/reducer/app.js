import { createSlice } from '@reduxjs/toolkit';
import { agentDataToAppFormat } from '../selectors/dataToDbFormat';

const defaultUser = process.env.NODE_ENV === 'development' ? process.env.DEFAULT_USER : '';
console.log(defaultUser, ' : defaultUser');

const initialState = {
  user: defaultUser,
  userSignature: null,
  apiMessage: {},
  appLoader: true,
  isModalOpen: false,
  isAuthenticated: false,
  agent: {},
  agentDocuments:{
    rib: false,
  },
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      authenticate: () => {},
      saveUser: () => {},
      getSignature: () => {},
      validateAuthentication: (state, action) => {
        console.log('i want to validate');
        state.isAuthenticated= true;
        state.user = action.payload.user;
      },
      logout: (state) => {
        state.isAuthenticated= false;
        state.user = '';
      },
      saveSignature: (state, action) => {
        state.userSignature = action.payload.url;
      },
      setApiResponse: (state, action) => {
        state.apiMessage = action.payload;
      },
      clearMessage: (state) => {
        state.apiMessage = {};
      },
      toggleModal:(state) => {
        console.log('here');
        state.isModalOpen = !state.isModalOpen;
      },
      fetchUserData: (state) => {
        state.appLoader = true;
      },
      saveUserData: (state, action) => {
        const data = agentDataToAppFormat(action.payload);
        
        state.agent = data;
        state.appLoader = false;
        
      },
      getDocument: () => {

      },
      saveDocument: (state, action) => {
        state.agentDocuments[action.payload.type] = action.payload.url;
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
  validateAuthentication,
  fetchUserData,
  saveUserData,
  getDocument,
  saveDocument,
} = omFormSlice.actions;

export default omFormSlice.reducer;
