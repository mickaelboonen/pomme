import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

// Components
import EfMission from '../EfForm/Mission';
import Address from 'src/components/Fields/Address';
import Address2 from 'src/components/Fields/Address2';
import Buttons from 'src/components/Fields/Buttons';
import ApiResponse from 'src/components/ApiResponse';
import ScientificEvent from './ScientificEventFields';
import SwitchButton from 'src/components/SwitchButton';
import DateField from 'src/components/Fields/DateField';
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import TextareaField from 'src/components/Fields/TextareaField';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors 
import { handleRegionFields, defineValidationRulesForMission } from 'src/selectors/formValidationsFunctions';
import { getSavedFileName, turnAddressToFields } from 'src/selectors/formDataGetters';
import { declareCamelCaseKeys } from 'src/selectors/keyObjectService';
import { turnFieldsToAddressEntity } from 'src/selectors/formDataGetters';

// Reducer
import { enableMissionFormFields, updateEfMission } from 'src/reducer/ef';
import { uploadFile, updateOmName, updateMission } from 'src/reducer/omForm';
import { createIndexedObject } from '../../../selectors/keyObjectService';

const Mission = ({ step, isEfForm }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  
  const docId = loader.searchParams.get('id');
  const areWeUpdatingData = loader.pathname.includes('modifier');
  

  const { app: { apiMessage, countries},
    agent: { user},
    omForm: { currentOM, omForm, refusal, adresses },
    ef: { isMissionFormDisabled, currentEf }
  } = useSelector((state) => state);

  // Defining default values -----------------------------------------------------
  let defaultValues = null;
  let modificationsFilenames = '';

  // If we're on the état de frais page
  if (isEfForm) {
    // whe check if modifications to the mission have already been made
    if (currentEf.mission.modifications) {
      
      defaultValues =  declareCamelCaseKeys(currentEf.mission);
      // Since we're not retrieving address data from the ef mission, we feed on the current OM address
      defaultValues.address = currentOM.mission.address;
      defaultValues =  turnAddressToFields(defaultValues);
            
      defaultValues.modificationSwitch = true;

      // Defining the modifications files names 
      if (defaultValues.modificationFiles.length > 0) {
        defaultValues.modificationFiles.forEach((file) => {
    
          modificationsFilenames += getSavedFileName(file);
    
          if (defaultValues.modificationFiles.length > 1) {
            modificationsFilenames += ' - ';
          }
        })
      }
    }
    else {
      defaultValues =  declareCamelCaseKeys(currentOM.mission);
      // TODO ; check si ok en dessous
      // defaultValues =  turnAddressToFields(defaultValues);
    }
    // defaultValues =  declareCamelCaseKeys(currentOM.mission);
    // defaultValues =  turnAddressToFields(defaultValues);
  }
  // else, default values are from the om mission entity
  else {
    defaultValues = omForm.find((omStep) => omStep.step === 'mission').data;
  }
  
  // Defining file names to display them in the browser -------------------------
  let fileName = '';

  if (defaultValues.missionPurposeFile) {
    defaultValues.missionPurposeFile.forEach((file) => {

      fileName += getSavedFileName(file);

      if (defaultValues.missionPurposeFile.length > 1) {
        fileName += ' - ';
      }
    })
  }
  
  defaultValues = createIndexedObject(defaultValues);

  const {
    register, handleSubmit, watch,
    setError, setValue, formState: { errors }
  } = useForm({
    defaultValues: {
      ...defaultValues,
      visa: defaultValues.visa ? 'visa-yes' : 'visa-no',
    },
  });
  
  if (defaultValues.departure) {
    setValue('departure', defaultValues.departure.slice(0, 16));
  }
  if (defaultValues.comeback) {
    setValue('comeback', defaultValues.comeback.slice(0, 16));
  }
  if (defaultValues.science && defaultValues.missionPurposeFile === 'pending') {
    setValue('missionPurposeFileForValidation', true);
  }
  
  const onSubmit = (data) => {
    
    data = turnFieldsToAddressEntity(data);
    
    if (data.science) {
      if ((!data.missionPurposeFile || data.missionPurposeFile.length === 0) && !data.missionPurposeFileForValidation) {
        setError('missionPurposeFile', { type: 'custom', message: 'Merci de fournir le justificatif de la mission.'})
        return;
      }
    }
    else if (!data.missionPurposeFile || data.missionPurposeFile.length === 0) {
      setError('missionPurposeFile', { type: 'custom', message: 'Merci de fournir le justificatif de la mission.'})
      return;
    }

    if (isEfForm) {
      if (!data.modificationSwitch) {
        
        // TODO : Update ef_mission to validated, doesn't rewrite all the data, we'll get it from the OM - so the user can't cheat
        dispatch(updateEfMission({ docId: docId, status: 2, isModified: false}))
      }
      else {
        
        if (!data.modificationFiles || data.modificationFiles.length === 0) {
          setError('modificationFiles', { type: 'custom', message: 'Merci de fournir la ou les pièces justifiant la modification.'})
          return;
        }
        data.status = 1;

        if (data.modificationFiles.length > 0) {
          dispatch(uploadFile({data: data, step: 'mission', docType: 'ef'}));
        }
        else {
          dispatch(updateEfMission(data))
        }
      }
    }
    else {

      if (!data.science) {
        data.budget = null;
        data.presentation = null;
      }
      
      const departure = new Date(data.departure);
      const comeback = new Date(data.comeback);

      const diffDays = Number(comeback.getDate()) - Number(departure.getDate());
      
      let errorCount = 0;

      if (diffDays < 0) {
        if (comeback.getMonth() <= departure.getMonth()) {
          setError('comeback', {type: 'custom', message: 'La date de retour ne peut précéder la date de départ.'});
          errorCount++;
        }
      }
      else if (diffDays === 0) {

        const diffHours = Number(comeback.getHours()) - Number(departure.getHours());

        if (diffHours < 0) {
          setError('comeback', {type: 'custom', message: "L'heure de retour ne peut précéder l'heure de départ."})
          errorCount++;
        }
        else if (diffHours === 0) {
          setError('comeback', {type: 'custom', message: 'Merci de renseigner une heure de retour valide.'})
          errorCount++;
        }
      }
      if (errorCount === 0) {
        data.status = 1;

        const fileToAdd = data.missionPurposeFile.find((file) => file instanceof File);

        if (fileToAdd === undefined) {
          delete data.om;
          if (data.science && data.missionPurposeFileForValidation) {
            data.missionPurposeFile = 'pending';
          }
          delete data.missionPurposeFileForValidation;
          dispatch(updateMission(data));
        }
        else {
           dispatch(uploadFile({data: data, step: 'mission'}));
        }
       
        // TODO : change update name since no more city property
        const dateForFile = `${departure.getDate()}-${departure.getMonth() + 1}-${departure.getFullYear()}`;
        const newOmName = `OM_${data.missionAddress.city.toUpperCase()}_${dateForFile}_${user.toUpperCase()}`;
        
        if (currentOM.name !== newOmName) {
          dispatch(updateOmName({docId: data.docId, date: dateForFile, place: data.missionAddress.city}));
        }
      }
    }
  };

  const errorMessages = defineValidationRulesForMission(isEfForm, modificationSwitch);

  const [region , modificationSwitch] = watch(['region',  'modificationSwitch' ]);
  
  const [isMissionAScienceEvent, setIsMissionAScienceEvent] = useState(defaultValues.science);
  const [isVisaNeeded, setIsVisaNeeded] = useState(defaultValues.visa);
  const [addressNumberArray, setAddressNumberArray] = useState(defaultValues.visa);

  const handleVisa = (event) => {
    const { id } = event.target;
    
    if (id === "visa-yes") {
      setIsVisaNeeded(true);
    }
    else {
      setIsVisaNeeded(false);
    }
  }
  
  
  const toggleDisabledFields = (event) => {
    dispatch(enableMissionFormFields(event.currentTarget.checked));
  }

  const setComebackValue = (value) => {
    setValue('comeback', value);
  }

  const toggleScienceForm = (event) => {
    setIsMissionAScienceEvent(event.target.checked);
  }

  const addNewAddress = () => {
    const addressesElement = document.getElementById('addresses');
    setAddressNumberArray(addressNumberArray.length + 1)
    console.log(addressesElement);
  }
  
  const frenchRegions = countries.filter((country) => country.nationality === 'Français' || country.nationality === 'FRANCAIS(E)');
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Raison de la mission</FormSectionTitle>

        <TextField
          id="motif"
          disabled={isEfForm && isMissionFormDisabled}
          formField="missionPurpose"
          label="Motif de la mission"
          register={register}
          error={errors.missionPurpose}
          required={errorMessages.missionPurpose}
        />
        <SwitchButton
          register={register}
          handler={toggleScienceForm}
          disabled={isEfForm && isMissionFormDisabled}
          isInForm
          formField="science"
          label="Est-ce que c'est un événement scientifique ?"
        />
        {!isMissionAScienceEvent && (
            <FileField
              disabled={isEfForm}
              setValue={setValue}
              multiple
              id="mission-goal"
              formField="missionPurposeFile"
              fileName={fileName}
              register={register}
              error={errors.missionPurposeFile}
              pieces="Joindre impérativement convocation, mail ou tout autre document en attestant"
            />
          )}
        {isMissionAScienceEvent && (
          <ScientificEvent
            isEfForm={isEfForm}
            isMissionFormDisabled={isMissionFormDisabled}
            errors={errors}
            setValue={setValue}
            register={register}
            filename={fileName}
          />
        )}
        <HiddenField id="docId" value={docId} register={register} />
      </div>
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="form__section form__section--split">
          <div className="form__section-half">
            <DateField
              disabled={isEfForm && isMissionFormDisabled}
              type="datetime-local"
              id="departure"
              label="Jour et Heure de départ"
              register={register}
              formField="departure"
              error={errors.departure}
              required={errorMessages.departure}
            />
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Lieu de départ</label>
              <RadioInput
                disabled={isEfForm && isMissionFormDisabled}
                id="departure-home"
                formField="departurePlace"
                label="Résidence familiale"
                register={register}
                required={errorMessages.departurePlace}
              />
              <RadioInput
                disabled={isEfForm && isMissionFormDisabled}
                id="departure-work"
                formField="departurePlace"
                label="Résidence administrative"
                register={register}
                required={errorMessages.departurePlace}
              />
              {errors.departurePlace && <p className="form__section-field-error form__section-field-error--open">{errors.departurePlace.message}</p>}
            </div>
          </div>
          <div className="form__section-half form__section-half--separator" />
          <div className="form__section-half">
            <DateField
              disabled={isEfForm && isMissionFormDisabled}
              type="datetime-local"
              id="comeback"
              label="Jour et Heure de retour"
              register={register}
              formField="comeback"
              error={errors.comeback}
              required={errorMessages.comeback}
              handler={setComebackValue}
            />
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Lieu de retour</label>
              <RadioInput
                disabled={isEfForm && isMissionFormDisabled}
                id="comeback-home"
                formField="comebackPlace"
                label="Résidence familiale"
                register={register}
                required={errorMessages.comebackPlace}
              />
              <RadioInput
                disabled={isEfForm && isMissionFormDisabled}
                id="comeback-work"
                formField="comebackPlace"
                label="Résidence administrative"
                register={register}
                required={errorMessages.comebackPlace}
              />
              {errors.comebackPlace && <p className="form__section-field-error form__section-field-error--open">{errors.comebackPlace.message}</p>}
            </div>
          </div>
        </div>
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>
        <div className='form__section' id="addresses">
          <Address2
            data={defaultValues.addresses}
            disabled={isEfForm && isMissionFormDisabled}
            addressType="de la mission"
            register={register}
            errors={errors}
            watch={watch}
            dispatch={dispatch}
            errorMessages={errorMessages}
          />
        </div>
        <div className="form__section form__section--split">
          <RadioInput
            disabled={isEfForm && isMissionFormDisabled}
            id="métropole"
            formField="region"
            label="France Métropolitaine"
            register={register}
            required={errorMessages.region}
          />
          <RadioInput
            disabled={isEfForm && isMissionFormDisabled}
            id="dom-tom"
            formField="region"
            label="DOM / TOM (*)"
            register={register}
            required={errorMessages.region}
          />
          <RadioInput
            disabled={isEfForm && isMissionFormDisabled}
            id="étranger"
            formField="region"
            label="Étranger (*)(**)"
            register={register}
            required={errorMessages.region}
          />
        </div>
        {errors.region && <p className="form__section-field-error form__section-field-error--open">{errors.region.message}</p>}

        {region === 'étranger' && (
          <>
          {/* Not using the SelectField component because it doesn't handle optgroups */}
            <div className="form__section-field" id="country-field">
              <label className="form__section-field-label" htmlFor="country">Pays de la Mission</label>
              <select
                id="country"
                className="form__section-field-input"
                {...register("country", {
                  required: errorMessages.country
                })}
                disabled={isEfForm && isMissionFormDisabled}
              >
                <optgroup label="France et ses DOM-TOM">
                  {frenchRegions.map((country) => <option key={country.code + '-fr'} value={country.code}>{country.name}</option>)}
                  <option value="" />
                </optgroup>
                <optgroup label="Tous les pays">
                  {countries.map((country) => <option key={country.code + '-all'} value={country.code}>{country.name}</option>)}
                </optgroup>
              </select>
              {errors.country && <p className={classNames("form__section-field-error", { "form__section-field-error--open": error?.message.length > 0 })}>{errors.country.message}</p>}
            </div>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Visa</label>
              <RadioInput disabled={isEfForm && isMissionFormDisabled} handler={handleVisa} id="visa-yes" formField="visa" label="Oui" register={register} required={errorMessages.visa} />
              <RadioInput disabled={isEfForm && isMissionFormDisabled} handler={handleVisa} id="visa-no" formField="visa" label="Non" register={register} required={errorMessages.visa} />
            </div>
            {errors.visa && <p className="form__section-field-error form__section-field-error--open">{errors.visa.message}</p>}
            {isVisaNeeded && (
              <div className="form__section-field">
                <label className="form__section-field-label" htmlFor="departure-place">Prise en charge du visa</label>
                <RadioInput disabled={isEfForm && isMissionFormDisabled} id="unimes" formField="visaPayment" label="Réglé par Unîmes" register={register} required={errorMessages.visaPayment} />
                <RadioInput disabled={isEfForm && isMissionFormDisabled} id="user" formField="visaPayment" label="Avancé par l'agent" register={register} required={errorMessages.visaPayment} />
              </div>
            )}
            {errors.visaPayment && <p className="form__section-field-error form__section-field-error--open">{errors.visaPayment.message}</p>}
          </>
        )}
        {(region === 'dom-tom' || region === 'étranger')  && (
          <div className="form__section-field" id="abroad-field">
            <p className="form__section-field-label">(*) Préciser : </p>
            <RadioInput
              disabled={isEfForm && isMissionFormDisabled}
              register={register}
              formField="abroadCosts"
              id="per-diem"
              label="Per diem"
              required={errorMessages.abroadCosts}
            />
            <RadioInput
              disabled={isEfForm && isMissionFormDisabled}
              register={register}
              formField="abroadCosts"
              id="frais-reels"
              label="Frais réels"
              required={errorMessages.abroadCosts}
            />
          {errors.abroadCosts && <p className="form__section-field-error form__section-field-error--open">{errors.abroadCosts.message}</p>}
          </div>
        )}
        <div className="form__section-field form__section-field--hidden" id="abroad-report">
          <p className="form__section-field-label">(**) Compte rendu à fournir au retour de la mission sur financement RI</p>
        </div>
      {isEfForm && (
        <EfMission
          setValue={setValue}
          register={register}
          errors={errors}
          handler={toggleDisabledFields}
          modificationSwitch={modificationSwitch}
          filenames={modificationsFilenames}
        />
      )}
      {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={areWeUpdatingData} />}
      <Buttons
        step={step}
        id={docId}
        url={loader}
        watch={watch}
        update={isEfForm ? updateEfMission : updateMission}
        type={isEfForm ? "ef" : "om"}
      />
    </form>
    
  );
};

Mission.propTypes = {

};

export default Mission;
