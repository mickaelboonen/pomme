import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Outlet, useLoaderData } from 'react-router-dom';

import './style.scss';
import Header from './Header';
import Maintenance from './Maintenance';

const Layout = ({ cas }) => {
  
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');

  const { user } = useSelector((state) => state.agent);
  
  const isMaintenance = process.env.IS_MAINTENANCE;
  
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
      {(!isMaintenance || user === 'mboone01') && (
        <main id="main">
          <Outlet />
        </main>
      )}
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
