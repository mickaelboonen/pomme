import React from 'react';
import Moon from 'src/assets/images/moon.svg';
import Sun from 'src/assets/images/sun.svg';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';
import { useEffect } from 'react';

const Preferences = ({ isSkewed, id }) => {
  
  const handleToggleTheme = (event) => {

    const { checked } = event.target;

    if (checked) {
      localStorage.setItem('theme', 'dark');
    }
    else {
      localStorage.removeItem('theme');
    }

    document.querySelector(':root').classList.toggle('dark');
  };

  useEffect(() => {
    const input = document.getElementById(`theme-switch-${id}`);
    if (localStorage.getItem('theme') === 'dark') {
      input.checked = true;
    }
    else {
      input.checked = false;
    }
  }, [])

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
