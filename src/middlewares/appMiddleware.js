import { saveSignature, saveVehicles, saveVehicleDocuments } from 'src/reducer/app';
import { api } from './api';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'app/getSignature':
      api.get("/api/perm-file/signature/" + action.payload)
        .then((response) => {
          if (response.data.length > 0) {
            store.dispatch(saveSignature(response.data[0]))
          }
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    // case 'app/getVehicles':
    //   const { app : { user } } = store.getState();
    //   api.get("/api/vehicles/" + user)
    //     .then((response) => {
    //       store.dispatch(saveVehicles(response.data))
    //     })
    //     .catch((error) => {
    //       console.error('get vehicles', error);
    //       // store.dispatch(showTicketCreationResponse(error.response))
    //     });
    //   break;
    // case 'app/getVehicleDocuments':
    //   api.get("/api/perm-file/vehicle/" + action.payload)
    //     .then((response) => {
    //       if (response.data.length > 0) {
    //         store.dispatch(saveVehicleDocuments(response.data))
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('get vehicle documents', error);
    //       // store.dispatch(showTicketCreationResponse(error.response))
    //     });
    //   break;
    case 'app/getMission':
      api.get("/api/om/mission/" + action.payload)
        .then((response) => {
          // if (response.data.length > 0) {
            console.log(response.data);
            // store.dispatch(saveSignature(response.data[0]))
          // }
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;

  
    default:
  }
  next(action);
};

export default appMiddleware;
