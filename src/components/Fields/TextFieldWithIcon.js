import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const TextFieldWithIcon = ({
  isHidden,
  id,
  icon,
  name,
  register,
  disabled,
  error,
  required,
  validators
}) => (
  <div
    className={classNames("form__section-field", {"form__section-field--hidden": isHidden})}
    id={`${id}-field`}
  >
    <label className="form__section-field-label" htmlFor={id}>{name}</label>
    <div className="form__section-field-container">
      <div className="form__section-field-pre-input">
        <img src={icon} alt="" />
      </div>
      <input
        id={id}
        disabled={disabled}
        className="form__section-field-input-text"
        {...register(id, {
          required: required
          })}
        />
    </div>
    <p className={classNames("form__section-field-error", { "form__section-field-error--open": error?.message.length > 0 })}>{error?.message}</p>
  </div>
);

TextFieldWithIcon.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

TextFieldWithIcon.defaultProptypes = {
  disabled: false,
}

export default TextFieldWithIcon;
