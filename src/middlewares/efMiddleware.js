import { setApiResponse } from 'src/reducer/app';
import { api } from './api';
import { saveNewEf, saveEf, setEfLoader } from 'src/reducer/ef';
import { saveEfs } from 'src/reducer/agent';


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
        store.dispatch(setApiResponse({data: response.data, status: 200}));
      })
      .catch((error) => {
        console.error('update EF mission', error);
        store.dispatch(setApiResponse(error))
      });
    break;
  case 'ef/updateEfTransports':
    api.post("/api/ef/transports/update", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({data: response.data, status: 200}));
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
        store.dispatch(setApiResponse({data: response.data, status: 200}));
      })
      .catch((error) => {
        console.error('update EF transports', error);
        store.dispatch(setApiResponse(error))
      });
    break;
  case 'ef/fetchEf':
    api.get("/api/ef/find/" + action.payload.id)
      .then((response) => {
        store.dispatch(saveEf(response.data))

        if (action.payload.step === '4') {
          store.dispatch(setEfLoader(false));
        }
      })
      .catch((error) => {
        console.error('fetchEf', error);
        // store.dispatch(showTicketCreationResponse(error.response))
      });
    
    break;

    default:
  }
  next(action);
};

export default efMiddleware;
