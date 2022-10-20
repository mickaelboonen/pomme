import React from 'react';
import { createRoot  } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store, persistor } from 'src/store';
// import { PersistGate } from 'redux-persist/lib/integration/react';
// import history from 'src/utils/history';

import App from './components/App';

const rootReactElement = (
  // <Provider store={store}>
  //   <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  //   </PersistGate>
  // </Provider>
);

const target = document.getElementById('root');

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);
