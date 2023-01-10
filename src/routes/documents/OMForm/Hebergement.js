import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './style.scss';

// Components
import Buttons from 'src/components/Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import { turnAccomodationDataToDbFormat } from '../../../selectors/dataToDbFormat';


const Hebergement = ({ step }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const omId = searchParams.get('id');
  const {
    register,
    handleSubmit,
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
      
      const dataToBeSubmitted = turnAccomodationDataToDbFormat(data);
      dispatch(updateAccomodations(dataToBeSubmitted));

      
      const nextStep = step + 1;
      // navigate('/nouveau-document/ordre-de-mission?etape=' + nextStep + '&id=' + omId)

    }
    // TODO : Process Data
    

    
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  const { omForm } = useSelector((state) => state.omForm);

  const missionData = omForm[0].data;

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
    const comeback = new Date(mission.comeback);
    
    const firstDay = depart.getDate();
    const lastDay = comeback.getDate();
    
    const timeToDepart = depart.getHours();
    const timeToLeave = comeback.getHours();
    const fullDays = lastDay - firstDay - 1;
    maxMealNumber += (fullDays * 2);

    maxMealNumber = handleMealsDependingOnHour(timeToDepart, maxMealNumber);
    maxMealNumber = handleMealsDependingOnHour(timeToLeave, maxMealNumber);

    return maxMealNumber;
  }

  const getMaxNights = (mission) => {
    const depart = new Date(mission.departure);
    const comeback = new Date(mission.comeback);
    
    const firstDay = depart.getDate();
    const lastDay = comeback.getDate();
    return lastDay - firstDay;
  }

  const maxMealNumber = getMaxMeals(missionData);
  const maxNightsNumber = getMaxNights(missionData);

  const [isHotelSelected, setIsHotelSelected] = useState(false);

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
