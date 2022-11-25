import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div>
    <Header />
    <main id="main">
      <Outlet />
    </main>
  </div>
);

Layout.propTypes = {

};

export default Layout;
