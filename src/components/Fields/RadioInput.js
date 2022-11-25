import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const RadioInput = ({ id, formField, label, register, handler=null }) => (
  <div className="form__section-field-radio">
    <input
      type="radio"
      name=""
      id={id}
      value={id}
      {...register(formField)}
      onClick={handler}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

RadioInput.propTypes = {

};

export default RadioInput;
