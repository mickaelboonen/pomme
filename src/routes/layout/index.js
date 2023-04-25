import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, redirect } from 'react-router-dom';

import './style.scss';
import Header from './Header';
import Maintenance from './Maintenance';
import ErrorDisplayer from '../../components/ErrorDisplayer';
import { logout } from 'src/reducer/app';

const Layout = ({ cas }) => {
  
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');
  const dispatch = useDispatch();

  const { agent: { user },app : { apiMessage }  } = useSelector((state) => state);
  
  const isMaintenance = process.env.IS_MAINTENANCE;
  
  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.add('dark');
    }
    if (colorTheme !== '') {
      document.documentElement.style = colorTheme;
    }
  }, [])

  if (apiMessage.hasOwnProperty('response')) {
    if (apiMessage.response.status !== 200
      && (apiMessage.response.data.message === 'JWT Token not found'
      || apiMessage.response.data.message === 'Expired JWT Token')) {
      dispatch(logout());
      redirect('/se-connecter');
    }
  }
  
  return (
    <>
      <Header cas={cas} />
      {(!isMaintenance || user === 'mboone01') && (
        <main id="main">
          <Outlet />
        </main>
      )}
      { apiMessage.hasOwnProperty('response') && <ErrorDisplayer error={apiMessage} /> } 
      {(isMaintenance && user !=='mboone01') &&(
        <main id="main">
          <Maintenance />
        </main>
      )}
    </>
  );
};

Layout.propTypes = {

};

export default Layout;
