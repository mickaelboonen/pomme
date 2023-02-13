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
import Address from '../../../components/Fields/Address';

const Identity = ({ step, isEfForm }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  const areWeUpdatingData = loader.pathname.includes('modifier');
  

  const { app: { apiMessage, agent },
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

  console.log(agent);
    const {
    register, handleSubmit, watch,
    trigger, formState:
    { errors }
  } = useForm({
    defaultValues: agent
  });
  

  const onSubmit = (data) => {
    console.log(data);

  };

  console.log(errors)
  const errorMessages = defineValidationRulesForMission(isEfForm, false);


  // TODO : rendre le champ tjrs visible obligatoire
  // Rajouter un champ adresse normée si adresse différente
  
  const [employer, setEmployer] = useState(agent.employer);
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
          <RadioInput id="Mme" formField="gender" label="Madame" register={register} />
          <RadioInput id="M." formField="gender" label="Monsieur" register={register} />
          <RadioInput id="Mlle" formField="gender" label="Mademoiselle" register={register} />
          {/* <RadioInput id="non-binary" formField="gender" label="Non Binaire" register={register} /> */}
        </div>
        <div className='form__section form__section--documents' id="other-fields">
          <div className='form__section-half'>
            <TextField
              id="firstname"
              disabled
              formField="firstname"
              label="Prénom"
              register={register}
              error={errors.firstname}
              required={errorMessages.firstname}
            /> 
          </div>
          <div className='form__section-half'>
            <TextField
              id="lastname"
              disabled
              formField="lastname"
              label="Nom de famille"
              register={register}
              error={errors.lastname}
              required={errorMessages.lastname}
            />
          </div>
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Adresses du Missionnaire</FormSectionTitle>
        <Address
          addressType='familiale'
          register={register}
          errors={errors}
        />
        <Address
          addressType='administrative'
          errors={errors}
          register={register}
          suffixe='Pro'
        />
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
            <div className="form__section__half" style={{width: '70%'}}>
              
              <TextField
                id="category"
                disabled
                formField="unimesCategory"
                label="Catégorie"
                register={register}
                error={errors.unimesCategory}
                required={errorMessages.unimesCategory}
              /> 
              <TextField
                id="status"
                disabled
                formField="unimesStatus"
                label="Statut"
                register={register}
                error={errors.unimesStatus}
                required={errorMessages.unimesStatus}
              /> 
              <TextField
                id="department"
                disabled
                formField="unimesDepartment"
                label="Service / département"
                register={register}
                error={errors.unimesDepartment}
                required={errorMessages.unimesDepartment}
              /> 
            </div>
          )}
          {employer === 'external' && (
            <div className="form__section__half" style={{width: '50%'}}>
              <div className="form__section-field">
                <p className="form__section-field-label">Fonctionnaire</p>
                  <RadioInput
                    register={register}
                    formField="civilWorker"
                    id="isCivil"
                    label="Oui"
                    required={errorMessages.civilWorker}
                    handler={toggleIsCivil}
                  />
                  <RadioInput
                    register={register}
                    formField="civilWorker"
                    id="isNotCivil"
                    label="Non"
                    required={errorMessages.civilWorker}
                    handler={toggleIsCivil}
                  />
              </div>
              {isCivil === 'isNotCivil' && (
                <TextField
                  id="other"
                  formField="externalWorker"
                  label="Autre (à préciser)"
                  register={register}
                  error={errors.externalWorker}
                  required={errorMessages.externalWorker}
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
