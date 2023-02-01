import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Map from 'src/assets/images/map.svg';
import Pin from 'src/assets/images/pin.svg';

import './style.scss';

// Components
import EfMission from '../EfForm/Mission';
import Buttons from 'src/components/Fields/Buttons';
import ApiResponse from 'src/components/ApiResponse';
import SwitchButton from 'src/components/SwitchButton';
import DateField from 'src/components/Fields/DateField';
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import TextFieldWithIcon from 'src/components/Fields/TextFieldWithIcon';

// Selectors 
import { displayRegionFieldsInFormMission } from 'src/selectors/domManipulators';
import { handleRegionFields, defineValidationRulesForMission } from 'src/selectors/formValidationsFunctions';
import { getSavedFileName } from 'src/selectors/formDataGetters';

// Reducer
import { clearMessage } from 'src/reducer/app';
import { enableMissionFormFields } from 'src/reducer/efForm';
import { uploadFile, updateOmName, updateMission } from 'src/reducer/omForm';
import RequestWithFile from '../../../components/Fields/RequestWithFile';
import ScientificEvent from './ScientificEventFields';

const Mission = ({ step, isEfForm }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  const areWeUpdatingData = loader.pathname.includes('modifier');
  

  const { app: { apiMessage },
    omForm: { currentOM, omForm, refusal, adresses },
    efForm: { isMissionFormDisabled }
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

  
  let fileName = '';

  if (defaultValues.missionPurposeFile) {
    defaultValues.missionPurposeFile.forEach((file) => {

      fileName += getSavedFileName(file);

      if (defaultValues.missionPurposeFile.length > 1) {
        fileName += ' - ';
      }
    })
  }


  const {
    register, handleSubmit, watch,
    setError, setValue, unregister,
    trigger, formState:
    { errors }
  } = useForm({
    defaultValues: defaultValues,
  });
  
  if (areWeUpdatingData) {
    if (defaultValues.departure) {
      setValue('departure', defaultValues.departure.slice(0, 16));
    }
    if (defaultValues.comeback) {
      setValue('comeback', defaultValues.comeback.slice(0, 16));
    }
    if (defaultValues.science && defaultValues.missionPurposeFile === 'pending') {
      setValue('missionPurposeFileForValidation', true);
    }

  }

  const onSubmit = (data) => {
    console.log(data);

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

      if (data.modification && data.modificationFiles.length === 0) {
        setError('modificationFiles', { type: 'custom', message: 'Merci de fournir la ou les pièces justifiant la modification.'})
        return;
      }
      // TODO : bien faire les verifs / validations pour l'EF 
    }
    else {

      if (!data.science) {
        data.budget = null;
        data.presentation = null;
      }
      
      const departure = new Date(data.departure);
      const comeback = new Date(data.comeback);

      const diffDays = comeback.getDate() - departure.getDate();

      if (diffDays < 0) {
        setError('comeback', {type: 'custom', message: 'La date de retour ne peut précéder la date de départ.'})
      }
      else if (diffDays === 0) {
        const diffHours = comeback.getHours() - departure.getHours();

        if (diffHours < 0) {
          setError('comeback', {type: 'custom', message: "L'heure de retour ne peut précéder l'heure de départ."})
        }
        else if (diffHours === 0) {
          setError('comeback', {type: 'custom', message: 'Merci de renseigner une heure de retour valide.'})
        }
      }
      else {
        data.status = 1;

        const fileToAdd = data.missionPurposeFile.find((file) => file instanceof File)
        
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
       
        const dateForFile = `${departure.getDate()}-${departure.getMonth() + 1}-${departure.getFullYear()}`;
        const currentOmName = currentOM.name.split('_');
        
        if (currentOmName[2] !== dateForFile) {
          dispatch(updateOmName({omId: data.omId, name: dateForFile}));
        }
      }
    }
  };

  const errorMessages = defineValidationRulesForMission(isEfForm, modificationSwitch);

  const [region , modificationSwitch] = watch(['region',  'modificationSwitch' ]);

  // TODO : rendre le champ tjrs visible obligatoire
  // Rajouter un champ adresse normée si adresse différente
  
  const [isMissionAScienceEvent, setIsMissionAScienceEvent] = useState(defaultValues.science);

  useEffect(() => {
    handleRegionFields(region, register, unregister);
  }, [unregister, region]);


  const handleRegionClick = () => {
    displayRegionFieldsInFormMission();
  };
  
  const toggleDisabledFields = (event) => {
    dispatch(enableMissionFormFields(event.currentTarget.checked));
  }

  const setComebackValue = (value) => {
    setValue('comeback', value);
  }

  const toggleScienceForm = (event) => {
    setIsMissionAScienceEvent(event.target.checked);
  }
  
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
          isInForm
          formField="science"
          label="Est-ce que c'est un événement scientifique ?"
        />
        {!isMissionAScienceEvent && (
          <FileField
            disabled={isEfForm && isMissionFormDisabled}
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
            errors={errors}
            setValue={setValue}
            register={register}
            filename={fileName}
          />
        )}
        <HiddenField id="omId" value={omId} register={register} />
      </div>
      <div className="form__section">
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
        <SelectField
          // isHidden
          disabled={isEfForm && isMissionFormDisabled}
          data={adresses}
          register={register}
          error={errors.workAdress}
          formField="workAdress"
          id="work-address-select"
          label="Adresse administrative"
          blankValue={"Veuillez sélectionner l'adresse administrative qui vous correspond"}
          required={errorMessages.workAdress}
        />
      </div>
      <div className='form__section'>
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>
        <div className="form__section form__section--split">
          <RadioInput
            disabled={isEfForm && isMissionFormDisabled}
            id="métropole"
            formField="region"
            label="France Métropolitaine"
            register={register}
            handler={handleRegionClick}
            required={errorMessages.region}
          />
          <RadioInput
            disabled={isEfForm && isMissionFormDisabled}
            id="dom-tom"
            formField="region"
            label="DOM / TOM (*)"
            register={register}
            handler={handleRegionClick}
            required={errorMessages.region}
          />
          <RadioInput
            disabled={isEfForm && isMissionFormDisabled}
            id="étranger"
            formField="region"
            label="Étranger (*)(**)"
            register={register}
            handler={handleRegionClick}
            required={errorMessages.region}
          />
        </div>
        {errors.region && <p className="form__section-field-error form__section-field-error--open">{errors.region.message}</p>}
        <TextFieldWithIcon
          disabled={isEfForm && isMissionFormDisabled}
          isHidden={false}
          id="missionAdress"
          name="Adresse de la mission"
          icon={Pin}
          register={register}
          required={errorMessages.missionAdress}
          error={errors.missionAdress}
        />
        <TextFieldWithIcon
          disabled={isEfForm && isMissionFormDisabled}
          isHidden={true}
          id="country"
          name="Pays de la mission"
          icon={Map}
          register={register}
          error={errors.country}
          required={errorMessages.country}
        />
        <div className="form__section-field form__section-field--hidden" id="abroad-field">
          <p className="form__section-field-label">(*) Préciser : </p>
          <RadioInput
            register={register}
            formField="abroadCosts"
            id="per-diem"
            label="Per diem"
            required={errorMessages.abroadCosts}
          />
          <RadioInput
            register={register}
            formField="abroadCosts"
            id="frais-reels"
            label="Frais réels"
            required={errorMessages.abroadCosts}
          />
        {errors.abroadCosts && <p className="form__section-field-error form__section-field-error--open">{errors.abroadCosts.message}</p>}
        </div>
        <div className="form__section-field form__section-field--hidden" id="abroad-report">
          <p className="form__section-field-label">(**) Compte rendu à fournir au retour de la mission sur financement RI</p>
        </div>
      </div>
      {isEfForm && (
        <EfMission
          setValue={setValue}
          register={register}
          errors={errors}
          handler={toggleDisabledFields}
          modificationSwitch={modificationSwitch}
        />
      )}
      {refusal !== '' && <RefusalMessage message={refusal} />}
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

Mission.propTypes = {

};

export default Mission;
