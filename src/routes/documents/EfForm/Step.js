import React from 'react';
import PropTypes from 'prop-types';

import { FaTrash } from 'react-icons/fa';

import './style.scss';
import SelectField from 'src/components/Fields/SelectField';
import DateField from 'src/components/Fields/DateField';
import TextField from 'src/components/Fields/TextField';
import HiddenField from 'src/components/Fields/HiddenField';
import SwitchButton from 'src/components/SwitchButton';

import { RxDoubleArrowDown, RxDoubleArrowUp} from "react-icons/rx";

const Step = ({ register, stepNumber, errors, step, deleteStep }) => {

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
    <div className='step' id={"step-" + stepNumber}>
      <div className='step__title step__title--down' onClick={toggleStep} id={"step-down-" + stepNumber}>
        <div><RxDoubleArrowDown /></div>
        
        <h4>Étape {stepNumber}</h4>
        <div><RxDoubleArrowDown /></div>
      </div>
      <div className='step__title step__title--up' onClick={toggleStep} id={"step-up-" + stepNumber}>
        <div><RxDoubleArrowUp /></div>
        <h4>Étape {stepNumber}</h4>
        <div><RxDoubleArrowUp /></div>
      </div>
      <div className='step__container'>
        <HiddenField id={"step-id"} register={register} value={0} />
        <p className='step__container-date-place-title'>Date et Lieu</p>
        <div className='step__container-fields'>
          <DateField 
            register={register}
            id="departure-date-field"
            label="Date"
            type="date"
            formField={"departure" + stepNumber}
            required="Veuillez renseigner la date."
            error={errors["departure" + stepNumber]}
          />
        </div>
        <div className='step__container-fields'>
          <div className='step__container-fields-half'>
            <TextField
              register={register}
              id="a"
              formField={"departurePlace" + stepNumber}
              label="Commune de départ :"
              required="Veuillez renseigner la commune."
              error={errors["departurePlace" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <TextField
              register={register}
              id="a"
              formField={"arrivalPlace" + stepNumber}
              label="Commune d'arrivée :"
              required="Veuillez renseigner la commune."
              error={errors["arrivalPlace" + stepNumber]}
            />
          </div>
        </div>
        <div className='step__container-fields'>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="arrival-date-field"
              label="Heure départ du domicile"
              type="time"
              formField={"departureHour" + stepNumber}
              required="Veuillez renseigner l'heure de départ du domicile."
              error={errors["departureHour" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="arrival-date-field"
              label="Heure arrivée à l'étape"
              type="time"
              formField={"arrivalHour" + stepNumber}
              required="Veuillez renseigner l'heure d'arrivée à l'étape"
              error={errors["arrivalHour" + stepNumber]}
            />
          </div>
        </div>
        {/* <div className='step__container-fields'>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="arrival-date-field"
              label="Heure départ du lieu de travail"
              type="time"
              formField={"workDepartureHour" + stepNumber}
              required="Veuillez renseigner l'heure de départ du lieu de travail."
              error={errors["workDepartureHour" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="arrival-date-field"
              label="Heure arrivée au domicile"
              type="time"
              formField={"homeArrivalHour" + stepNumber}
              required="Veuillez renseigner l'heure d'arrivée au domicile."
              error={errors["homeArrivalHour" + stepNumber]}
            />
          </div>
        </div> */}
        {/* {isVacataire && (
          <div className='step__container-classes'>
            <p className='step__container-classes-title'>Cours</p>
            <table className='classes'>
              <thead>
                <tr>
                  <th></th>
                  <th>Début :</th>
                  <th>Fin :</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Matin :</td>
                  <td>
                    <DateField 
                      register={register}
                      id="am-beginning-hour"
                      type="time"
                      min="7:00"
                      max="12:00"
                      formField={'amCourseBeginning' + stepNumber}
                    />
                  </td>
                  <td>
                    <DateField 
                      register={register}
                      id="am-ending-hour"
                      type="time"
                      min="7:00"
                      max="12:00"
                      formField={'amCourseEnding' + stepNumber}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Après-midi :</td>
                  <td>
                    <DateField 
                      register={register}
                      id="pm-beginning-hour"
                      type="time"
                      min="12:00"
                      max="21:00"
                      formField={'pmCourseBeginning' + stepNumber}
                    />
                  </td>
                  <td>
                    <DateField 
                      register={register}
                      id="pm-ending-hour"
                      type="time"
                      min="12:00"
                      max="21:00"
                      formField={'pmCourseEnding' + stepNumber}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )} */}
        <div>
          <SwitchButton
            register={() => {}}
            isInForm
            label="Marquer cette étape comme faite ?"
            handler={validateStep}
          />
        </div>
        <div className='step__container-fields step__container-fields--delete'>
          <FaTrash onClick={handleDeleteStep} />
          <p onClick={handleDeleteStep}>Supprimer cette étape</p>
        </div>
      </div>

      
    </div>
  );
}

Step.propTypes = {

};

export default Step;
