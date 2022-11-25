import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const RadioInput = ({ id, formField, label, register, handler, disabled}) => (
  <div className="form__section-field-radio">
    <input
      type="radio"
      name=""
      id={id}
      value={id}
      disabled={disabled}
      {...register(formField)}
      onClick={handler}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

RadioInput.propTypes = {

};

RadioInput.defaultProptypes = {
  handler: null,
  disabled: false,
};

export default RadioInput;
