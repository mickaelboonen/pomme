import { updateTransports, updateAdvance, updateMore, updateMission } from 'src/reducer/omForm';
import { fileApi } from './api';


fileApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
fileApi.defaults.headers['Content-Type'] = 'multipart/form-data';

const omMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'omForm/uploadFile':
      const filesToUpload = [];

      const { data, step } = action.payload;
      console.log(step);
      
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
        const rib = {
          omId: data.omId,
          type: 'rib',
          file: data.agentRib,
        }
        filesToUpload.push(hotelQuotation, rib);
      }
      else if (step === "signature") {
        if (typeof data.signature !== 'string') {
          const signature = {
            omId: data.omId,
            type: 'signature',
            file: data.signature,
          }
          filesToUpload.push(hotelQuotation, signature);
        }
        
        if (data.otherFiles) {
          
        }
      }
      else if (step === "more") {
        data.files.forEach((file) => {
          const fileToUpload = {
            omId: data.omId,
            type: 'more',
            file: file,
          }
          filesToUpload.push(fileToUpload);
        })
      }
      else if (step === 'mission') {
        const mission = {
          omId: data.omId,
          type: 'mission',
          file: data.missionPurposeFile,
        }
        filesToUpload.push(mission);
      }
      console.log('filesToUpload', filesToUpload);
      // return;
      
      // TODO : See if POST method is the right one ? Methods that can add files (post) and delete them (delete)
      fileApi.post("/api/files/om/" + step, filesToUpload)
        .then((response) => {

          const { data } = action.payload;
          console.log(response.data);

          if (step === "more") {
            data.files = [];
          }

          // Retrieving the url for each file and assigning it to the right property
          response.data.forEach((file) => {
            
            if (file.type === 'transport-dispensation') {
              data.transportDispensation = file.file.url;
            }
            else if (file.type === 'vehicle-authorization') {
              data.vehicleAuthorization = file.file.url;
            }
            else if (file.type === 'hotel-quotation') {
              data.hotelQuotation = file.file.url;
            }
            else if (file.type === 'rib') {
              data.agentRib = file.file.url;
            }
            else if (file.type === 'more') {
              data.files.push(file.file.url);
            }
            else if (file.type === 'mission') {
              data.missionPurposeFile = file.file.url;
            }
          })

          // Now updates the transports values in the database
          if (step === 'transports') {
            store.dispatch(updateTransports(data));
          }
          else if (step === 'advance') {
            delete data.advance;
            store.dispatch(updateAdvance(data));
          }
          else if (step === 'more') {
            console.log('before update : ', data);
            store.dispatch(updateMore(data));
          }
          else if (step === 'mission') {
            console.log('before update : ', data);
            store.dispatch(updateMission(data));
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
