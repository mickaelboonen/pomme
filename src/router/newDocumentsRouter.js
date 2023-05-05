import React from "react";
import store from 'src/store';
import Derogation from "src/routes/documents/Derogation";
import VehicleUseForm from "src/routes/documents/VehicleUseForm";

import { getVehicles, fetchVehicle} from "src/reducer/vehicle";
import { findPermFilesByAgent, fetchAgentSignatureForPdf } from "src/reducer/otherDocuments";




export default {
  path: 'nouveau-document/',
  children: [
    {
      path: encodeURIComponent('autorisation-de-véhicule'),
      element: <VehicleUseForm />,
      loader: async ({ request }) => {
        const url = new URL(request.url);
        const { agent : {user} } = store.getState();
        
        store.dispatch(fetchAgentSignatureForPdf({ agent: user }));
        store.dispatch(getVehicles({agent: user}));
        return url;  
      },       
    },
    {
      path: encodeURIComponent('demande-de-dérogation'),
      element: <Derogation />,
      loader: async ({ request }) => {
        const url = new URL(request.url);
        const { agent: { user } } = store.getState()
        store.dispatch(fetchAgentSignatureForPdf({ agent: user }));
        return url;  
      },     
    },

  ],
};

