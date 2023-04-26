import React from "react";

import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import store from 'src/store';


import DAFC from "src/routes/dafc";
import Login from "src/routes/layout/Login";
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
import Preferences from "src/routes/utilisateur/MyAccount/Preferences";
import DocValidationForm from "src/routes/gestionnaire/DocValidationForm";
import TicketRequest from "src/routes/utilisateur/MyAccount/TicketRequest";
import RefusalNotification from "src/routes/utilisateur/MyAccount/RefusalNotification";
import CasClient, { constant } from "react-cas-client";

import { getSignature, getDocument, fetchCountries } from "src/reducer/app";
import { findPermFilesByAgent, fetchAgentSignatureForPdf } from "src/reducer/otherDocuments";
import { getVehicles, fetchVehicle} from "src/reducer/vehicle";
import { fetchOm } from "src/reducer/omForm";
import { fetchOMs, fetchEfs, fetchUserData, fetchAgentAppDocuments } from "src/reducer/agent";
import { setEfLoader, fetchEf } from "src/reducer/ef";


let casEndpoint = "cas.unimes.fr";
let casOptions = {
  version: constant.CAS_VERSION_3_0,
  validation_proxy: true,
  validation_proxy_path: '/cas_proxy'
};

const casClient = new CasClient(casEndpoint, casOptions);

