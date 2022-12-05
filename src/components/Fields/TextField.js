import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const TextField = ({
  id,
  max,
  min,
  value,
  label,
  error,
  register,
  disabled,
  required,
  isNumber,
  isHidden,
  formField,
  placeholder,
}) => {
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
          {...register(formField, {
            required: required,
            // validate: {
            //   notNull: (v) => (v !== '' || required),
            // }
          })}
        />
        <p className={classNames("form__section-field-error", { "form__section-field-error--open": error?.message.length > 0 })}>{error?.message}</p>
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
  required: null,
};

export default TextField;
