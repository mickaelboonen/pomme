import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import SelectField from 'src/components/Fields/SelectField';
import DateField from 'src/components/Fields/DateField';
import TextField from 'src/components/Fields/TextField';
import SwitchButton from 'src/components/SwitchButton';

import { RxDoubleArrowDown, RxDoubleArrowUp} from "react-icons/rx";

const ClassDay = ({ register, stepNumber, errors, setError, isVacataire }) => {
  
  const stepTitle = isVacataire ? "Jour" : "Étape";
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
        <div><RxDoubleArrowDown /></div>
        
        <h4>Jour {stepNumber}</h4>
        <div><RxDoubleArrowDown /></div>
      </div>
      <div className='step__title step__title--up' onClick={toggleStep} id={"step-up-" + stepNumber}>
        <div><RxDoubleArrowUp /></div>
        <h4>Jour {stepNumber}</h4>
        <div><RxDoubleArrowUp /></div>
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
                formField={"departure" + stepNumber}
                required="Veuillez renseigner la date."
                error={errors["departure" + stepNumber]}
              />
            </div>
            <div className='step__container-fields-half'>
              <SelectField
                register={register}
                // blankValue
                data={['1' ,'2', '3', '4']}
                id="a"
                formField={"departurePlace" + stepNumber}
                label="Commune de résidence :"
                required="Veuillez renseigner la commune."
                error={errors["departurePlace" + stepNumber]}
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
              error={errors["departure" + stepNumber]}
            />
          </div>
          <div className='step__container-fields-half'>
            <DateField 
              register={register}
              id="arrival-date-field"
              label="Heure arrivée sur Nîmes"
              type="time"
              formField={"arrivalHour" + stepNumber}
              required="Veuillez renseigner l'heure d'arrivée sur le lieu de travail."
              error={errors["arrival" + stepNumber]}
            />
          </div>
        </div>
        <div className='step__container-fields'>
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

ClassDay.propTypes = {

};

export default ClassDay;
