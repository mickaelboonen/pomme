import { createSlice } from '@reduxjs/toolkit';
import { extractUserData, extractAgentPersonalAddress, extractAgentProfessionalAddress } from '../selectors/dataToDbFormat';

const defaultUser = process.env.NODE_ENV === 'development' ? process.env.DEFAULT_USER : '';

const initialState = {
  user: defaultUser,
  token: '',
  oms: [],
  efs: [],
  documentsList: [],
  isAuthenticated: false,
  agent: {},
  agentProfessionalAddress: {},
  agentPersonalAddress: {},
  loader: false,
  currentDoc: {},
  agentPreferences: {},
  missingData: true
};

const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
      addOmToList: (state, action) => {
        const oms = state.oms;
        oms.push(action.payload);
        state.oms = oms;
        // state.oms.push(action.payload);

      },
      logout: (state) => {
        state.userSignature = null;
        state.user = defaultUser;
        state.token = '';
        state.oms = [];
        state.efs = [];
        state.documentsList = [];
        state.isAuthenticated = false;
        state.agent = {};
        state.agentProfessionalAddress = {};
        state.agentPersonalAddress = {};
        state.loader = false;
        state.currentDoc = {};
      },
      validateAuthentication: (state, action) => {
        state.isAuthenticated= true;
        state.user = action.payload.user;
      },
      fetchAgentAppDocuments: () => {},
      savegentAppDocuments: () => {},
      fetchOMs: (state) => {
        state.loader = true
        state.currentDoc = {};
      },
      fetchEfs: (state) => {
        state.loader = true
        state.currentDoc = {};
      },
      saveOMs: (state, action) => {
        state.oms = action.payload;
        state.loader = false;
      },
      saveEfs: (state, action) => {
        state.efs = action.payload;
        state.loader = false;
      },
      fetchUserData: () => {},
      selectDocumentsList: (state, action) => {

        const { target, id } = action.payload;

        let status = 1;
        if (target === 'ec') {
          // status = 1;
          state.documentsList = state[id].filter((doc) => doc.status === 1);
        }
        else if (target === 'as') {
          status = 2;
          state.documentsList = state[id].filter((doc) => doc.status === status);
        }
        else if (target === 'sub') {
          // status = 2;
          const statusesToIgnore = [0, 1, 9, 10, 11, 12];
          state.documentsList = state[id].filter((doc) => statusesToIgnore.indexOf(doc.status) === -1);
        }
        else if (target === 'ok') {
          // status = 8;
          state.documentsList = state[id].filter((doc) => doc.status >= 9 && doc.is_ponctual);
        }
        else if (target === 'perm') {
          state.documentsList = state[id].filter((doc) => doc.is_ponctual === false);
        }

        state.currentDoc = {};
      },
      showDocStatus: (state, action) => {
        const doc = state[action.payload.type].find((doc) => doc.id === Number(action.payload.doc));
        state.currentDoc = doc ? doc : {};

      },
      checkAuthentication: () => {},
      fetchUserLightData: (state, action) => {
        state.isAuthenticated= true;
        state.user = action.payload.id;
        state.token = action.payload.token;
      },
      saveUserLightData: (state, action) => {
        const data = extractUserData(action.payload);
        state.agent = data;
      },
      saveUserData: (state, action) => {
        state.agentProfessionalAddress = extractAgentProfessionalAddress(action.payload.professionalAddress);
        state.agentPersonalAddress = extractAgentPersonalAddress(action.payload.personalAddress);
        state.agent = extractUserData(action.payload);

        if (action.payload.personalAddress === null) {
          state.missingData = true;
        }
        else {
          state.missingData = false;
        }
      },
      getAgentPreferences: () => {},
      saveAgentPreferences: (state, action) => {
        state.agentPreferences = action.payload;
      },
      updateAgentPreferences: () => {}
    },
});

export const {
  validateAuthentication,
  checkAuthentication,
  saveUserData,
  fetchOMs,
  fetchEfs,
  saveOMs,
  saveEfs,
  fetchUserData,
  selectDocumentsList,
  showDocStatus,
  fetchUserLightData,
  saveUserLightData,
  logout,
  fetchAgentAppDocuments,
  savegentAppDocuments,
  addOmToList,
  getAgentPreferences,
  saveAgentPreferences,
  updateAgentPreferences
} = agentSlice.actions;

export default agentSlice.reducer;
