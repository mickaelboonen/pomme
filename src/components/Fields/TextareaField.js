import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const TextareaField = ({ id, label, formField, register, placeholder, isHidden, rows, required, error }) => {
  s
  return (
  <div id={id} className={classNames("form__section-field", {"form__section-field--hidden": isHidden})}>
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <textarea
      id={id}
      name=""
      {...register(formField, {
        required: required,
      })}
      placeholder={placeholder}
      className="form__section-field-textarea"
      rows={rows}
    />
    {error && <p className="form__section-field-error form__section-field-error--open">{error.message}</p>}
  </div>
);}

TextareaField.propTypes = {

};

TextareaField.defaultProps = {
  rows: 5,
};

export default TextareaField;
