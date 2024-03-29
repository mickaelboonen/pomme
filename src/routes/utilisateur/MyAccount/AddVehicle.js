import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import PageTitle from 'src/components/PageTitle';
import ApiResponse from 'src/components/ApiResponse';
import LoaderCircle from 'src/components/LoaderCircle';
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';

import { clearMessage } from 'src/reducer/app';
import { createVehicle, displayVehicle, updateVehicle } from 'src/reducer/vehicle';

import './style.scss';
import { useEffect } from 'react';
import { uploadVehicleFiles } from '../../../reducer/otherDocuments';
import { getSavedFileName } from '../../../selectors/formDataGetters';
import NumberField from '../../../components/Fields/NumberField';

const AddVehicle = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const areWeUpdating = location.pathname.includes('modifier');

  const { app: { apiMessage },
    agent: { user },
    vehicle: { currentVehicle, loader }} = useSelector((state) => state)
  
   
  let defaultValues = {
    make: null,
    licensePlate: null,
    rating: null,
    insurance: null,
    police: null,
    insuranceFile: null,
    registrationFile:null,
  };
  if (currentVehicle.hasOwnProperty('make')) {
    defaultValues = currentVehicle;
  }

  let insuranceFilename = '';
  let registrationFilename = '';
  if (areWeUpdating) {
    useEffect(() => {
      reset(defaultValues);
      
    }, [defaultValues])
  }

  if (defaultValues.insuranceFile) {
    insuranceFilename = getSavedFileName(currentVehicle.insuranceFile);
  }

  if (defaultValues.registrationFile) {
    registrationFilename = getSavedFileName(currentVehicle.registrationFile);
  }
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState:
    { errors },
  } = useForm({ 
    defaultValues: defaultValues
  });

  const onSubmit = (data) => {
        
    if (data.insuranceFile instanceof File || data.registrationFile instanceof File) {
      dispatch(uploadVehicleFiles({data: data, user: user, isUpdate : areWeUpdating}));
    }
    else {
      if (areWeUpdating) {
        dispatch(updateVehicle(data))
      }
      else {
        dispatch(createVehicle(data));
      }
    }
  };

  const handleGoBack = () =>  {
    
    if (apiMessage.hasOwnProperty('response')) {
      dispatch(clearMessage());
    }
    if (areWeUpdating) {
      dispatch(displayVehicle());
    }
    
    navigate(`/utilisateur/mes-documents`);
  }
  return (
  <main className="form-page__container">
    <div className="form-page__title">
      <PageTitle>{areWeUpdating ? 'Modifier' : 'Ajouter'} un véhicule personnel</PageTitle>
    </div>
    {(!loader || !areWeUpdating ) && (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__section">
          <FormSectionTitle>{areWeUpdating ? 'Modifier' : 'Ajouter'} un véhicule</FormSectionTitle>
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
          <NumberField
            id="car-rating"
            label="Puissance fiscale"
            formField="rating"
            register={register}
            error={errors.rating}
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
          <FileField
            register={register}
            formField="registrationFile"
            id="registration"
            fileName={registrationFilename}
            label="Carte grise"
            setValue={setValue}
            error={errors.registrationFile}
          />
          <FileField
            register={register}
            formField="insuranceFile"
            id="insurance"
            fileName={insuranceFilename}
            label="Attestation d'assurance"
            setValue={setValue}
            error={errors.insuranceFile}
          />
          {/* {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />} */}

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
    )}
    {(loader && areWeUpdating ) && (
      <LoaderCircle />
    )}
  </main>
);
};

AddVehicle.propTypes = {

};

export default AddVehicle;
