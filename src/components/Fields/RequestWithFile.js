import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

// Components

import FileField from 'src/components/Fields/FileField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import { getSavedFileName } from 'src/selectors/formDataGetters';


import './style.scss';

const RequestWithFile = ({
  register, // function
  setValue, // function
  errors, // array of errors
  link, // form url
  id, // id for the different elements
  data, // parent form data
  permanentOm, // bool
  watch, // function
  clearErrors  // function
}) => {
  
  console.log(id, id);
  const filename = data[id] ? getSavedFileName(data[id]): '';
  
  let title = '';
  if (id === 'dispensation') {
    title = "Demande de dérogation première classe ou classe affaire"

  }
  else if (id === 'taxiDispensation') {
    title = "Demande de dérogation taxi"

  }
  else if (id === 'vehicleAuthorizationFile') {
    title = "Demande d'autorisation préalable d'utilisation d'un véhicule'"

  }

  const handleClickOnDelete = () => {
    setValue(id, null);
    const nameElement = document.getElementById(id + '-field').nextElementSibling;
    nameElement.textContent = '';
  }
    
  let error = '';
  if (errors.hasOwnProperty(id)) {
    error = errors[id].message;
  }
  else {
    error = '';
  }

  const [fileField, fileFieldForValidation] = watch([id, id + 'ForValidation']);
  
  // Dynamically clearing errors when the value of the input is set
  useEffect(() => {
    if (fileField instanceof File || fileFieldForValidation) {
      clearErrors(id);
    }
  }, [fileField, fileFieldForValidation])

  
  return (
    <div className="form__section-container" id="upper-class-request">
      <h4 className="form__section-container-title">{title}</h4>
      <div className="form__section-container-options">
        {permanentOm && (
          <FileField
            fileName={filename}
            id={id + '-field'}
            setValue={setValue}
            formField={id}
            register={register}
          />
        )}
        {permanentOm && <span className="form__section-container-options__separator">OU</span>}
        <div className="form__section-field">
          <CheckboxInput
            id={id + '-for-validation-field'}
            formField={id + 'ForValidation'}
            label="Demande en cours"
            register={register}
            columnDisplay
          />
        </div>
        <span className="form__section-container-options__separator">OU</span>
        <div className="form__section-container-button">
          <Link to={link}>FAIRE LA DEMANDE</Link>
        </div>
      </div>
      {(data.file || typeof filename === 'string') && <button className="form__section-container-delete-button" id ={'delete-' + id} type='button' onClick={handleClickOnDelete}>Supprimer la pièce choisie</button>}
      {error !== "" && <p className="form__section-field-error form__section-field-error--open">{error}</p>}
    </div>
  );
}

RequestWithFile.propTypes = {
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  permanentOm: PropTypes.bool.isRequired,

  // Strings
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,

  // Functions
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired, 
};

export default RequestWithFile;
