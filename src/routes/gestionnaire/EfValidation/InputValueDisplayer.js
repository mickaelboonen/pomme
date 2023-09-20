import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const InputValueDisplayer = ({ label, value }) => (
  <div className="form__section-field">
    <p className="form__section-field-label">{label}</p>
    <div className="form__section-field-input">
      {value}
    </div>
  </div>
);

InputValueDisplayer.propTypes = {

};

export default InputValueDisplayer;
