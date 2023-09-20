import { createSlice } from '@reduxjs/toolkit';
import { turnTransportsDataToAppFormat } from '../selectors/dataToDbFormat';
import { declareCamelCaseKeys } from '../selectors/keyObjectService';

var lodash = require('lodash/collection');
var lodashArray = require('lodash/array');


const initialState = {
  loader: false,
  pendingDocs: [],
  docsToDisplay: [],
  channels: [
    {
      name: 'Mission test',
      id: 'test'
    },
    {
      name: 'Mission Doctorants',
      id: 'doctorants'
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
      id: 'formation'
    }
  ],
  services: [],
  departments: [],
  uprOrDep: [], 
  validationActorsToDisplay: [],
  omSteps: [
    {
      name: 'Mission',
      property: 'mission',
      id: 1,
    },
    {
      name: 'Transports',
      property: 'transports',
      id: 2,
    },
    {
      name: 'Hébergement & Repas',
      property: 'accomodations',
      id: 3,
    },
    {
      name: 'Avance',
      property: 'advance',
      id: 4,
    },
    {
      name: 'Autre',
      property: 'signature',
      id: 5,
    },
    {
      name: 'Validation',
      property: 'management',
      id: 6,
    },
  ],
  tabs: [
    {
      id: 'admin',
      name: 'OM à contrôler',
      status: 2,
    },
    {
      id: 'deve',
      name: 'OM à contrôler',
    },
    {
      id: 'research',
      name: 'OM à viser',
    },
    {
      id: 'formation',
      name: 'OM à viser',
    },
    {
      id: 'test',
      name: 'OM à viser',
    }
  ]
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
        state.docsToDisplay = action.payload;
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
              cptLogin: 'directeur.rice upr',
              role: 'Directeur.rice UPR',
              current_status: '3',
              next_status: '4',
              circuit_order: '2'
            })
          }
          else if (name === 'Enseignement') {
            actors.push({
              id: 2,
              cptLogin: 'directeur.rice dep',
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
      },
      updateGestComments: () => {},
      saveGestComments: () => {},
      fetchServicesAndDepartments: () => {},
      saveServices: (state, action) => {
        state.services = action.payload;
      },
      saveDepartments: (state, action) => {
        state.departments = action.payload;
      },
      manageOm: () => {},
      stampOm: () => {},
      updateMonitorPdf: () => {},
      resetOmsOnDisplay: (state) => {
        state.pendingDocs = [];
      },
      displayWantedDocs: (state, action) => {
        state.docsToDisplay = action.payload;
      },
      addOmMonitoringPdf: () => {},
      rejectVisaOm: () => {},
      rejectOm: () => {},
      fetchPendingEfs: () => {},
      savePendingEfs: () => {},
    }
});

export const {
  fetchPendingOms,
  savePendingOms,
  fetchPendingEfs,
  savePendingEfs,
  fetchValidationChannels,
  saveValidationChannels,
  displayValidationActors,
  updateGestComments,
  saveGestComments,
  fetchServicesAndDepartments,
  saveServices,
  saveDepartments,
  manageOm,
  stampOm,
  resetOmsOnDisplay,
  updateMonitorPdf,
  displayWantedDocs,
  rejectVisaOm,
  addOmMonitoringPdf,
  rejectOm,
} = omManagerSlice.actions;

export default omManagerSlice.reducer;
