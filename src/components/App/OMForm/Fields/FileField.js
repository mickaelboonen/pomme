import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const FileField = ({ register, formField, id, isHidden = false }) => {
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
    <label className="form__section-field-label" htmlFor={id}>Pièce justificative</label>
    <div className="form__section-field-input form__section-field-input--file" onClick={handleClickOnFileInput}>
      <input
        id={id}
        className="form__section-field-input--file-input"
        type="file"
        {...register(formField)}
        onChange={handleChange}
      />
      <div />
    </div>
  </div>
);}

FileField.propTypes = {

};

export default FileField;
