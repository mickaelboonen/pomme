import { createSlice } from '@reduxjs/toolkit';
import { efHelp } from '../data/efHelp';

const initialState = {
    isMissionFormDisabled: true,
    refusalMessage: '',
    nextEfTarget: '',
    transportsFields: [
      {
        formField: 'plane',
        id: 'plane-field',
        max: '',
        label: 'Avion',
        filelabel:"Billets d'avion (si non payé par Unîmes)",
        index: 1,
      },
      {
        formField: 'train',
        id: 'train-field',
        max: '',
        label: 'Train',
        filelabel:'Billets de train (si non payé par Unîmes)',
        index: 2,
      },
      // {
      //   formField: 'personalCar',
      //   id: 'personal-car-field',
      //   max: '',
      //   label: 'Véhicule personnel (sur autorisation préalable)',
      //   filelabel:'A voir, champs supplémentaires',
      //   index: 3,
      // },
      {
        formField: 'rentCar',
        id: 'rent-car-field',
        max: '',
        label: 'Véhicule de location (sur autorisation préalable)',
        filelabel:'Facture nominative acquittée du loueur',
        index: 5,
      },
      {
        formField: 'fuel',
        id: 'fuel-field',
        max: '',
        label: 'Carburant pour véhicule administratif ou de location (sur autorisation préalable)',
        filelabel:'Facture',
        index: 6,
      },
      {
        formField: 'toll',
        id: 'toll-field',
        max: '',
        label: 'Frais de péage',
        filelabel:'Reçu ou ticket',
        index: 7,
      },
      {
        formField: 'parking',
        id: 'parking-field',
        max: '',
        label: 'Parking',
        filelabel:'Reçu ou ticket',
        index: 8,
      },
      {
        formField: 'taxi',
        id: 'taxi-field',
        max: '',
        label: 'Taxi',
        filelabel:'Facture nominative acquittée',
        index: 9,
      },
      {
        formField: 'ferry',
        id: 'ferry-field',
        max: '',
        label: 'Ferry',
        filelabel:'Facture nominative acquittée',
        index: 10,
      },
      {
        formField: 'publicTransports',
        id: 'public-transports-field',
        max: '',
        label: 'Bus, RER, métro',
        filelabel:'Ticket',
        index: 111,
      },
      {
        formField: 'research',
        id: 'research-field',
        max: '',
        label: "Frais d'inscription à un colloque ou réunion / séminaire scientifique (*)",
        filelabel:'Facture nominative acquittée et programme',
        index: 12,
      },
    ],
    mealFields: [
      {
        id: 'admin-restaurant-field',
        formField: 'admin-restaurant',
        label: 'Repas pris dans un restaurant administratif ou assimilé',
      },
      {
        id: 'paid-by-agent-in-France-field',
        formField: 'paid-by-agent-in-France',
        label: 'Repas à titre onéreux en France',
      },
      {
        id: 'free-in-France-field',
        formField: 'free-in-France',
        label: 'Repas à titre gratuit en France',
      },
      {
        id: 'paid-by-agent-overseas-field',
        formField: 'paid-by-agent-overseas',
        label: "Repas à titre onéreux à l'étranger",
      },
    ],
    helpMessages: efHelp,
    currentHelp: {},
    EFTabs: [
      {
        id: 'ec',
        name: 'En cours',
      },
      {
        id: 'as',
        name: 'A Signer',
      },
      {
        id: 'ok',
        name: 'Validés',
      }
    ],
    userEfs: [],
    efLoader: true,
    efPerSelectedStatus: [],
    currentEf: {}

};
const omFormSlice = createSlice({
    name: 'ef',
    initialState,
    reducers: {
      setEfLoader: (state, action) => {
        state.efLoader = action.payload;
      },
      addNewEf: () => {},
      saveNewEf: (state, action) => {

      },
      fetchEfs: () => {},
      saveEfs: (state, action) => {
        state.userEfs = action.payload;
        state.efPerSelectedStatus = state.userEfs.filter((ef) => ef.status === 1);
        state.efLoader = false;
      },
      selectEfData: (state, action) => {

        let status = 1;
        if (action.payload === 'ec') {
          status = 1;
        }
        else if (action.payload === 'as') {
          status = 2;
          
        }
        else if (action.payload === 'ok') {
          status = 8;
        }
        
        state.efPerSelectedStatus = state.userEfs.filter((ef) => ef.status === status);
        state.currentEf = {};
      },
      
      displayEfStatus: (state, action) => {
        const efToDisplay = state.userEfs.find((ef) => ef.id === Number(action.payload));
        state.currentEf = efToDisplay ? efToDisplay : {};
      },
      updateEfMission: () => {},
      updateEfTransports: () => {},
      updateEfAccomodations: () => {},
      saveMissionFormData: (state, action) => {
        
        let currentIndex;
        state.omForm.forEach((step) => {
          if (step.step === "mission") {
            currentIndex = state.omForm.indexOf(step);
          }
        });

        if (currentIndex !== -1) {
          state.omForm[currentIndex].data = action.payload;
        }
        


      },
      enableMissionFormFields: (state, action) => {
        state.isMissionFormDisabled = !action.payload;
      },
      toggleHelp: (state, action) => {
        
        const currentHelpState = JSON.parse(JSON.stringify(state.currentHelp));
        
        if (action.payload.id === currentHelpState.id ) {

          state.currentHelp = {};
        } else {
          state.currentHelp = action.payload;
        }
        
      },
      fetchEf: () => {

      },
      saveEf: (state, action) => {
        state.currentEf = action.payload
      }
    },
});

export const {
  setEfLoader,
  fetchEfs,
  saveEfs,
  addNewEf,
  saveNewEf,
  selectEfData,
  displayEfStatus,
  updateEfMission,
  updateEfTransports,
  updateEfAccomodations,
  saveMissionFormData,
  enableMissionFormFields,
  toggleHelp,
  fetchEf, 
  saveEf,
} = omFormSlice.actions;

export default omFormSlice.reducer;
