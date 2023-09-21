
import { savePendingOms } from 'src/reducer/omManager';

import { api } from './api';
import { setApiResponse } from '../reducer/app';
import { saveDepartments, saveServices, saveValidationChannels, resetOmsOnDisplay, savePendingEfs} from '../reducer/omManager';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const omManagerMiddleware = (store) => (next) => (action) => {  
  const { agent : { user } } = store.getState();
  switch (action.type) {
    case 'omManager/fetchPendingOms':
      api.post("/api/manager/pending-oms/fetch", action.payload)
        .then((response) => {
          store.dispatch(savePendingOms(response.data))
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));;
        });
      break;
    case 'omManager/fetchPendingEfs':
      api.post("/api/manager/pending-efs/fetch", action.payload)
        .then((response) => {
          store.dispatch(savePendingEfs(response.data))
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
    case 'omManager/fetchServicesAndDepartments':      
      api.get("/api/services/fetch/all")
        .then((response) => {
          store.dispatch(saveServices(response.data));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });    
      api.get("/api/departments/fetch/all")
        .then((response) => {
          store.dispatch(saveDepartments(response.data));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;

    case 'omManager/manageOm':
      api.post("/api/om/management/validate", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        // store.dispatch(saveValidationChannels(response.data))
      })
      .catch((error) => {
        console.log("ERROR : ", error);
        store.dispatch(setApiResponse(error));;
      });
      break;
    case 'omManager/rejectOm':
      api.post("/api/om/management/reject", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        console.log("ERROR : ", error);
        store.dispatch(setApiResponse(error));;
      });
      break;
    case 'omManager/stampOm':
      api.post("/api/om/stamp", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        console.log("ERROR : ", error);
        store.dispatch(setApiResponse(error));;
      });
      break;
    case 'omManager/rejectVisaOm':
      api.post("/api/om/reject-visa", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        console.log("ERROR : ", error);
        store.dispatch(setApiResponse(error));;
      });
      break;
    default:
  }
  next(action);
};

export default omManagerMiddleware;
