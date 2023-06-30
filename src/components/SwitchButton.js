import React from 'react';
import PropTypes from 'prop-types';

import './switch.scss';

const SwitchButton = ({ handler, disabled, formField, isInForm = false, register = null, label }) => (
  <div className="form__section-field-toggle">
    <label htmlFor="public-transports">{label}</label>
    <label className="switch switch--form">
      <input
        type="checkbox"
        id="public-transports"
        disabled={disabled}  
        onClick={handler}
        {...register(formField)}
      />
     <span className="slider slider--form round"></span>
    </label>
  </div>
);

SwitchButton.defaultProps = {
  disabled: false,
};

export default SwitchButton;
