import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import SelectField from 'src/components/Fields/SelectField';
import DateField from 'src/components/Fields/DateField';
import TextField from 'src/components/Fields/TextField';
import SwitchButton from 'src/components/SwitchButton';

import { RxDoubleArrowDown, RxDoubleArrowUp} from "react-icons/rx";

const Step = ({ register, stepNumber, errors }) => {
  
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
  return (
    <div className='step' id={"step-" + stepNumber}>
      <div className='step__title step__title--down' onClick={toggleStep} id={"step-down-" + stepNumber}>
        <RxDoubleArrowDown />
        <h4>Etape {stepNumber}</h4>
        <RxDoubleArrowDown />
      </div>
      <div className='step__title step__title--up' onClick={toggleStep} id={"step-up-" + stepNumber}>
        <RxDoubleArrowUp />
        <h4>Etape {stepNumber}</h4>
        <RxDoubleArrowUp />
      </div>
      <div className='step__container'>
        <p className='step__container-date-place-title'>Date et Lieu</p>
        <div className='step__container-fields'>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="departure-date-field"
              label="Date"
              type="date"
              formField={"date" + stepNumber}
              required="Veuillez renseigner la date."
              error={errors["date" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <SelectField
              register={register}
              // blankValue
              data={['1' ,'2', '3', '4']}
              id="a"
              formField={"city" + stepNumber}
              label="Commune de résidence :"
              required="Veuillez renseigner la commune."
              error={errors["city" + stepNumber]}
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
              formField={"homeDaparture" + stepNumber}
              required="Veuillez renseigner l'heure de départ du domicile."
              error={errors["homeDaparture" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="arrival-date-field"
              label="Heure arrivée sur Nîmes"
              type="time"
              formField={"workArrival" + stepNumber}
              required="Veuillez renseigner l'heure d'arrivée sur le lieu de travail."
              error={errors["workArrival" + stepNumber]}
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
              formField={"workDeparture" + stepNumber}
              required="Veuillez renseigner l'heure de départ du lieu de travail."
              error={errors["workDeparture" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="arrival-date-field"
              label="Heure arrivée sur Nîmes"
              type="time"
              formField={"homeArrival" + stepNumber}
              required="Veuillez renseigner l'heure d'arrivée au domicile."
              error={errors["homeArrival" + stepNumber]}
            />
          </div>
        </div>
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
                  <TextField
                    register={register}
                    id="a"
                    formField={'amBeginning' + stepNumber}
                    label=''
                    min='7'
                    max="12"
                    isNumber
                  />
                </td>
                <td>
                  <TextField
                    register={register}
                    id="a"
                    formField={'amEnd' + stepNumber}
                    label=''
                    min='8'
                    max="12"
                    isNumber
                  /></td>
              </tr>
              <tr>
                <td>Après-midi :</td>
                <td>
                  <TextField
                    register={register}
                    id="a"
                    formField={'pmBeginning' + stepNumber}
                    label=''
                    min='12'
                    max="20"
                    isNumber
                  /></td>
                <td>
                  <TextField
                    register={register}
                    id="a"
                    formField={'pmEnd' + stepNumber}
                    label=''
                    min='12'
                    max="20"
                    isNumber
                  /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <SwitchButton
            register={() => {}}
            isInForm
            label="Marquer cette étape comme faite ?"
            handler={validateStep}
          />
        </div>
      </div>

      
    </div>
  );
}

Step.propTypes = {

};

export default Step;
