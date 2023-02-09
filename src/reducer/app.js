import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: process.env.NODE_ENV === 'development' ? 'mboone01' : '',
  userSignature: null,
  apiMessage: {},
  loader: true,
  isModalOpen: false,
  isAuthenticated: false,
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
      }
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
  validateAuthentication
} = omFormSlice.actions;

export default omFormSlice.reducer;
