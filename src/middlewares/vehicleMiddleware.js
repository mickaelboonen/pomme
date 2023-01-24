import { saveSignature, saveVehicles, saveVehicleDocuments } from 'src/reducer/app';
import { api } from './api';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const vehicleMiddleware = (store) => (next) => (action) => {
  const { app : { user } } = store.getState();
  switch (action.type) {
    case 'app/createVehicle':
    // const { app : { user } } = store.getState();
      api.post("/api/vehicle/add/" + user, action.payload)
        .then((response) => {

          console.log(response.data);

          // TODO : once here - Verif if files.
          // TODO : if files, upload files then create REQUEST
          // TODO : or else, create request 
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'app/getVehicles':
      api.get("/api/vehicles/" + user)
        .then((response) => {
          store.dispatch(saveVehicles(response.data))
        })
        .catch((error) => {
          console.error('get vehicles', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'app/getVehicleDocuments':
      api.get("/api/perm-file/vehicle/" + action.payload)
        .then((response) => {
          if (response.data.length > 0) {
            store.dispatch(saveVehicleDocuments(response.data))
          }
        })
        .catch((error) => {
          console.error('get vehicle documents', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;

  
    default:
  }
  next(action);
};

export default vehicleMiddleware;
