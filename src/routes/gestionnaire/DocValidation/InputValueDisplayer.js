import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const InputValueDisplayer = ({ label, value, plop = false}) => {
  console.log(plop);
  return (
  <div className="form__section-field">
    <p className="form__section-field-label">{label}</p>
    <div className={classNames('form__section-field-input', {'form__section-field-input--alert': plop})}>
      {value}
    </div>
  </div>
);}

InputValueDisplayer.propTypes = {
  
};

// InputValueDisplayer.defaultProps = {
//   alert: false,
// }

export default InputValueDisplayer;
