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

const Steps = ({ step }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');

  // const {    omForm: {omForm}
  // } = useSelector((state) => state);
    

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
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section ">
        <FormSectionTitle>Étapes</FormSectionTitle>
        <TextField
          register={register}
          id="days"
          formField="numberDays"
          isNumber
          label="Combien de jours de vacations souhaites-vous enregistrer ?"
          error={errors.numberDays}
          required="Veuillez remplir le nombre de jour de vacations de votre mission."
        />
        <div className='form__section-field-buttons'>
          <ButtonElement
            handler={createSteps}
            label="Créer les étapes"
            type='button'
          />
        </div>

        <div className='steps'>
          {stepsToDisplay.map((currentStep) => (
            <Step
              step={currentStep}
              register={register}
              stepNumber={currentStep}
              key={currentStep}
              errors={errors}
            />
          ))}
        </div>
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
