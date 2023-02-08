import { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Header from './Header';
import { Outlet } from 'react-router-dom';

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
    <div>
      <Header cas={cas} />
      <main id="main">
        <Outlet />
      </main>
    </div>
  );
};

Layout.propTypes = {

};

export default Layout;
