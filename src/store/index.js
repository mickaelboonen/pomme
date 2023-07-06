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

// Middlewares
import omMiddleware from '../middlewares/omMiddleware';
import efMiddleware from '../middlewares/efMiddleware';
import fileMiddleware from '../middlewares/fileMiddleware';
import appMiddleware from '../middlewares/appMiddleware';
import vehicleMiddleware from '../middlewares/vehicleMiddleware';
import omManagerMiddleware from '../middlewares/omManagerMiddleware';
import travelProgramMiddleware from '../middlewares/travelProgramMiddleware';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['agent', 'app'],
  blacklist: ['docs', 'omForm', 'ef', '_persist', 'app.apiMessage', 'app.agentDocuments'],
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
})

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(omMiddleware, efMiddleware, fileMiddleware, appMiddleware, vehicleMiddleware, omManagerMiddleware, travelProgramMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export default store;
