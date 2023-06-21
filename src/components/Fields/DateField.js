import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const DateField = ({
  type,
  id,
  label,
  register,
  formField,
  disabled,
  error,
  required,
  min,
  max,
  handler,
}) => {
  const handleChange = (event) => {
    if (handler) {
      handler(event.target.value, min, max, formField);
    }
  };

  return (
  <div className="form__section-field" id={formField}>
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <input
      id={id}
      disabled={disabled}
      type={type}
      min={min}
      max={max}
      className="form__section-field-input"
        {...register(formField, {
          required: required
        })}
      onChange={handleChange}
    />
    <p className={classNames("form__section-field-error", { "form__section-field-error--open": error?.message.length > 0 })}>{error?.message}</p> 
  </div>
  );
};

DateField.defaultProps = {
  handler: () => {},
  min: null,
  max: null,
};


DateField.propTypes = {

};  

export default DateField;
