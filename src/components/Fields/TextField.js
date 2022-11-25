import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const TextField = ({ placeholder, id, label, formField, register, max, isNumber, isHidden, min, value, disabled}) => {
  const type = isNumber ? 'number' : 'text';
  return (
    <div className={classNames("form__section-field", { "form__section-field--hidden": isHidden })} id={formField}>
      <label className="form__section-field-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="form__section-field-input"
          {...register(formField)}
        />
    </div>
  );
};

TextField.propTypes = {

};

TextField.defaultProptypes = {
  isNumber: false,
  isHidden: false,
  disabled: false,
  min: '',
  max: '',
  value: null,
  placeholder: '',
};

export default TextField;
