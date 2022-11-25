// import React from 'react';
// import { createRoot  } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// // import { Provider } from 'react-redux';
// // import { store, persistor } from 'src/store';
// // import { PersistGate } from 'redux-persist/lib/integration/react';
// // import history from 'src/utils/history';

// import App from './components/App';

// const rootReactElement = (
//   // <Provider store={store}>
//   //   <PersistGate persistor={persistor}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//   //   </PersistGate>
//   // </Provider>
// );

// const target = document.getElementById('root');

// const root = createRoot(document.getElementById('root'));
// root.render(rootReactElement);

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import EfForm from "./components/App/EfForm";
// import "./index.css";

import Home from './components/App/Home';
import Layout from './components/App/Layout';
import MyAccount from "./components/App/MyAccount";
import AddVehicle from "./components/App/MyAccount/AddVehicle";
import EditVehicle from "./components/App/MyAccount/EditVehicle";
import ELForm from "./components/App/MyAccount/ELForm";
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
            path: 'ordre-de-mission',
            element: <EfForm step={1} />    
          },
          {
            path: '%C3%A9tat-de-frais',
            element: <EfForm step={1} />    
          },

        ]

      },
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
            
          ]
        }
          
        ]
      },
      {
        path: 'gestionnaire/:slug/',
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
        ]
      },
      {
        path: 'dafc/',
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
