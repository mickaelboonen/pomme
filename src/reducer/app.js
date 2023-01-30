import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: 'mboone01',
  userSignature: null,
  apiMessage: {},
  loader: true,
  isModalOpen: false,
};
const omFormSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      authenticate: () => {},
      saveUser: () => {},
      getSignature: () => {},
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
} = omFormSlice.actions;

export default omFormSlice.reducer;
