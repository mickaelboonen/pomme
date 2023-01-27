import { updateTransports, updateAdvance, updateMore, updateMission, updateSignature } from 'src/reducer/omForm';
import { fileApi } from './api';
import { requestVehicleAuthorization } from '../reducer/vehicle';


fileApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
fileApi.defaults.headers['Content-Type'] = 'multipart/form-data';

const omMiddleware = (store) => (next) => (action) => {
  const { app: { user }} = store.getState()
  switch (action.type) {
    case 'omForm/uploadFile':
      const filesToUpload = [];

      const { data, step, docType } = action.payload;
      console.log('DATA IN THE FILEMIDDLEWARE : ', data);
      
      if (step === "transports") {
        
          if (data.transportDispensation && typeof data.transportDispensation !== 'string') {
            const transportDispensation = {
              omId: data.omId,
              type: 'transport-dispensation',
              file: data.transportDispensation,
            }
            filesToUpload.push(transportDispensation);
          }
          
          
          if (data.vehicleAuthorization &&typeof data.vehicleAuthorization !== 'string') {
            const vehicleAuthorization = {
              omId: data.omId,
              type: 'vehicle-authorization',
              file: data.vehicleAuthorization,
            }
            filesToUpload.push(vehicleAuthorization);
          }
      }
      else if (step === "advance") {
        if (data.hotelQuotation && typeof data.hotelQuotation !== 'string') {
          const hotelQuotation = {
            omId: data.omId,
            type: 'hotel-quotation',
            file: data.hotelQuotation,
          }
          filesToUpload.push(hotelQuotation);
        }
        if (data.agentRib && typeof data.agentRib !== 'string') {
          const rib = {
            omId: data.omId,
            type: 'rib',
            file: data.agentRib,
          }
          filesToUpload.push(rib);
        }
      }
      else if (step === "signature") {
        const signature = {
          omId: data.omId,
          type: 'signature',
          file: data.agentSignature,
        }
        filesToUpload.push(signature);
      }
      else if (step === "more") {
        console.log(data);
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
        data.missionPurposeFile.forEach((file) => {
          const fileToUpload = {
            omId: data.omId,
            type: 'mission',
            file: file,
          }
          filesToUpload.push(fileToUpload);
        })
      }
      else if (step === 'authorization') {

        if (data.externalSignature && typeof data.externalSignature !== 'string') {
          data.externalSignature.forEach((signa) => {
            const signature = {
              omId: data.omId,
              type: 'externalSignature',
              user: user,
              file: signa.externalSignature,
            }
            filesToUpload.push(signature);

          })
        }

        if (data.registration_document instanceof File) {

            const registration = {
              omId: data.omId,
              type: 'registration',
              user: user,
              file: data.registration_document,
            }
            filesToUpload.push(registration);
        }

        if (data.insurance instanceof File) {
            const insurance = {
              omId: data.omId,
              type: 'insurance',
              user: user,
              file: data.insurance,
            }
            filesToUpload.push(insurance);
        }
      }
      console.log('filesToUpload - ', filesToUpload);
      
      const type = docType ? docType : 'om';
      // TODO : See if POST method is the right one ? Methods that can add files (post) and delete them (delete)
      fileApi.post(`/api/files/${type}/${step}`, filesToUpload)
        .then((response) => {

          const { data } = action.payload;

          if (step === "more") {
            data.files = [];
          }
          else if (step === 'mission') {
            data.missionPurposeFile = [];
          }
          else if (step === 'authorization') {
            data.externalSignature = [];
          }

          // Retrieving the url for each file and assigning it to the right property
          response.data.forEach((file) => {
            // console.log(file);
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
              data.missionPurposeFile.push(file.file.url);
            }
            else if (file.type === 'signature') {
              data.agentSignature = file.file.url;
            }
            else if (file.type === 'externalSignature') {
              data.externalSignature.push(file.file.url);
            }
            else if (file.type === 'insurance') {
              data.insurance = file.file.url;
            }
            else if (file.type === 'registration') {
              data.registration_document = file.file.url;
            }
          })
          
          // Now updates the transports values in the database
          if (step === 'transports') {
            console.log('middleware here');
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
            delete data.om;
            console.log('before update : ', data);
            store.dispatch(updateMission(data));
          }
          else if (step === 'signature') {
            console.log('before update : ', data);
            store.dispatch(updateSignature(data));
          }
          else if (step === 'authorization') {
            console.log('before update : ', data);
            store.dispatch(requestVehicleAuthorization(data));
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
