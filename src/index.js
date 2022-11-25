import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import DAFC from "./components/App/DAFC";
import EfControl from "./components/App/DAFC/EfControl";
import EfValidation from "./components/App/DAFC/EfValidation";
import OmToGFC from "./components/App/DAFC/OmToGFC";
import EfForm from "./components/App/EfForm";
import Gestionnaires from "./components/App/Gestionnaire";
import DocRefusalForm from "./components/App/Gestionnaire/DocRefusal";
import DocValidationForm from "./components/App/Gestionnaire/DocValidationForm";
// import "./index.css";

import Home from './components/App/Home';
import Layout from './components/App/Layout';
import MyAccount from "./components/App/MyAccount";
import AddVehicle from "./components/App/MyAccount/AddVehicle";
import EditVehicle from "./components/App/MyAccount/EditVehicle";
import ELForm from "./components/App/MyAccount/ELForm";
import Preferences from "./components/App/MyAccount/Preferences";
import RefusalNotification from "./components/App/MyAccount/RefusalNotification";
import TicketRequest from "./components/App/MyAccount/TicketRequest";
import OMForm from "./components/App/OMForm";
import VehicleUseForm from "./components/App/VehicleUseForm";
import MyDocuments from "./routes/documents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
            element: <OMForm step={1} />    
          },
          {
            path: 'autorisation-de-véhicule',
            element: <VehicleUseForm step={1} />    
          },
          {
            path: 'autorisation-de-v%C3%A9hicule',
            element: <VehicleUseForm step={1} />    
          },
          {
            path: 'état-de-frais',
            element: <EfForm step={1} />    
          },
          {
            path: '%C3%A9tat-de-frais',
            element: <EfForm step={1} />    
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
            element: <MyAccount />,
            children: [
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
