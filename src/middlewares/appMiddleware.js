import {
  saveDocument,
  saveCountries,
} from 'src/reducer/app';
import {
  validateAuthentication,
  saveUserData,
  fetchUserLightData,
  saveUserLightData,
  saveAgentPreferences,
} from 'src/reducer/agent';

import { api, setTokenOnApi } from './api';
import CasClient, { constant } from "react-cas-client";
import { setLoader } from '../reducer/omForm';
import { fetchUserData, setApiResponse } from '../reducer/app';
import { saveEf } from 'src/reducer/ef';
import { saveTmpUserData, saveTmpSignature, saveTmpAcSignature } from 'src/reducer/tmpReducer';
import { saveTmpUserPhoneMail } from '../reducer/tmpReducer';


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
  const { agent: { token } } = store.getState();
  // setTokenOnApi(token);

  switch (action.type) {
    case 'tmp/fetchTmpSignature':
        api.post("/api/agent/signature", action.payload)
        .then((response) => {
          
          store.dispatch(saveTmpSignature(response.data))
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.status !== 404) {
            store.dispatch(setApiResponse(error));
          }
        });
      break;
      case 'tmp/fetchTmpAcSignature':
        api.post("/api/agent/signature", action.payload)
        .then((response) => {
          
          store.dispatch(saveTmpAcSignature(response.data))
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.status !== 404) {
            store.dispatch(setApiResponse(error));
          }
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
          store.dispatch(setApiResponse(error));
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
          store.dispatch(setApiResponse(error));
        });
      break;
    case 'agent/checkAuthentication': 
    api.post('/api/login_check', action.payload)
      .then((response) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        store.dispatch(fetchUserLightData({id: action.payload.username, token: response.data.token})) 
        
      })
      .catch((error) => {
        store.dispatch(setApiResponse(error));
      });
    break;
    case 'agent/fetchUserLightData':      
      api.post("/api/agent/get-data/light", action.payload)
        .then((response) => {
            store.dispatch(saveUserLightData(response.data));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
      case 'agent/fetchUserData':
        api.post("/api/agent/get-data/full", action.payload)
          .then((response) => {
              store.dispatch(saveUserData(response.data));
              store.dispatch(setLoader(false));
          })
          .catch((error) => {
            console.error('get agent full data', error);
            // store.dispatch(showTicketCreationResponse(error.response))
  
            // TODO : Temporary solution to fetch user Data after the first fail
            // Since the Hydrate only happens after fetchUserData is called, meaning the payload for the action above === { id = ""}
            if (error.response.data.detail === "Call to a member function getPersId() on null") {
              const { agent : { user }} = store.getState((state) => state)
              store.dispatch(fetchUserData({id: user}))
            }
          });
        break;
      case 'agent/fetchTmpUserPhoneMail':
        api.post("/api/agent/get-data/data-for-travelling", action.payload)
          .then((response) => {
              store.dispatch(saveTmpUserPhoneMail(response.data));
              // store.dispatch(setLoader(false));
          })
          .catch((error) => {
            console.error('get agent full data', error);
            // store.dispatch(showTicketCreationResponse(error.response))
  
            // TODO : Temporary solution to fetch user Data after the first fail
            // Since the Hydrate only happens after fetchUserData is called, meaning the payload for the action above === { id = ""}
            if (error.response.data.detail === "Call to a member function getPersId() on null") {
              const { agent : { user }} = store.getState((state) => state)
              store.dispatch(fetchUserData({id: user}))
            }
          });
        break;
      case 'tmp/fetchTmpUserData':
        api.post("/api/agent/get-data/full", action.payload)
          .then((response) => {
              store.dispatch(saveTmpUserData(response.data));
              store.dispatch(setLoader(false));
          })
          .catch((error) => {
            console.error('get agent full data', error);
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
      api.post("/api/stages/add", action.payload)
        .then((response) => {
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    case 'app/handleSteps':      
      api.post("/api/stages/handle", action.payload)
        .then((response) => {
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    case 'app/deleteStep':      
      api.delete("/api/stage/delete/" + 11)
        .then((response) => {
            store.dispatch(saveEf(response.data));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
  
    case 'agent/getAgentPreferences':  
      api.get("/api/agent/preferences/" + action.payload)
        .then((response) => {
          console.log(response);
          store.dispatch(saveAgentPreferences(response.data));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
        
    case 'agent/updateAgentPreferences':
      const { cptLogin } = action.payload;
      delete action.payload.cptLogin;
      api.post("/api/agent/preferences/" + cptLogin, action.payload)
        .then((response) => {
          store.dispatch(setApiResponse({message: response.data, response: { status: 200}}));
        })
        .catch((error) => {
          store.dispatch(setApiResponse(error));
        });
      break;
    default:
  }
  next(action);
};

export default appMiddleware;
