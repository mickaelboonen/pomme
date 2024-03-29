import {
  saveNewOm,
  saveOm,
  saveUserOms,
  saveMission,
  saveTransports,
  saveAccomodations,
  saveAdvance,
  saveMore,
  setLoader,
  validateSideForm,
} from 'src/reducer/omForm';
import { saveOMs, addOmToList } from 'src/reducer/agent';
import { setApiResponse } from 'src/reducer/app';
import { setEfLoader, fetchEf } from 'src/reducer/ef';
import { api, setTokenOnApi } from './api';
import { setManagerLoader } from '../reducer/omManager';
// import { api } from './newApi';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const omMiddleware = (store) => (next) => (action) => {
  
  const { agent: { token } } = store.getState();
  setTokenOnApi(token);

  switch (action.type) {
    case 'omForm/createScientificEvent':
      api.post("/api/om/scientific-event/create", action.payload)
        .then((response) => {
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));

        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    case 'omForm/addNewOM':
      api.post("/api/om/add", action.payload,)
        .then((response) => {
          store.dispatch(addOmToList(response.data));
          store.dispatch(saveNewOm(response.data));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    case 'omForm/fetchOm':
      api.get("/api/om/find/" + action.payload.id)
        .then((response) => {
          
          store.dispatch(saveOm(response.data));
          
          if (action.payload.handleLoader) {
            store.dispatch(setLoader(false));
          }
          if (action.payload.handleEfLoader) {
            store.dispatch(setEfLoader(false));
          }
          if (action.payload.handleManagerLoader) {
            store.dispatch(setManagerLoader(false));
          }

          if (action.payload.workflow === 'ef') {
            store.dispatch(fetchEf(action.payload.data));
          }
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;

    case 'agent/fetchOMs':
      api.get("/api/om/" + action.payload,)
        .then((response) => {
          
          store.dispatch(saveUserOms(response.data))
          store.dispatch(saveOMs(response.data))
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;

    case 'omForm/updateOmName':
      api.post("/api/om/rename", action.payload)
        .then((response) => {
          // store.dispatch(saveUserOms(response.data));
          // store.dispatch(setApiResponse(response));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;

    case 'omForm/updateMission':
      delete action.payload.om;
      api.post("/api/om/mission/update" , action.payload,)
        .then((response) => {
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;

    case 'omForm/updateTransports':
      // TODO : See if POST method is the right one ? Should be PATCH / PUT but not working
      api.post("/api/om/transports/update" , action.payload)
        .then((response) => {
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;

    case 'omForm/updateAdvance':
      // TODO : See if POST method is the right one ? Should be PATCH / PUT but not working
      api.post("/api/om/advance/update" , action.payload)
        .then((response) => {
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;

      case 'omForm/updateMore':
        // TODO : See if POST method is the right one ? Should be PATCH / PUT but not working
        api.post("/api/om/more/update" , action.payload)
          .then((response) => {
            store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
          })
          .catch((error) => {
            store.dispatch(setApiResponse(error));
          });
      break;

      case 'omForm/updateSignature':
        // TODO : See if POST method is the right one ? Should be PATCH / PUT but not working
        api.post("/api/om/signature/update" , action.payload)
          .then((response) => {
            store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
          })
          .catch((error) => {
            store.dispatch(setApiResponse(error));
          });
      break;

    case 'omForm/updateAccomodations':
      api.post("/api/om/accomodations/update" , action.payload,)
        .then((response) => {
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    
    case 'omForm/updateMoreAndSignature':
      api.post("/api/om/more/update",  action.payload)
        .then((response) => {
          
            // store.dispatch(saveMoreAndSignature(response.data))
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    
    case 'omForm/getMission':
      api.get("/api/om/mission/find/" + action.payload.id)
        .then((response) => {
          store.dispatch(saveMission(response.data));

          if (action.payload.handleEfLoader) {
            store.dispatch(setEfLoader(false));
          }
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    
    case 'omForm/getTransports':
      api.get("/api/om/transports/find/" + action.payload)
        .then((response) => {
          store.dispatch(saveTransports(response.data));
          store.dispatch(setEfLoader(false));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    
    case 'omForm/getAccomodations':
      api.get("/api/om/accomodations/find/" + action.payload)
        .then((response) => {
            store.dispatch(saveAccomodations(response.data));

        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    
      case 'omForm/getMore':
        api.get("/api/om/more/find/" + action.payload)
          .then((response) => {
            
              store.dispatch(saveMore(response.data))
          })
          .catch((error) => {
            store.dispatch(setApiResponse(error));
          });
        break;
    
    case 'omForm/getAdvance':
      api.get("/api/om/advance/find/" + action.payload)
        .then((response) => {
            store.dispatch(saveAdvance(response.data))

        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    
      case 'omForm/createDispensation':
        api.post("/api/om/derogation/create", action.payload)
          .then((response) => {
            store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));

          })
          .catch((error) => {
            store.dispatch(setApiResponse(error));
          });
        break;
      case 'omForm/updateOm':
        api.post("/api/om/update", action.payload)
          .then((response) => {
            store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
          })
          .catch((error) => {
            store.dispatch(setApiResponse(error));
          });
        break;
      case 'omForm/deleteAddress':
        api.delete("/api/address/delete/" + action.payload)
          .then((response) => {
            store.dispatch(setApiResponse({message: response.data, response: { status: 202}}));
            // store.dispatch(saveMission(response.data))
            // TODO 
              // store.dispatch(validateSideForm(response.data));
          })
          .catch((error) => {
            store.dispatch(setApiResponse(error));
          });
        break;
      case 'omForm/deleteOm':
        api.delete("/api/om/delete/" + action.payload)
          .then((response) => {
            store.dispatch(setApiResponse({message: response.data, response: { status: 202}}));
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
