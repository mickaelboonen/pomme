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
import omFormReducer from 'src/reducer/omForm';
import efReducer from 'src/reducer/ef';
import appReducer from 'src/reducer/app';
import vehicleReducer from 'src/reducer/vehicle';
import otherDocsReducer from 'src/reducer/otherDocuments';

// Middlewares
import omMiddleware from '../middlewares/omMiddleware';
import efMiddleware from '../middlewares/efMiddleware';
import fileMiddleware from '../middlewares/fileMiddleware';
import appMiddleware from '../middlewares/appMiddleware';
import vehicleMiddleware from '../middlewares/vehicleMiddleware';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2 // ADDED
}

const reducers = combineReducers({
  ef: efReducer,
  app: appReducer,
  omForm: omFormReducer,
  docs: otherDocsReducer,
  vehicle: vehicleReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(omMiddleware, efMiddleware, fileMiddleware, appMiddleware, vehicleMiddleware)
})

export const persistor = persistStore(store)

export default store;
