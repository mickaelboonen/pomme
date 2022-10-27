import React from 'react';
import PropTypes from 'prop-types';

import './switch.scss';

const SwitchButton = ({ handler, formField, isInForm = false, register = null, label }) => (
  <div className="form__section-field-toggle">
    <label htmlFor="public-transports">{label}</label>
    <label className="switch switch--form">
      <input
        type="checkbox"
        id="public-transports"
        onClick={handler}
        {...register(formField)}
      />
     <span className="slider slider--form round"></span>
    </label>
  </div>
);

SwitchButton.propTypes = {

};

export default SwitchButton;
