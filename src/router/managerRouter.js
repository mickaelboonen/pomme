import React from "react";
import store from 'src/store';

import Gestionnaires from "src/routes/gestionnaire";
import DocRefusalForm from "src/routes/gestionnaire/DocRefusal";
import DocValidation from "src/routes/gestionnaire/DocValidation";

import { fetchOm } from "src/reducer/omForm";
import { fetchPendingOms, fetchValidationChannels } from "src/reducer/omManager";
import { setLoader } from "src/reducer/omForm";

export default {
  path: 'gestionnaire/:slug/',
  children: [
    {
      path: 'documents-a-signer',
      element: <Gestionnaires />,
      loader: async ({ request }) => {
        const { agent: { agent} } = store.getState((state) => state);
        const { channel } = agent;
        
        // TODO : selon l'agent, récupérer tous les documents qu'iel doit vérifier.
          store.dispatch(fetchPendingOms({type: channel[0], status: 2}));
          // fetch
      },
    },
    {
      path: 'valider-un-document/',
      children: [
        {
          path: 'ordre-de-mission',
          element: <DocValidation />,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            const step = url.searchParams.get("etape");
            const id = url.searchParams.get("id");
            
            if (step === '6') {
                store.dispatch(setLoader(true));
                store.dispatch(fetchValidationChannels());
                store.dispatch(fetchOm({id: id}));
            }
            
          return url;  
          },
        },
      ],
    },
    {
      path: 'refuser-un-ordre-de-mission/:id',
      element: <DocRefusalForm />,
    },
  ]
};
