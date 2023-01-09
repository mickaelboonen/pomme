import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const FileField = ({
  register,
  formField,
  id,
  isHidden,
  pieces,
  multiple,
  label,
  placeholder,
  disabled,
  error,
  required,
  setValue
}) => {

  // Triggers the click on the file input that's hidden
  const handleClickOnFileInput = (event) => {
    event.currentTarget.firstChild.click();
  };

  // Handles the selection of the file
  const handleChange = (event) => {

    // Displays the name of the selected file 
    const filename = event.target.files[0].name;
    event.target.nextSibling.textContent = filename;

    // Sets the selected value into the field
    setValue(formField, event.target.files[0]);
  };
  
  return (
  <div id={formField} className={classNames("form__section-field", {"form__section-field--hidden": isHidden})} >
    <label className="form__section-field-label" htmlFor={id}>{label}</label>
    <div className="form__section-field-input form__section-field-input--file" onClick={handleClickOnFileInput}>
      <input
        id={id}
        className="form__section-field-input--file-input"
        type="file"
        placeholder={placeholder}
        {...register(formField, {
          required: required,
          
          })}
        name={formField}
        onChange={handleChange}
        multiple={multiple}
        disabled={disabled}
      />
      <div />
    </div>
    {pieces !== "" && <p className="form__section-field-label form__section-field-label--infos">{pieces}</p>}
    {error !== undefined && <p className="form__section-field-error form__section-field-error--open">{error?.message}</p>}
  
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
