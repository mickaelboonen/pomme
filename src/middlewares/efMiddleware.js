import { setApiResponse } from 'src/reducer/app';
import { api } from './api';
import { saveNewEf, saveEfs } from '../reducer/ef';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const efMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
  case 'ef/addNewEf':
    api.post("/api/ef/add", action.payload,)
      .then((response) => {
        console.log(response);
        // const finalisedEf = action.payload;
        // finalisedEf.id = response.data;
        // store.dispatch(saveNewEf(finalisedEf))
      })
      .catch((error) => {
        console.error('add new om', error);
        // store.dispatch(showTicketCreationResponse(error.response))
      });
    break;
  case 'ef/fetchEfs':
    console.log("IM HERE");
    api.get("/api/ef/" + action.payload)
      .then((response) => {
        console.log(response);
        store.dispatch(saveEfs(response.data))
      })
      .catch((error) => {
        console.error('add new om', error);
        // store.dispatch(showTicketCreationResponse(error.response))
      });
    break;
  case 'ef/updateEfMission':
    console.log(action.type, action.payload);
    api.post("/api/ef/mission/update", action.payload)
      .then((response) => {
        console.log("RESPONSE IS : ",response);
        // store.dispatch(saveEfs(response.data))
      })
      .catch((error) => {
        console.error('update EF mission', error);
        // store.dispatch(showTicketCreationResponse(error.response))
      });
    break;

    default:
  }
  next(action);
};

export default efMiddleware;
