import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Loader = ({ width}) => (
  <div className='loader' style={{width: width, height: width}} />
);

Loader.defaultProps = {
  width: '4rem'
};

export default Loader;
