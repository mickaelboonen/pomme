import React, { useEffect, useState } from 'react';

import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
import HiddenField from 'src/components/Fields/HiddenField';
import { RxDoubleArrowDown, RxDoubleArrowUp} from "react-icons/rx";
import { FaTrash } from 'react-icons/fa';


import './style.scss';
import classNames from 'classnames';

const Address = ({
  register,
  errors,
  disabled,
  errorMessages,
  suffixe,
  bisArray,
  streetType,
  stepNumber,
  deleteAddress,
}) => {  
 
  const toggleStep = (event) => {

    const isStepOpen = event.currentTarget.classList.value.includes('up');

    // Handles all the step components
    const allSteps = document.querySelectorAll('.step');
    const parentElement = event.currentTarget.closest('.step');
    const allStepContainers = document.querySelectorAll('.address');
    const stepElement = event.currentTarget.closest('.step').querySelector('.address');

    allSteps.forEach((step) => step.classList.remove('step--open'));
    allStepContainers.forEach((step) => step.classList.remove('address--open'));

    if (isStepOpen) {
      parentElement.classList.remove('step--open');
      stepElement.classList.remove('address--open')
    }
    else {
      parentElement.classList.toggle('step--open');
      stepElement.classList.add('address--open')
    }   
  }

  const handleClickOnDelete = () => {
    
    if (window.confirm(`Confirmez-vous la suppression de l'adresse n° ${stepNumber} ?`)) {
      deleteAddress(stepNumber)
    }
  }
  
  return (
    <div className={classNames('step', {'step--open': stepNumber === 1})} id={"step-" + stepNumber}>
      <div className='step__title step__title--down' onClick={toggleStep} id={"step-down-" + stepNumber}>
        <div><RxDoubleArrowDown /></div>
        
        <h4>Adresse n° {stepNumber}</h4>
        <div><RxDoubleArrowDown /></div>
      </div>
      <div className='step__title step__title--up' onClick={toggleStep} id={"step-up-" + stepNumber}>
        <div><RxDoubleArrowUp /></div>
        <h4>Adresse n° {stepNumber}</h4>
        <div><RxDoubleArrowUp /></div>
      </div>
      {/* <label className="form__section-field-label">{'Adresse ' + addressType}</label> */}
      <HiddenField
        register={register}
        id={"addressId" + stepNumber}
        value=""
      />
      <div className={classNames('address', {'address--open': stepNumber === 1})}>
        <div className="address__section">
          <TextField
            id="street-number-field"
            disabled={disabled}
            isNumber
            min="0"
            formField={"streetNumber" + stepNumber}
            label="N° de voie"
            register={register}
            error={errors['streetNumber' + stepNumber]}
          />
          <SelectField
            register={register}
            disabled={disabled}
            blankValue=""
            data={bisArray}
            id="bis-field"
            formField={"bis" + stepNumber}
            label="Bis, Ter ..."
            error={errors['bis' + stepNumber]}
          />
          <SelectField
            register={register}
            disabled={disabled}
            blankValue=""
            data={streetType}
            id="street-type-field"
            formField={"streetType" + stepNumber}
            label="Type de voie"
            required={errorMessages.streetType}
            error={errors['streetType' + stepNumber]}
          />
        </div>
        <div className="address__section">
          <TextField
            id="street-name-field"
            disabled={disabled}
            formField={"streetName" + stepNumber}
            label="Nom de la rue"
            register={register}
            error={errors['streetName' + stepNumber]}
            required={errorMessages.streetName}
          />
        </div>
        <div className="address__section">
          <TextField
            id="postcode-field"
            disabled={disabled}
            formField={"postCode" + stepNumber}
            label="Code postal"
            register={register}
            error={errors['postCode' + stepNumber]}
            required={errorMessages.postCode}
            isNumber
          />
          <TextField
            id="city-field"
            disabled={disabled}
            formField={"city" + stepNumber}
            label="Ville"
            register={register}
            required={errorMessages.city}
            error={errors['city' + stepNumber]}
          />
        </div>
        {stepNumber !== 1 && (
          <div className='address__section step__container-fields step__container-fields--delete'>
            <FaTrash onClick={handleClickOnDelete} />
            <p onClick={handleClickOnDelete}>Supprimer cette étape</p>
          </div>
        )}
      </div>

    </div>
  );
};

Address.propTypes = {

};

Address.defaultProps = {
  suffixe: '',
  disabled: false,
  errors: {},
  errorMessages: {
    streetName: null,
    streetNumber: null,
    streetType: null,
    postCode: null,
    city: null,
    bis: null,
  },
};

export default Address;
