import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const FileField = ({ register, formField, id, isHidden, pieces, multiple, label, placeholder, disabled}) => {
  const handleClickOnFileInput = (event) => {
    event.currentTarget.firstChild.click();
  };

  const handleChange = (event) => {
    const { nextSibling, value } = event.target;
    const filename = value.slice(12);
    nextSibling.textContent = filename;
  };


  return (
  <div className={classNames("form__section-field", {"form__section-field--hidden": isHidden})} >
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <div className="form__section-field-input form__section-field-input--file" onClick={handleClickOnFileInput}>
      <input
        id={id}
        className="form__section-field-input--file-input"
        type="file"
        placeholder={placeholder}
        {...register(formField)}
        onChange={handleChange}
        multiple={multiple}
        disabled={disabled}
      />
      <div />
    </div>
    <p className="form__section-field-label form__section-field-label--infos">{pieces}</p>
  </div>
);}

FileField.propTypes = {

};

FileField.defaultProps = {
  multiple: false,
  disabled: false,
  pieces: '',
  isHidden: false,
  placeholder: '',
  label: 'Pièce justificative',
}

export default FileField;
