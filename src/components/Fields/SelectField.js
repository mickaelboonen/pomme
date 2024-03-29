import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const SelectField = ({
  register,
  blankValue,
  data,
  id,
  formField,
  label,
  isHidden,
  handler,
  disabled,
  validators,
  error,
  required,
  isRequired
}) => {
  const handleChange = (event) => {
    handler(event);
  }
  
  return (
  <div className={classNames("form__section-field", { "form__section-field--hidden": isHidden })} id={formField}>
    <label className={classNames("form__section-field-label", {"form__section-field-label--required": isRequired })} htmlFor={id}>{label}</label>
    <select
      id={id}
      className="form__section-field-input"
      {...register(formField, {
        required: required,
        validate: validators
      })}
      disabled={disabled}
      onChange={handleChange}
    >
      {blankValue && <option value="">{blankValue}</option>}
      {data.map((item) => {
        if (typeof(item) === 'string') {
          return <option key={item} value={item}>{item}</option>;
        }
        else {
          return <option key={item.id} value={item.id}>{item.name}</option>;
        }
      })}
    </select>
    {error && <p className={classNames("form__section-field-error", { "form__section-field-error--open": error?.message.length > 0 })}>{error?.message}</p>}
  </div>
);}

SelectField.propTypes = {

};

SelectField.dafaultProptypes = {
  isHidden: null,
  handler: () => {},
  disabled: false,
  validators: null,
  blankValue: false,
};

export default SelectField;
