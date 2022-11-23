import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const TextareaField = ({ id, label, formField, register, placeholder }) => (
  <div className="form__section-field">
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <textarea
      id={id}
      name=""
      {...register(formField)}
      placeholder={placeholder}
      className="form__section-field-textarea"
      rows="5"
    />
  </div>
);

TextareaField.propTypes = {

};

export default TextareaField;
