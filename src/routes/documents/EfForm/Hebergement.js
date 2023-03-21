import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';

import './style.scss';
import Buttons from 'src/components/Fields/Buttons';
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ApiResponse from 'src/components/ApiResponse';

// Selectors & actions
import { getMaxMealsAndNights } from 'src/selectors/formValidationsFunctions';
import { equalizeFields } from 'src/selectors/domManipulators';
import { efHelp } from 'src/data/efHelp';
import { toggleHelp, updateEfAccomodations } from 'src/reducer/ef';
import { uploadFile } from 'src/reducer/omForm';

// Selectors
import { declareCamelCaseKeys } from '../../../selectors/keyObjectService';
import { getSavedFileName } from '../../../selectors/formDataGetters';

const Hebergement = ({ step }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');
  
  const { ef: { currentEf: { accomodations }},
    omForm: { currentOM },
    app: { apiMessage }
  } = useSelector((state) => state);
  
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
    console.log(data);
    let errorsCount = 0;

    if (Number(data.hotel) > 0 && data.hotelFiles.length === 0) {
      setError('hotelFiles', {type: 'custom', message:'Veuillez fournir la ou les factures nominatives acquittées.'});
      errorsCount++;
    } 

    if (Number(data.event) > 0 && data.eventFiles.length === 0) {
      setError('eventFiles', {type: 'custom', message:'Veuillez fournir la facture nominative acquittée.'});
      errorsCount++;
    } 

    const totalMealsAgent = getTotalMealsAgent(data);
    const maxMealsNumber = getMaxMealsAndNights(mission); 
    const mealsErrorElement = document.getElementById('meals-error');

    if (totalMealsAgent > maxMealsNumber) {
      mealsErrorElement.classList.add('form__section-field-error--open');
      mealsErrorElement.textContent = `Il y a ${ totalMealsAgent - maxMealsNumber} repas en trop.`
      errorsCount++;
    }
    else {
      mealsErrorElement.classList.remove('form__section-field-error--open');
      mealsErrorElement.textContent = ""
    }

    if (errorsCount !== 0) {
      return;
    }

    if (data.hotelFiles.length > 0 || data.eventFiles.length > 0) {
      dispatch(uploadFile({data: data, step: 'accomodations', docType: 'ef'}));
    }
    else {
      dispatch(updateEfAccomodations(data))
    }
  };

  const getTotalMealsAgent = (data) => {
    const fields = ['mealsInAdminRestaurants', 'mealsPaidByAgentInFrance', 'mealsPaidByAgentOverseas', 'freeMeals'];
    let total = 0;
    fields.forEach((field) => {
      
      if (data[field]) {
        total += Number(data[field]);
      }


    })
    return total;
  }

  // console.log(currentOM.mission);
  const maxMealsNumber = getMaxMealsAndNights(currentOM.mission);

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
      <FormSectionTitle>Hébergement</FormSectionTitle>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <TextField
            isNumber
            min='0'
            id="hotel-field"
            formField="hotel"
            register={register}
            label="Hébergement à titre onéreux (France et étranger)"
            placeholder="Montant"
            error={errors.hotel}
          />
        </div>
        <div className='form__section-half'>
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
        </div>
      </div>
      <FormSectionTitle>Repas</FormSectionTitle>
      <div className="form__section-field" id="meals">
        <div className='form__section-container' id="meals-rules">
          <h4 className="form__section-container-title">Règle de déclaration des repas</h4>
          <p className="form__section-container-text"><span className='form__section-container-text__span'>NON VACATAIRE :</span>Pour pouvoir bénéficier d’un remboursement de ses frais de repas et d’hébergement, le voyageur doit être en déplacement sur les créneaux complets suivants :</p>
          <ul className="form__section-container-list">
            <li>Pour le midi : entre 12h00 et 14h00</li>
            <li>Pour le soir : entre 19h00 et 21h00</li>
          </ul>
          { !isNaN(maxMealsNumber) && <p className="form__section-container-text">D'après les dates fournies à l'étape <span>MISSION</span>, vous pouvez demander jusqu'à : <span>{maxMealsNumber}</span> repas.</p>}
          <div />
          <p className="form__section-container-text"><span className='form__section-container-text__span'>VACATAIRE :</span>Les frais de repas ne pourront être pris en compte que pour les intervenants dispensant des cours le matin et l’après-midi d’une même journée. La prise en charge est alors faite au tarif « passager » en vigueur du CROUS.</p>
          <p className="form__section-container-text form__section-container-text--infos"><span className='form__section-container-text__span'>NOTA BENE :</span> Merci de ne pas déclarer les repas gratuits ou non pris par l'agent.</p>

          {currentOM.mission.region !== "métropole" && (
          <p className='form__section-container-text'><span>MISSION A L'ÉTRANGER : </span>Forfait de Remboursement choisi : <span>{currentOM.mission.abroad_costs.replace('-', ' ')}</span>.</p>
        )}
        </div>
        <TextField
          id="admin-restaurant-field"
          formField="mealsInAdminRestaurants"
          register={register}
          isNumber
          min="0"
          label="Repas pris dans un restaurant administratif ou assimilé"
          placeholder={"Nombre de repas à renseigner. D'après votre OM, vous avez pré-renseigné " + currentOM.accomodations.mealsInAdminRestaurants + " repas."}
          hasHelp
          helpFunction={showHelp}
        />
        
        {currentOM.mission.region === "métropole" && (
          <TextField
            id="paid-by-agent-in-France-field"
            formField="mealsPaidByAgentInFrance"
            register={register}
            isNumber
            min="0"
            placeholder={`Nombre de repas à renseigner. D'après votre OM, vous avez pré-renseigné ${data.mealsPaidByAgent} repas.`}
            label='Repas à titre onéreux en France'
            hasHelp
            helpFunction={showHelp}
          />
        )}
        
        {currentOM.mission.region === "métropole" && (
          <TextField
            id="free-field"
            formField="freeMeals"
            register={register}
            isNumber
            min="0"
            label="Repas à titre gratuit"
            placeholder={`Nombre de repas à renseigner. D'après votre OM, vous avez pré-renseigné ${maxMealsNumber - data.mealsInAdminRestaurants - data.mealsPaidByAgent} repas gratuits.`}
          />
        )}
        {currentOM.mission.region !== "métropole" && (
          <TextField
            id='paid-by-agent-overseas-field'
            formField="mealsPaidByAgentOverseas"
            register={register}
            isNumber
            min="0"
            placeholder={`Nombre de repas à renseigner. D'après votre OM, vous avez ${currentOM.accomodations.mealsPaidByAgent} repas.`}
            label="Repas à titre onéreux à l'étranger"
            hasHelp
            helpFunction={showHelp}
          />
        )}
        {/* {!isNaN(maxMealsNumber) && <p className="form__section-field-label form__section-field-label--infos">Vous avez le droit à un total de : <span>{maxMealsNumber}</span> repas.</p>} */}

        {/* {currentOM.mission.region !== "métropole" && (
          <p className='form__section-field-label form__section-field-label--infos'>Forfait de Remboursement choisi : <span>{currentOM.mission.abroad_costs.replace('-', ' ')}</span>.</p>
        )} */}
        <p id="meals-error" className="form__section-field-error" />
      </div>        
        <FormSectionTitle>Frais d'inscription</FormSectionTitle>
      <div className='form__section form__section--documents'>

          <div className='form__section-half'>
            <TextField
              isNumber
              min='0'
              register={register}
              formField="event"
              id="event-field"
              label="Frais d'inscription à un colloque, une réunion, un séminaire scientifique (*)"
              error={errors.event}
              placeholder="Montant"
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
        <HiddenField id="docId" register={register} value={efId} />
        {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />}
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

Hebergement.propTypes = {

};

export default Hebergement;
