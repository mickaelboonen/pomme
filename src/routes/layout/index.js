import { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.toggle('dark');
      const headerButton = document.querySelector('#theme-switch-header');
      const menuButton = document.querySelector('#theme-switch-menu');
      headerButton.checked = true;
      menuButton.checked = true;
    }
    if (colorTheme !== '') {
      document.documentElement.style = colorTheme;
    }
  }, [])
  return (
    <div>
      <Header />
      <main id="main">
        <Outlet />
      </main>
    </div>
  );
};

Layout.propTypes = {

};

export default Layout;
