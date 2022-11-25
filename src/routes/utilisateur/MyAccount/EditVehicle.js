import React from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextField from 'src/components/Fields/TextField';
import ButtonElement from 'src/components/Fields/ButtonElement';

import './style.scss';

const EditVehicle = () => {
  
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };


  // TODO : retrive data from DB about selected car to edit

  return (
  <main className="form-page__container">
    <div className="form-page__title">
      <PageTitle>Modifier les informations d'un véhicule personnel</PageTitle>
    </div>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Modifier un véhicule</FormSectionTitle>
        <TextField
          id="car-brand"
          label="Marque du véhicule"
          formField="car-brand"
          register={register}
        />
        <TextField
          id="car-registration"
          label="Numéro d'immatriculation"
          formField="car-registration"
          register={register}
        />
        <TextField
          id="car-rating"
          label="Puissance fiscale"
          formField="car-rating"
          register={register}
          isNumber
          min="0"
        />
        <TextField
          id="car-insurance"
          label="Compagnie d'assurance"
          formField="car-insurance"
          register={register}
        />
        <TextField
          id="police-number"
          label="Numéro Police"
          formField="police-number"
          register={register}
        />
        <div className="form__section-field-button">
          <ButtonElement
            type="submit"
            label="Enregistrer le véhicule"          
          />
        </div>
      </div>
    </form>
    <button className="form-page__container-link" type='button'>Retour</button>
  </main>
);
};

EditVehicle.propTypes = {

};

export default EditVehicle;
