import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const CheckboxInput = ({ register, formField, id, label, handler, columnDisplay, required}) => (
  <div className={classNames("form__section-field-checkbox", {"form__section-field-checkbox--column": columnDisplay})} >
    <input
      type="checkbox"
      id={id}
      value={id}
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
};

export default CheckboxInput;
