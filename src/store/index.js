import { configureStore, combineReducers } from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Reducers
import efReducer from 'src/reducer/ef';
import appReducer from 'src/reducer/app';
import agentReducer from 'src/reducer/agent';
import omFormReducer from 'src/reducer/omForm';
import vehicleReducer from 'src/reducer/vehicle';
import omManagerReducer from 'src/reducer/omManager';
import otherDocsReducer from 'src/reducer/otherDocuments';
import tmpReducer from 'src/reducer/tmpReducer';
import dafcReducer from 'src/reducer/dafc';
import presidencyReducer from 'src/reducer/presidency';

// Middlewares
import omMiddleware from 'src/middlewares/omMiddleware';
import efMiddleware from 'src/middlewares/efMiddleware';
import fileMiddleware from 'src/middlewares/fileMiddleware';
import appMiddleware from 'src/middlewares/appMiddleware';
import vehicleMiddleware from 'src/middlewares/vehicleMiddleware';
import omManagerMiddleware from 'src/middlewares/omManagerMiddleware';
import travelProgramMiddleware from 'src/middlewares/travelProgramMiddleware';
import dafcMiddleware from 'src/middlewares/dafcMiddleware';
import presidencyMiddleware from 'src/middlewares/presidencyMiddleware';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['agent', 'app', 'omManager'],
  blacklist: ['presidency', 'docs', 'omForm', 'ef', '_persist', 'app.apiMessage', 'app.agentDocuments', 'omManager.pendingDocs', 'tmp'],
  stateReconciler: autoMergeLevel2 // ADDED
};

const reducers = combineReducers({
  ef: efReducer,
  // app: persistReducer(appConfig, appReducer),
  app: appReducer,
  agent: agentReducer,
  omForm: omFormReducer,
  docs: otherDocsReducer,
  vehicle: vehicleReducer,
  omManager: omManagerReducer,
  tmp: tmpReducer,
  dafc: dafcReducer,
  presidency: presidencyReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(omMiddleware, efMiddleware, fileMiddleware, appMiddleware, vehicleMiddleware, omManagerMiddleware, travelProgramMiddleware, dafcMiddleware, presidencyMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export default store;
