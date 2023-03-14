import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Outlet, useLoaderData } from 'react-router-dom';

import './style.scss';
import Header from './Header';
import Login from './Login';

const Layout = ({ cas }) => {
  
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');
  
  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.add('dark');
    }
    if (colorTheme !== '') {
      document.documentElement.style = colorTheme;
    }
  }, [])
  
  return (
    <>
      <Header cas={cas} />
      <main id="main">
        <Outlet />
      </main>
    </>
  );
};

Layout.propTypes = {

};

export default Layout;
