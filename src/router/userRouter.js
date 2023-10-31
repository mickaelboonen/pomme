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
import { fetchAllOmTypes } from "src/reducer/omManager";
import { findPermFilesByAgent, getAgentsPrograms, fetchProgram, fetchUserPassport} from "src/reducer/otherDocuments";
import TravelInfo from "src/routes/utilisateur/MyAccount/TravelInfo";
import AddProgram from "src/routes/utilisateur/MyAccount/TravelInfo/AddProgram";
import Tickets from "../routes/documents/Tickets";
import Tickets2 from "../routes/documents/Tickets2";
import { fetchTmpUserPhoneMail } from "../reducer/tmpReducer";
import { fetchUserData } from "../reducer/agent";



export default {
  path: 'utilisateur/',
  children: [
    {
      path: 'mes-ordres-de-mission',
      element: <MyDocuments />,
      loader: async () => {
        store.dispatch(fetchAllOmTypes())
      }
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
            const { agent : { user } } = store.getState((state) => state);
            
            store.dispatch(findPermFilesByAgent({agent: user}))
            store.dispatch(getVehicles({agent: user}));
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
          path: 'profil-voyageur/',
          children: [
            {
              index: true,
              element: <TravelInfo />,
              loader: async ({ request }) => {
                const { agent : { user } } = store.getState((state) => state);
                console.log(user);
                store.dispatch(getAgentsPrograms({agent: user}));
                store.dispatch(fetchUserData({id: user}))
                
              }
            },
            {
              path: 'ajouter-un-programme-de-transport',
              element: <AddProgram />,
            },
            {
              path: 'modifier-un-programme-de-transport/:id',
              element: <AddProgram />,
              loader: async ({ request }) => {
                const url = new URL(request.url);
                const urlArray = url.pathname.split('/');
                
                store.dispatch(fetchProgram({id: urlArray[urlArray.length - 1]}))
                
              }
            },
          ]
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
    {
      path: 'demande-de-transports',
      element: <Tickets />,
      loader: async ({ request }) => {
        return new URL(request.url);
      }
    },
    {
      path: 'demande-de-transports-2',
      element: <Tickets2 />,
      loader: async ({ request }) => {
        const url = new URL(request.url);
        const id = Number(url.searchParams.get('om'));

        const { agent: { oms, user } } = store.getState((state) => state);
        const currentOm = oms.find((om) => om.id === id)

        if (currentOm.mission !== 'métropole') {
          store.dispatch(fetchUserPassport({ id: user }))
        }
        store.dispatch(getAgentsPrograms({agent: user}))
        return url;
      }
    },
  ]
};
