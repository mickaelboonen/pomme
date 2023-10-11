import React from "react";
import store from 'src/store';

import DAFC from "src/routes/dafc";
import OmToGFC from "src/routes/dafc/OmToGFC";
import EfControl from "src/routes/dafc/EfControl";
import EfValidation from "src/routes/dafc/EfValidation";
import MyDocuments from "src/routes/utilisateur/MyDocuments";
import AdvanceMenu from "../routes/dafc/AdvanceMenu";

import { fetchPendingsAdvances } from 'src/reducer/dafc';
import AcAdvance from "../routes/dafc/AcAdvance";

// Sélecteurs
import { fetchTmpSignature, fetchTmpUserData } from "../reducer/tmpReducer";

export default {
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
    {
      path: 'demandes-d-avance',
      element: <AdvanceMenu />,
      loader: async ({ request }) => {
        const { agent: { agent, user} } = store.getState((state) => state);
        // console.log(agent);
        const agentData = {
          roles: agent.roles,
        }
        // TODO : selon l'agent, récupérer tous les documents qu'iel doit vérifier.
          store.dispatch(fetchPendingsAdvances());
          // fetch
      },
    },
    {
      path: 'demandes-d-avance/' + encodeURIComponent('demande-à-signer'),
      element: <AcAdvance />,
      loader: async ({ request }) => {
        const url = new URL(request.url);
        const id = Number(url.searchParams.get("id"));

        const { agent: { user }, dafc: { pendingDocs }} = store.getState();   
        
        store.dispatch(fetchTmpSignature({id: user}));

        const om = pendingDocs.find((om) => om.id === id);
        om ? store.dispatch(fetchTmpUserData({id:om.missioner})): null ; 
        return url;
      },
    },

  ]
};
