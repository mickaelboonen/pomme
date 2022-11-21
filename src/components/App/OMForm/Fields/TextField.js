import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const TextField = ({ id, label, formField, register, isNumber, isHidden, min, value }) => {
  const type = isNumber ? 'number' : 'text';
  return (
    <div className={classNames("form__section-field", { "form__section-field--hidden": isHidden })} id={formField}>
      <label className="form__section-field-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        min={min}
        value={value}
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
  min: '',
  value: null,
};

export default TextField;
