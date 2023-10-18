import React from "react";
import store from 'src/store';

import Presidence from "src/routes/presidence";
import NewPermOm from "src/routes/presidence/NewPermOm";

export default {
  path: 'presidence/',
  children: [
    {
      index: true,
      element: <Presidence />,
      loader: async ({ request }) => {

      },
    },
    {
      path: 'nouvel-om-permanent',
      element: <NewPermOm  />,
      loader: async ({ request }) => {

      },
    },
  ]
};
