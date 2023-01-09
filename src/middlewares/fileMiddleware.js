import { updateTransports, updateAdvance } from 'src/reducer/omForm';
import { fileApi } from './api';


fileApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
fileApi.defaults.headers['Content-Type'] = 'multipart/form-data';

const omMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'omForm/uploadFile':
      console.log(action.payload);
      const filesToUpload = [];

      const { data, step } = action.payload;

      if (step === "transports") {
        // Setting the data for the request
        if (data.transportDispensation) {
          const transportDispensation = {
            omId: data.omId,
            type: 'transport-dispensation',
            file: data.transportDispensation,
          }
          filesToUpload.push(transportDispensation);
        }
        if (data.vehicleAuthorization) {
          const vehicleAuthorization = {
            omId: data.omId,
            type: 'vehicle-authorization',
            file: data.vehicleAuthorization,
          }
          filesToUpload.push(vehicleAuthorization);
        }
      }
      else if (step === "advance") {
        const hotelQuotation = {
          omId: data.omId,
          type: 'hotel-quotation',
          file: data.hotelQuotation,
        }
        filesToUpload.push(hotelQuotation);
      }

      // TODO : See if POST method is the right one ? Methods that can add files (post) and delete them (delete)
      fileApi.post("/api/files/om/" + step, filesToUpload)
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
          if (step === 'transports') {
            store.dispatch(updateTransports(tranportsData));
          }
          else if (step === 'advance') {
            // store.dispatch(updateAdvance({}));

          }
          
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
