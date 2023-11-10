import { api, fileApi, setTokenOnApi } from './api';
import { setApiResponse } from '../reducer/app';
import { saveAgentsProgramsAndPV, saveProgram, saveUserPassport, saveUserIdPapers } from '../reducer/otherDocuments';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

fileApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
fileApi.defaults.headers['Content-Type'] = 'multipart/form-data';

const travelProgramMiddleware = (store) => (next) => (action) => {
  
  switch (action.type) {
    case 'other-documents/createProgram':
      api.post("/api/travel-program/add", action.payload)
        .then((response) => {
       // console.log(response);
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
    case 'other-documents/getAgentsProgramsAndPV':
      api.get("/api/travel-program/find-by-agent/" + action.payload.agent)
        .then((response) => {
          store.dispatch(saveAgentsProgramsAndPV(response.data))
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
    case 'other-documents/fetchUserIdPapers':
      api.post('/api/documents/travel/' + action.payload.id)
        .then((response) => {
          store.dispatch(saveUserIdPapers(response.data))
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;

    case 'other-documents/requestTickets':
      api.post("/api/tickets/request/without", action.payload)
        .then((response) => {
        console.log(response);
          // store.dispatch(saveUserPassport(response.data))
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    case 'other-documents/requestTicketsWithFile':
      fileApi.post("/api/tickets/request/with", action.payload)
        .then((response) => {
        console.log(response);
          // store.dispatch(saveUserPassport(response.data))
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
