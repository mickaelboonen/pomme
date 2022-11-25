import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const NumberField = () => (
  <div className="form__section-field">
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <input
      id={id}
      type="number"
      className="form__section-field-input"
        {...register(formField)}
      />
  </div>
);

NumberField.propTypes = {

};

export default NumberField;
