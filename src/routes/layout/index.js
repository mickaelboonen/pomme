import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Outlet, useLoaderData } from 'react-router-dom';

import './style.scss';
import Header from './Header';
import Login from './Home/Login';

const Layout = ({ cas }) => {
  
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');
    
  const devHost = process.env.DEV_HOST + ':8080';
  console.log("HOST = ", devHost);
  console.log("ENV = ", process.env.NODE_ENV);
  
  const { host } = useLoaderData();

  const { isAuthenticated } = useSelector(state => state.app);    

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.add('dark');
    }
    if (colorTheme !== '') {
      document.documentElement.style = colorTheme;
    }
  }, [])


  return (
    <div>
      <Header cas={cas} />
      {(!isAuthenticated && devHost !== host) && (
        <Login cas={cas} />
      )}
      {(isAuthenticated || devHost === host) && (
        <main id="main">
          <Outlet />
        </main>
      )}
    </div>
  );
};

Layout.propTypes = {

};

export default Layout;
