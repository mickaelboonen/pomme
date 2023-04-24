import { saveVehicles, saveVehicle, saveVehicleDocuments, requestVehicleAuthorization, saveAuthorization } from 'src/reducer/vehicle';
import { uploadFile, validateSideForm } from 'src/reducer/omForm';

import { api, setTokenOnApi } from './api';
import { setMessage } from '../reducer/vehicle';
import { setApiResponse } from '../reducer/app';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const vehicleMiddleware = (store) => (next) => (action) => {
  // const { agent: { token } } = store.getState();
  // setTokenOnApi(token);
  
  const { agent : { user } } = store.getState();
  switch (action.type) {
    case 'vehicle/createVehicle':
      api.post("/api/vehicle/add/" + user, action.payload)
        .then((response) => {
          
          const newDataFormat = {
            docId: Number(response.data.docId),
            vehicle_id: Number(response.data.selectedVehicle),
            registration_document: '',
            externalSignature: null,
            insurance: '',
            reasons: response.data.reasons,
            type: response.data.carType,
            file: action.payload.file,
          }
          
          if (newDataFormat.file instanceof File) {
            store.dispatch(uploadFile({data: newDataFormat, step: 'authorization', docType: 'authorization'}));
          }
          else if (!response.data.docId) {

            const message = "Votre véhicule a bien été enregistré.";
            response.data = message;
            store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
          }
          else {
            console.log("Am I in the else ? ");
            store.dispatch(requestVehicleAuthorization(newDataFormat));
          }
        })
        .catch((error) => {
          console.error('add vehicle', error);
          store.dispatch(setApiResponse(error));
        });
      break;
    
    case 'vehicle/updateVehicle':
      api.post("/api/vehicle/update/" + action.payload.id, action.payload)
        .then((response) => {
           
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));

        })
      .catch((error) => {
        console.error('update vehicle', error);
      });
      break;
    case 'vehicle/deleteVehicle':
        api.delete("/api/vehicle/delete/" + action.payload)
          .then((response) => {
             
            store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));

          })
        .catch((error) => {
          console.error('update vehicle', error);
        });
      break;
      case 'vehicle/getVehicles':
        api.get("/api/vehicles/" + action.payload.agent)
          .then((response) => {
            store.dispatch(saveVehicles(response.data))
          })
          .catch((error) => {
            console.error('get vehicles', error);
          });
        break;
        case 'vehicle/fetchVehicle':
          api.get("/api/vehicle/" + action.payload.id)
            .then((response) => {
              store.dispatch(saveVehicle(response.data))
            })
            .catch((error) => {
              console.error('vehicle/fetchVehicle', error);
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
          console.error('get vehicle documents', error);
        });
      break;
    case 'vehicle/requestVehicleAuthorization':
      api.post("/api/vehicle/authorization/add", action.payload)
        .then((response) => {
          
          store.dispatch(saveAuthorization(response.data.authorization));
          store.dispatch(setApiResponse({message: response.data.message, response: { status: 200}}));
        })
        .catch((error) => {
          console.error('vehicle/requestVehicleAuthorization', error);
        });
      break;

  
    default:
  }
  next(action);
};

export default vehicleMiddleware;
