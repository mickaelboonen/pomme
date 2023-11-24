import { setApiResponse } from 'src/reducer/app';
import { api, setTokenOnApi } from './api';
import { saveNewEf, saveEf, setEfLoader, saveEfAccomodations } from 'src/reducer/ef';
import { saveEfs } from 'src/reducer/agent';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const efMiddleware = (store) => (next) => (action) => {
  // const { agent: { token } } = store.getState();
  // setTokenOnApi(token);
  
  switch (action.type) { 
    case 'ef/createEfVacataire':
      api.post("/api/ef/vacataire/add", action.payload,)
        .then((response) => {
            console.log(response.data);
            store.dispatch(setApiResponse({message: "L'état de Frais a été bien été créé. Vous pouvez dès à présent saisir vos frais de déplacement et d'hébergement dans l'EF.", id: response.data, response: { status: 200}}));

        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
  case 'ef/addNewEf':
    api.post("/api/ef/add", action.payload,)
      .then((response) => {
        const finalisedEf = action.payload;
        finalisedEf.id = response.data;
        store.dispatch(saveNewEf(finalisedEf));
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
    break;
  case 'agent/fetchEfs':
    api.get("/api/ef/" + action.payload)
      .then((response) => {
        store.dispatch(saveEfs(response.data))
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
    break;
  case 'ef/updateEf':
    api.post("/api/ef/update", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
    break;
  case 'ef/updateEfMission':
    api.post("/api/ef/mission/update", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
    break;
  case 'ef/updateEfTransports':
    api.post("/api/ef/transports/update", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
    break;
  case 'ef/updateEfAccomodations':
    api.post("/api/ef/accomodations/update", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
    break;
  case 'ef/updateEfRib':
    api.post("/api/ef/rib/update", action.payload)
      .then((response) => {
        store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
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
        store.dispatch(setApiResponse(error));
      });
    
    break;
  case 'ef/getEfAccomodations':
    api.get("/api/ef/accomodations/find/" + action.payload)
      .then((response) => {
          store.dispatch(saveEfAccomodations(response.data));
          // store.dispatch(setEfLoader(false));

      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
    break;

    default:
  }
  next(action);
};

export default efMiddleware;
