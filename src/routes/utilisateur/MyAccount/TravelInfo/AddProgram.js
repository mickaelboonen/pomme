import React, {useEffect} from 'react';
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
import { createProgram, saveProgram, updateProgram } from 'src/reducer/otherDocuments';

import './style.scss';

const AddProgram = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const areWeUpdating = location.pathname.includes('modifier');

  const { app: { apiMessage },
    agent: { user },
    docs: { currentProgram, loader }} = useSelector((state) => state)
  
    let defaultValues = {
    sector: null,
    type: null,
    name: null,
    number: null,
    expiration: null,
  };

  if (currentProgram.hasOwnProperty('number')) {
    defaultValues = currentProgram;
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
    
    if (areWeUpdating) {
      dispatch(updateProgram(data));
    }
    else {
      dispatch(createProgram(data));
    }
    
    return;
  };

  const handleGoBack = () =>  {
    
    if (apiMessage.hasOwnProperty('response')) {
      dispatch(clearMessage());
    }
    if (areWeUpdating) {
      dispatch(saveProgram({}));
    }
    
    navigate(`/utilisateur/mes-documents/profil-voyageur`);
  };
  
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
            errors={errors.sector}
            // required="Merci de renseigner le secteur d'activité auquel se raccroche votre programme."
          />
          <SelectField
            register={register}
            blankValue="Aucun type de programme sélectionné"
            data={["Abonnement", "Fidélité"]}
            id="program-type-field"
            formField="type"
            label="Abonnement ou carte de fidélité"
            handler={() => {}}
            errors={errors.type}
            // required="Merci de renseigner le type de programme."
          />
          <TextField
            id="card-number-field"
            label="Numéro de carte"
            formField="number"
            register={register}
            error={errors.licensePlate}
            // required="Merci de renseigner le numéro du programme / de votre carte."
            errors={errors.number}
          />
          <TextField
            id="program-name-field"
            label="Nom du programme"
            formField="name"
            register={register}
            error={errors.rating}
            // required="Merci de renseigner le nom du programme choisi."
            errors={errors.name}
          />
          <DateField
            id="expiration-date-field"
            type="date"
            label="Date d'expiration"
            formField="expiration"
            register={register}
            error={errors.expiration}
            // required="Merci de renseigner la date d'expiration de votre programme."
          />
          <HiddenField
            id="user"
            value={user}
            register={register}
          />
          <div className="form__section-field-button" id="submit-vehicle">
            <ButtonElement
              type="submit"
              label={`${areWeUpdating ? 'Modifier' : 'Ajouter'} le programme`}    
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
