import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const BurgerIcon = ({ handler }) => (
  <div className="header__burger" onClick={handler}>
    <div className="header__burger-bars">
      <div id="first-bar" className='menu-bar'/>
      <div id="second-bar" className='menu-bar'>
        <div id="secondbis-bar" className='menu-bar'/>
      </div>
      <div id="third-bar" className='menu-bar'/>
    </div>
  </div>
);

BurgerIcon.propTypes = {

};

export default BurgerIcon;
