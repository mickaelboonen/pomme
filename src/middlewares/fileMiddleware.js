import { updateOm, updateTransports, updateAdvance, updateMoreAndSignature, updateMission, updateSignature } from 'src/reducer/omForm';
import { fileApi, api } from './api';
import { requestVehicleAuthorization, saveVehicles } from '../reducer/vehicle';
import { toggleDocModal, saveAllPermDocs, saveAgentSignatureForPdf} from '../reducer/otherDocuments';
import { setApiResponse } from '../reducer/app';


fileApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
fileApi.defaults.headers['Content-Type'] = 'multipart/form-data';

const omMiddleware = (store) => (next) => (action) => {
  const { app: { user }} = store.getState()
  switch (action.type) {
    case 'omForm/uploadFile':
      const filesToUpload = [];
      console.log('IN THE MIDDLEWARE', action.payload);

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
      else if (step === "more-and-signature") {
        if (data.agentSignature instanceof File) {
          const signature = {
            omId: data.omId,
            type: 'signature',
            file: data.agentSignature,
          }
          filesToUpload.push(signature);
        }
        data.files.forEach((file) => {
          if (file instanceof File) {
            const fileToUpload = {
              omId: data.omId,
              type: 'more',
              file: file,
            }
            filesToUpload.push(fileToUpload);
          }
        })
      }
      else if (step === "om") {
        console.log(data);
        const fileToUpload = {
          omId: data.omId,
          type: 'om',
          file: data.file,
        }
        filesToUpload.push(fileToUpload);
      }
      else if (step === 'mission') {
        data.missionPurposeFile.forEach((file) => {
          if (file instanceof File) {
            const fileToUpload = {
              omId: data.omId,
              type: 'mission',
              file: file,
            }
            filesToUpload.push(fileToUpload);
          }
        })
      }
      else if (step === 'authorization') {

        if (data.externalSignature instanceof File) {
          const signature = {
            omId: data.omId,
            type: 'externalSignature',
            user: user,
            file: data.externalSignature,
          }
          filesToUpload.push(signature);
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
      // return;
      const type = docType ? docType : 'om';
      // TODO : See if POST method is the right one ? Methods that can add files (post) and delete them (delete)
      fileApi.post(`/api/files/${type}/${step}`, filesToUpload)
        .then((response) => {

          const { data } = action.payload;

          if (step === "more-and-signature") {
            data.files = [];
          }
          else if (step === 'mission') {
            data.missionPurposeFile = [];
          }
          else if (step === 'authorization') {
            data.externalSignature = [];
          }

          // TODO : mettre les propriétés attendues pour l'update 

          console.log(response)
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
            else if (file.type === 'om') {
              data.url = file.file.url;
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
          else if (step === 'more-and-signature') {
            console.log('before update : ', data);
            store.dispatch(updateMoreAndSignature(data));
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
          else if (step === 'om') {
            console.log('before update : ', data);
            store.dispatch(updateOm(data));
          }
          
        })
        .catch((error) => {
          console.error('addfiles', error);
          // TODO : error
        });
      break;
    // TODO -------------------------------------------------------
    case 'other-documents/addPermFile': {
      const { type } = action.payload;
      fileApi.post(`/api/file/perm/add/${type}`, action.payload)
      .then((response) => {

        store.dispatch(toggleDocModal({ action: '', type: '', data: response.data}));
      })
      .catch((error) => {
        console.error('add perm files', error);
        // TODO : error
      });
      break;
    }
    case 'other-documents/deletePermFile':
      fileApi.delete(`/api/file/perm/delete/${action.payload.id}`)
      .then((response) => {
        store.dispatch(setApiResponse({data: response.data, status: 200}));
      })
      .catch((error) => {
        console.error('delete perm files', error);
        // TODO : error
      });
      break;
    // TODO -------------------------------------------------------
    case 'other-documents/editPermFile':{
      const { id } = action.payload;
      console.log(action.payload);
      fileApi.post(`/api/file/perm/update/${id}`, action.payload)
        .then((response) => {

          console.log(response)

          store.dispatch(toggleDocModal({ action: '', type: ''}));
        })
        .catch((error) => {
          console.error('add perm files', error);
          // TODO : error
        });
        break;
      }
    case 'other-documents/findPermFilesByAgent':
      
      api.get(`/api/files/perm/${action.payload.agent}`)
      .then((response) => {
        store.dispatch(saveAllPermDocs(response.data));
      })
      .catch((error) => {
        console.error('add perm files', error);
        // TODO : error
      });
      break;
        break;

    case 'other-documents/fetchAgentSignatureForPdf':
      console.log(action.payload);
      fileApi.post('/api/agent/signature', action.payload)
        .then((response) => {
          response.uri = response.data;
          store.dispatch(saveAgentSignatureForPdf(response));
        })
        .catch((error) => {
          console.error('error fetchAgentSignatureForPdf', error);
          // TODO : error
        });
      break;
    default:
  }
  next(action);
};

export default omMiddleware;
