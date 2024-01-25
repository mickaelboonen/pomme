import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as DOMPurify from 'dompurify';
import '../style.scss';

// Components
import EfMission from '../../EfForm/Mission';
import Address2 from 'src/components/Fields/Address2';
import Buttons from 'src/components/Fields/Buttons';
import Rules from 'src/components/Rules';
import SwitchButton from 'src/components/SwitchButton';
import DateField from 'src/components/Fields/DateField';
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors 
import { defineValidationRulesForMission } from 'src/selectors/formValidationsFunctions';
import { declareCamelCaseKeys, addAllAddressesFields } from 'src/selectors/keyObjectService';
import { getSavedFileName, getAllFilenamesForProperty, turnFieldsToAddressEntity } from 'src/selectors/formDataGetters';
import { getDateForInput, getHourForInput } from 'src/selectors/dateFunctions';

// Reducer
import { enableMissionFormFields, updateEfMission } from 'src/reducer/ef';
import { uploadFile, updateOmName, updateMission } from 'src/reducer/omForm';
import StatusChecker from 'src/components/StatusChecker';
import DateAndHourField from '../../../../components/Fields/DateAndHourField';
import { getDatePart, getHourPart, getDDMMYYDateNew } from '../../../../selectors/dateFunctions';

const Mission = ({ step, isEfForm }) => {
  
  const dispatch = useDispatch();
  const loader = useLoaderData();
  
  const docId = loader.searchParams.get('id');
  
  const { app: { apiMessage, countries},
    agent: { user, agent },
    omForm: { currentOM, omForm },
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
      defaultValues.addresses = currentOM.mission.addresses;
      
      // defaultValues =  turnAddressToFields(defaultValues);
      defaultValues = addAllAddressesFields(defaultValues);
            
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
      defaultValues.status = currentEf.mission.status;
    };
  }
  else {
    const mission = omForm.find((omStep) => omStep.step === 'mission').data;
    defaultValues = {...mission}
  }

  const fileName = getAllFilenamesForProperty(defaultValues.missionPurposeFile);
  const mapsFileName = getAllFilenamesForProperty(defaultValues.maps);
  
  defaultValues = addAllAddressesFields(defaultValues);

  const {
    register, handleSubmit, watch, clearErrors,
    setError, setValue, formState: { errors }
  } = useForm({
    defaultValues: {
      ...defaultValues,
      visa: defaultValues.visa ? 'visa-yes' : 'visa-no',
    },
  });
  
  if (defaultValues.science && defaultValues.missionPurposeFile === 'pending') {
    setValue('missionPurposeFileForValidation', true);
  }
  
  const onSubmit = (data) => {

    data = turnFieldsToAddressEntity(data);
    console.log(data);
    if (data.science) {
      if (data.scientificEvents.length === 0) {
        setError('scientificEvents', { type: 'custom', message: 'Merci de remplir le formulaire de participation à un événement scientifique.'});
        return;
      }
    }
    else if (!data.missionPurposeFile || data.missionPurposeFile.length === 0) {
      setError('missionPurposeFile', { type: 'custom', message: 'Merci de fournir le justificatif de la mission.'})
      return;
    }


    if (data.addresses.length > 1) {
      const planning = document.querySelector('.ql-editor').innerHTML;
      let planningWithTags = planning.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  
      const planningWithAllowedTags = DOMPurify.sanitize(planningWithTags, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
      });
  
      data.planning = planningWithAllowedTags;
  
    }

    if (isEfForm) {
      if (!data.modificationSwitch) {
        
        // TODO : Update ef_mission to validated, doesn't rewrite all the data, we'll get it from the OM - so the user can't cheat
        dispatch(updateEfMission({ docId: docId, status: 2, isModified: false}))
      }
      else {
        
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
      
      // const departure = new Date(data.departureDay + 'T' + data.departureHour);
      // const comeback = new Date(data.comebackDay + 'T' + data.comebackHour);

      const diffDays = getDatePart(data.comebackDay) - getDatePart(data.departureDay) ;
            
      let errorCount = 0;

      if (diffDays < 0) {
        setError('comebackDay', {type: 'custom', message: 'La date de retour ne peut précéder la date de départ.'});
        errorCount++;
      }
      else if (diffDays === 0) {

        const diffHours = getHourPart(data.comebackHour) - getHourPart(data.departureHour) ;

        if (diffHours < 0) {
          setError('comebackHour', {type: 'custom', message: "L'heure de retour ne peut précéder l'heure de départ."})
          errorCount++;
        }
        else if (diffHours === 0) {
          setError('comebackHour', {type: 'custom', message: 'Merci de renseigner une heure de retour valide.'})
          errorCount++;
        }
      }
      
      if (errorCount === 0) {
        data.status = 1;
        
        const fileToAdd = data.missionPurposeFile.find((file) => file instanceof File);
        let mapsToAdd = undefined;
        if (data.maps) {
          mapsToAdd = data.maps.find((file) => file instanceof File);
        }

        // data.comeback = new Date(comeback.getTime() - comeback.getTimezoneOffset() * 60000).toISOString();
        // data.departure = new Date(departure.getTime() - departure.getTimezoneOffset() * 60000).toISOString();
// 
        delete data.departureInSpecificTimezone;
        delete data.comebackInSpecificTimezone;


        if (fileToAdd === undefined && mapsToAdd === undefined ) {
          delete data.om;
          console.log(data);
          // return;
          dispatch(updateMission(data));
        }
        else {
           dispatch(uploadFile({data: data, step: 'mission'}));
        }
        
        const newOmName = createOmName(data);
        
        if (currentOM.name !== newOmName) {
          dispatch(updateOmName({docId: data.docId, name: newOmName}));
        }
      }
    }
  };

  const createOmName = (data) => {
    let name = agent.firstname.slice(0,1) + '.' + agent.lastname.toUpperCase() + '-OM-' + getDDMMYYDateNew(data.departureDay);
    data.addresses.forEach((address) => {
      name += '-' + address.city.toUpperCase();
    })
    return name;
  }

  const errorMessages = defineValidationRulesForMission(isEfForm, modificationSwitch);

  const [region , modificationSwitch] = watch(['region',  'modificationSwitch' ]);

  const [isMissionAScienceEvent, setIsMissionAScienceEvent] = useState(false);
  const [isVisaNeeded, setIsVisaNeeded] = useState(defaultValues.visa);

  useEffect(() => {
    if (defaultValues.planning !== null) {
      const planning = document.querySelector('.ql-editor');
      if (planning) {
        planning.innerHTML = defaultValues.planning;  

      }
    }
  }, [])

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
    setValue('comebackDay', value);
  }

  const toggleScienceForm = (event) => {
    setIsMissionAScienceEvent(event.target.checked);
  }

  const setAddressesErrors = (errors) => {
    
    const errorsArray = Object.getOwnPropertyNames(errors);
    // const addressProperties = ['postCode', 'city'];
    let errorMessage = '';
    
    if (errorsArray.length > 0) {

      const addressesNumberArray = [];
      errorsArray.forEach((error) => {
        const number = error.slice(error.length - 1);

        if (addressesNumberArray.indexOf(number) === -1 && !isNaN(number)) {
          addressesNumberArray.push(number);
        }
      });
      if (addressesNumberArray.length > 0) {
        errorMessage = 'Vous avez des erreurs aux adresses numéros : ';
        errorMessage += addressesNumberArray.toString();
      }
    }
    return errorMessage;
  }
  const setGlobalErrorMessage = (errors) => {
    
    const errorsArray = Object.getOwnPropertyNames(errors);
    let errorMessage = '';
    
    if (errorsArray.length > 0) {
      errorMessage = "Le formulaire contient des erreurs. Veuillez les corriger avant de valider à nouveau l'étape.";
    }
    return errorMessage;
  }
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StatusChecker status={defaultValues.status} />
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
        {(currentOM.type === "research" || currentOM.type === "admin-ed" || currentOM.type === "admin-cd") && (
          <SwitchButton
            register={register}
            handler={toggleScienceForm}
            disabled={isEfForm && isMissionFormDisabled}
            isInForm
            formField="science"
            label="Est-ce que c'est un événement scientifique ?"
          />
        )}
        {(isMissionAScienceEvent && !isEfForm) && (
          <div className="form__section-container" id="upper-class-request">
            <h4 className="form__section-container-title">PARTICIPATION À UN ÉVÉNEMENT SCIENTIFIQUE</h4>
            <div className="form__section-container-button">
              <Link id={'scientificEvent-link'} to={`/nouveau-document/${encodeURIComponent('participation-à-un-événement-scientifique')}?omId=${docId}`}>FAIRE LA DEMANDE</Link>
            </div>
            <p style={{margin: '1rem'}}>Nombre de demandes en cours : {defaultValues.scientificEvents.length}.</p>
            {errors.scientificEvents && <p className="form__section-field-error form__section-field-error--open">{errors.scientificEvents.message}</p>}
          </div>
        )}
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
        <HiddenField id="docId" value={docId} register={register} />
      </div>
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="form__section form__section--split">
          <div className="form__section-half">
            <DateAndHourField
              disabled={isEfForm && isMissionFormDisabled}
              type="datetime-local"
              id="departure"
              label="Jour et heure de départ"
              register={register}
              formField="departure"
              error={errors}
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
            <DateAndHourField
              disabled={isEfForm && isMissionFormDisabled}
              type="datetime-local"
              id="comeback"
              label="Jour et heure de retour"
              register={register}
              formField="comeback"
              error={errors}
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
            clearErrors={clearErrors}
            watch={watch}
            dispatch={dispatch}
            errorMessages={errorMessages}
            countries={countries}
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
            <Rules
              title="Règles de départ à l'étranger"
              id="foreign-mission"
            >
            <p className="rules__body-text"><span className='rules__body-text__span'>CARTE DU PAYS : </span></p>
              <p className="rules__body-text">
                Dans le cadre d'une mission à l'étranger, merci de vous rendre sur <a target='_blank' className="rules__body-link" href='https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination'> France Diplomatie</a> afin de récupérer les informations relatives  à la sécurité sur le pays de destination.
              </p>
              <p className="rules__body-text">
                Une fois le pays sélectionné, aller dans l'onglet Sécurité - Zones de vigilance et récupérer la carte du pays puis la transmettre ci-dessous dans le champ approprié.
              </p>

              <div className="rules__body-separator" />
              <p className="rules__body-text"><span className='rules__body-text__span'>ARIANE </span></p>
              <p className="rules__body-text"></p>
              <p className="rules__body-text">Également, merci de créer un compte sur <a target='_blank' className="rules__body-link" href="https://pastel.diplomatie.gouv.fr/fildariane/dyn/public/login.html">Ariane</a> et d'enregistrer votre voyage pour des raisons de sécurité.</p>
          

            </Rules>
            <div className='form__section'>
              <FileField
                disabled={isEfForm}
                setValue={setValue}
                multiple
                id="maps-field"
                formField="maps"
                fileName={mapsFileName}
                register={register}
                error={errors.mapFile}
                label="Carte.s du.des pays"
                required={errorMessages.map}
                link="https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination"
              />
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
            </div>
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
      {setAddressesErrors(errors) !== '' && <p className="form__section-field-error form__section-field-error--open">{setAddressesErrors(errors)}</p>}
      {setGlobalErrorMessage(errors) !== '' && <p className="form__section-field-error form__section-field-error--open">{setGlobalErrorMessage(errors)}</p>}
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
