import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';


import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';

import Buttons from 'src/components/Fields/Buttons';
import TextField from 'src/components/Fields/TextField';
import ButtonElement from 'src/components/Fields/ButtonElement';
import Step from './Step';
import ClassDay from './ClassDay';

import { addSteps } from 'src/reducer/app';

const Steps = ({ step }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');

  const { app: {agent : { unimesStatus }},
    ef: { currentEf }
  } = useSelector((state) => state);

  console.log(currentEf.is_teaching);
  // const isVacataire = unimesStatus === "VACATAIRE";
  const isVacataire = currentEf.is_teaching;
    
  const {
    register, handleSubmit, watch,
    setValue,  setError, trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log("stepsToDisplay : ", stepsToDisplay);

    const entities = stepsToDisplay.map((stepIndex) => {
      const step = {};
      step.city= data['city' + stepIndex];
      step.arrivalDate = data['arrivalDate' + stepIndex];
      step.departureDate = data['departureDate' + stepIndex];
      step.amBeginning = data['amBeginning' + stepIndex];
      step.pmBeginning = data['pmBeginning' + stepIndex];
      step.amEnd = data['amEnd' + stepIndex];
      step.pmEnd = data['pmEnd' + stepIndex];
      
      return step;
    })

    console.log(entities);
    dispatch(addSteps({data: entities, type: 'ef', docId: efId}))
  };
  
  const [stepsToDisplay, setStepsToDisplay] = useState([]);

  const createSteps = () => {
    const days = watch('numberDays');
    if (days === '') {
      setError('numberDays', {type: 'custom', message: "Veuillez remplir le nombre de jour de vacations de votre mission."})
    }
    else {
      const stepsArray = [];
      for (let iteration = 1; iteration <= days; iteration++) {
        stepsArray.push(iteration);
      }
      setStepsToDisplay(stepsArray);
    }
  }

  // Recap ERRORS
  const arr = Object.entries(errors);
  const errorArray = []
  arr.forEach((error) => {
    const field = error[0];
    // Assuming there are more the 9 days
    let dayNumber = Number(field.slice(field.length - 2));

    if (isNaN(dayNumber)) {
      // We get here if there are max 9 days
      dayNumber = Number(field.slice(field.length - 1))
    }

    if (stepsToDisplay.indexOf(dayNumber) > -1 && errorArray.indexOf(dayNumber) === -1) {
      errorArray.push(dayNumber)
    }
  })
  
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Étapes</FormSectionTitle>
        <TextField
          register={register}
          id="days"
          formField="numberDays"
          isNumber
          label={`Combien ${isVacataire ? "de jours de vacations" : "d'étapes"} souhaitez-vous enregistrer ?`}
          error={errors.numberDays}
          required="Veuillez remplir le nombre de jour de vacations de votre mission."
        />
        <div className='form__section-field-buttons'>
          <ButtonElement
            handler={createSteps}
            label={`Créer les ${isVacataire ? "journées" : "étapes"}`}
            type='button'
          />
        </div>
        {isVacataire && (
          <div className='steps'>
            {stepsToDisplay.map((currentStep) => (
              <Step
                step={currentStep}
                register={register}
                setError={setError}
                stepNumber={currentStep}
                key={currentStep}
                errors={errors}
                isVacataire={isVacataire}
              />
            ))}
          </div>
        )}
        {!isVacataire && (
          <div className='steps'>
            {stepsToDisplay.map((currentStep) => (
              <ClassDay
                step={currentStep}
                register={register}
                setError={setError}
                stepNumber={currentStep}
                key={currentStep}
                errors={errors}
              />
            ))}
          </div>
        )}

      </div>
      <div className="form__section">
        {errorArray.length > 0 && (
          <div className="form__section-field-error form__section-field-error--open">
            <p style={{marginBottom: '0.5rem'}}>Erreurs détectées dans les {unimesStatus === 'VACATAIRE' ? 'journées' : 'étapes'} suivantes :</p>
            <p>{errorArray.map((day) => <span key={day}>{unimesStatus === 'VACATAIRE' ? 'Jour' : 'Étape'} {day} </span>) }</p>
            
          </div>
        )}
      </div>
      <Buttons
        step={step}
        id={efId}
        url={loader}
        watch={watch}
        trigger={trigger}
      />
    </form>
    
  );
};

Steps.propTypes = {

};

export default Steps;
