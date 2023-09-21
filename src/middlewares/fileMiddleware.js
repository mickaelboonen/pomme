
import { fileApi, api, setTokenOnApi } from './api';
import { setApiResponse } from 'src/reducer/app';
import { handleEfFilesUploadPayload } from 'src/selectors/fileFunctions';
import { requestVehicleAuthorization, updateVehicle, createVehicle } from 'src/reducer/vehicle';
import { toggleDocModal, saveAllPermDocs, saveAgentSignatureForPdf} from 'src/reducer/otherDocuments';
import { updateEfAccomodations, updateEfRib, updateEf, updateEfMission, updateEfTransports } from 'src/reducer/ef';
import { createDispensation, updateOm, updateTransports, updateAdvance, updateMoreAndSignature, updateMission, createScientificEvent } from 'src/reducer/omForm';
// import { manageOm } from 'src/reducer/omManager';
import { rejectVisaOm, stampOm, manageOm } from 'src/reducer/omManager';

fileApi.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
fileApi.defaults.headers['Content-Type'] = 'multipart/form-data';

const omMiddleware = (store) => (next) => (action) => {
  
  // const { agent: { token } } = store.getState();
  // setTokenOnApi(token);

  switch (action.type) {
    case 'omForm/uploadFile': {
      const { agent: { user }} = store.getState()
      const filesToUpload = [];

      const { data, step, docType } = action.payload;
      // console.log('DATA IN THE FILEMIDDLEWARE : ', data, docType);
      
      const type = docType ? docType : 'om';
      if (type === 'om') {
      
        if (step === "transports") {

          const docTypes = ['transport-dispensation', 'taxi-dispensation', 'vehicle-authorization']

          docTypes.forEach((currentType) => {
            const deconstructedType = currentType.split('-');
            deconstructedType[1] = deconstructedType[1].replace(deconstructedType[1][0], deconstructedType[1][0].toUpperCase());
            
            const property = deconstructedType[0] + deconstructedType[1];
            
            if (data[property] instanceof File) {
              filesToUpload.push({
                docId: data.docId,
                type: currentType,
                file: data[property],
              });
            }
          })
        }
        else if (step === "advance") {
          data.hotelQuotations.forEach((file) => {
            if (file instanceof File) {
              filesToUpload.push({
                docId: data.docId,
                type: 'hotel-quotation',
                file: file,
              });
            }
          })

          if (data.agentRib instanceof File) {
            const rib = {
              docId: data.docId,
              type: 'rib',
              file: data.agentRib,
            }
            filesToUpload.push(rib);
          }
        }
        else if (step === "more") {
          data.files.forEach((file) => {
            if (file instanceof File) {
              const fileToUpload = {
                docId: data.docId,
                type: 'more',
                file: file,
              }
              filesToUpload.push(fileToUpload);
            }
          })
        }
        else if (step === "om") {
          filesToUpload.push({
            docId: data.docId,
            type: 'om',
            file: data.file,
          });
        }
        else if (step === 'mission') {
          data.missionPurposeFile.forEach((file) => {
            if (file instanceof File) {
              filesToUpload.push({
                docId: data.docId,
                type: 'mission',
                file: file,
              });
            }
          })
          if (data.maps) {
            data.maps.forEach((file) => {
              if (file instanceof File) {
                filesToUpload.push({
                  docId: data.docId,
                  type: 'map',
                  file: file,
                });
              }
            })
          }
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
                name: 'modificationFiles',
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
              name: 'agentSignature',
              file: data.agentSignature,
            }
            filesToUpload.push(fileToUpload);
          }
        }
        else if (step === 'ef') {
          filesToUpload.push({
            docId: data.docId,
            type: 'pdf-ef',
            file: data.file,
            user: user,
          });
        }
      }
      else if (type === 'authorization') {
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
      else if (type === 'science') {

        data.files.forEach((file) => {
          if (file instanceof File) {
            filesToUpload.push({
              docId: data.docId,
              type: 'documents',
              file: file,
              user: user,
            });
          }
        })
        filesToUpload.push({
          docId: data.docId,
          type: 'scientific-pdf',
          file: data.pdf,
          user: user,
        });
      }
      
      fileApi.post(`/api/files/${type}/${step}`, filesToUpload)
        .then((response) => {

          const { data } = action.payload;
          console.log(`FILECONTROLLER RESPONSE IS : `, response.data)

          if (type === 'om') {

            if (step === "more") {
              data.files = [];
            }
            else if (step === 'mission') {
              // data.missionPurposeFile = [];
              // data.maps = [];
            }
            else if (step === 'hotel-quotation') {
              data.hotelQuotations = [];
            }
            
            // Retrieving the url for each file and assigning it to the right property
            response.data.forEach((file) => {
              
              if (file.type === 'transport-dispensation') {
                data.transportDispensation = file.file.url;
              }
              else if (file.type === 'taxi-dispensation') {
                data.taxiDispensation = file.file.url;
              }
              else if (file.type === 'vehicle-authorization') {
                data.vehicleAuthorization = file.file.url;
              }
              else if (file.type === 'hotel-quotation') {
                data.hotelQuotations.push(file.file.url);
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
              else if (file.type === 'map') {
                data.maps.push(file.file.url);
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
              store.dispatch(updateTransports(data));
            }
            else if (step === 'advance') {
              data.hotelQuotations = data.hotelQuotations.filter((file) => typeof file === 'string');
              store.dispatch(updateAdvance(data));
            }
            else if (step === 'more') {
              store.dispatch(updateMoreAndSignature(data));
            }
            else if (step === 'mission') {
              delete data.om;
              if (data.maps) {
                data.maps = data.maps.filter((file) => typeof file === 'string')
              }
              data.missionPurposeFile = data.missionPurposeFile.filter((file) => typeof file === 'string')
              store.dispatch(updateMission(data));
            }
            else if (step === 'om') {
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
                data[file.name].push(file.file.url);
              }
              else if (file.type === 'signature') {
                data[file.name] = file.file.url;
              }
              else if (file.type === 'rib') {
                data[file.name] = file.file.url;
              }
              else if (file.type === 'pdf-ef') {
                data.url = file.file.url;
              }
            })

            // Now updates the transports values in the database
            if (step === 'mission') {
              store.dispatch(updateEfMission(data));
            }
            else if (step === 'transports') {
              store.dispatch(updateEfTransports(data));
            }
            else if (step === 'accomodations') {
              data.eventFiles = data.eventFiles.filter((url) => typeof url === 'string');
              data.hotelFiles = data.hotelFiles.filter((url) => typeof url === 'string');
              delete data.efId;
              store.dispatch(updateEfAccomodations(data));
            }
            else if (step === 'signature') {
              store.dispatch(updateEfRib(data));
            }
            else if (step === 'ef') {
              delete data.file;
              store.dispatch(updateEf(data));
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
          else if (type === 'science') {
            data.files = [];
                
            response.data.forEach((currentFile) => {
              
              if (currentFile.type === 'documents') {
                data.files.push(currentFile.file.url);
              }
              else {
                data.pdf = currentFile.file.url;
              }
            })
            
            store.dispatch(createScientificEvent(data));
          }
        })
        .catch((error) => {
          console.error('addfiles', error);
          store.dispatch(setApiResponse(error));;
        });
      }
      break;
    // TODO -------------------------------------------------------
    case 'omForm/changeFileStatus':
      api.post("/api/files/update-status", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));

      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
      break;
    case 'omManager/addOmMonitoringPdf':
      const { task, nextAction } = action.payload; 
      const pdf = {
        file: action.payload.data.file,
        docId: action.payload.data.docId,
        task: task ?? 'add'
      }
      
      fileApi.post('/api/om/monitoring-file', pdf)
        .then((response) => {
          console.log(response);
          if (task) {            
            if (nextAction === "stampOm") {
              store.dispatch(stampOm(action.payload.data))
            }
            else if (nextAction === "manageOm") {
              store.dispatch(manageOm(action.payload.data))
            }
            else if (nextAction === "rejectVisaOm") {
              store.dispatch(rejectVisaOm(action.payload.data))
            }
          }
          else {
            store.dispatch(manageOm(action.payload.data));
          }
          

        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
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
        store.dispatch(setApiResponse(error));
      });
      break;
    }
    case 'other-documents/deletePermFile':
      fileApi.delete(`/api/file/perm/delete/${action.payload.id}`)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
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
          store.dispatch(setApiResponse(error));
        });
        break;
      }
    case 'other-documents/findPermFilesByAgent':
      
      api.get(`/api/files/perm/${action.payload.agent}`)
      .then((response) => {
        store.dispatch(saveAllPermDocs(response.data));
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
      break;
    default:
  }
  next(action);
};

export default omMiddleware;
