import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';

import './style.scss';

const VehicleData = ({ setValue, register, errors, registrationFilename, insuranceFilename  }) => {
  
  return (
  <div className="form__section-container" id="carForm">
    <h4 className="form__section-container-title">RENSEIGNEMENTS SUR LA VOITURE</h4>
    <div className="form__section form__section--split" >
      <TextField
        id="car-brand"
        label="Marque du véhicule"
        formField="make"
        register={register}
        required='Merci de renseigner la marque de la voiture.'
        error={errors.make}
      />
      <TextField
        id="car-registration"
        label="Numéro d'immatriculation"
        formField="licensePlate"
        register={register}
        required="Merci de renseigner la plaque d'immatriculation de la voiture."
        error={errors.licensePlate}
      />
    </div>
    <div className="form__section  form__section--split">
      <TextField
        id="car-rating"
        label="Puissance fiscale"
        formField="rating"
        register={register}
        isNumber
        min="0"
        required='Merci de renseigner la puissance fiscale de la voiture.'
        error={errors.rating}
      />
      <TextField
        id="car-insurance"
        label="Compagnie d'assurance"
        formField="insurance"
        register={register}
        required="Merci de renseigner la compagnie assurant la voiture."
        error={errors.insurance}
      />
    </div>
    <div className="form__section  form__section--split">
      <TextField
        id="police-number"
        label="Numéro Police"
        formField="police"
        register={register}
        required="Merci de renseigner le numéro de police."
        error={errors.police}
      />
    </div>
    <div className="form__section  form__section--split">
      <FileField
        register={register}
        formField="registrationFile"
        id="registration"
        fileName={registrationFilename}
        label="Carte grise"
        setValue={setValue}
        error={errors.registrationFile}

      />
    </div>
    <div className="form__section  form__section--split">

      <FileField
        register={register}
        formField="insuranceFile"
        id="insurance"
        fileName={insuranceFilename}
        label="Attestation d'assurance"
        setValue={setValue}
        error={errors.insuranceFile}
      />
    </div>
  </div>
);}

VehicleData.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default VehicleData;
