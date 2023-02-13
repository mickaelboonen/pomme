import { createSlice } from '@reduxjs/toolkit';
import { agentDataToAppFormat } from '../selectors/dataToDbFormat';

const initialState = {
  user: 'mboone01',
  userSignature: null,
  apiMessage: {},
  loader: true,
  isModalOpen: false,
  isAuthenticated: false,
  agent: {},
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      authenticate: () => {},
      saveUser: () => {},
      getSignature: () => {},
      validateAuthentication: (state, action) => {
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
      fetchUserData: () => {

      },
      saveUserData: (state, action) => {
        console.log('REDUCER : ',action.payload);

        const data = agentDataToAppFormat(action.payload);
        
        state.agent = data;
        state.loader = false;
        
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
} = omFormSlice.actions;

export default omFormSlice.reducer;
