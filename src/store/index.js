import { configureStore } from '@reduxjs/toolkit';
import omFormReducer from 'src/reducer/omForm';

// import teamMiddleware from '../middlewares/teamMiddleware';
// import playMiddleware from '../middlewares/playMiddleware';
// import dateMiddleware from '../middlewares/dateMiddleware';
// import galerieMiddleware from '../middlewares/galerieMiddleware';
// import contactMiddleware from '../middlewares/contactMiddleware';
// import newsletterMiddleware from '../middlewares/newsletterMiddleware';

export const store = configureStore({
  reducer: {
    omForm: omFormReducer,
  }, 
  // middleware: [galerieMiddleware, teamMiddleware, playMiddleware, dateMiddleware, newsletterMiddleware, contactMiddleware],
});

export default store;
