import { saveVehicles, saveVehicle, saveVehicleDocuments, requestVehicleAuthorization, saveAuthorization } from 'src/reducer/vehicle';
import { uploadFile, validateSideForm } from 'src/reducer/omForm';

import { api, setTokenOnApi } from './api';
import { setMessage } from '../reducer/vehicle';
import { setApiResponse } from '../reducer/app';
import { saveAgentsPrograms, saveProgram, saveUserPassport } from '../reducer/otherDocuments';


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
    case 'other-documents/fetchUserPassport':
      api.get("/api/perm-file/passport/"+ action.payload.id)
        .then((response) => {
          store.dispatch(saveUserPassport(response.data))
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
