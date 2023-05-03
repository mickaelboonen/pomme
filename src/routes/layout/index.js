import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from 'src/store';
import { Outlet, redirect } from 'react-router-dom';

import './style.scss';
import Header from './Header';
import Maintenance from './Maintenance';
import Login from './Login';
import ErrorDisplayer from '../../components/ErrorDisplayer';
import { clearMessage } from 'src/reducer/app';
import { logout } from 'src/reducer/agent';
import { setApiResponse } from '../../reducer/app';

const Layout = ({ cas }) => {
  
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');
  const dispatch = useDispatch();

  const { agent: { user, isAuthenticated }, app : { apiMessage }  } = useSelector((state) => state);
  
  const isMaintenance = process.env.IS_MAINTENANCE;
  
  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.add('dark');
    }
    if (colorTheme !== '') {
      document.documentElement.style = colorTheme;
    }
  }, [])

  useEffect(() => {
  if (apiMessage.hasOwnProperty('response')) {
    if (apiMessage.response.status !== 200
      && (apiMessage.response.data.message === 'JWT Token not found'
      || apiMessage.response.data.message === 'Expired JWT Token')) {
      localStorage.removeItem('persist:root');
      dispatch(clearMessage());
      dispatch(logout());
      sessionStorage.setItem('logout-reason', "La durée de votre session a expiré. Veuillez vous connecter pour accéder à l'application.");
      persistor.purge();
      cas.logout("/se-connecter");
    }
  }
  }, [apiMessage])
  
  return (
    <>
      <Header cas={cas} />
      {/* {(!isMaintenance || user === 'mboone01') && (
        <main id="main">
          <Outlet />
        </main>
      )} */}
      { apiMessage.hasOwnProperty('response') && <ErrorDisplayer response={apiMessage} /> } 
      {/* {(isMaintenance && user === '' && !isAuthenticated) &&(
        <main id="main">
          <Login cas={cas} />
        </main>
      )}
      {(isMaintenance && user !=='mboone01' && isAuthenticated) && (
        <main id="main">
          <Maintenance />
        </main>
      )}
      {(isMaintenance && user ==='mboone01' && isAuthenticated) &&(
        <main id="main">
          <Outlet />
        </main>
      )} */}
      {!isAuthenticated &&(
        <main id="main">
          <Login cas={cas} />
        </main>
      )}
      {isAuthenticated &&(
        <main id="main">
          <Outlet />
        </main>
      )}
    </>
  );
};

Layout.propTypes = {

};

export default Layout;
