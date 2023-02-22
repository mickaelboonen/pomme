import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
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
import { PersistGate } from 'redux-persist/integration/react'

// Reducers
import omFormReducer from 'src/reducer/omForm';
import efFormReducer from 'src/reducer/efForm';
import appReducer from 'src/reducer/app';
import vehicleReducer from 'src/reducer/vehicle';
import otherDocsReducer from 'src/reducer/otherDocuments';

// Middlewares
import omMiddleware from '../middlewares/omMiddleware';
import fileMiddleware from '../middlewares/fileMiddleware';
import appMiddleware from '../middlewares/appMiddleware';
import vehicleMiddleware from '../middlewares/vehicleMiddleware';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducers = combineReducers({
  app: appReducer,
  omForm: omFormReducer,
  efForm: efFormReducer,
  vehicle: vehicleReducer,
  docs: otherDocsReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = [omMiddleware, fileMiddleware, appMiddleware, vehicleMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // })
    [omMiddleware, fileMiddleware, appMiddleware, vehicleMiddleware]
    // middlewareEnhancer,
})
const store2 = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(omMiddleware, fileMiddleware, appMiddleware, vehicleMiddleware)
    // [omMiddleware, fileMiddleware, appMiddleware, vehicleMiddleware]
    // middlewareEnhancer,
})
// console.log(store, store2);

export const persistor = persistStore(store2)

// export const store = configureStore({
//   reducer: {
//     app: appReducer,
//     omForm: omFormReducer,
//     efForm: efFormReducer,
//     vehicle: vehicleReducer,
//   }, 
//   middleware: [omMiddleware, fileMiddleware, appMiddleware, vehicleMiddleware],
// });

export default store;
