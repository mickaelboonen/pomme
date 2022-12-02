import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const TextareaField = ({ id, label, formField, register, placeholder, isHidden }) => (
  <div id={id} className={classNames("form__section-field", {"form__section-field--hidden": isHidden})}>
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <textarea
      id={id}
      name=""
      {...register(formField)}
      placeholder={placeholder}
      className="form__section-field-textarea"
      rows="5"
    />
  </div>
);

TextareaField.propTypes = {

};

export default TextareaField;
