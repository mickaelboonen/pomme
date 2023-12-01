import React from "react";
import store from 'src/store';

import OMForm from "src/routes/documents/OMForm";
import EfForm from "src/routes/documents/EfForm";

import { setEfLoader , fetchEf } from "src/reducer/ef";
import { fetchOm } from "src/reducer/omForm";
import { fetchUserData } from "src/reducer/agent";
import { getDocument, fetchCountries } from "src/reducer/app";
import EfVacataireForm from "src/routes/documents/EfVacataireForm";



export default {
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
          agent : { user, agentProfessionalAddress, agentPersonalAddress},
          app: { countries },
        } = store.getState((state) => state);
      
        store.dispatch(fetchOm({id: id, handleLoader: false,}));

        console.log( agentProfessionalAddress, agentPersonalAddress);
        if (!agentProfessionalAddress.hasOwnProperty('addressPro') || !agentPersonalAddress.hasOwnProperty('address') ) {
          store.dispatch(fetchUserData({ id: user}));
        }


        if (step === '1' && countries.length === 0) {

          store.dispatch(fetchCountries());
        }
        else if (step === '4') {
          store.dispatch(getDocument({id: user, type: 'rib'}));
        }
        else if (step === '6') {
          if (countries.length === 0) {
            store.dispatch(fetchCountries());
          }          
        }
        
      return url;  
      },
    },
    {
      path: encodeURIComponent('état-de-frais'),
      element: <EfForm />,
      loader: async ({ request }) => {
        const url = new URL(request.url);
        const om = url.searchParams.get("om");
        const id = url.searchParams.get("id");
        const step = url.searchParams.get("etape");

        const { agent : { user }, app: { countries} } = store.getState((state) => state);
        
        store.dispatch(setEfLoader(true));
        store.dispatch(fetchOm({id: om, workflow: 'ef', data: {id: id, step: step}}));

        if (step === '1' && countries.length === 0) {
          store.dispatch(fetchCountries());
        }
        else if (step === '5') {
          store.dispatch(getDocument({id: user, type: 'rib'}));
        }
        else if (step === '6') {
          if (countries.length === 0 ) {
            store.dispatch(fetchCountries());
          }

          store.dispatch(fetchUserData({ id: user}));
        }
        return url;
      },    
    },
    {
      path: encodeURIComponent('état-de-frais-de-vacataire'),
      element: <EfVacataireForm />,
      loader: async ({ request }) => {
        const url = new URL(request.url);
        // const om = url.searchParams.get("om");
        const id = url.searchParams.get("id");
        const step = url.searchParams.get("etape");

        const { agent : { user }, app: { countries} } = store.getState((state) => state);
        
        store.dispatch(setEfLoader(true));
        store.dispatch(fetchEf({ id: id }));

        // if (step === '1' && countries.length === 0) {
          // store.dispatch(fetchCountries());
        // }
        if (step === '4') {
          store.dispatch(getDocument({id: user, type: 'rib'}));
        }
        else if (step === '5') {
          if (countries.length === 0 ) {
            store.dispatch(fetchCountries());
          }

          store.dispatch(fetchUserData({ id: user}));
        }
        return url;
      },    
    },
  ],
};
