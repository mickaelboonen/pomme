import { saveNewOm, saveOm, saveUserOms, saveMission } from 'src/reducer/omForm';
import { api } from './api';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const omMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'omForm/addNewOM':
      api.post("/api/om/add", action.payload,)
        .then((response) => {
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
      api.get("/api/om/" + action.payload,)
        .then((response) => {
          store.dispatch(saveUserOms(response.data))
        })
        .catch((error) => {
          console.error('add new om', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;

    case 'omForm/updateOmName':
      api.post("/api/om/rename/" + action.payload.id, action.payload)
        .then((response) => {
          store.dispatch(saveUserOms(response.data))
        })
        .catch((error) => {
          console.error('add new om', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;

    case 'omForm/updateMission':
      api.post("/api/om/mission/update" , action.payload,)
        .then((response) => {
          console.log(response);
          // store.dispatch(saveUserOms(response.data))
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
          // TODO : success message
          // TODO : loader ? 
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
          // TODO : success message
          // TODO : loader ? 
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
            // TODO : success message
            // TODO : loader ? 
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
            console.log("SUCCESS MORE : ", response);
            // TODO : success message
            // TODO : loader ? 
          })
          .catch((error) => {
            console.error('update more', error);
            // TODO : error message
          });
      break;

    case 'omForm/updateAccomodations':
      console.log('here');
      api.post("/api/om/accomodations/update" , action.payload,)
        .then((response) => {
          console.log(response);
          // store.dispatch(saveUserOms(response.data))
        })
        .catch((error) => {
          console.error('update accomodations', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    
    case 'omForm/getMission':
    api.get("/api/om/mission/find/" + action.payload)
      .then((response) => {
        // if (response.data.length > 0) {
          console.log(response.data);
          store.dispatch(saveMission(response.data[0]))
        // }
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
