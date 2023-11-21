import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const InputHtmlDisplayer = ({label, value, formField}) => {
  useEffect(() => {
    const el = document.getElementById(formField + '-displayer');
    el.innerHTML = value;
  }, [])
  return (
    <div className="form__section-field">
      <p className="form__section-field-label">{label}</p>
      <div className='form__section-field-input' id={formField + '-displayer'} />
    </div>
  );
}

InputHtmlDisplayer.propTypes = {

};

export default InputHtmlDisplayer;
