import { createSlice } from '@reduxjs/toolkit';
import { agentDataToAppFormat } from 'src/selectors/dataToDbFormat';

const defaultUser = process.env.NODE_ENV === 'development' ? process.env.DEFAULT_USER : '';
console.log(defaultUser, ' : defaultUser');

const initialState = {
  user: defaultUser,
  userSignature: null,
  oms: [],
  efs: [],
  isAuthenticated: false,
  agent: {},
  agentDocuments:{
    rib: false,
  },
};

const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
      validateAuthentication: (state, action) => {
        state.isAuthenticated= true;
        state.user = action.payload.user;
      },
      saveUserData: (state, action) => {
        const data = agentDataToAppFormat(action.payload);
        
        state.agent = data;
        state.appLoader = false;
      },
      fetchOMs: () => {},
      fetchEfs: () => {},
      saveOMs: (state, action) => {
        state.oms = action.payload;
        state.dataToSelect = state.userOms.filter((om) => om.status === 1);
        // state.omLoader = false;
      },
      saveEfs: (state, action) => {
        state.efs = action.payload;
        state.efPerSelectedStatus = state.userEfs.filter((ef) => ef.status === 1);
        // state.efLoader = false;
      },
      fetchUserData: () => {},
    },
});

export const {
  validateAuthentication,
  saveUserData,
  fetchOMs,
  fetchEfs,
  saveOMs,
  saveEfs, fetchUserData,
} = agentSlice.actions;

export default agentSlice.reducer;
