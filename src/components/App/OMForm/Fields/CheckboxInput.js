import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const CheckboxInput = ({ register, formField, id, label, handler = null }) => (
  <div className="form__section-field-checkbox">
    <input
      type="checkbox"
      id={id}
      value={id}
      onClick={handler}
      {...register(formField)}
    />
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
  </div>
);

CheckboxInput.propTypes = {

};

export default CheckboxInput;
