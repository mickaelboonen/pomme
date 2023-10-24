import { api, setTokenOnApi } from './api';
import { setApiResponse } from '../reducer/app';
import { savePresidencyUsers, savePresidencyVehicles } from 'src/reducer/presidency';

api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const presidencyMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'presidency/fetchPresidencyUsers':
        api.get("/api/agent/presidency/fetch-all")
        .then((response) => {
          
          store.dispatch(savePresidencyUsers(response.data))
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    case 'presidency/fetchPresidencyVehicles':
      api.post("/api/vehicles/" + action.payload.agent)
      .then((response) => {
        console.log(response.data);
        store.dispatch(savePresidencyVehicles(response.data))
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
    break;

    default:
  }
  next(action);
};

export default presidencyMiddleware;
