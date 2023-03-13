import {
  saveSignature,
  saveDocument,
  saveCountries
} from 'src/reducer/app';
import {
  validateAuthentication,
  saveUserData,
} from 'src/reducer/agent';

import { api } from './api';
import CasClient, { constant } from "react-cas-client";
import { setLoader } from '../reducer/omForm';
import { fetchUserData, setApiResponse } from '../reducer/app';
import { saveEf } from 'src/reducer/ef';


let casEndpoint = "cas.unimes.fr";
let casOptions = { version: constant.CAS_VERSION_3_0,
  validation_proxy: true,
  validation_proxy_path: '/cas_proxy',
};

let casClient = new CasClient(casEndpoint, casOptions);


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'app/fetchUserSignature':
        api.get("/api/agent/get-data", action.payload)
        .then((response) => {
          
          store.dispatch(saveSignature(response.data))
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'app/getSignature':
      api.get("/api/perm-file/signature/" + action.payload)
        .then((response) => {
            if (response.data) {
              store.dispatch(saveSignature(response.data))
            }
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'app/getDocument':
      api.get(`/api/perm-file/${action.payload.type}/${action.payload.id}`)
        .then((response) => {
           
            if (response.data) {
              store.dispatch(saveDocument(response.data));
            }
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'app/getMission':
      api.get("/api/om/mission/" + action.payload)
        .then((response) => {
          // if (response.data.length > 0) {
             
            // store.dispatch(saveSignature(response.data[0]))
          // }
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'agent/authenticate':  
      casClient
        .auth()
            .then((response) => {
              store.dispatch(validateAuthentication(response))
            })
            .catch(response => {
              console.log('error : ', response);
            });
    break;
    case 'agent/fetchUserData':      
      api.post("/api/agent/get-data", action.payload)
        .then((response) => {
          // if (response.data.length > 0) {
            

            store.dispatch(saveUserData(response.data));
            store.dispatch(setLoader(false));
          // }
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))

          // TODO : Temporary solution to fetch user Data after the first fail
          // Since the Hydrate only happens after fetchUserData is called, meaning the payload for the action above === { id = ""}
          if (error.response.data.detail === "Call to a member function getPersId() on null") {
            const { agent : { user }} = store.getState((state) => state)
            store.dispatch(fetchUserData({id: user}))
          }
        });
      break;
    case 'app/fetchCountries':      
      api.get("/api/countries/list")
        .then((response) => {
            store.dispatch(saveCountries(response.data));
        })
        .catch((error) => {
          console.error('get countries', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'app/addSteps':      
      api.post("/api/stage/add", action.payload)
        .then((response) => {
            // store.dispatch(saveCountries(response.data));
            console.log("API STAGE ADD RESPONSE IS : ", response.data);
        })
        .catch((error) => {
          console.error('add stages error', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'app/handleSteps':      
      api.post("/api/stages/handle", action.payload)
        .then((response) => {
            // store.dispatch(saveCountries(response.data));
            console.log("API STAGE ADD RESPONSE IS : ", response.data);
        })
        .catch((error) => {
          console.error('add stages error', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'app/deleteStep':      
      api.delete("/api/stage/delete/" + 11)
        .then((response) => {
            console.log("API STAGE DELETE RESPONSE IS : ", response.data);
            store.dispatch(saveEf(response.data));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error))
        });
      break;
  
    default:
  }
  next(action);
};

export default appMiddleware;
