import { createSlice } from '@reduxjs/toolkit';
import { agentDataToAppFormat } from 'src/selectors/dataToDbFormat';

const defaultUser = process.env.NODE_ENV === 'development' ? process.env.DEFAULT_USER : '';
console.log(defaultUser, ' : defaultUser');

const initialState = {
  user: defaultUser,
  userSignature: null,
  oms: [],
  efs: [],
  documentsList: [],
  isAuthenticated: false,
  agent: {},
  // agentDocuments:{
  //   rib: false,
  // },
  currentDoc: {},
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
        // state.appLoader = false;
      },
      fetchOMs: () => {},
      fetchEfs: () => {},
      saveOMs: (state, action) => {
        state.oms = action.payload;
      },
      saveEfs: (state, action) => {
        state.efs = action.payload;
      },
      fetchUserData: () => {},
      selectDocumentsList: (state, action) => {

        const { target, id } = action.payload;

        let status = 1;
        if (target === 'ec') {
          status = 1;
        }
        else if (target === 'as') {
          status = 2;
        }
        else if (target === 'sub') {
          status = 2;
        }
        else if (target === 'ok') {
          status = 8;
        }

        state.documentsList = state[id].filter((doc) => doc.status === status);
        state.currentDoc = {};
      },
      showDocStatus: (state, action) => {
        const doc = state[action.payload.type].find((doc) => doc.id === Number(action.payload.doc));
        state.currentDoc = doc ? doc : {};

      }
    },
});

export const {
  validateAuthentication,
  saveUserData,
  fetchOMs,
  fetchEfs,
  saveOMs,
  saveEfs,
  fetchUserData,
  selectDocumentsList,
  showDocStatus,
} = agentSlice.actions;

export default agentSlice.reducer;