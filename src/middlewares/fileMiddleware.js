import { updateTransports, saveUserOms } from 'src/reducer/omForm';
import { fileApi } from './api';


fileApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
fileApi.defaults.headers['Content-Type'] = 'multipart/form-data';

const omMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'omForm/uploadFile':

      const filesToUpload = [];

      // Setting the data for the request
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

      // TODO : See if POST method is the right one ? Methods that can add files (post) and delete them (delete)
      fileApi.post("/api/files/om/transports", filesToUpload)
        .then((response) => {

          const tranportsData = action.payload;

          // Retrieving the url for each file and assigning it to the right property
          response.data.forEach((file) => {
            if (file.type === 'transport-dispensation') {
              tranportsData.transportDispensation = file.file.url;
            }
            else if (file.type === 'vehicle-authorization') {
              tranportsData.vehicleAuthorization = file.file.url;
            }
          })

          // Now updates the transports values in the database
          store.dispatch(updateTransports(tranportsData));
        })
        .catch((error) => {
          console.error('addfiles', error);
          // TODO : error
        });
      break;

    default:
  }
  next(action);
};

export default omMiddleware;
