import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

// Components
import Buttons from 'src/components/Fields/Buttons';
import ApiResponse from 'src/components/ApiResponse';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors 
import {  defineValidationRulesForMission } from 'src/selectors/formValidationsFunctions';

// Reducer
import { clearMessage } from 'src/reducer/app';
import { updateMission } from 'src/reducer/omForm';

const Identity = ({ step, isEfForm }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  const areWeUpdatingData = loader.pathname.includes('modifier');
  

  const { app: { apiMessage },
    omForm: { currentOM, omForm, refusal, adresses },
  } = useSelector((state) => state);
  
  // TODO : problem with setApiResponse when savingAsItis
  useEffect(() => {
    if (apiMessage.status && apiMessage.status === 200) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, "4900")
      setTimeout(() => {
        if (areWeUpdatingData) {
          const nextStep = step + 1;
          navigate(loader.pathname + '?etape=' + nextStep + '&id=' + omId);
        }
      }, "5000")
    }
  }, [apiMessage])

  const defaultValues = omForm.find((omStep) => omStep.step === 'mission').data;

    const {
    register, handleSubmit, watch,
    trigger, formState:
    { errors }
  } = useForm({
    defaultValues: defaultValues,
  });
  

  const onSubmit = (data) => {
    console.log(data);

  };

  console.log('rendu')
  const errorMessages = defineValidationRulesForMission(isEfForm, false);


  // TODO : rendre le champ tjrs visible obligatoire
  // Rajouter un champ adresse normée si adresse différente
  
  const [employer, setEmployer] = useState('');
  const [isCivil, setIsCivil] = useState('');

  const toggleWorker = (event) => {
    setEmployer(event.target.id);
  }

  const toggleIsCivil = (event) => {
    console.log(event.target.value)
    setIsCivil(event.target.id);
  }
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Missionnaire</FormSectionTitle>
        <div className="form__section form__section--split">
          <p className="form__section-field-label">Qualité : </p>
          <RadioInput id="Madame" formField="gender" label="Madame" register={register} />
          <RadioInput id="Monsieur" formField="gender" label="Monsieur" register={register} />
          <RadioInput id="non-binary" formField="gender" label="Non Binaire" register={register} />
        </div>
        <div className='form__section form__section--documents' id="other-fields">
          <div className='form__section-half'>
            <TextField
              id="firstname"
              disabled
              formField="missionPurpose"
              label="Prénom"
              register={register}
              error={errors.missionPurpose}
              required={errorMessages.missionPurpose}
            /> 
          </div>
          <div className='form__section-half'>
            <TextField
              id="lastname"
              disabled
              formField="missionPurpose"
              label="Nom de famille"
              register={register}
              error={errors.missionPurpose}
              required={errorMessages.missionPurpose}
            />
          </div>
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Adresses du Missionnaire</FormSectionTitle>
        <div className="form__section-container" id="upper-class-request">
          Adresse perso
        </div>
        <div className="form__section-container" id="upper-class-request">
          Adresse administrative
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Personnel</FormSectionTitle>
        <div className="form__section form__section--split" style={{alignItems: 'center'}}>
          <div className="form__section__half">
            <div className="form__section-field">
              <p className="form__section-field-label">Personnel</p>
                <RadioInput
                  register={register}
                  formField="employer"
                  id="unimes"
                  label="Unîmes"
                  required={errorMessages.unimes}
                  handler={toggleWorker}
                />
                <RadioInput
                  register={register}
                  formField="employer"
                  id="external"
                  label="Extérieur"
                  required={errorMessages.unimes}
                  handler={toggleWorker}
                />
            </div>
          </div>
          {employer === 'unimes' && (
            <div className="form__section__half">
              
              <TextField
                id="category"
                disabled
                formField="missionPurpose"
                label="Catégorie"
                register={register}
                error={errors.missionPurpose}
                required={errorMessages.missionPurpose}
              /> 
              <TextField
                id="status"
                disabled
                formField="missionPurpose"
                label="Statut"
                register={register}
                error={errors.missionPurpose}
                required={errorMessages.missionPurpose}
              /> 
              <TextField
                id="department"
                disabled
                formField="missionPurpose"
                label="Service / département"
                register={register}
                error={errors.missionPurpose}
                required={errorMessages.missionPurpose}
              /> 
            </div>
          )}
          {employer === 'external' && (
            <div className="form__section__half" style={{minWidth: '50%'}}>
              <div className="form__section-field">
                <p className="form__section-field-label">Fonctionnaire</p>
                  <RadioInput
                    register={register}
                    formField="abroadCosts"
                    id="isCivil"
                    label="Oui"
                    required={errorMessages.abroadCosts}
                    handler={toggleIsCivil}
                  />
                  <RadioInput
                    register={register}
                    formField="abroadCosts"
                    id="isNotCivil"
                    label="Non"
                    required={errorMessages.abroadCosts}
                    handler={toggleIsCivil}
                  />
              </div>
              {isCivil === 'isNotCivil' && (
                <TextField
                  id="other"
                  formField="missionPurpose"
                  label="Autre (à préciser)"
                  register={register}
                  error={errors.missionPurpose}
                  required={errorMessages.missionPurpose}
                /> 
              )}
            </div>
          )}
        </div>
      </div>
      {apiMessage.data && <ApiResponse response={apiMessage} updateForm={areWeUpdatingData} />}
      <Buttons
        step={step}
        id={omId}
        url={loader}
        watch={watch}
        update={updateMission}
        trigger={trigger}
      />
    </form>
    
  );
};

Identity.propTypes = {

};

export default Identity;
