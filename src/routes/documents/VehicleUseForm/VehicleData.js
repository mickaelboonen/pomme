import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'src/components/Fields/TextField';

import './style.scss';

const VehicleData = ({ register, errors }) => {
  
  return (
  <div className="form__section-container" id="carForm">
    <h4 className="form__section-container-title">RENSEIGNEMENTS SUR LA VOITURE</h4>
    <div className="form__section form__section--split" >
      <TextField
        id="car-brand"
        label="Marque du véhicule"
        formField="carBrand"
        register={register}
        required='Merci de renseigner la marque de la voiture.'
        error={errors.carBrand}
      />
      <TextField
        id="car-registration"
        label="Numéro d'immatriculation"
        formField="carRegistration"
        register={register}
        required="Merci de renseigner la plaque d'immatriculation de la voiture."
        error={errors.carRegistration}
      />
    </div>
    <div className="form__section  form__section--split">
      <TextField
        id="car-rating"
        label="Puissance fiscale"
        formField="carRating"
        register={register}
        isNumber
        min="0"
        required='Merci de renseigner la puissance fiscale de la voiture.'
        error={errors.carRating}
      />
      <TextField
        id="car-insurance"
        label="Compagnie d'assurance"
        formField="carInsurance"
        register={register}
        required="Merci de renseigner la compagnie assurant la voiture."
        error={errors.carInsurance}
      />
    </div>
    <div className="form__section  form__section--split">
      <TextField
        id="police-number"
        label="Numéro Police"
        formField="policeNumber"
        register={register}
        required="Merci de renseigner le numéro de police."
        error={errors.policeNumber}
      />
    </div>
  </div>
);}

VehicleData.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default VehicleData;
