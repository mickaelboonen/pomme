// import { setApiResponse } from 'src/reducer/app';
// import { logout } from 'src/reducer/agent';


// const errorMiddleware = (store) => (next) => (action) => {
//   console.log(action);
//   switch (action.type) {
//     case 'app/setApiResponse': {
//       console.log("IN THE setApiResponse");
//       console.log(action);
//       console.log(action.payload);
//       const { error, action } = action.payload;
//       console.error(action, error)

//       if (error.response.data.message === 'Expired JWT Token') {
//         store.dispatch(logout());
//         // break;
//       }
//       else if (error.name === 'AxiosError') {
//         const newError = {
//           response: {
//             data: error.response.data,
//             status: error.response.status,
//             statusText:error.response.statusText, 
//           },
//           message: error.message,
//         }
//         store.dispatch(setApiResponse(newError))
        
//       }
//       else {
//         store.dispatch(setApiResponse(error));
//       }

//       break;
//     }
//     default:
//   }
//   next(action);
// };

// export default errorMiddleware;
