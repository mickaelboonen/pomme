import { saveSignature } from 'src/reducer/app';
import { api } from './api';


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const omMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'app/getSignature':
      api.get("/api/perm-file/signature/" + action.payload)
        .then((response) => {
          if (response.data.length > 0) {
            store.dispatch(saveSignature(response.data[0]))
          }
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
