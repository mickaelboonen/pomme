import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  action: '',
  type: '',
  agentDocs: [],
  agentSignature: null,
  programs: [],
  pv: null,
  currentProgram: {},
  currentPassport: {},
  currentCni: {},
  loader: false
};
const otherDocsSlice = createSlice({
    name: 'other-documents',
    initialState,
    reducers: {
      toggleDocModal:(state, action) => {
        state.isModalOpen = !state.isModalOpen;
        state.action = action.payload.action;
        state.type = action.payload.type;

        if (action.payload.data) {
          state.agentDocs.push(action.payload.data)
        }
      },
      saveAllPermDocs: (state, action) => {
        state.agentDocs = action.payload;
      },
      addPermFile: () => {
        state.agentDocs = state.agentDocs.filter((doc) => doc.type !== action.payload.type);
      },
      editPermFile: () => {

      },
      findPermFilesByAgent: () => {

      },
      deletePermFile: (state, action) => {
        state.agentDocs = state.agentDocs.filter((doc) => doc.type !== action.payload.type);
      },
      // fetchAgentSignatureForPdf: () => {

      // },
      // saveAgentSignatureForPdf: (state, action) => {
      //   state.agentSignature = action.payload;
      // },
      uploadVehicleFiles: () => {},
      createProgram: () => {},
      updateProgram: () => {},
      getAgentsProgramsAndPV: () => {},
      saveAgentsProgramsAndPV: (state, action) => {
        state.programs = action.payload.programs;
        state.pv = action.payload.pv
        if (action.payload.file !== '') {
          state.pv.file = action.payload.file
        }
      },
      fetchProgram: (state) => { state.loader = true },
      saveProgram: (state, action) => {
        state.currentProgram = action.payload;
        state.loader = false;
      },
      fetchUserPassport: (state) => { state.loader = true },
      saveUserPassport: (state, action) => {
        state.currentPassport = action.payload;
        state.loader = false;
      },
      deleteProgram: () => {},
      requestTickets: () => {},
      requestTicketsWithFile: () => {},
      fetchUserIdPapers: (state) => { state.loader = true },
      saveUserIdPapers: (state, action) => {
        console.log('here');
        state.currentPassport = action.payload.passport;
        state.currentCni = action.payload.cni;
        state.loader = false;

      },
    },
});

export const {
  toggleDocModal,
  saveAllPermDocs,
  addPermFile,
  editPermFile,
  findPermFilesByAgent,
  deletePermFile,
  createProgram,
  updateProgram,
  getAgentsProgramsAndPV,
  saveAgentsProgramsAndPV,
  uploadVehicleFiles,
  fetchProgram,
  saveProgram,
  deleteProgram,
  fetchUserPassport,
  saveUserPassport,
  requestTickets,
  requestTicketsWithFile,
  fetchUserIdPapers,
  saveUserIdPapers

} = otherDocsSlice.actions;

export default otherDocsSlice.reducer;
