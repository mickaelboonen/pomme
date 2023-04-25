import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from 'src/store';

import AppWithRouter from 'src/router';
import LoaderCircle from 'src/components/LoaderCircle';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoaderCircle />} persistor={persistor}  >
        <AppWithRouter />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
