
import { savePendingOms } from 'src/reducer/omManager';

import { api } from './api';
import { setApiResponse } from '../reducer/app';
import { saveValidationChannels } from '../reducer/omManager';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const omManagerMiddleware = (store) => (next) => (action) => {  
  const { agent : { user } } = store.getState();
  switch (action.type) {
    case 'omManager/fetchPendingOms':
      api.get("/api/manager/om/status/2")
        .then((response) => {
          store.dispatch(savePendingOms(response.data))
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));;
        });
      break;
    
    case 'omManager/fetchValidationChannels':
      api.get("/api/validation-channels/fetch")
      .then((response) => {
        store.dispatch(saveValidationChannels(response.data))
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));;
      });
      break;
    
    case 'omManager/updateGestComments':
      api.post("/api/om/update/comments", action.payload)
      .then((response) => {
        console.log(response);
        // store.dispatch(saveValidationChannels(response.data))
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));;
      });
      break;
    case 'vehicle/deleteVehicle':
      
      break;
    case 'vehicle/getVehicles':
        
      break;
    case 'vehicle/fetchVehicle':
          
      break;
    case 'vehicle/getVehicleDocuments':
      
      break;
    case 'vehicle/requestVehicleAuthorization':
      
      break;

  
    default:
  }
  next(action);
};

export default omManagerMiddleware;
