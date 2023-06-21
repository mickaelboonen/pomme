import React from "react";
import store from 'src/store';
import Derogation from "src/routes/documents/Derogation";
import VehicleUseForm from "src/routes/documents/VehicleUseForm";
// import ScientificEvent from "src/routes/documents/ScientificEvent";

import { getVehicles } from "src/reducer/vehicle";
import ScientificEvent from "../routes/documents/ScientificEvent.js";


export default {
  path: 'nouveau-document/',
  children: [
    {
      path: encodeURIComponent('autorisation-de-véhicule'),
      element: <VehicleUseForm />,
      loader: async ({ request }) => {
        const url = new URL(request.url);
        const { agent : {user} } = store.getState();
        
        store.dispatch(getVehicles({agent: user}));
        return url;  
      },       
    },
    {
      path: encodeURIComponent('demande-de-dérogation'),
      element: <Derogation />,
      loader: async ({ request }) => {
        return new URL(request.url);
      },     
    },
    {
      path: encodeURIComponent('participation-à-un-événement-scientifique'),
      element: <ScientificEvent />,
      loader: async ({ request }) => {
        return new URL(request.url);
      },     
    },
  ],
};

