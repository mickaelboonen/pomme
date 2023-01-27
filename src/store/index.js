import { configureStore } from '@reduxjs/toolkit';
import omFormReducer from 'src/reducer/omForm';
import efFormReducer from 'src/reducer/efForm';
import appReducer from 'src/reducer/app';
import vehicleReducer from 'src/reducer/vehicle';

import omMiddleware from '../middlewares/omMiddleware';
import fileMiddleware from '../middlewares/fileMiddleware';
import appMiddleware from '../middlewares/appMiddleware';
import vehicleMiddleware from '../middlewares/vehicleMiddleware';
// import contactMiddleware from '../middlewares/contactMiddleware';
// import newsletterMiddleware from '../middlewares/newsletterMiddleware';

export const store = configureStore({
  reducer: {
    app: appReducer,
    omForm: omFormReducer,
    efForm: efFormReducer,
    vehicle: vehicleReducer,
  }, 
  middleware: [omMiddleware, fileMiddleware, appMiddleware, vehicleMiddleware],
});

export default store;
