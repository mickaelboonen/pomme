import { saveVehicles, saveVehicleDocuments, requestVehicleAuthorization } from 'src/reducer/vehicle';
import { uploadFile, validateSideForm } from 'src/reducer/omForm';

import { api } from './api';
import { setMessage } from '../reducer/vehicle';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const vehicleMiddleware = (store) => (next) => (action) => {
  const { app : { user } } = store.getState();
  switch (action.type) {
    case 'vehicle/createVehicle':
      api.post("/api/vehicle/add/" + user, action.payload)
        .then((response) => {

          const newDataFormat = {
            omId: Number(response.data.omId),
            vehicle_id: Number(response.data.selectedVehicle),
            registration_document: action.payload.carRegistrationFile,
            externalSignature: action.payload.signature,
            insurance: action.payload.carInsuranceFile,
            reasons: response.data.reasons,
            type: response.data.carType,
          }

          if (newDataFormat.registration_document instanceof File) {
            console.log('there is a least one file : ', newDataFormat);
            store.dispatch(uploadFile({data: newDataFormat, step: 'authorization', docType: 'authorization'}));
          }
          else if (newDataFormat.insurance instanceof File) {
            console.log('there is aa least one file', newDataFormat);
            store.dispatch(uploadFile({data: newDataFormat, step: 'authorization', docType: 'authorization'}));
          }
          else if (newDataFormat.signature instanceof File) {
            console.log('there is aaa least one file', newDataFormat);
            store.dispatch(uploadFile({data: newDataFormat, step: 'authorization', docType: 'authorization'}));
          }
          else {
            console.log('there are no files sad', newDataFormat);
            store.dispatch(requestVehicleAuthorization(newDataFormat));
          }
        })
        .catch((error) => {
          console.error('get signature', error);
        });
      break;
    case 'vehicle/getVehicles':
      api.get("/api/vehicles/" + user)
        .then((response) => {
          store.dispatch(saveVehicles(response.data))
        })
        .catch((error) => {
          console.error('get vehicles', error);
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
          console.log(response.data);
          store.dispatch(validateSideForm());
          store.dispatch(setMessage(response));
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