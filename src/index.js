import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
// import {
//   persistStore,
// } from 'redux-persist'

import { PersistGate } from 'redux-persist/integration/react'
// import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import store from 'src/store';
// import {router} from 'src/router';
// const isRehydrated = store.getState()._persist.rehydrated;

import AppWithRouter from 'src/AppWithRouter';
import LoaderCircle from 'src/components/LoaderCircle';

import { persistor } from 'src/store';

// import StoreGate from "./components/StoreGate";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoaderCircle />} persistor={persistor}  >
        {/* <StoreGate store={store} isRehydrated={isRehydrated} > */}
            <AppWithRouter />
        {/* </StoreGate> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
