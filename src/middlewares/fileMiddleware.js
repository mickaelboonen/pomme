import { updateTransports, saveUserOms } from 'src/reducer/omForm';
import { fileApi } from './api';


fileApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
fileApi.defaults.headers['Content-Type'] = 'multipart/form-data';

const omMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'omForm/uploadFile':

      const filesToUpload = [];

      if (action.payload.transportDispensation) {
        const transportDispensation = {
          omId: action.payload.omId,
          type: 'transport-dispensation',
          file: action.payload.transportDispensation,
        }
        filesToUpload.push(transportDispensation);
      }
      if (action.payload.vehicleAuthorization) {
        const vehicleAuthorization = {
          omId: action.payload.omId,
          type: 'vehicle-authorization',
          file: action.payload.vehicleAuthorization,
        }
        filesToUpload.push(vehicleAuthorization);
      }

      fileApi.post("/api/files/om/transports", filesToUpload)
        .then((response) => {

          const tranportsData = action.payload;

          response.data.forEach((file) => {

            if (file.type === 'transport-dispensation') {
              tranportsData.transportDispensation = file.file.url;
            }
            else if (file.type === 'vehicle-authorization') {
              tranportsData.vehicleAuthorization = file.file.url;
            }
          })


          store.dispatch(updateTransports(tranportsData));
          // store.dispatch(saveNewOm(finalisedOM))
        })
        .catch((error) => {
          console.error('addfiles', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;

    default:
  }
  next(action);
};

export default omMiddleware;
