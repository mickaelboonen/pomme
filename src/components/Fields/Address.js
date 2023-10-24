import React, { useEffect, useState } from 'react';

import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
import HiddenField from 'src/components/Fields/HiddenField';
import { RxDoubleArrowDown, RxDoubleArrowUp} from "react-icons/rx";
import { FaTrash } from 'react-icons/fa';

import { bisArray, streetType } from 'src/data/addressData';

import './style.scss';
import classNames from 'classnames';
import NumberField from './NumberField';

const Address = ({
  register,
  errors,
  disabled,
  errorMessages,
  suffixe,
  // bisArray,
  // streetType,
  stepNumber,
  deleteAddress,
  title,
  countries
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
  
  const frenchRegions = countries.filter((country) => country.nationality === 'Français' || country.nationality === 'FRANCAIS(E)');

  return (
    <div className={classNames('step', {'step--open': stepNumber === 1})} id={"step-" + stepNumber}>
      <div className='step__title step__title--down' onClick={toggleStep} id={"step-down-" + stepNumber}>
        <div><RxDoubleArrowDown /></div>
        
        <h4>{title}</h4>
        <div><RxDoubleArrowDown /></div>
      </div>
      <div className='step__title step__title--up' onClick={toggleStep} id={"step-up-" + stepNumber}>
        <div><RxDoubleArrowUp /></div>
        <h4>{title}</h4>
        <div><RxDoubleArrowUp /></div>
      </div>
      <HiddenField
        register={register}
        id={"addressId" + stepNumber}
        value=""
      />
      <div className={classNames('address', {'address--open': stepNumber === 1})}>
        <div className="address__section">
          <NumberField
            id="street-number-field"
            disabled={disabled}
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
            // required={errorMessages.streetType}
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
            // required={errorMessages.streetName}
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
            isRequired
          />
          <TextField
            id="city-field"
            disabled={disabled}
            formField={"city" + stepNumber}
            label="Ville"
            register={register}
            required={errorMessages.city}
            error={errors['city' + stepNumber]}
            isRequired
          />
        </div>
        <div className="address__section">
          
          <div className="form__section-field" id="country-field">
            <label className="form__section-field-label" htmlFor="country">Pays de la Mission</label>
            <select
              id="country"
              className="form__section-field-input form__section-field-input--required"
              {...register("countryCode" + stepNumber, {
                required: errorMessages.countryCode
              })}
              disabled={disabled}
            >
              <optgroup label="France et ses DOM-TOM">
                {frenchRegions.map((country) => <option key={country.code + '-fr'} value={country.code}>{country.name}</option>)}
                <option value="" />
              </optgroup>

              <optgroup label="Tous les pays">
                {countries.map((country) => <option key={country.code + '-all'} value={country.code}>{country.name}</option>)}
              </optgroup>
            </select>
            {errors.countryCode && <p className={classNames("form__section-field-error", { "form__section-field-error--open": error?.message.length > 0 })}>{errors.country.message}</p>}
          </div>
        </div>
        {stepNumber > 1 && (
          <div className='address__section address__section--delete'>
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
