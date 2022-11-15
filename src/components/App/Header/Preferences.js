import React from 'react';
import Moon from '../../../assets/images/moon.svg';
import Sun from '../../../assets/images/sun.svg';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const Preferences = ({ isSkewed, id }) => {
  
  const handleToggleTheme = (event) => {

    const { checked } = event.target;

    if (checked) {
      localStorage.setItem('theme', 'dark');
    }
    else {
      localStorage.removeItem('theme');
    }

    !event.target.checked;

    document.querySelector(':root').classList.toggle('dark');
  };

  return (
  <div className={classNames("header-theme", {"header-theme--straight": isSkewed})}>
    <img src={Sun} alt="" />
    <label className="switch">
      <input id={`theme-switch-${id}`} type="checkbox" onChange={handleToggleTheme}/>
      <span className="slider round"></span>
    </label>
    <img src={Moon} alt="" />
  </div>
);}

Preferences.propTypes = {

};

Preferences.defaultProps = {
  isSkewed: false,
  id: 'header',
};

export default Preferences;
