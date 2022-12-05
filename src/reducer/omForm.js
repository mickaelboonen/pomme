import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  steps: [
    {
      name: 'Mission',
      id: 1,
    },
    {
      name: 'Transports',
      id: 2,
    },
    {
      name: 'Hébergements',
      id: 3,
    },
    {
      name: 'Avance',
      id: 4,
    },
    {
      name: 'Signature',
      id: 5,
    },
  ],
  omForm : {
    missionGoal: '',
    missionGoalFile: {},
    departure: '',
    trainClass: null,
    return: '',
    returnPlace: null,
    workAdress: '',
    region: null,
    missionAdress: '',
    country: '',
    abroad: false,
    actualCosts: false
},
    textareaSettings: {
      name: 'content',
      label: "Votre Demande :",
      placeholder: "Votre Demande",
      required: {
        required: "Vous n'avez pas formulé votre demande."
      },
      constraint: {
        min: 1,
        rows: 5,
      },
      classname: '',
    },
    responseMessage: '',
    responseClass: '',
};
const contactSlice = createSlice({
    name: 'omForm',
    initialState,
    reducers: {
      createTicket: () => {
      },
      showTicketCreationResponse: (state, action) => {
        const { status } = action.payload;
        if (status === 404 || status === 500) {
            state.responseMessage = 'Foiré';
            state.responseClass = 'contact__response--error';
          }
        else if (status === 201) {
        state.responseMessage = 'Réussi';
        state.responseClass = 'contact__response--success';
        }
      }
    },
});

export const { createTicket, showTicketCreationResponse } = contactSlice.actions;

export default contactSlice.reducer;
