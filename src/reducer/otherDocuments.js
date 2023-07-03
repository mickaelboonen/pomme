import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  action: '',
  type: '',
  agentDocs: [],
  agentSignature: null,
  programs: [],
  currentProgram: {
    // sector: null,
    // type: null,
    // number: null,
    // name: null,
    // expiration: null,
  },
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

      },
      editPermFile: () => {

      },
      findPermFilesByAgent: () => {

      },
      deletePermFile: () => {

      },
      // fetchAgentSignatureForPdf: () => {

      // },
      // saveAgentSignatureForPdf: (state, action) => {
      //   state.agentSignature = action.payload;
      // },
      uploadVehicleFiles: () => {},
      createProgram: () => {},
      updateProgram: () => {},
      getAgentsPrograms: () => {},
      saveAgentsPrograms: (state, action) => {
        state.programs = action.payload;
      },
      fetchProgram: (state) => { state.loader = true },
      saveProgram: (state, action) => {
        state.currentProgram = action.payload;
        state.loader = false;
      },
      deleteProgram: () => {}
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
  getAgentsPrograms,
  saveAgentsPrograms,
  uploadVehicleFiles,
  fetchProgram,
  saveProgram,
  deleteProgram
} = otherDocsSlice.actions;

export default otherDocsSlice.reducer;
