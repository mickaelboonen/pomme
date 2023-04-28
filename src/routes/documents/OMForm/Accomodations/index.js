import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';

import '../style.scss';

// Components
import ApiResponse from 'src/components/ApiResponse';
import Buttons from 'src/components/Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import { turnAccomodationDataToDbFormat } from 'src/selectors/dataToDbFormat';
import { updateAccomodations } from 'src/reducer/omForm';
import { getMaxMealsAndNights } from 'src/selectors/formValidationsFunctions';


const Accomodations = ({ step }) => {
  
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');

  const areWeUpdatingData = loader.pathname.includes('modifier');
  
  const { app: { apiMessage },
    omForm: { omForm },
  } = useSelector((state) => state);

  const accomodationsData = omForm.find((omStep) => omStep.step === 'accomodations');

  const defaultValues = accomodationsData.data;
  
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    data.omId = omId;
    
    const mealsErrorElement = document.getElementById('meals-error');
    const nightsErrorElement = document.getElementById('nights-error');
    const totalMeals = Number(data.mealsInAdminRestaurants) + Number(data.mealsPaidByAgent);

    if (totalMeals > maxMealsNumber) {
      mealsErrorElement.textContent = "Vous avez saisi plus de repas qu'autorisé. Vous avez le droit à : " + maxMealsNumber+ ' repas dans le cadre de votre mission.';
      mealsErrorElement.classList.add('form__section-field-error--open')
    }
    else if (data.nightsNumber > maxNightsNumber) {
      nightsErrorElement.textContent = "Vous avez saisi plus de nuits qu'autorisé. Vous avez le droit à : " + maxNightsNumber+ ' nuits dans le cadre de votre mission.';
      nightsErrorElement.classList.add('form__section-field-error--open')

    }
    else {
      if (totalMeals < maxMealsNumber) {
        const mealConfirmation = `Les repas sont remplis à titre déclaratif. Tout repas non saisi sera considéré comme repas gratuit, et donc non soumis à un remboursement de la part de l'établissement. Vous avez actuellement : ${maxMealsNumber - totalMeals} repas gratuits. Confirmez-vous votre saisie ?`;
        if (!window.confirm(mealConfirmation)) {
          return;
        }
      }
      nightsErrorElement.textContent = "";
      mealsErrorElement.textContent = "";
      nightsErrorElement.classList.remove('form__section-field-error--open')
      mealsErrorElement.classList.remove('form__section-field-error--open')

      delete data.maxMealsNumber;
      
      data.status = 1;
      const dataToBeSubmitted = turnAccomodationDataToDbFormat(data);

      dispatch(updateAccomodations(dataToBeSubmitted));
    }    
  };

  const missionData = omForm[0].data;

  const maxMealsNumber = getMaxMealsAndNights(missionData);
  const maxNightsNumber = getMaxMealsAndNights(missionData, true);

  const [isHotelSelected, setIsHotelSelected] = useState(defaultValues.hotel);

  const handleHotelSwitch = (event) => {
    setIsHotelSelected(event.target.checked);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Hébergement</FormSectionTitle>
        <HiddenField id="omId" value={omId} register={register} />
        <div className="form__section-field">
          <SwitchButton
            register={register}
            handler={handleHotelSwitch}
            isInForm
            formField="hotel"
            label="Hotel :"
          />
        </div>
        {isHotelSelected && (
          <TextField
            id="nights-number-field"
            formField="nightsNumber"
            register={register}
            min="0"
            max={maxNightsNumber}
            isNumber
            required="Merci de renseigner le nombre de nuits d'hôtel."
            error={errors.nightsNumber}
            label="Nombre de nuits"
            placeholder="Vous ne pouvez saisir plus de nuits que le nombre calculé selon vos dates de missions."
          />
        )}
        {isHotelSelected && (
          <div className="form__section-field">
            <p className="form__section-field-label">Réglement</p>
            <RadioInput id="unimes" formField="hotelPayment" label="Payé par Unîmes" register={register} required="Merci de renseigner le champ." />
            <RadioInput id="agent" formField="hotelPayment" label="Avancé par l'agent" register={register} required="Merci de renseigner le champ." />
            {errors.hotelPayment && <p className='form__section-field-error form__section-field-error--open'>{errors.hotelPayment.message}</p>}
          </div>
        )}
        { (!isNaN(maxNightsNumber) && isHotelSelected) && <p className="form__section-field-label form__section-field-label--infos">Vous avez le droit à un total de : <span>{maxNightsNumber}</span> nuits à l'hôtel.</p>}
        {maxNightsNumber < 0 && <p id="nights-error" className="form__section-field-error form__section-field-error--open">Les dates saisies pour la mission sont incorrectes. Merci de les corriger pour pouvoir procéder à cette étape.</p>}
        <p id="nights-error" className="form__section-field-error"/>
      </div>
      <div className="form__section">
        <FormSectionTitle>Repas</FormSectionTitle>
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

        </div>
        <TextField
          id="outside-meals-number-field"
          formField="mealsPaidByAgent"
          register={register}
          isNumber
          min="0"
          max={maxMealsNumber}
          label="Nombre de repas payés par l'agent"
          required="Merci de renseigner le nombre de repas prévus à la charge de l'agent"
          // placeholder="Vous ne pouvez saisir plus de repas que le nombre calculé selon vos dates de missions."
          placeholder={"Limite maximale de repas à saisir : " + maxMealsNumber + "."}
          error={errors.mealsPaidByAgent}
        />
        <TextField
          id="admin-meals-number-field"
          formField="mealsInAdminRestaurants"
          register={register}
          isNumber
          min="0"
          max={maxMealsNumber}
          label="Nombre de repas payés par l'agent en restaurant administratif"
          required="Merci de renseigner le nombre de repas en restaurant administratif"
          // placeholder="Vous ne pouvez saisir plus de repas que le nombre calculé selon vos dates de missions."
          placeholder={"Limite maximale de repas à saisir : " + maxMealsNumber + "."}
          error={errors.mealsInAdminRestaurants
          }
        />
        {/* <input id="max-meals-field" name="max-meals-field" type="hidden" value={maxMealsNumber} {...register('maxMealsNumber')} /> */}
      </div>
      <p id="meals-error" className="form__section-field-error"/>
      {maxNightsNumber < 0 && <p id="nights-error" className="form__section-field-error form__section-field-error--open">Les dates saisies pour la mission sont incorrectes. Merci de les corriger pour pouvoir procéder à cette étape.</p>}
      {/* {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={areWeUpdatingData} />} */}
      <Buttons
        step={step}
        id={omId}
        url={loader}
        watch={watch}
        trigger={trigger}
        update={updateAccomodations}
      />
    </form>
    
  );
};

Accomodations.propTypes = {

};

export default Accomodations;
