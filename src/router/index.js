import React from "react";
import store from 'src/store';
import CasClient, { constant } from "react-cas-client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

// Components
import Login from "src/routes/layout/Login";
import Layout from 'src/routes/layout';
import ErrorPage from 'src/routes/error';
import Home from 'src/routes/layout/Home';
import { fetchOMs, fetchEfs } from "src/reducer/agent";

// children routers
import dafcRouter from "./dafcRouter";
import managerRouter from "./managerRouter";
import modifyDocumentsRouter from "./modifyDocumentsRouter";
import newDocumentsRouter from "./newDocumentsRouter";
import userRouter from "./userRouter";


let casEndpoint = "cas.unimes.fr";
let casOptions = {
  version: constant.CAS_VERSION_3_0,
  validation_proxy: true,
  validation_proxy_path: '/cas_proxy'
};

const casClient = new CasClient(casEndpoint, casOptions);

const AppWithRouter = () => (
  <RouterProvider router={createBrowserRouter([
    {
      path: "/",
      element: <Layout cas={casClient} />,
      loader: async ({ request }) =>  {
        return new URL(request.url);
      },
      errorElement: <ErrorPage />,
      children: [
        // home route
        {
          index: true,
          element: <Home />,
          loader: async ({ request }) => {
            
            const url = new URL(request.url);
            const { agent: { user,isAuthenticated } } = store.getState()
  
            const devHost = process.env.DEV_HOST + ':8080';
            
            if (isAuthenticated) {
              store.dispatch(fetchOMs(user));
              store.dispatch(fetchEfs(user));
            }
            else {  
              // Condition depending on the host
              if (devHost !== url.host) {
  
                if (url.search.includes('status=in_process')) {
                  return redirect('/se-connecter?' + url.search);
                }
                else {
                  return redirect('/se-connecter');
                }
              }
              else {
                store.dispatch(fetchOMs(user));
                store.dispatch(fetchEfs(user));
              }              
            }

            return new URL(request.url);
          },
        },
        // login route
        {
          path: 'se-connecter',
          element: <Login cas={casClient} />,
        },
        // routes starting with 'nouveau-document/'
        newDocumentsRouter,
        // routes starting with 'modifier-un-document/'
        modifyDocumentsRouter,
        // routes starting with 'utilisateur/'
        userRouter,
        // routes starting with 'destionnaire/'
        managerRouter,
        // routes starting with 'dafc/'
        dafcRouter,
      ],
    },
  ])} />
);

export default AppWithRouter;
