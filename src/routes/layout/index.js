import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { persistor } from 'src/store';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

// Components
import Header from './Header';
import Login from './Login';
import ErrorDisplayer from 'src/components/ErrorDisplayer';

// Reducers & actions
import { clearMessage } from 'src/reducer/app';
import { logout } from 'src/reducer/agent';
import Footer from './Footer';

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
      && apiMessage.response.status !== 202
      && apiMessage.response.status !== 100
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
      <Footer />
    </>
  );
};

Layout.propTypes = {

};

export default Layout;