const AppWithRouter = () => (
  <RouterProvider router={createBrowserRouter([
    {
      path: "/",
      element: <Layout cas={casClient} />,
      loader: async ({ request }) =>  {
        return new URL(request.url);
      },
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: async ({ request }) => {
            
            const url = new URL(request.url);
            const { agent: { user,isAuthenticated } } = store.getState()
  
            const devHost = process.env.DEV_HOST + ':8080';
            
            if (isAuthenticated) {
              store.dispatch(fetchOMs(user));
              store.dispatch(fetchEfs(user));
            }
            else {  
              // Condition depending on the host
              if (devHost !== url.host) {
  
                if (url.search.includes('status=in_process')) {
                  return redirect('/se-connecter?' + url.search);
                }
                else {
                  return redirect('/se-connecter');
                }
              }
              else {
                store.dispatch(fetchOMs(user));
                store.dispatch(fetchEfs(user));
              }
              
              
            }
      
            return new URL(request.url);
          },
        },
        {
          path: 'se-connecter',
          element: <Login cas={casClient} />,
        },
        // new documents forms
        {
          path: 'nouveau-document/',
          children: [
            {
              path: 'autorisation-de-véhicule',
              element: <VehicleUseForm />,
              loader: async ({ request }) => {
                const url = new URL(request.url);
                const { agent: { user } } = store.getState()
                const id = url.searchParams.get("id");
                
                store.dispatch(fetchAgentSignatureForPdf({ agent: user, omId: id}));
                // store.dispatch(fetchUserData({ id: user}));
                store.dispatch(getVehicles({agent: user}));
                // store.dispatch(getVehicleDocuments(user));
                return url;  
              },    
            },
            {
              path: 'autorisation-de-v%C3%A9hicule',
              element: <VehicleUseForm />,
              loader: async ({ request }) => {
                const url = new URL(request.url);
                const { agent : {user} } = store.getState();
                const id = url.searchParams.get("id");
  
                store.dispatch(fetchAgentSignatureForPdf({ agent: user, omId: id}));
                // store.dispatch(fetchUserData({ id: user}));
                store.dispatch(getVehicles({agent: user}));
                // store.dispatch(getVehicleDocuments(user));
                return url;  
              },       
            },
            {
              path: 'demande-de-dérogation',
              element: <Derogation />,
              loader: async ({ request }) => {
                const url = new URL(request.url);
                const { agent: { user } } = store.getState()
                const id = url.searchParams.get("id");
                store.dispatch(fetchAgentSignatureForPdf({ agent: user, omId: id}));
                return url;  
              },     
            },
            {
              path: 'demande-de-d%C3%A9rogation',
              element: <Derogation />,
              loader: async ({ request }) => {
                const url = new URL(request.url);
                const { agent: { user } } = store.getState()
                const id = url.searchParams.get("id");
                store.dispatch(fetchAgentSignatureForPdf({ agent: user, omId: id}));
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
  
                const {
                  agent : { user, agent },
                  app: { countries },
                } = store.getState((state) => state);
             
                store.dispatch(fetchOm({id: id, handleLoader: false,}));
  
  
                if (step === '1') {
                  store.dispatch(fetchCountries());
                  // store.dispatch(getOmMission(id));
                  // getOmMission(id);
                }
                else if (step === '4') {
                  store.dispatch(getDocument({id: user, type: 'rib'}));
                }
                else if (step === '5') {
                  store.dispatch(getSignature(user));
                }
                else if (step === '6') {
                  if (countries.length === 0) {
                    store.dispatch(fetchCountries());
                  }
                  
                  store.dispatch(fetchUserData({ id: user}));
                  store.dispatch(fetchAgentSignatureForPdf({ agent: user, omId: id}));
  
                  if (!agent.hasOwnProperty('lastname')) {
                    store.dispatch(fetchUserData({ id: user}));
                  }
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
                const om = url.searchParams.get("om");
                const id = url.searchParams.get("id");
                const step = url.searchParams.get("etape");
  
                const { agent : { user, agent }, app: { countries} } = store.getState((state) => state);
                
                store.dispatch(setEfLoader(true));
                store.dispatch(fetchOm({id: om, workflow: 'ef', data: {id: id, step: step}}));
  
                // store.dispatch(fetchEf({id: id, step: step}));

                if (step === '1') {
                  store.dispatch(fetchCountries());
                }
                else if (step === '5') {
                  store.dispatch(getSignature(user));
                  store.dispatch(getDocument({id: user, type: 'rib'}));
                }
                else if (step === '6') {
                  if (countries.length === 0 ) {
                    store.dispatch(fetchCountries());
                  }
  
                  store.dispatch(getSignature(user));
                  // store.dispatch(fetchEf({id: user}));
                }
                return url;
              },    
            },
            {
              path: '%C3%A9tat-de-frais',
              element: <EfForm />,
              loader: async ({ request }) => {
                const url = new URL(request.url);
                const om = url.searchParams.get("om");
                const id = url.searchParams.get("id");
                const step = url.searchParams.get("etape");
                const { agent : { user, agent }, app: { countries} } = store.getState((state) => state);
  
                store.dispatch(setEfLoader(true));
                store.dispatch(fetchOm({id: om, workflow: 'ef', data: {id: id, step: step}}));
  
                if (step === '1') {
                  store.dispatch(fetchCountries());
                }
                else if (step === '5') {
                  store.dispatch(getSignature(user));
                  store.dispatch(getDocument({id: user, type: 'rib'}));
                }
                else if (step === '6') {
                  if (countries.length === 0 ) {
                    store.dispatch(fetchCountries());
                  }
                  store.dispatch(getSignature(user));
                  // store.dispatch(fetchEf({id: user}));
                }
  
                return url;
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
              element: <MyDocuments />
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
                    
                    store.dispatch(findPermFilesByAgent({agent: url.pathname.split('/')[2]}))
                    store.dispatch(getVehicles({agent: url.pathname.split('/')[2]}));
                  }
                },
                {
                  path: 'ajouter-un-véhicule',
                  element: <AddVehicle />
                },
                {
                  path: 'modifier-un-véhicule/:id',
                  element: <AddVehicle />,
                  loader: async ({ request }) => {
                    const url = new URL(request.url);
                    const id = url.searchParams.get("id");
  
                    // console.log(url);
  
                    store.dispatch(fetchVehicle({id: url.pathname.split('/')[5]}))
                    
                  }
                },
                {
                  path: 'ajouter-un-v%C3%A9hicule',
                  element: <AddVehicle />
                },
                {
                  path: 'modifier-un-v%C3%A9hicule/:id',
                  element: <AddVehicle />,
                  loader: async ({ request }) => {
                    const url = new URL(request.url);
                    const id = url.searchParams.get("id");
  
                    // console.log();
  
                    store.dispatch(fetchVehicle({id: url.pathname.split('/')[5]}))
                    
                  }
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
  ])} />
);

AppWithRouter.propTypes = {

};

export default AppWithRouter;
