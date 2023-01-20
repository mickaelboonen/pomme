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
  requestType, // so we know where we are
  register, // function
  setValue, // function
  errors, // array of errors
  link, // form url
  id, // id for the different elements
  data, // parent form data
  permanentOm, // bool
  watch,
  clearErrors 
}) => {
  const filename = data[id] ? getSavedFileName(data[id]): '';
  
  let title = '';
  if (requestType === 'science') {
    title = "Demande d'Autorisation de participation à un événement scientifique"

  }
  else if (requestType === 'dispensation') {
    title = "Demande de dérogation première classe ou classe affaire"

  }
  else if (requestType === 'taxiDispensation') {
    title = "Demande de dérogation taxi"

  }
  else if (requestType === 'authorization') {
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

  // TODO : trying to access data dynamically

  const [data[id], data[id + 'ForValidation']] = watch([id, id + 'ForValidation']);
   useEffect(() => {
    console.log(data[id]);
    if (data[id] instanceof File || data[id + 'ForValidation']) {
      console.log('here');
      clearErrors(id);
    }
  }, [data[id], data[id + 'ForValidation']])

  
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
        {permanentOm && <span className="form__section-container-options__separator">{requestType === 'science' ? 'ET' : 'OU'}</span>}
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

};


RequestWithFile.defaultProps = {
  filename: null,
  file: null,
};

export default RequestWithFile;
