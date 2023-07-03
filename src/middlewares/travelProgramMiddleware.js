import { saveVehicles, saveVehicle, saveVehicleDocuments, requestVehicleAuthorization, saveAuthorization } from 'src/reducer/vehicle';
import { uploadFile, validateSideForm } from 'src/reducer/omForm';

import { api, setTokenOnApi } from './api';
import { setMessage } from '../reducer/vehicle';
import { setApiResponse } from '../reducer/app';
import { saveAgentsPrograms, saveProgram } from '../reducer/otherDocuments';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const travelProgramMiddleware = (store) => (next) => (action) => {
  
  switch (action.type) {
    case 'other-documents/createProgram':
      api.post("/api/travel-program/add", action.payload)
        .then((response) => {
          console.log(response);
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));;
        });
      break;
    
    case 'other-documents/updateProgram':
      api.post("/api/travel-program/update/" + action.payload.id, action.payload)
        .then((response) => {
           
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));

        })
      .catch((error) => {
        store.dispatch(setApiResponse(error));;
      });
      break;
    case 'other-documents/deleteProgram':
        api.delete("/api/travel-program/delete/" + action.payload)
          .then((response) => {
             
            store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));

          })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
      case 'other-documents/getAgentsPrograms':
        api.get("/api/travel-program/find-by-agent/" + action.payload.agent)
          .then((response) => {
            store.dispatch(saveAgentsPrograms(response.data))
          })
          .catch((error) => {
            store.dispatch(setApiResponse(error));
          });
        break;
    case 'other-documents/fetchProgram':
      api.get("/api/travel-program/find/" + action.payload.id)
        .then((response) => {
          store.dispatch(saveProgram(response.data))
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    case 'vehicle/getVehicleDocuments':
      api.get("/api/perm-file/vehicle/" + action.payload)
        .then((response) => {
          if (response.data.length > 0) {
            store.dispatch(saveVehicleDocuments(response.data))
          }
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    case 'vehicle/requestVehicleAuthorization':
      api.post("/api/vehicle/authorization/add", action.payload)
        .then((response) => {
          
          store.dispatch(saveAuthorization(response.data.authorization));
          store.dispatch(setApiResponse({message: response.data.message, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;

  
    default:
  }
  next(action);
};

export default travelProgramMiddleware;
