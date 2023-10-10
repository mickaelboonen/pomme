
import { savePendingAdvances } from 'src/reducer/dafc';

import { api } from './api';
import { setApiResponse } from '../reducer/app';
import { saveDepartments, saveServices, saveValidationChannels, resetOmsOnDisplay, savePendingEfs, saveOmTypes } from '../reducer/omManager';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const dafcMiddleware = (store) => (next) => (action) => {  
  const { agent : { user } } = store.getState();
  switch (action.type) {
    case 'dafc/fetchPendingsAdvances':
      api.get("/api/om/advance/find-all-for-ac")
        .then((response) => {
          store.dispatch(savePendingAdvances(response.data))
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));;
        });
      break;
    default:
  }
  next(action);
};

export default dafcMiddleware;
