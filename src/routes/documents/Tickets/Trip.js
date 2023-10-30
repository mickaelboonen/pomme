import React from 'react';
import PropTypes from 'prop-types';

import { FaTrash } from 'react-icons/fa';

import '../style.scss';
import SelectField from 'src/components/Fields/SelectField';
import DateField from 'src/components/Fields/DateField';
import TextField from 'src/components/Fields/TextField';
import HiddenField from 'src/components/Fields/HiddenField';
import SwitchButton from 'src/components/SwitchButton';

import { RxDoubleArrowDown, RxDoubleArrowUp} from "react-icons/rx";

const Step = ({ register, stepNumber, errors, step, deleteStep, isAr }) => {

  const toggleStep = (event) => {

    const isStepOpen = event.currentTarget.classList.value.includes('up');

    // Handles all the step components
    const allSteps = document.querySelectorAll('.step');
    const parentElement = event.currentTarget.closest('.step');
    const allStepContainers = document.querySelectorAll('.step__container');
    const stepElement = event.currentTarget.closest('.step').querySelector('.step__container');

    allSteps.forEach((step) => step.classList.remove('step--open'));
    allStepContainers.forEach((step) => step.classList.remove('step__container--open'));

    if (isStepOpen) {
      parentElement.classList.remove('step--open');
      stepElement.classList.remove('step__container--open')
    }
    else {
      parentElement.classList.toggle('step--open');
      stepElement.classList.add('step__container--open')
    }   
  }

  const validateStep = (event) => {
    
    const parentElement = event.currentTarget.closest('.step');
    if (event.target.checked) {
      parentElement.classList.add('step--validated');

    }
    else {
      parentElement.classList.remove('step--validated');

    }
  }
  
  const handleDeleteStep = () => {
    if (window.confirm(`Confirmez-vous la suppression de l'étape ${stepNumber} ?`)) {
      deleteStep(step.id);
    }
  }
  return (
      <div className='' style={{padding: '1rem', border: '1px solid red'}}>
        <HiddenField id={"step-id"} register={register} value={0} />
        {/* <p className='step__container-date-place-title'>Date et Lieu</p> */}
        <div className='step__container-fields'>
          <div className='step__container-fields-half'>
            <TextField
              register={register}
              id="a"
              formField={"departurePlace" + stepNumber}
              label="Aéroport de départ :"
              required="Veuillez renseigner la commune."
              error={errors["departurePlace" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <TextField
              register={register}
              id="a"
              formField={"departurePlace" + stepNumber}
              label="Aéroport d'arrivée :"
              required="Veuillez renseigner la commune."
              error={errors["departurePlace" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="departure-date-field"
              label="Date de départ"
              type="date"
              formField={"departure" + stepNumber}
              required="Veuillez renseigner la date."
              error={errors["departure" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="arrival-date-field"
              label="Heure de départ"
              type="time"
              formField={"arrival" + stepNumber}
              // required="Veuillez renseigner la date."
              error={errors["arrival" + stepNumber]}
            />
          </div>
        </div>
        {isAr && ( 
          <div className='step__container-fields'>
            <div className='step__container-fields-half'>
              <TextField
                register={register}
                id="a"
                formField={"departurePlace" + stepNumber}
                label="Aéroport de départ :"
                required="Veuillez renseigner la commune."
                error={errors["departurePlace" + stepNumber]}
              />
            </div>
            <div className='step__container-fields-half'>
              <TextField
                register={register}
                id="a"
                formField={"departurePlace" + stepNumber}
                label="Aéroport d'arrivée :"
                required="Veuillez renseigner la commune."
                error={errors["departurePlace" + stepNumber]}
              />
            </div>
            <div className='step__container-fields-half'>
              <DateField 
                register={register}
                id="departure-date-field"
                label="Date de départ"
                type="date"
                formField={"departure" + stepNumber}
                required="Veuillez renseigner la date."
                error={errors["departure" + stepNumber]}
              />
            </div>
            <div className='step__container-fields-half'>
              <DateField 
                register={register}
                id="arrival-date-field"
                label="Heure de départ"
                type="time"
                formField={"arrival" + stepNumber}
                // required="Veuillez renseigner la date."
                error={errors["arrival" + stepNumber]}
              />
            </div>
          </div>
        
        )}
        <div className='step__container-fields step__container-fields--delete'>
          <FaTrash onClick={handleDeleteStep} />
          <p onClick={handleDeleteStep}>Supprimer cette étape</p>
        </div>
      </div>
  );
}

Step.propTypes = {

};

export default Step;
