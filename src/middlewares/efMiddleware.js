import { setApiResponse } from 'src/reducer/app';
import { api } from './api';
import { saveNewEf, saveEf, setEfLoader, saveEfAccomodations } from 'src/reducer/ef';
import { saveEfs } from 'src/reducer/agent';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const efMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
  case 'ef/addNewEf':
    api.post("/api/ef/add", action.payload,)
      .then((response) => {
        const finalisedEf = action.payload;
        finalisedEf.id = response.data;
        console.log(finalisedEf);
        store.dispatch(saveNewEf(finalisedEf));
      })
      .catch((error) => {
        console.error('add new om', error);
          store.dispatch(setApiResponse(error))
      });
    break;
  case 'agent/fetchEfs':
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
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        console.error('update EF mission', error);
        store.dispatch(setApiResponse(error))
      });
    break;
  case 'ef/updateEfTransports':
    api.post("/api/ef/transports/update", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        console.error('update EF transports', error);
        store.dispatch(setApiResponse(error))
      });
    break;
  case 'ef/updateEfAccomodations':
    console.log(action.type, action.payload);
    api.post("/api/ef/accomodations/update", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        console.error('update EF transports', error);
        store.dispatch(setApiResponse(error))
      });
    break;
  case 'ef/updateEfSignature':
    api.post("/api/ef/signature/update", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        console.error('update EF signature', error);
        store.dispatch(setApiResponse(error))
      });
    break;
  case 'ef/fetchEf':
    api.get("/api/ef/find/" + action.payload.id)
      .then((response) => {
        store.dispatch(saveEf(response.data))

        // if (action.payload.step === '4' || action.payload.step === '3') {
          store.dispatch(setEfLoader(false));
        // }
      })
      .catch((error) => {
        console.error('fetchEf', error);
        // store.dispatch(showTicketCreationResponse(error.response))
      });
    
    break;
  case 'ef/getEfAccomodations':
    api.get("/api/ef/accomodations/find/" + action.payload)
      .then((response) => {
          store.dispatch(saveEfAccomodations(response.data));
          // store.dispatch(setEfLoader(false));

      })
      .catch((error) => {
        console.error('get ef accomodations', error);
        store.dispatch(setApiResponse(error))
      });
    break;

    default:
  }
  next(action);
};

export default efMiddleware;
