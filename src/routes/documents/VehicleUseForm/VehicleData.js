import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'src/components/Fields/TextField';
import ButtonElement from 'src/components/Fields/ButtonElement';

import './style.scss';

const VehicleData = ({ register, carType, errors}) => {
  
  return (
  <div>
    <div className="form__section  form__section--split">
      <TextField
        id="car-brand"
        label="Marque du véhicule"
        formField="carBrand"
        register={register}
        required='LOL'
        error={errors.carBrand}
      />
      <TextField
        id="car-registration"
        label="Numéro d'immatriculation"
        formField="carRegistration"
        register={register}
        required='LOL'
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
        required='LOL'
        error={errors.carRating}
      />
      <TextField
        id="car-insurance"
        label="Compagnie d'assurance"
        formField="carInsurance"
        register={register}
        required='LOL'
        error={errors.carInsurance}
      />
    </div>
    <div className="form__section  form__section--split">
      <TextField
        id="police-number"
        label="Numéro Police"
        formField="policeNumber"
        register={register}
        required='LOL'
        error={errors.policeNumber}
      />
    </div>
    {carType === 'personal-car' &&(
      <div className="form__section-field-button form__section-field--hidden">
        <ButtonElement
          isHidden
          type="button"
          label="Enregistrer le véhicule"          
        />
      </div>
    )}
  </div>
);}

VehicleData.propTypes = {

};

export default VehicleData;
