import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Link } from 'react-router-dom';
import RotatingLoader from '../Loaders/RotatingLoader';

const ButtonElement = ({ type, label, handler, isLink, link, hasLoader}) => {
  let Button = null;
  
  const handleClickOnButton = (event) => {
    if (hasLoader) {
      document.querySelector('.rotating-loader').classList.add('rotating-loader--loading')
      event.currentTarget.querySelector('span').textContent = '';
    }
    handler();
  }
  if (isLink) {
    Button = <Link to={link} className="button" type={type}>{label}</Link>;
  }
  else {
    Button = <button className="button" type={type} onClick={handleClickOnButton}><RotatingLoader /><span>{label}</span></button>;
  }

  return Button;
}

ButtonElement.propTypes = {

};
ButtonElement.defaultProps = {
  handler: () => {},
  isLink: false,
  link: null,
  hasLoader: false
};

export default ButtonElement;
