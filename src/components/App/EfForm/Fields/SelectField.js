import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const SelectField = ({ register, blankValue, data, id, formField, label, isHidden, handler, disabled }) => (
  <div className={classNames("form__section-field", { "form__section-field--hidden": isHidden })} id={formField}>
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <select
      id={id}
      className="form__section-field-input"
      {...register(formField)}
      onChange={handler}
      disabled={disabled}
    >
      <option value="">{blankValue}</option>
      {data.map((item) => <option key={item} value={item}>{item}</option>)}
    </select>
  </div>
);

SelectField.propTypes = {

};

SelectField.dafaultProptypes = {
  isHidden: null,
  handler: null,
  disabled: false,
};

export default SelectField;
