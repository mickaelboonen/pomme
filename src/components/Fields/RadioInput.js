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
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
  </div>
);

RadioInput.propTypes = {

};

RadioInput.defaultProps = {
  handler: null,
  disabled: false,
  register: () => {},
};

export default RadioInput;
