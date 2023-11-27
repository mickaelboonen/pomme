import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../../EfForm/style.scss';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import StatusChecker from 'src/components/StatusChecker';
import NumberField from 'src/components/Fields/NumberField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors & actions
import { efHelp } from 'src/data/efHelp';
import { uploadFile } from 'src/reducer/omForm';
import { toggleHelp, updateEfAccomodations } from 'src/reducer/ef';

// Selectors
import { equalizeFields } from 'src/selectors/domManipulators';
import { getSavedFileName } from 'src/selectors/formDataGetters';
import { declareCamelCaseKeys } from 'src/selectors/keyObjectService';
import { getMaxMealsAndNights } from 'src/selectors/formValidationsFunctions';
import Rules from '../../../../components/Rules';

const Accomodations = ({ step }) => {
  const dispatch = useDispatch();
  
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');
  
  const { ef: { currentEf: { accomodations }}  } = useSelector((state) => state);
  
  let defaultValues = null;
  if (accomodations !== undefined) {
    defaultValues = declareCamelCaseKeys(accomodations);
  }

  // FILENAMES ----------------------------------------------------
  let hotelFileNames= '';
  
  if (defaultValues.hotelFiles.length === 1) {
    hotelFileNames = getSavedFileName(defaultValues.hotelFiles[0]);
  }
  else if (defaultValues.hotelFiles.length > 1) {
    defaultValues.hotelFiles.forEach((file) => {
      hotelFileNames += getSavedFileName(file) + ' - ';
    })
  }

  let eventFilesNames= '';
  
  if (defaultValues.eventFiles.length === 1) {
    eventFilesNames = getSavedFileName(defaultValues.eventFiles[0]);
  }
  else if (defaultValues.eventFiles.length > 1) {
    defaultValues.eventFiles.forEach((file) => {
      eventFilesNames += getSavedFileName(file) + ' - ';
    })
  }

  // ---------------------------------------------------------------
  
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    setError,
    formState:
    { errors },
  } = useForm({ defaultValues: defaultValues });

  const onSubmit = (data) => {
    let errorsCount = 0;

    if (Number(data.hotel) > 0 && data.hotelFiles.length === 0) {
      setError('hotelFiles', {type: 'custom', message:'Veuillez fournir la ou les factures nominatives acquittées.'});
      errorsCount++;
    } 

    // if (Number(data.event) > 0 && data.eventFiles.length === 0) {
      // setError('eventFiles', {type: 'custom', message:'Veuillez fournir la facture nominative acquittée.'});
      // errorsCount++;
    // } 

    data.status = 1;
    data.mealsInAdminRestaurants === '' ? data.mealsInAdminRestaurants = null : data.mealsInAdminRestaurants;
    data.freeMealsInFrance === '' ? data.freeMealsInFrance = null : data.freeMealsInFrance;
    data.overseasFreeMeals === '' ? data.overseasFreeMeals = null : data.overseasFreeMeals;
    data.mealsPaidByAgentInFrance === '' ? data.mealsPaidByAgentInFrance = null : data.mealsPaidByAgentInFrance;
    // (data.event === '' || !data.event) ? data.event = 0 : data.event;
    
    if (data.hotelFiles.find((file) => file instanceof File) || data.eventFiles.find((file) => file instanceof File)) {
      dispatch(uploadFile({data: data, step: 'accomodations', docType: 'ef'}));
    }
    else {
      dispatch(updateEfAccomodations(data))
    }
  };


  useEffect(() => {
    trigger();
    equalizeFields();
  }, []);

  const showHelp = (event) => {

    const { id } = event.target;
    const currentHelp = efHelp.find((e) => e.id === id);
    dispatch(toggleHelp(currentHelp));

  };
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StatusChecker status={defaultValues.status} />
      <FormSectionTitle>Hébergement</FormSectionTitle>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <NumberField 
            isAmount
            id="hotel-field"
            formField="hotel"
            register={register}
            label="Hébergement à titre onéreux (France et étranger)"
            placeholder="Montant"
            error={errors.hotel}
          />
        </div>
        <div className='form__section-half'>
          <NumberField 
            isAmount
            id="nights-number-field"
            formField="nightsNumber"
            register={register}
            label="Nombre de nuits à rembourser"
            placeholder="Ne pas déclarer les nuits gratuites"
            error={errors.nightsNumber}
          />
        </div>
      </div>
      <FileField
        register={register}
        setValue={setValue}
        formField="hotelFiles"
        id="hotel-files-field"
        multiple
        label="Facture.s nominative.s acquittée.s"
        error={errors.hotelFiles}
        fileName={hotelFileNames}
      />
      <FormSectionTitle>Repas</FormSectionTitle>
      <Rules
        id="meals-rules"
        title="Règle de déclaration des repas vacataires"
      >
        <div />
        <p className="form__section-container-text">Les frais de repas ne pourront être pris en compte que pour les intervenants dispensant des cours le matin et l’après-midi d’une même journée. La prise en charge est alors faite au tarif « passager » en vigueur du CROUS.</p>
      </Rules>
      <div className="form__section-field" id="meals">
        <NumberField 
          id="paid-by-agent-in-France-field"
          formField="mealsPaidByAgentInFrance"
          register={register}
          placeholder="Nombre de repas à renseigner."
          label='Repas à titre onéreux en France'
          hasHelp
          helpFunction={showHelp}
        />
        <NumberField
          id="admin-restaurant-field"
          formField="mealsInAdminRestaurants"
          register={register}
          label="Repas pris dans un restaurant administratif ou assimilé"
          placeholder="Nombre de repas à renseigner."
          hasHelp
          helpFunction={showHelp}
        />
        <NumberField
          id="free-field"
          formField="freeMealsInFrance"
          register={register}
          label="Repas à titre gratuit en France"
          placeholder="Nombre de repas à renseigner."
        />
        <p id="meals-error" className="form__section-field-error" />
      </div>        
        {/* <FormSectionTitle>Frais d'inscription</FormSectionTitle>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <NumberField
            register={register}
            formField="event"
            id="event-field"
            label="Frais d'inscription à un colloque, une réunion, un séminaire scientifique (*)"
            error={errors.event}
            placeholder="Montant"
            isAmount
          />
        </div>  
        <div className='form__section-half'>
          <FileField
            setValue={setValue}
            register={register}
            formField="eventFiles"
            id="event-files"
            multiple
            label="Facture nominative acquittée et programme"
            fileName={eventFilesNames}
          />
        </div>
      </div>
      <p className="form__section-field-label" style={{marginTop: '-1.5rem', marginLeft: '1rem', fontStyle: 'italic'}}>(*) Compte rendu à adresser obligatoirement au service de la recherche</p>
      {errors.eventFiles && <p className="form__section-field-error form__section-field-error--open">{errors.eventFiles.message}</p>}
             */}

      <HiddenField id="docId" register={register} value={efId} />
      <Buttons
        step={step}
        id={efId}
        url={loader}
        watch={watch}
        type="ef"
        update={updateEfAccomodations}
      />
    </form>
    
  );
};

Accomodations.propTypes = {

};

export default Accomodations;
