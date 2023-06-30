import React from "react";
import store from 'src/store';

import MyAccount from "src/routes/utilisateur/MyAccount";
import ELForm from "src/routes/utilisateur/MyAccount/ELForm";
import MyDocuments from "src/routes/utilisateur/MyDocuments";
import AddVehicle from "src/routes/utilisateur/MyAccount/AddVehicle";
import Preferences from "src/routes/utilisateur/MyAccount/Preferences";
import TicketRequest from "src/routes/utilisateur/MyAccount/TicketRequest";
import RefusalNotification from "src/routes/utilisateur/MyAccount/RefusalNotification";

import { getVehicles, fetchVehicle} from "src/reducer/vehicle";
import { findPermFilesByAgent } from "src/reducer/otherDocuments";



export default {
  path: 'utilisateur/:slug/',
  children: [
    {
      path: 'mes-ordres-de-mission',
      element: <MyDocuments />
    },
    {
      path: encodeURIComponent('mes-états-de-frais'),
      element: <MyDocuments />
    },
    {
      path: 'mes-documents/',
      children: [
        {
          index: true,
          element: <MyAccount />,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            
            store.dispatch(findPermFilesByAgent({agent: url.pathname.split('/')[2]}))
            store.dispatch(getVehicles({agent: url.pathname.split('/')[2]}));
          }
        },
        {
          path: encodeURIComponent('ajouter-un-véhicule'),
          element: <AddVehicle />
        },
        {
          path: encodeURIComponent('modifier-un-véhicule') + '/:id',
          element: <AddVehicle />,
          loader: async ({ request }) => {
            const url = new URL(request.url);

            store.dispatch(fetchVehicle({id: url.pathname.split('/')[5]}))
            
          }
        },
        {
          path: 'refus-de-mission',
          element: <RefusalNotification />
        },
        {
          path: encodeURIComponent('état-liquidatif-à-signer'),
          element: <ELForm />
        },
        {
          path: encodeURIComponent('demander-un-déplacement') + '/:id',
          element: <TicketRequest />
        },
        
      ],
    },
    {
      path: encodeURIComponent('mes-préférences'),
      element: <Preferences />
    },
  ]
};
