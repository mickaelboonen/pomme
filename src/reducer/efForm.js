import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMissionFormDisabled: true,
    refusalMessage: '',
    transportsFields: [
    {
      formField: 'plane',
      id: 'plane-field',
      max: '',
      label: 'Avion',
      filelabel:"Billets d'avion (si non payé par Unîmes)",
    },
    {
      formField: 'train',
      id: 'train-field',
      max: '',
      label: 'Train',
      filelabel:'Billets de train (si non payé par Unîmes)',
    },
    {
      formField: 'personalCar',
      id: 'personal-car-field',
      max: '',
      label: 'Véhicule personnel (sur autorisation préalable)',
      filelabel:'A voir, champs supplémentaires',
    },
    {
      formField: 'rentCar',
      id: 'rent-car-field',
      max: '',
      label: 'Véhicule de location (sur autorisation préalable)',
      filelabel:'Facture nominative acquittée du loueur',
    },
    {
      formField: 'fuel',
      id: 'fuel-field',
      max: '',
      label: 'Carburant pour véhicule personnel ou de location (sur autorisation préalable)',
      filelabel:'Facture',
    },
    {
      formField: 'toll',
      id: 'toll-field',
      max: '',
      label: 'Frais de péage',
      filelabel:'Reçu ou ticket',
    },
    {
      formField: 'parking',
      id: 'parking-field',
      max: '',
      label: 'Parking',
      filelabel:'Reçu ou ticket',
    },
    {
      formField: 'taxi',
      id: 'taxi-field',
      max: '',
      label: 'Taxi',
      filelabel:'Facture nominative acquittée',
    },
    {
      formField: 'publicTransports',
      id: 'public-transports-field',
      max: '',
      label: 'Bus, RER, métro',
      filelabel:'Ticket',
    },
    {
      formField: 'research',
      id: 'research-field',
      max: '',
      label: "Frais d'inscription à un colloque ou réunion / séminaire scientifique (*)",
      filelabel:'Facture nominative acquittée et programme',
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

};
const omFormSlice = createSlice({
    name: 'efForm',
    initialState,
    reducers: {
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
      }
    },
});

export const { saveMissionFormData, enableMissionFormFields } = omFormSlice.actions;

export default omFormSlice.reducer;
