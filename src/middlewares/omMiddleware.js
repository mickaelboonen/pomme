import { saveNewOm, saveUserOms } from 'src/reducer/omForm';
import api from './api';


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


        case 'omForm/addNewMission':
          console.log('here');
          api.post("/api/om/mission/add" , action.payload,)
            .then((response) => {
              console.log(response);
              // store.dispatch(saveUserOms(response.data))
            })
            .catch((error) => {
              console.error('add new om', error);
              // store.dispatch(showTicketCreationResponse(error.response))
            });
          break;
      
    default:
  }
  next(action);
};

export default omMiddleware;
