import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';


const initialState = {
  loader: false,
  pendingDocs: [],
  channels: [
    {
      name: 'Mission test',
      id: 'test'
    },
    {
      name: 'Mission de Recherche',
      id: 'research'
    },
    {
      name: "Mission d'enseignement",
      id: 'deve'
    },
    {
      name: 'Mission des personnels administratifs',
      id: 'admin'
    },
    {
      name: 'Mission de formation des personnels administratifs',
      id: 'training'
    }
  ],
  unimes: [
    {
      id: 1,
      name: 'DSIUN'
    },
    {
      id: 2,
      name: 'Recherche'
    },
    {
      id: 3,
      name: 'Présidence'
    },
    {
      id: 4,
      name: 'SNAP'
    },
    {
      id: 5,
      name: 'Communication'
    },
    {
      id: 6,
      name: 'DRH'
    },
    {
      id: 7,
      name: 'DAF'
    },
    {
      id: 8,
      name: 'Pilotage'
    },
  ],
  deveDepartments: [
    {
      id: 1,
      name: 'SA'
    },
    {
      id: 2,
      name: 'DEG'
    },
    {
      id: 3,
      name: 'PLLH'
    },
    {
      id: 4,
      name: 'PAPSA'
    },
  ],
};
const omManagerSlice = createSlice({
    name: 'omManager',
    initialState,
    reducers: {
      fetchPendingOms: (state,) => {
        state.loader = true
      },
      savePendingOms: (state, action) => {
        state.pendingDocs = action.payload;
        state.loader = false;
      },
      fetchValidationChannels: () => {},
      saveValidationChannels: (state, action) => {
        state.channels = action.payload;
      }
    }
});

export const {
  fetchPendingOms,
  savePendingOms,
  fetchValidationChannels,
  saveValidationChannels
} = omManagerSlice.actions;

export default omManagerSlice.reducer;
