import React, { useState } from 'react';

import './style.scss';

import Address from 'src/components/Fields/Address';
import ButtonElement from 'src/components/Fields/ButtonElement';
import TextareaField from 'src/components/Fields/TextareaField';

import { deleteAddress } from 'src/reducer/omForm';

const Address2 = ({ countries, watch, data, register, errors, disabled, errorMessages, dispatch }) => {  
  
  const numberAddressesArray = [];
  for(let i = 1; i <= data.length; i++) {
    numberAddressesArray.push(i);
  }
  if (data.length === 0) {
    numberAddressesArray.push(1);
  }

  const [addressNumberArray, setAddressesNumber] = useState(numberAddressesArray);

  const addNewAddress = () => {
    const newArray = [...addressNumberArray];
    newArray.push(addressNumberArray.length + 1);
    setAddressesNumber(newArray)
  }

  const handleDeleteAddress = (id) => {
    
    const addressId = watch(`addressId${id}`);

    if (addressId !== "") {
      dispatch(deleteAddress(addressId));
    }
    
    const newArray = addressNumberArray.filter((number) => number !== id);
    setAddressesNumber(newArray);
  }

  return (
    <>
      <p className='form__section-message form__section-message--infos'>Dans le cas où votre OM comporterait plusieurs destinations, merci de les rajouter en cliquant sur le bouton <span>AJOUTER UNE MISSION</span>.</p>
      {/* <p className='form__section-message form__section-message--infos'><span>ATTENTION :</span> Merci de préciser dans les Observations, à l'étape Signature, les jours qui ne seront pas soumis à un rembrousement (jours "off" entre plusieurs missions, extension de mission pour raison personnelle, etc...)</p> */}
      <div className='form__section-addresses'>
        {addressNumberArray.map((step) => (
          <Address
            key={step}
            disabled={disabled}
            addressType="de la mission"
            register={register}
            errors={errors}
            errorMessages={errorMessages}
            stepNumber={step}
            deleteAddress={handleDeleteAddress}
            title={`Adresse n° ${step}`}
            countries={countries}
          />
        ))}
      </div>
      {addressNumberArray.length > 1 && (
        <div className='form__section-planning'>
          <TextareaField
            id="planning-field"
            label="Explications du planning des missions"
            formField="planning"
            register={register}
            placeholder="Veuillez indiquer le déroulé de votre mission, les dates correspondant aux différentes destinations, les jours non soumis à un remboursement (jours 'off' entre deux destinations, extension de mission pour raison personnelle, etc... "
            error={errors.planning}
          />
        </div>
      )}
      <div className="form__section-field-buttons" style={{marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <ButtonElement
          type="button"
          label="Ajouter une adresse"
          handler={addNewAddress}
        />
      </div>
    </>
  );
};

Address2.propTypes = {

};

export default Address2;
