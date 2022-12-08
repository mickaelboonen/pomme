import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import RadioInput from 'src/components/Fields/RadioInput';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';
import { useSelector, useDispatch } from 'react-redux';

const Hebergement = ({ step }) => {
    console.log('rendu');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("------------------------------------------------------", data, "------------------------------------------------------");
    // console.log(maxMealsNumber);
    const mealsErrorElement = document.getElementById('meals-error');
    const totalMeals = Number(data.adminMealsNumber) + Number(data.outsideMealsNumber);
    
    if (totalMeals > data.maxMealsNumber) {
      mealsErrorElement.textContent = "Vous avez saisi plus de repas qu'autorisé. Vous avez le droit à : " + data.maxMealsNumber+ ' repas dans le cadre de votre mission.';
      mealsErrorElement.classList.add('form__section-field-error--open')
    }
    else {
      
      mealsErrorElement.textContent = "";
      mealsErrorElement.classList.remove('form__section-field-error--open')
      delete data.maxMealsNumber;
      localStorage.setItem('hebergement', JSON.stringify(data))
      
    }
    // TODO : Process Data
    

    
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  const mission = JSON.parse(localStorage.getItem('mission'));

  const handleMealsDependingOnHour = (hour, mealNumber) => {

    if (hour > 21) {

    }
    else if (hour > 14) {
      mealNumber += 1;
    }
    else {
      mealNumber += 2;

    }
    return mealNumber;
  };

  const getMaxMeals = (mission) => {
    let maxMealNumber = 0;
    const depart = new Date(mission.departure);
    const back = new Date(mission.return);
    
    const firstDay = depart.getDate();
    const lastDay = back.getDate();
    const timeToDepart = depart.getHours();
    const timeToLeave = back.getHours();
    const fullDays = lastDay - firstDay - 1;
    maxMealNumber += (fullDays * 2);

    maxMealNumber = handleMealsDependingOnHour(timeToDepart, maxMealNumber);
    maxMealNumber = handleMealsDependingOnHour(timeToLeave, maxMealNumber);

    return maxMealNumber;
  }

  const getMaxNights = (mission) => {
    const depart = new Date(mission.departure);
    const back = new Date(mission.return);
    
    const firstDay = depart.getDate();
    const lastDay = back.getDate();
    return lastDay - firstDay;
  }

  const maxMealNumber = getMaxMeals(mission);
  const maxNightsNumber = getMaxNights(mission);



  const hotel = watch("hotel");

  useEffect(() => {
    if (hotel) {
      register("hotelPayment", {
        required: "Merci de renseigner le champ."
      });
      register("nightsNumber", {
        required: "Merci de renseigner le nombre de nuits d'hôtel."
      });

    }
  })

const handleHotelSwitch = (event) => {
  const { checked } = event.target;
    const section = event.target.closest('.form__section-field');
    const nightNumberField = section.nextSibling;
    const nightPaymentField = nightNumberField.nextSibling;

  if (checked) {
    nightNumberField.classList.remove('form__section-field--hidden');
    nightPaymentField.classList.remove('form__section-field--hidden');
  }
  else {
    nightNumberField.classList.add('form__section-field--hidden');
    nightPaymentField.classList.add('form__section-field--hidden');
  }

};
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Hébergement</FormSectionTitle>
        <div className="form__section-field">
          <SwitchButton
            register={register}
            handler={handleHotelSwitch}
            isInForm
            formField="hotel"
            label="Hotel :"
          />
        </div>
        <TextField
          id="nights-number-field"
          formField="nightsNumber"
          register={register}
          min="0"
          max={maxNightsNumber}
          isNumber
          isHidden
          error={errors.nightsNumber}
          label="Nombre de nuits"
          placeholder="Vous ne pouvez saisir plus de nuits que le nombre calculé selon vos dates de missions."
        />
        <div className="form__section-field form__section-field--hidden">
          <p className="form__section-field-label">Réglement</p>
          <RadioInput id="unimes" formField="hotelPayment" label="Payé par Unîmes" register={register} />
          <RadioInput id="agent" formField="hotelPayment" label="Avancé par l'agent" register={register} />
          {errors.hotelPayment && <p className='form__section-field-error form__section-field-error--open'>{errors.hotelPayment.message}</p>}
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Repas</FormSectionTitle>
        <TextField
          id="outside-meals-number-field"
          formField="outsideMealsNumber"
          register={register}
          isNumber
          min="0"
          max={maxMealNumber}
          label="Nombre de repas payés par l'agent"
          required="Merci de renseigner le nombre de repas prévus à la charge de l'agent"
          placeholder="Vous ne pouvez saisir plus de repas que le nombre calculé selon vos dates de missions."
          error={errors.outsideMealsNumber}
        />
        <TextField
          id="admin-meals-number-field"
          formField="adminMealsNumber"
          register={register}
          isNumber
          min="0"
          max={maxMealNumber}
          label="Nombre de repas en restaurant administratif"
          required="Merci de renseigner le nombre de repas en restaurant administratif"
          placeholder="Vous ne pouvez saisir plus de repas que le nombre calculé selon vos dates de missions."
          error={errors.adminMealsNumber}
        />
        <input id="max-meals-field" name="max-meals-field" type="hidden" value={maxMealNumber} {...register('maxMealsNumber')} />
      </div>
      <p id="meals-error" className="form__section-field-error" />
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Hebergement.propTypes = {

};

export default Hebergement;
