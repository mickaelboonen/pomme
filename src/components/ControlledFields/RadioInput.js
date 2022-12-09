import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const RadioInput = ({
  required,
  checked,
  id,
  formField,
  label,
  register,
  handler,
  disabled
}) => (
  <div className="form__section-field-radio" id={formField}>
    <input
      type="radio"
      name=""
      id={id}
      value={id}
      checked={checked}
      disabled={disabled}
      {...register(formField, {
        required: required
      })}
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
