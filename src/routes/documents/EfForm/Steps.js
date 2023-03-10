import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';

var object = require('lodash/fp/object');

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';

import Buttons from 'src/components/Fields/Buttons';
import TextField from 'src/components/Fields/TextField';
import ButtonElement from 'src/components/Fields/ButtonElement';
import SwitchButton from 'src/components/SwitchButton';
import ApiResponse from 'src/components/ApiResponse';
import Step from './Step';
import ClassDay from './ClassDay';

import { addSteps, handleSteps, deleteStep } from 'src/reducer/app';
import { api } from '../../../middlewares/api';

const Steps = ({ step }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');

  const { app: {agent : { unimesStatus }, apiMessage},
    ef: { currentEf }
  } = useSelector((state) => state);

  console.log(apiMessage);
  
  // const isVacataire = unimesStatus === "VACATAIRE";
  const isVacataire = currentEf.is_teaching;
  
  const { stages } = currentEf;

  const [stepsToDisplay, setStepsToDisplay] = useState([]);

  let defaultValues = {};
  
  if (stages.length > 0 ) {
    stages.forEach((stage) => {
      const keys = object.keys(stage);

      keys.forEach((key) => {

        if (key.includes('Hour')) {
          const date = new Date(stage[key]);
          
          const hours = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours();
          const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes();
          
          defaultValues[key + (stages.indexOf(stage) + 1)] = `${hours}:${minutes}`;
        }
        else if ((key ==='departure' || key === 'arrival') && stage[key]) {
          const date = new Date(stage[key]);
          
          const day = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate();
          const month = date.getMonth().toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
          const year = date.getFullYear();
          
          defaultValues[key + (stages.indexOf(stage) + 1)] = `${year}-${month}-${day}`;
        }
        else {
          defaultValues[key + (stages.indexOf(stage) + 1)] = stage[key];
        }
        
      })


    })
  }

  useEffect(() => {
    if (stages.length > 0 ) {
      const steps = stages.map((stage) => stages.indexOf(stage) + 1);
      setStepsToDisplay(steps);
    }
  }, [])
    
  const {
    register, handleSubmit, watch,
    setValue,  setError, trigger,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues});

  const onSubmit = (data) => {
    console.log("DATA DU SUBMIT : ",data);


    const entities = stepsToDisplay.map((stepIndex) => {
      const step = {};
      step.id = data['id' + stepIndex]
      step.amCourseBeginning = data['amCourseBeginning' + stepIndex];
      step.amCourseEnding = data['amCourseEnding' + stepIndex];
      step.pmCourseBeginning = data['pmCourseBeginning' + stepIndex];
      step.pmCourseEnding = data['pmCourseEnding' + stepIndex];
      step.departurePlace = data['departurePlace' + stepIndex];
      step.arrivalPlace = data['arrivalPlace' + stepIndex];
      step.departure = data['departure' + stepIndex];
      step.arrival = data['arrival' + stepIndex];
      step.departureHour = data['departureHour' + stepIndex];
      step.arrivalHour = data['arrivalHour' + stepIndex];
      step.workDepartureHour = data['workDepartureHour' + stepIndex];
      step.homeArrivalHour = data['homeArrivalHour' + stepIndex];
      
      return step;
    })
    
    console.log(entities);

    if (stages.length === 0) {
      dispatch(addSteps({data: entities, type: 'ef', docId: efId}))
    }
    else {
      
      dispatch(handleSteps({data: entities, type: 'ef', docId: efId}))
    }
    
  };

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

  const deleteOneStep = (id) => {
    dispatch(deleteStep(id))
  }

  const toggleAllSteps = (event) => {

    const button = event.target;
    const allStepsElements = document.querySelectorAll('.step');

    if (button.textContent.includes('Agrandir')) {
      
      button.textContent = "Réduire toutes les étapes"
      Array.from(allStepsElements).forEach((step) => {
        step.classList.add('step--open');
        step.querySelector('.step__container').classList.add('step__container--open')
      })
    }
    else {
      button.textContent = "Agrandir toutes les étapes"
      Array.from(allStepsElements).forEach((step) => {
        step.classList.remove('step--open');
        step.querySelector('.step__container').classList.remove('step__container--open')

      })
    }
  }  
  
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
        {stepsToDisplay.length > 0 && (
          <div className='form__section-field-buttons'>
            <ButtonElement
              register={register}
              type="button"
              id="toggle-steps-button"
              label="Agrandir toutes les étapes"
              handler={toggleAllSteps}
            />
          </div>
        )}
        {!isVacataire && (
          <div className='form__section-field-steps'>

            {stepsToDisplay.map((currentStep) => (
              <Step
                step={stages[currentStep - 1]}
                register={register}
                stepNumber={currentStep}
                key={currentStep}
                errors={errors}
                deleteStep={deleteOneStep}
              />
            ))}
          </div>
        )}
        {isVacataire && (
          <div className='steps'>
            {stepsToDisplay.map((currentStep) => (
              <ClassDay
                step={stages[currentStep - 1]}
                register={register}
                stepNumber={currentStep}
                key={currentStep}
                errors={errors}
                deleteStep={deleteOneStep}
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
      {apiMessage && <ApiResponse response={apiMessage} updateForm={true} />}

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
