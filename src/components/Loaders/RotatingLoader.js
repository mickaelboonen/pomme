import React from 'react';
import PropTypes from 'prop-types';
import { BiLoader } from 'react-icons/bi'

import './style.scss';

const RotatingLoader = () => (
  <div className='rotating-loader'>
    <BiLoader />
  </div>
);

RotatingLoader.propTypes = {

};

export default RotatingLoader;
