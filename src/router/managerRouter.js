import React from "react";
import store from 'src/store';

import Gestionnaires from "src/routes/gestionnaire";
import DocRefusalForm from "src/routes/gestionnaire/DocRefusal";
import DocValidationForm from "src/routes/gestionnaire/DocValidationForm";
import DocValidation from "src/routes/gestionnaire/DocValidation";

import { fetchOm } from "src/reducer/omForm";
import { fetchUserData } from "src/reducer/agent";
import { getDocument, fetchCountries } from "src/reducer/app";
import { fetchOMs, fetchEfs } from "src/reducer/agent";
import { fetchPendingOms, fetchValidationChannels } from "../reducer/omManager";
import { setLoader } from "../reducer/omForm";

export default {
  path: 'gestionnaire/:slug/',
  children: [
    {
      path: 'documents-a-signer',
      element: <Gestionnaires />,
      loader: async ({ request }) => {
        store.dispatch(fetchOm)

        // TODO : selon l'agent, récupérer tous les documents qu'iel doit vérifier.
          store.dispatch(fetchPendingOms());
          // fetch
      },
    },
    {
      path: 'valider-un-document/',
      children: [
        {
          path: 'ordre-de-mission',
          // element: <DocValidationForm />,
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
      // element: <DocValidationForm />,
    },
    {
      path: 'refuser-un-ordre-de-mission/:id',
      element: <DocRefusalForm />,
    },
  ]
};
