import { saveNewOm, saveUserOms } from 'src/reducer/omForm';
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
    
    default:
  }
  next(action);
};

export default omMiddleware;
