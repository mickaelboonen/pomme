import React from 'react';
import PropTypes from 'prop-types';
import HelpImg from 'src/assets/images/help.svg';

import './style.scss';
import classNames from 'classnames';
import Help from '../Help';
import { useSelector } from 'react-redux';

const TextField = ({
  id,
  max,
  min,
  value,
  label,
  error,
  hasHelp,
  register,
  disabled,
  required,
  isNumber,
  isHidden,
  formField,
  placeholder,
  helpFunction,
}) => {
  const type = isNumber ? 'number' : 'text';
  const handleClick = (event) => {
    helpFunction(event);
  }

  const { currentHelp } = useSelector((state) => state.efForm);

  return (
    <div className={classNames("form__section-field", { "form__section-field--hidden": isHidden })} id={formField}>
      <label className="form__section-field-label" htmlFor={id}>{label}</label>
      {hasHelp && (
        <div style={{display: 'flex'}}>
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
              })}
          />
          <img src={HelpImg} alt="" style={{marginLeft: '1rem'}} id={id} onClick={handleClick}/>
        </div>
      )}
      {hasHelp && <Help {...currentHelp} domId={id} />}
      {!hasHelp && (
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
            })}
          />
      )}
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
  hasHelp: false,
  helpFunction: null,
  min: '',
  max: '',
  value: null,
  placeholder: '',
  required: null,
};

export default TextField;
