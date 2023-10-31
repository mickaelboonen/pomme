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
  
  const handleDeleteStep = () => {
    if (window.confirm(`Confirmez-vous la suppression de l'étape ${stepNumber} ?`)) {
      deleteStep(step.id);
    }
  }
  return (
      <div className='trip'>
        <HiddenField id={"step-id"} register={register} value={0} />
        {/* <p className='step__container-date-place-title'>Date et Lieu</p> */}
        <div className='trip__fields'>
          <div className='trip__fields-column'>
              <TextField
                register={register}
                id="a"
                formField={"departurePlace" + stepNumber}
                label="Aéroport de départ :"
                required="Veuillez renseigner la commune."
                error={errors["departurePlace" + stepNumber]}
              />
              <DateField 
                register={register}
                id="departure-date-field"
                label="Date de départ"
                type="date"
                formField={"departure" + stepNumber}
                required="Veuillez renseigner la date."
                error={errors["departure" + stepNumber]}
              />
              {isAr && (
                <DateField 
                  register={register}
                  id="departure-date-field"
                  label="Date de départ"
                  type="date"
                  formField={"departure" + stepNumber}
                  required="Veuillez renseigner la date."
                  error={errors["departure" + stepNumber]}
                />
              )}
          </div>
          <div className='trip__fields-column'>
              <TextField
                register={register}
                id="a"
                formField={"departurePlace" + stepNumber}
                label="Aéroport d'arrivée :"
                required="Veuillez renseigner la commune."
                error={errors["departurePlace" + stepNumber]}
              />

              <DateField 
                register={register}
                id="arrival-date-field"
                label="Heure de départ"
                type="time"
                formField={"arrival" + stepNumber}
                // required="Veuillez renseigner la date."
                error={errors["arrival" + stepNumber]}
              />
              {isAr && (
                <DateField 
                  register={register}
                  id="departure-date-field"
                  label="Date de départ"
                  type="date"
                  formField={"departure" + stepNumber}
                  required="Veuillez renseigner la date."
                  error={errors["departure" + stepNumber]}
                />
              )}


          </div>
          <div className='trip__fields-column trip__fields-column--delete'>
              <button type="button">Delete</button>
          </div>
        </div>
        {!isAr && (
          <div className='step__container-fields step__container-fields--delete'>
            <FaTrash onClick={handleDeleteStep} />
            <p onClick={handleDeleteStep}>Supprimer cette étape</p>
          </div>
        )}
      </div>
  );
}

Step.propTypes = {

};

export default Step;
