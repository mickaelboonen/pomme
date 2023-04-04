import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  action: '',
  type: '',
  agentDocs: [],
  agentSignature: null,
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
      fetchAgentSignatureForPdf: () => {

      },
      saveAgentSignatureForPdf: (state, action) => {
        state.agentSignature = action.payload;
      },
      uploadVehicleFiles: () => {

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
  fetchAgentSignatureForPdf,
  saveAgentSignatureForPdf,
  uploadVehicleFiles,
} = otherDocsSlice.actions;

export default otherDocsSlice.reducer;
