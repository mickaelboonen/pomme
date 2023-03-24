import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Link } from 'react-router-dom';

const ButtonElement = ({ type, label, handler, isLink, link}) => {
  let Button = null;

  if (isLink) {
    Button = <Link to={link} className="button" type={type}>{label}</Link>;
  }
  else {
    Button = <button className="button" type={type} onClick={handler}>{label}</button>;
  }

  return Button;
}

ButtonElement.propTypes = {

};
ButtonElement.defaultProps = {
  handler: null,
  isLink: false,
  link: null,
};

export default ButtonElement;
