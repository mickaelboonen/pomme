import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const LoaderCircle = ({ width}) => (
  <div className='loader' style={{width: width, height: width}} />
);

LoaderCircle.defaultProps = {
  width: '4rem'
};

export default LoaderCircle;
