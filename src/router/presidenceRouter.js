import React from "react";
import store from 'src/store';

import OMForm from "src/routes/documents/OMForm";
import EfForm from "src/routes/documents/EfForm";

import { setEfLoader } from "src/reducer/ef";
import { fetchOm } from "src/reducer/omForm";
import { fetchVehicle } from "src/reducer/vehicle";
import { fetchPresidencyUsers, fetchPresidencyVehicles } from "src/reducer/presidency";



import Presidence from "src/routes/presidence";
import NewPermOm from "src/routes/presidence/NewPermOm";
import AddPresidencyVehicle from "../routes/presidence/AddVehicle";

export default {
  path: `${encodeURIComponent('présidence')}/`,
  children: [
    {
      index: true,
      element: <Presidence />,
      loader: async ({ request }) => {
        const {
          presidency : { presidencyUsers },
        } = store.getState((state) => state);
      
        store.dispatch(fetchPresidencyUsers());
      },
    },
    {
      path: 'nouvel-om-permanent',
      element: <NewPermOm  />,
      loader: async ({ request }) => {
        const {
          presidency : { presidencyUsers },
        } = store.getState((state) => state);
      
        store.dispatch(fetchPresidencyUsers());

      },
    },
    {
      path: encodeURIComponent('ajouter-un-véhicule'),
      element: <AddPresidencyVehicle  />,
      loader: async ({ request }) => {
        const {
          presidency : { presidencyUsers },
        } = store.getState((state) => state);
      
        if (presidencyUsers.length === 0) {
          store.dispatch(fetchPresidencyUsers());
        }
      },
    },
    {
      path: encodeURIComponent('modifier-un-véhicule') + '/:id',
      element: <AddPresidencyVehicle />,
      loader: async ({ request }) => {
        const url = new URL(request.url);
        const {
          presidency : { presidencyUsers },
        } = store.getState((state) => state);
      
        if (presidencyUsers.length === 0) {
          store.dispatch(fetchPresidencyUsers());
        }
        // console.log(url.pathname.split('/'));
        store.dispatch(fetchVehicle({id: url.pathname.split('/')[3]}))
        
      }
    },

  ]
};
