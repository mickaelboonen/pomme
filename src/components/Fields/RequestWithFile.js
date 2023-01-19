import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

// Components

import FileField from 'src/components/Fields/FileField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';


import './style.scss';

const RequestWithFile = ({
  requestType, // so we know where we are
  register, // function
  setValue, // function
  filename, // name of the file (when updating a form)
  errors, // array of errors
  file, // null or File element 
}) => {
  
  
  let title = '';
  let link = '';
  if (requestType === 'science') {
    title = "Demande d'Autorisation de participation à un événement scientifique"
    link = "/nouveau-document/participation-à-un-événement-scientifique"
  }
  else if (requestType === 'dispensation') {
    title = "Demande de dérogation première classe ou classe affaire"
    link = "/nouveau-document/demande-de-dérogation"
  }
  else if (requestType === 'science') {
    title = "Demande d'autorisation préalable d'utilisation d'un véhicule'"
    link = "/nouveau-document/autorisation-de-véhicule"
  }


  const handleClickOnDelete = (event) => {
    const { id } = event.target;
    
    let target = id.slice(7);

    if (target === 'authorization') {
      target = 'vehicleAuthorizationFile';
    }
  
    setValue(target, null);
    const nameElement = document.getElementById(target + '-field').nextElementSibling;
    nameElement.textContent = '';
  }

  
  return (
    <div className="form__section-container" id="upper-class-request">
      <h4 className="form__section-container-title">{title}</h4>
      <div className="form__section-container-options">
        {requestType !== 'science' && (
          <FileField
            fileName={filename}
            id="dispensation-field"
            setValue={setValue}
            formField="dispensation"
            register={register}
          />
        )}
        {requestType !== 'science' && <span className="form__section-container-options__separator">OU</span>}
        <div className="form__section-field">
          <CheckboxInput
            id="dispensation-for-validation-field"
            formField="dispensationForValidation"
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
      {(file && requestType !== 'science') && <button className="form__section-container-delete-button" id ='delete-dispensation' type='button' onClick={handleClickOnDelete}>Supprimer la pièce choisie</button>}
      {errors.derogation && <p className="form__section-field-error form__section-field-error--open">{errors.derogation.message}</p>}
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
