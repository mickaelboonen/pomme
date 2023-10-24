import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const RadioInput = ({
  required,
  checked,
  id,
  formField,
  label,
  register,
  handler,
  disabled,
  hasInfo
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
    <label className={classNames("form__section-field-label", {"form__section-field-label--required": hasInfo})} htmlFor={id}>{label}</label>
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
