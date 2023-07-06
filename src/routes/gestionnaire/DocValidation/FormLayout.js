import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const FormLayout = ({ children }) => (
  <div className='validation-form'>{children}</div>
);

FormLayout.propTypes = {

};

export default FormLayout;
