import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';

var lodash = require('lodash/collection');
var lodashArray = require('lodash/array');


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
  uprOrDep: [], 
  validationActorsToDisplay: [],
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
        action.payload.forEach((channel) => {
          channel.validationActors = lodash.sortBy(channel.validationActors, ['circuit_order'])
        })
        
        state.channels = action.payload;
        state.validationActorsToDisplay = [];
        state.uprOrDep = [];
      },
      displayValidationActors: (state, action) => {
        const { validationActors, name } = action.payload;
        
        const uprOrDep = validationActors.filter((actor) => actor.role.includes('Directeur.rice UPR') || actor.role.includes('Directeur.rice Département'));
        const actors = validationActors.filter((actor) => !actor.role.includes('Directeur.rice UPR') && !actor.role.includes('Directeur.rice Département'));

        if (uprOrDep.length > 0) {
          if (name === 'Recherche') {
            actors.push({
              id: 2,
              cpt_login: 'directeur.rice upr',
              role: 'Directeur.rice UPR',
              current_status: '3',
              next_status: '4',
              circuit_order: '2'
            })
          }
          else if (name === 'Enseignement') {
            actors.push({
              id: 2,
              cpt_login: 'directeur.rice dep',
              role: 'Directeur.rice Département',
              current_status: '3',
              next_status: '4',
              circuit_order: '1'
            })
          }
          state.uprOrDep = uprOrDep;
        }
        else {
          state.uprOrDep = [];
        }
        state.validationActorsToDisplay = lodash.sortBy(actors, ['circuit_order']);
      }
    }
});

export const {
  fetchPendingOms,
  savePendingOms,
  fetchValidationChannels,
  saveValidationChannels,
  displayValidationActors
} = omManagerSlice.actions;

export default omManagerSlice.reducer;
