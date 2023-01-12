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
}) => (
  <div className="form__section-field" id={formField}>
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <input
      id={id}
      disabled={disabled}
      type={type}
      className="form__section-field-input"
        {...register(formField, {
          required: required
        })}
    />
    <p className={classNames("form__section-field-error", { "form__section-field-error--open": error?.message.length > 0 })}>{error?.message}</p> 
  </div>
  );

DateField.propTypes = {

};

export default DateField;
