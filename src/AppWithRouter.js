import React from "react";
import { RouterProvider } from "react-router-dom";
import router from 'src/router';

const AppWithRouter = () => (
  <RouterProvider router={router} />
);

AppWithRouter.propTypes = {

};

export default AppWithRouter;
