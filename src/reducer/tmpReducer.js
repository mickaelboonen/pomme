import { createSlice } from '@reduxjs/toolkit';
import { extractUserData, extractAgentPersonalAddress, extractAgentProfessionalAddress } from '../selectors/dataToDbFormat';

const defaultUser = process.env.NODE_ENV === 'development' ? process.env.DEFAULT_USER : '';

const initialState = {
  agent: {},
  agentProfessionalAddress: {},
  agentPersonalAddress: {},
  loader: false,
  signature: ''
};

const agentSlice = createSlice({
    name: 'tmp',
    initialState,
    reducers: {
      fetchTmpUserData: (state) => {
        state.loader = true
      },
      saveTmpUserData: (state, action) => {
        state.agentProfessionalAddress = extractAgentProfessionalAddress(action.payload.professionalAddress);
        state.agentPersonalAddress = extractAgentPersonalAddress(action.payload.personalAddress);
        state.agent = extractUserData(action.payload);
        state.loader = false;
        if (action.payload.personalAddress === null) {
          state.missingData = true;
        }
        else {
          state.missingData = false;
        }
      },
      fetchTmpSignature: () => {

      },
      saveTmpSignature: (state, action) => {
        state.signature = action.payload;
      }
    },
});

export const {
  fetchTmpUserData,
  saveTmpUserData,
  fetchTmpSignature,
  saveTmpSignature
} = agentSlice.actions;

export default agentSlice.reducer;