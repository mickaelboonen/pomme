import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const CheckboxInput = ({ register, disabled, formField, id, label, handler, columnDisplay, required, checked}) => (
  <div className={classNames("form__section-field-checkbox", {"form__section-field-checkbox--column": columnDisplay})} >
    <input
      type="checkbox"
      id={id}
      value={id}
      checked={checked}
      disabled={disabled}
      onClick={handler}
      {...register(formField, {
        required: required,
      })}
    />
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
  </div>
);

CheckboxInput.propTypes = {

};

CheckboxInput.defaulProps = {
  handler: null,
  columnDisplay: false,
  disabled: false,
  checked: false,
  required: null,
};

export default CheckboxInput;
