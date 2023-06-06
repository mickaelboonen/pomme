import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'src/assets/images/logo.svg';

import '../style.scss';

const Footer = () => (
  <footer className='footer'>
    <img src={Logo} alt="" />
  </footer>
);

Footer.propTypes = {

};

export default Footer;
