import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const DateField = ({ type, id, label, register, formField, disabled }) => (
  <div className="form__section-field" id={formField}>
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <input
      id={id}
      disabled={disabled}
      type={type}
      className="form__section-field-input"
        {...register(formField)}
      />
  </div>
);

DateField.propTypes = {

};

export default DateField;
