import React from "react";
import store from 'src/store';

import Gestionnaires from "src/routes/gestionnaire";
import DocRefusalForm from "src/routes/gestionnaire/DocRefusal";
import DocValidation from "src/routes/gestionnaire/DocValidation";
import EfValidation from "src/routes/gestionnaire/EfValidation";
import Delegation from "src/routes/gestionnaire/Delegation";

import { fetchOm } from "src/reducer/omForm";
import { fetchPendingOms, fetchValidationChannels, fetchPendingEfs } from "src/reducer/omManager";
import { setLoader } from "src/reducer/omForm";
import SuiviPdf from "../routes/gestionnaire/SuiviPdf";
import Preferences from "../routes/gestionnaire/Preferences";
import { useSelector } from "react-redux";

import { getAgentPreferences } from 'src/reducer/agent';
import { setManagerLoader } from "../reducer/omManager";
import { getDocument } from "../reducer/app";
import { fetchTmpSignature, fetchTmpUserData } from "../reducer/tmpReducer";

export default {
  path: 'gestionnaire/',
  children: [
    {
      path: encodeURIComponent('ordres-de-mission-à-signer'),
      element: <Gestionnaires />,
      loader: async ({ request }) => {
        const { agent: { agent, user} } = store.getState((state) => state);
        // console.log(agent);
        const agentData = {
          roles: agent.roles,
        }
        // TODO : selon l'agent, récupérer tous les documents qu'iel doit vérifier.
          store.dispatch(fetchPendingOms({cptLogin: user, roles: agent.roles, channel: agent.channel}));
          // fetch
      },
    },
    {
      path: encodeURIComponent('états-de-frais-à-signer'),
      element: <Gestionnaires isOm={false} />,
      loader: async ({ request }) => {
        const { agent: { agent, user} } = store.getState((state) => state);
        
        // TODO : selon l'agent, récupérer tous les documents qu'iel doit vérifier.
          store.dispatch(fetchPendingEfs({cptLogin: user, roles: agent.roles, channel: agent.channel}));
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

            const { omManager: { pendingDocs }, agent: { agent, user}  } = store.getState((state) => state);
            if (pendingDocs.length === 0) {
              store.dispatch(fetchPendingOms({cptLogin: user, roles: agent.roles, channel: agent.channel}));
            }
            
            if (step === '6') {
                store.dispatch(setLoader(true));
                store.dispatch(fetchValidationChannels());
                store.dispatch(fetchOm({id: id}));
            }
            
          return url;  
          },
        },
        {
          path: encodeURIComponent('état-de-frais'),
          element: <EfValidation />,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            const step = url.searchParams.get("etape");
            const id = url.searchParams.get("id");
            const omId = url.searchParams.get("om");
            
            const { omManager: { pendingDocs }, agent: { agent, user}  } = store.getState((state) => state);

            // if (pendingDocs.length === 0) {
              // store.dispatch(setLoader(true));
              store.dispatch(setManagerLoader(true));
              store.dispatch(fetchPendingEfs({cptLogin: user, roles: agent.roles, channel: agent.channel}));
            // }

            if (step === '1') {
                // store.dispatch(setLoader(true));
                store.dispatch(fetchOm({id: omId, handleManagerLoader: true}));
            }
            
            if (step === '5') {
                // store.dispatch(setLoader(true));
                store.dispatch(fetchValidationChannels());
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
    {
      path: 'suivi-pdf',
      element: <SuiviPdf />,
    },
    {
      path: encodeURIComponent('mes-préférences'),
      element: <Preferences />,
      loader: async ({ request }) => {
        
        const { agent: { user }} = store.getState();
        // console.log(agent);
        store.dispatch(getAgentPreferences(user));
        
      },
    },
    {
      path: 'viser-un-document/',
      children: [
        {
          path: 'ordre-de-mission',
          element: <Delegation isOm={true} />,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            const id = Number(url.searchParams.get("id"));
    
            const { agent: { user }, omManager: { pendingDocs }} = store.getState();
            // store.dispatch(getDocument({type: 'signature', id: user}));
            store.dispatch(fetchTmpSignature({id: user}));
            // const id = Number(request.url.searchParams.get('id'));

            const currentOM = pendingDocs.find((om) => om.id === id);
            console.log(pendingDocs, id);
            store.dispatch(fetchTmpUserData({id: currentOM.missioner}))
            return url},
        },
        {
          path: encodeURIComponent('état-de-frais'),
          element: <Delegation isOm={false} />,
          loader: async ({ request }) => new URL(request.url),
        }
      ],
    },
  ]
};
