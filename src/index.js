import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import store from 'src/store';
import DAFC from "src/routes/dafc";
import Layout from 'src/routes/layout';
import ErrorPage from 'src/routes/error';
import Home from 'src/routes/layout/Home';
import OmToGFC from "src/routes/dafc/OmToGFC";
import OMForm from "src/routes/documents/OMForm";
import EfForm from "src/routes/documents/EfForm";
import EfControl from "src/routes/dafc/EfControl";
import Gestionnaires from "src/routes/gestionnaire";
import EfValidation from "src/routes/dafc/EfValidation";
import Derogation from "src/routes/documents/Derogation";
import MyAccount from "src/routes/utilisateur/MyAccount";
import ELForm from "src/routes/utilisateur/MyAccount/ELForm";
import MyDocuments from "src/routes/utilisateur/MyDocuments";
import DocRefusalForm from "src/routes/gestionnaire/DocRefusal";
import VehicleUseForm from "src/routes/documents/VehicleUseForm";
import AddVehicle from "src/routes/utilisateur/MyAccount/AddVehicle";
import EditVehicle from "src/routes/utilisateur/MyAccount/EditVehicle";
import Preferences from "src/routes/utilisateur/MyAccount/Preferences";
import DocValidationForm from "src/routes/gestionnaire/DocValidationForm";
import TicketRequest from "src/routes/utilisateur/MyAccount/TicketRequest";
import RefusalNotification from "src/routes/utilisateur/MyAccount/RefusalNotification";
import CasClient, { constant } from "react-cas-client";


// import { getSignature } from "src/reducer/app";
import { getSignature, fetchUserData } from "src/reducer/app";
import { findPermFilesByAgent } from "src/reducer/otherDocuments";
import { getVehicles, getVehicleDocuments } from "src/reducer/vehicle";
import { fetchOMs, getMission, fetchOm, getTransports, getAccomodations, getAdvance, getMore  } from "src/reducer/omForm";


import { persistor } from 'src/store';

let casEndpoint = "cas.unimes.fr";
let casOptions = { version: constant.CAS_VERSION_3_0,
  validation_proxy: true,
  validation_proxy_path: '/cas_proxy' };

