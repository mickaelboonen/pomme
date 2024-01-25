import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const DateAndHourField = ({
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
  // console.log(error);
  return (
  <>
  <div className="form__section-field" id={formField}>
    <label className="form__section-field-label" htmlFor={id}>{label.replace('Jour et heure', 'Jour')}</label>
    <input
      id={id}
      disabled={disabled}
      type="date"
      min={min}
      max={max}
      className="form__section-field-input"
        {...register(formField + "Day", {
          required: required
        })}
      onChange={handleChange}
    />
    <p className={classNames("form__section-field-error", { "form__section-field-error--open": error[formField + 'Day']?.message.length > 0 })}>{error[formField + 'Day']?.message}</p> 
  </div>
  <div className="form__section-field" id={formField}>
    <label className="form__section-field-label" htmlFor={id}>{label.replace('Jour et heure', 'Heure')}</label>
    <input
      id={id}
      disabled={disabled}
      type="time"
      min={min}
      max={max}
      className="form__section-field-input"
        {...register(formField + "Hour", {
          required: required
        })}
      // onChange={handleChange}
    />
    <p className={classNames("form__section-field-error", { "form__section-field-error--open": error[formField + 'Hour']?.message.length > 0 })}>{error[formField + 'Hour']?.message}</p> 
  </div>
  </>

);
}

DateAndHourField.propTypes = {

};

export default DateAndHourField;
