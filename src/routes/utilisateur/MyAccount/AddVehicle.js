import React from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextField from 'src/components/Fields/TextField';
import ButtonElement from 'src/components/Fields/ButtonElement';

import ApiResponse from 'src/components/ApiResponse';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createVehicle, displayVehicle, updateVehicle } from '../../../reducer/vehicle';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearMessage } from '../../../reducer/app';

const AddVehicle = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const areWeUpdating = location.pathname.includes('modifier');

  const { app: { apiMessage, user},
    vehicle: { currentVehicle }} = useSelector((state) => state)
  
  let defaultValues = null;
  if (currentVehicle.hasOwnProperty('make')) {
    defaultValues = currentVehicle;
  }

  console.log(defaultValues);
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm({ 
    defaultValues: defaultValues
  });

  const onSubmit = (data) => {
    console.log("ON SUBMUT : ",data);

    if (areWeUpdating) {
      dispatch(updateVehicle(data))
    }
    else {
      dispatch(createVehicle(data));
    }
  };

  const handleGoBack = () =>  {
    console.log(apiMessage);
    if (apiMessage.hasOwnProperty('data')) {
      dispatch(clearMessage());
    }
    if (areWeUpdating) {
      dispatch(displayVehicle());
    }
    
    navigate(`/utilisateur/${user}/mes-documents`);
  }

  console.log(apiMessage);
  return (
  <main className="form-page__container">
    <div className="form-page__title">
      <PageTitle>{areWeUpdating ? 'Modifier' : 'Ajouter'} un véhicule personnel</PageTitle>
    </div>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Ajouter un véhicule</FormSectionTitle>
        <TextField
          id="car-brand"
          label="Marque du véhicule"
          formField="make"
          register={register}
          error={errors.make}
          required="Merci de renseigner la marque du véhicule."
        />
        <TextField
          id="car-registration"
          label="Numéro d'immatriculation"
          formField="licensePlate"
          register={register}
          error={errors.licensePlate}
          required="Merci de renseigner le numéro d'immatriculation du véhicule."
        />
        <TextField
          id="car-rating"
          label="Puissance fiscale"
          formField="rating"
          register={register}
          error={errors.rating}
          isNumber
          min="0"
          required="Merci de renseigner la puisance fiscale du véhicule."
        />
        <TextField
          id="car-insurance"
          label="Compagnie d'assurance"
          formField="insurance"
          register={register}
          error={errors.insurance}
          required="Merci de renseigner la compagnie qui assure le véhicule."
        />
        <TextField
          id="police-number"
          label="Numéro Police"
          formField="police"
          register={register}
          error={errors.police}
          required="Merci de renseigner le numéro de police du véhicule."
        />
                {apiMessage.data && <ApiResponse response={apiMessage} updateForm={true} />}

        <div className="form__section-field-button" id="submit-vehicle">
          <ButtonElement
            type="submit"
            label={`${areWeUpdating ? 'Modifier' : 'Ajouter'} le véhicule`}    
          />
        </div>

        <div onClick={handleGoBack} className="form__section-field-button" id="goback-vehicle">
          <ButtonElement
            type="button"
            label="Retour"
                   
          />
        </div>
      </div>
    </form>
  </main>
);
};

AddVehicle.propTypes = {

};

export default AddVehicle;