const casClient = new CasClient(casEndpoint, casOptions);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout cas={casClient} />,
    loader: async ({ request }) => {
      return new URL(request.url);
    },
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      // new document forms
      {
        path: 'nouveau-document/',
        children: [
          {
            path: 'ordre-de-mission',
            element: <OMForm />    ,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const step = url.searchParams.get("etape");
              const id = url.searchParams.get("id");

              // TODO : faire la requete pour aller chercher la donnée selon l'id et l'étape
              if (step === '3' || step === '4') {
                store.dispatch(getMission(id));
              }
              else if (step === '5') {
                store.dispatch(getSignature('mboone01'));
              }
              else if (step === '2') {
                // store.dispatch(getVehicles());
              }
              else if (step === '1') {
                store.dispatch(fetchOm(id))
                store.dispatch(getMission(id));
              }
              return url;  
            },    
          },
          {
            path: 'autorisation-de-véhicule',
            element: <VehicleUseForm />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const carId = url.searchParams.get('vehicle');
              store.dispatch(getVehicles());
              store.dispatch(getVehicleDocuments('mboone01'));
              return url;  
            },    
          },
          {
            path: 'autorisation-de-v%C3%A9hicule',
            element: <VehicleUseForm />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const carId = url.searchParams.get('vehicle');
              store.dispatch(getVehicles());
              store.dispatch(getVehicleDocuments('mboone01'));
              return url;  
            },       
          },
          {
            path: 'état-de-frais',
            element: <EfForm />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const omId = url.searchParams.get("id");
              const step = url.searchParams.get("etape");

              // TODO : faire la requete pour aller chercher la donnée selon l'id et l'étape
              if (step === '2') {
                const omMission = localStorage.getItem('mission');
                return JSON.parse(omMission);
              }
            },    
          },
          {
            path: '%C3%A9tat-de-frais',
            element: <EfForm />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const omId = url.searchParams.get("id");
              const step = url.searchParams.get("etape");

              // TODO : faire la requete pour aller chercher la donnée selon l'id et l'étape
              if (step === '2') {
                const omMission = localStorage.getItem('mission');
                return JSON.parse(omMission);
              }
            },  
          },
          {
            path: 'demande-de-dérogation',
            element: <Derogation />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              return url;  
            },     
          },
          {
            path: 'demande-de-d%C3%A9rogation',
            element: <Derogation />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              return url;  
            },     
          },

        ],
      },
      // documents to update
      {
        path: 'modifier-un-document/',
        children: [
          {
            path: 'ordre-de-mission',
            element: <OMForm />    ,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const step = url.searchParams.get("etape");
              const id = url.searchParams.get("id");

              const { app : { user }} = store.getState((state) => state)


              // TODO : faire la requete pour aller chercher la donnée selon l'id et l'étape
            
              if (step === '1') {
                store.dispatch(fetchOm(id));
                store.dispatch(getMission(id));
              }
              else if (step === '2') {
                // store.dispatch(getVehicles());
                store.dispatch(getTransports(id));
              }
              else if (step === '3') {
                store.dispatch(getAccomodations(id));
                store.dispatch(getMission(id));
                
              }
              else if (step === '4') {
                store.dispatch(getAdvance(id));
                store.dispatch(getMission(id));
              }
              else if (step === '5') {
                store.dispatch(getSignature(user));
                store.dispatch(getMore(id));
              }
              else if (step === '6') {
                console.log('here');
                store.dispatch(fetchUserData({ id: user}));
              }
              
            return url;  
            },
          },
          {
            path: 'autorisation-de-véhicule',
            element: <VehicleUseForm />    
          },
          {
            path: 'autorisation-de-v%C3%A9hicule',
            element: <VehicleUseForm />    
          },
          {
            path: 'état-de-frais',
            element: <EfForm />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const omId = url.searchParams.get("id");
              const step = url.searchParams.get("etape");

              // TODO : faire la requete pour aller chercher la donnée selon l'id et l'étape
              if (step === '2') {
                const omMission = localStorage.getItem('mission');
                return JSON.parse(omMission);
              }
            },    
          },
          {
            path: '%C3%A9tat-de-frais',
            element: <EfForm />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const omId = url.searchParams.get("id");
              const step = url.searchParams.get("etape");

              // TODO : faire la requete pour aller chercher la donnée selon l'id et l'étape
              if (step === '2') {
                const omMission = localStorage.getItem('mission');
                return JSON.parse(omMission);
              }
            },  
          },
          {
            path: 'demande-de-dérogation',
            element: <Derogation />   
          },
          {
            path: 'demande-de-d%C3%A9rogation',
            element: <Derogation />      
          },

        ],
      },
      // utilisateur
      {
        path: 'utilisateur/:slug/',
        children: [
          {
            path: 'mes-ordres-de-mission',
            element: <MyDocuments />,
            loader: async ({ params, request }) => {
                  const { app : { user }} = store.getState(state => state);    

               store.dispatch(fetchOMs(params.slug));
            }, 
          },
          {
            path: 'mes-%C3%A9tats-de-frais',
            element: <MyDocuments />
          },
          {
            path: 'mes-états-de-frais',
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
                  const agent = url.searchParams.get("slug");
                  
                  store.dispatch(findPermFilesByAgent({agent: url.pathname.split('/')[2]}))
                }
              },
              {
                path: 'ajouter-un-véhicule',
                element: <AddVehicle />
              },
              {
                path: 'modifier-un-véhicule/:id',
                element: <EditVehicle />
              },
              {
                path: 'ajouter-un-v%C3%A9hicule',
                element: <AddVehicle />
              },
              {
                path: 'modifier-un-v%C3%A9hicule/:id',
                element: <EditVehicle />
              },
              {
                path: 'refus-de-mission',
                element: <RefusalNotification />
              },
              {
                path: 'état-liquidatif-à-signer',
                element: <ELForm />
              },
              {
                path: '%C3%A9tat-liquidatif-%C3%A0-signer',
                element: <ELForm />
              },
              {
                path: 'demander-un-déplacement/:id',
                element: <TicketRequest />
              },
              {
                path: 'demander-un-d%C3%A9placement/:id',
                element: <TicketRequest />
              },
              
            ],
          },
          {
            path: 'mes-préférences',
            element: <Preferences />
          },
          {
            path: 'mes-pr%C3%A9f%C3%A9rences',
            element: <Preferences />
          },
          
        ]
      },
      // gestionnaire
      {
        path: 'gestionnaire/:slug/',
        children: [
          {
            path: 'documents-a-signer',
            element: <Gestionnaires />,
          },
          {
            path: 'valider-un-document/:slug/:id',
            element: <DocValidationForm />,
          },
          {
            path: 'refuser-un-ordre-de-mission/:id',
            element: <DocRefusalForm />,
          },
        ]
      },
      // DAFC
      {
        path: 'dafc/',
        children: [
          {
            path: 'ordres-de-mission/',
            children: [
              {
                index: true,
                element: <DAFC title="Ordres de mission à contrôler" />
              },
              {
                path: 'saisir-un-ordre/:id',
                element: <OmToGFC />
              }
            ],
          },
          {
            path: 'états-de-frais/',
            children: [
              {
                index: true,
                element: <DAFC title="États de frais à valider" />
              },
              {
                path: 'valider/:id',
                element: <EfValidation />
              },
              {
                path: 'contrôler/:id',
                element: <EfControl />
              }
            ],
          },
          {
            path: '%C3%A9tats-de-frais/',
            children: [
              {
                index: true,
                element: <DAFC title="États de frais à valider" />
              },
              {
                path: 'valider/:id',
                element: <EfValidation />
              },
              {
                path: 'contr%C3%B4ler/:id',
                element: <EfControl />
              }
            ],
          },
          {
            path: '%C3%A9tats-de-frais',
            element: <MyDocuments />
          },
          {
            path: 'états-de-frais',
            element: <MyDocuments />
          },
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
