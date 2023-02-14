import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  action: '',
  type: '',
};
const otherDocsSlice = createSlice({
    name: 'other-documents',
    initialState,
    reducers: {
      toggleDocModal:(state, action) => {
        console.log('here');
        state.isModalOpen = !state.isModalOpen;
        state.action = action.payload.action;
        state.type = action.payload.type;
      },
      addPermFile: () => {

      },
      editPermFile: () => {

      },
      findPermFilesByAgent: () => {

      },
    },
});

export const {
  toggleDocModal,
  addPermFile,
  editPermFile,
  findPermFilesByAgent,
} = otherDocsSlice.actions;

export default otherDocsSlice.reducer;
