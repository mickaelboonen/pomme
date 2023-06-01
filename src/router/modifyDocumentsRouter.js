import React from "react";
import store from 'src/store';

import OMForm from "src/routes/documents/OMForm";
import EfForm from "src/routes/documents/EfForm";

import { setEfLoader } from "src/reducer/ef";
import { fetchOm } from "src/reducer/omForm";
import { fetchUserData } from "src/reducer/agent";
import { getSignature, getDocument, fetchCountries } from "src/reducer/app";
import { fetchAgentSignatureForPdf } from "src/reducer/otherDocuments";



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
          agent : { user, agent },
          app: { countries },
        } = store.getState((state) => state);
      
        store.dispatch(fetchOm({id: id, handleLoader: false,}));


        if (step === '1') {
          store.dispatch(fetchCountries());
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
          store.dispatch(fetchAgentSignatureForPdf({ agent: user, docId: id}));

          if (!agent.hasOwnProperty('lastname')) {
            store.dispatch(fetchUserData({ id: user}));
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

          store.dispatch(fetchUserData({ id: user}));
          store.dispatch(fetchAgentSignatureForPdf({ agent: user }));
        }
        return url;
      },    
    },
  ],
};
