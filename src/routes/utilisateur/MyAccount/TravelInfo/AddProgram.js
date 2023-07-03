import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import PageTitle from 'src/components/PageTitle';
import LoaderCircle from 'src/components/LoaderCircle';
import DateField from 'src/components/Fields/DateField';
import TextField from 'src/components/Fields/TextField';
import HiddenField from 'src/components/Fields/HiddenField';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';

import { clearMessage } from 'src/reducer/app';
import { displayVehicle  } from 'src/reducer/vehicle';

import './style.scss';

const AddProgram = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const areWeUpdating = location.pathname.includes('modifier');

  const { app: { apiMessage },
    agent: { user },
    vehicle: { currentVehicle, loader }} = useSelector((state) => state)
  
   
  let defaultValues = {
    sector: null,
    type: null,
    number: null,
    name: null,
    expiration: null,
  };
  if (currentVehicle.hasOwnProperty('make')) {
    defaultValues = currentVehicle;
  }
  
  if (areWeUpdating) {
    useEffect(() => {
      reset(defaultValues);
      
    }, [defaultValues])
  }
  
  const {
    register,
    handleSubmit,
    reset,
    formState:
    { errors },
  } = useForm({ 
    defaultValues: defaultValues
  });

  const onSubmit = (data) => {
    
    console.log(data);
    return;
    
  };

  const handleGoBack = () =>  {
    
    if (apiMessage.hasOwnProperty('response')) {
      dispatch(clearMessage());
    }
    if (areWeUpdating) {
      dispatch(displayVehicle());
    }
    
    navigate(`/utilisateur/${user}/mes-documents/profil-voyageur`);
  }
  return (
  <main className="form-page__container">
    <div className="form-page__title">
      <PageTitle>{areWeUpdating ? 'Modifier' : 'Ajouter'} un progamme de transport</PageTitle>
    </div>
    {(!loader || !areWeUpdating ) && (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__section">
          <FormSectionTitle>{areWeUpdating ? 'Modifier' : 'Ajouter'} un programme de transport</FormSectionTitle>
          <SelectField
            register={register}
            blankValue="Aucun secteur de programme sélectionné"
            data={["Ferroviaire", "Aérien"]}
            id="program-sector-field"
            formField="sector"
            label="Secteur"
            handler={() => {}}
            required
          />
          <SelectField
            register={register}
            blankValue="Aucun type de programme sélectionné"
            data={["Abonnement", "Fidélité"]}
            id="program-type-field"
            formField="type"
            label="Abonnement ou carte de fidélité"
            handler={() => {}}
            required
          />
          <TextField
            id="card-number-field"
            label="Numéro de carte"
            formField="number"
            register={register}
            error={errors.licensePlate}
            required="Merci de renseigner le numéro d'immatriculation du véhicule."
          />
          <TextField
            id="program-name-field"
            label="Nom du programme"
            formField="name"
            register={register}
            error={errors.rating}
            required="Merci de renseigner la puisance fiscale du véhicule."
          />
          <DateField
            id="expiration-date-field"
            type="date"
            label="Date d'expiration"
            formField="expiration"
            register={register}
            error={errors.insurance}
            required="Merci de renseigner la compagnie qui assure le véhicule."
          />
          <HiddenField
            id="user"
            value={user}
            register={register}
          />
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

AddProgram.propTypes = {

};

export default AddProgram;
