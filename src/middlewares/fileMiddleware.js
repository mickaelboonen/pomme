import { createDispensation, updateOm, updateTransports, updateAdvance, updateMoreAndSignature, updateMission, updateSignature } from 'src/reducer/omForm';
import { fileApi, api } from './api';
import { requestVehicleAuthorization, updateVehicle, createVehicle } from '../reducer/vehicle';
import { toggleDocModal, saveAllPermDocs, saveAgentSignatureForPdf} from '../reducer/otherDocuments';
import { setApiResponse } from 'src/reducer/app';
import { updateEfMission, updateEfTransports } from 'src/reducer/ef';
import { handleEfFilesUploadPayload } from 'src/selectors/fileFunctions';
import { updateEfAccomodations, updateEfSignature } from '../reducer/ef';


fileApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
fileApi.defaults.headers['Content-Type'] = 'multipart/form-data';

const omMiddleware = (store) => (next) => (action) => {
  const { agent: { user }} = store.getState()
  switch (action.type) {
    case 'omForm/uploadFile': {
      const { agent: { user }} = store.getState()
      const filesToUpload = [];

      const { data, step, docType } = action.payload;
      console.log('DATA IN THE FILEMIDDLEWARE : ', data);
      
      const type = docType ? docType : 'om';
      if (type === 'om') {
      
        if (step === "transports") {
        
          if (data.transportDispensation && typeof data.transportDispensation !== 'string') {
            const transportDispensation = {
              omId: data.docId,
              type: 'transport-dispensation',
              file: data.transportDispensation,
            }
            filesToUpload.push(transportDispensation);
          }
          
          
          if (data.vehicleAuthorization &&typeof data.vehicleAuthorization !== 'string') {
            const vehicleAuthorization = {
              omId: data.docId,
              type: 'vehicle-authorization',
              file: data.vehicleAuthorization,
            }
            filesToUpload.push(vehicleAuthorization);
          }
        }
        else if (step === "advance") {
          if (data.hotelQuotation && typeof data.hotelQuotation !== 'string') {
            const hotelQuotation = {
              omId: data.docId,
              type: 'hotel-quotation',
              file: data.hotelQuotation,
            }
            filesToUpload.push(hotelQuotation);
          }
          if (data.agentRib && typeof data.agentRib !== 'string') {
            const rib = {
              omId: data.docId,
              type: 'rib',
              file: data.agentRib,
            }
            filesToUpload.push(rib);
          }
        }
        else if (step === "more-and-signature") {
          if (data.agentSignature instanceof File) {
            console.log(data);
            const signature = {
              docId: data.docId,
              type: 'signature',
              file: data.agentSignature,
            }
            filesToUpload.push(signature);
          }
          data.files.forEach((file) => {
            if (file instanceof File) {
              const fileToUpload = {
                omId: data.docId,
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
            docId: data.docId,
            type: 'om',
            file: data.file,
          }
          filesToUpload.push(fileToUpload);
        }
        else if (step === 'mission') {
          data.missionPurposeFile.forEach((file) => {
            if (file instanceof File) {
              const fileToUpload = {
                omId: data.docId,
                type: 'mission',
                file: file,
              }
              filesToUpload.push(fileToUpload);
            }
          })
        }

      }
      else if (type === 'ef') {
        
        if (step === "mission") {
          data.modificationFiles.forEach((file) => {
            if (file instanceof File) {
              const fileToUpload = {
                docId: data.docId,
                type: 'mission',
                file: file,
              }
              filesToUpload.push(fileToUpload);
            }
          })
        }
        else if (step === 'transports') {
          const files = handleEfFilesUploadPayload(data, 'transports');
          files.forEach((file) => filesToUpload.push(file));
        }
        else if (step === 'accomodations') {
          const files = handleEfFilesUploadPayload(data, 'accomodations');
          files.forEach((file) => filesToUpload.push(file));
        }
        else if (step === 'signature') {
          if (data.agentRib instanceof File) {
            const fileToUpload = {
              docId: data.docId,
              type: 'rib',
              name: 'agentRib',
              file: data.agentRib,
            }
            filesToUpload.push(fileToUpload);
          }
          if (data.agentSignature instanceof File) {
            const fileToUpload = {
              docId: data.docId,
              type: 'signature',
              name: 'signature',
              file: data.agentSignature,
            }
            filesToUpload.push(fileToUpload);
          }
        }
        else if (type === 'authorization') {

          if (step === 'authorization') {

            if (data.externalSignature instanceof File) {
              const signature = {
                omId: data.docId,
                type: 'externalSignature',
                user: user,
                file: data.externalSignature,
              }
              filesToUpload.push(signature);
            }

            if (data.registration_document instanceof File) {

                const registration = {
                  omId: data.docId,
                  type: 'registration',
                  user: user,
                  file: data.registration_document,
                }
                filesToUpload.push(registration);
            }

            if (data.insurance instanceof File) {
                const insurance = {
                  omId: data.docId,
                  type: 'insurance',
                  user: user,
                  file: data.insurance,
                }
                filesToUpload.push(insurance);
            }
          }
        }
      }
      else if (type === 'authorization') {
        // if (data.insurance instanceof File) {
        //   const insurance = {
        //     docId: data.docId,
        //     type: 'insurance',
        //     file: data.insurance,
        //     user: user,
        //   }
        //   filesToUpload.push(insurance);
        // }
        // if (data.registration_document instanceof File) {
        //   const registrationDocument = {
        //     docId: data.docId,
        //     type: 'registration',
        //     file: data.registration_document,
        //     user: user,
        //   }
        //   filesToUpload.push(registrationDocument);
        // }
        filesToUpload.push({
          docId: data.docId,
          type: 'auth-pdf',
          file: data.file,
          user: user,
        });
      }
      else if (type === 'dispensation') {

        filesToUpload.push({
          docId: data.docId,
          type: 'dispensation-pdf',
          file: data.file,
          user: user,
        });
      }
      console.log('filesToUpload - ', filesToUpload);
      // return;
      
      // TODO : See if POST method is the right one ? Methods that can add files (post) and delete them (delete)
      fileApi.post(`/api/files/${type}/${step}`, filesToUpload)
        .then((response) => {

          const { data } = action.payload;
          console.log("--------------------------------------------------------------------------------------");
          console.log(`/api/files/${type}/${step} RESPONSE IS : `, response.data)

          if (type === 'om') {

            if (step === "more-and-signature") {
              data.files = [];
            }
            else if (step === 'mission') {
              data.missionPurposeFile = [];
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
              console.log('before update : ', data);
              store.dispatch(updateTransports(data));
            }
            else if (step === 'advance') {
              delete data.advance;
              console.log('before update : ', data);
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
            else if (step === 'om') {
              console.log('before update : ', data);
              delete data.file;
              store.dispatch(updateOm(data));
            }
          }
          else if (type === 'ef') {
            if (step === 'mission') {
              data.modificationFiles = [];
            }
            
            response.data.forEach((file) => {
              
              if (file.type === 'mission') {
                data.modificationFiles.push(file.file.url);
              }
              else if (file.type === 'transports') {
                data[file.name] = data[file.name].filter((url) => !url instanceof File)
                data[file.name].push(file.file.url);
              }
              else if (file.type === 'accomodations') {
                data[file.name] = data[file.name].filter((url) => !url instanceof File)
                data[file.name].push(file.file.url);
              }
              else if (file.type === 'signature') {
                data[file.name] = file.file.url;
              }
              else if (file.type === 'rib') {
                data[file.name] = file.file.url;
              }
            })

            // Now updates the transports values in the database
            if (step === 'mission') {
              console.log('before update : ', data);
              data.docId = data.efId;
              store.dispatch(updateEfMission(data));
            }
            else if (step === 'transports') {
              console.log('before update : ', data);
              store.dispatch(updateEfTransports(data));
            }
            else if (step === 'accomodations') {
              console.log('before update : ', data);
              delete data.efId;
              store.dispatch(updateEfAccomodations(data));
            }
            else if (step === 'signature') {
              console.log('before update : ', data);
              store.dispatch(updateEfSignature(data));
            }
          }
          else if (type === 'authorization') {
            data.externalSignature = [];

            response.data.forEach((file) => {
              
               if (file.type === 'externalSignature') {
                data.externalSignature.push(file.file.url);
              }
              else if (file.type === 'insurance') {
                data.insurance = file.file.url;
              }
              else if (file.type === 'registration') {
                data.registration_document = file.file.url;
              }
              else if (file.type === 'auth-pdf') {
                
                data.file = file.file.url;
              }
            })
            
            store.dispatch(requestVehicleAuthorization(data));
          }
          else if (type === 'dispensation') {
                
            data.file = response.data[0].file.url;
            
            store.dispatch(createDispensation(data));
          }
        })
        .catch((error) => {
          console.error('addfiles', error);
          store.dispatch(setApiResponse(error));
          // TODO : error
        });
      }
      break;
    // TODO -------------------------------------------------------
    case 'other-documents/uploadVehicleFiles':
      
      const filesToUpload = [];
      const { data, user, isUpdate } = action.payload;
      
      if (data.registrationFile instanceof File) {
        const registration = {
          id: data.id ? data.id : null,
          type: 'registration',
          file: data.registrationFile,
          owner: user,
        }
        filesToUpload.push(registration);
      }
      
      if (data.insuranceFile instanceof File) {
        const insurance = {
          id: data.id ? data.id : null,
          type: 'insurance',
          file: data.insuranceFile,
          owner: user,
        }
        filesToUpload.push(insurance);
      }
      fileApi.post(`/api/vehicle/handle/files`, filesToUpload)
        .then((response) => {
          const { data } = action.payload;

          response.data.forEach((file) => {
            if (file.type === 'registration'){
              data.registrationFile =  file.file.url;
            }
            else if (file.type === 'insurance'){
              data.insuranceFile =  file.file.url;
            }
          })
          
          if (isUpdate) {
            store.dispatch(updateVehicle(data))
          }
          else {
            store.dispatch(createVehicle(data))
          }
          
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
        
      break;
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
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        console.error('delete perm files', error);
        // TODO : error
      });
      break;
    // TODO -------------------------------------------------------
    case 'other-documents/editPermFile':{
      const { id } = action.payload;
      
      fileApi.post(`/api/file/perm/update/${id}`, action.payload)
        .then((response) => {
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
          store.dispatch(saveAgentSignatureForPdf(response.data));
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
