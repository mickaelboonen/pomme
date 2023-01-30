import { saveSignature } from 'src/reducer/app';
import { api } from './api';
import CasClient, { constant } from "react-cas-client";


let casEndpoint = "cas.unimes.fr";
let casOptions = { version: constant.CAS_VERSION_3_0,
  validation_proxy: true,
  validation_proxy_path: '/cas_proxy' };

let casClient = new CasClient(casEndpoint, casOptions);


api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Content-Type'] = 'application/json';

const appMiddleware = (store) => (next) => (action) => {
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
    case 'app/getMission':
      api.get("/api/om/mission/" + action.payload)
        .then((response) => {
          // if (response.data.length > 0) {
            console.log(response.data);
            // store.dispatch(saveSignature(response.data[0]))
          // }
        })
        .catch((error) => {
          console.error('get signature', error);
          // store.dispatch(showTicketCreationResponse(error.response))
        });
      break;
    case 'app/authenticate':  

    
      // casClient
      //   .auth() 
      //     .then(successRes => {
      //       console.log(successRes);
      //     })
      //     .catch(errorRes => {
      //       console.log('error : ', errorRes);
      //     });

        // api.get('/api/authenticate')
        //   .then(() => {
        //       console.log(response.data);
        //   })
        //   .catch((error) => {
        //     console.error('authenticate', error);
        //   })
    break;

  
    default:
  }
  next(action);
};

export default appMiddleware;
