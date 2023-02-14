import {
  saveNewOm,
  saveOm,
  saveUserOms,
  saveMission,
  saveTransports,
  saveAccomodations,
  saveAdvance,
  saveMore,
} from 'src/reducer/omForm';
import { setApiResponse } from 'src/reducer/app';
import { api } from './api';
import { validateSideForm } from '../reducer/omForm';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const omMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'omForm/addNewOM':
      api.post("/api/om/add", action.payload,)
        .then((response) => {
          console.log('omForm/addNewOM : ', response.data, action.payload)
          const finalisedOM = action.payload;
          finalisedOM.id = response.data;
          store.dispatch(saveNewOm(finalisedOM))
        })
        .catch((error) => {
          console.error('add new om', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'omForm/fetchOm':
      api.get("/api/om/find/" + action.payload)
        .then((response) => {
          console.log(response);
          store.dispatch(saveOm(response.data))
        })
        .catch((error) => {
          console.error('fetch om', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;

    case 'omForm/fetchOMs':
      console.log(action.type + " : " + action.payload)
      api.get("/api/om/" + action.payload,)
        .then((response) => {
          console.log(response.data);
          store.dispatch(saveUserOms(response.data))
        })
        .catch((error) => {
          console.error('add new om', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;

    case 'omForm/updateOmName':
      api.post("/api/om/rename", action.payload)
        .then((response) => {
          console.log(response);
          // store.dispatch(saveUserOms(response.data));
          // store.dispatch(setApiResponse(response));
        })
        .catch((error) => {
          console.error('add new om', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;

    case 'omForm/updateMission':
      delete action.payload.om;
      api.post("/api/om/mission/update" , action.payload,)
        .then((response) => {
          console.log(response);
          store.dispatch(setApiResponse(response));
        })
        .catch((error) => {
          console.error('update new om', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;

    case 'omForm/updateTransports':
      // TODO : See if POST method is the right one ? Should be PATCH / PUT but not working
      api.post("/api/om/transports/update" , action.payload)
        .then((response) => {
          console.log(response);
          store.dispatch(setApiResponse(response));
        })
        .catch((error) => {
          console.error('update new om', error);
          // TODO : error message
        });
      break;

    case 'omForm/updateAdvance':
      // TODO : See if POST method is the right one ? Should be PATCH / PUT but not working
      api.post("/api/om/advance/update" , action.payload)
        .then((response) => {
          console.log(response);
          store.dispatch(setApiResponse(response));
        })
        .catch((error) => {
          console.error('update advance', error);
          // TODO : error message
        });
      break;

      case 'omForm/updateMore':
        // TODO : See if POST method is the right one ? Should be PATCH / PUT but not working
        api.post("/api/om/more/update" , action.payload)
          .then((response) => {
            console.log("SUCCESS MORE : ", response);
            store.dispatch(setApiResponse(response));
          })
          .catch((error) => {
            console.error('update more', error);
            // TODO : error message
          });
      break;

      case 'omForm/updateSignature':
        // TODO : See if POST method is the right one ? Should be PATCH / PUT but not working
        api.post("/api/om/signature/update" , action.payload)
          .then((response) => {
            store.dispatch(setApiResponse(response));
          })
          .catch((error) => {
            console.error('update more', error);
            // TODO : error message
          });
      break;

    case 'omForm/updateAccomodations':
      console.log('omForm/updateAccomodations', action.payload);
      api.post("/api/om/accomodations/update" , action.payload,)
        .then((response) => {
          console.log(response);
          store.dispatch(setApiResponse(response));
        })
        .catch((error) => {
          console.error('update accomodations', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    
    case 'omForm/updateMoreAndSignature':
      api.post("/api/om/more-and-signature/update",  action.payload)
        .then((response) => {
          console.log(response.data);
            // store.dispatch(saveMoreAndSignature(response.data))
          store.dispatch(setApiResponse(response));
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    
    case 'omForm/getMission':
      api.get("/api/om/mission/find/" + action.payload)
        .then((response) => {
            store.dispatch(saveMission(response.data))

        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    
    case 'omForm/getTransports':
      api.get("/api/om/transports/find/" + action.payload)
        .then((response) => {
          console.log('MIDDLEWARE : ', response);
          store.dispatch(saveTransports(response.data));
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    
    case 'omForm/getAccomodations':
      api.get("/api/om/accomodations/find/" + action.payload)
        .then((response) => {
            store.dispatch(saveAccomodations(response.data))

        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    
      case 'omForm/getMore':
        api.get("/api/om/more-and-signature/find/" + action.payload)
          .then((response) => {
            console.log(response.data);
              store.dispatch(saveMore(response.data))
          })
          .catch((error) => {
            console.error('get signature', error);
            // store.dispatch(showTicketCreationResponse(error.response))
          });
        break;
    
    case 'omForm/getAdvance':
      api.get("/api/om/advance/find/" + action.payload)
        .then((response) => {
            store.dispatch(saveAdvance(response.data))

        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    
    case 'omForm/createDerogation':
      console.log('here');
      api.post("/api/om/derogation/create", action.payload)
        .then((response) => {
            store.dispatch(validateSideForm(response.data));
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    
  
    default:
  }
  next(action);
};

export default omMiddleware;
