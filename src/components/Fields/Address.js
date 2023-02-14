import React, { useEffect, useState } from 'react';

import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
import HiddenField from 'src/components/Fields/HiddenField';

import './style.scss';

const Address = ({
  addressType,
  
  register,
  errors,
  disabled,
  errorMessages,
  suffixe
}) => {  

  const bisArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  
  const streetType = [
    {
      id: 'R',
      name: "Rue",
    },
    {
      id: 'CIT',
      name: "Cité",
    },
    {
      id: 'AV',
      name: "Avenue",
    },
    {
      id: 'CHE',
      name: "Chemin",
    },
    {
      id: 'BD',
      name: "Boulevard",
    },
    {
      id: 'IMP',
      name: "Impasse",
    },
    {
      id: 'ALL',
      name: "Allée",
    },
    {
      id: 'QUA',
      name: "Quartier",
    },
    {
      id: 'LOT',
      name: "Lot",
    },
    {
      id: 'PL',
      name: "Place",
    },
    {
      id: 'PAS',
      name: "Passage",
    },
    {
      id: 'RTE',
      name: "Route",
    },
    {
      id: 'DOM',
      name: "Domaine",
    },
    {
      id: 'RES',
      name: "Résidence",
    },
    {
      id: 'HAM',
      name: "Hameau",
    },
    {
      id: 'QU',
      name: "Quai",
    },
    {
      id: 'SQ',
      name: "Square",
    },
  ];
  
  
  return (
    <>
      <label className="form__section-field-label">{'Addresse ' + addressType}</label>
      <HiddenField
        register={register}
        id="addressId"
        value=""
      />
      <div className="address">
        <div className="address__section">
          <TextField
            id="street-number-field"
            isNumber
            min="0"
            formField={"streetNumber" + suffixe}
            label="N° de voie"
            register={register}
            error={errors.streetNumber}
            required={errorMessages.streetNumber}
          />
          <SelectField
            register={register}
            disabled={disabled}
            blankValue=""
            data={bisArray}
            id="bis-field"
            formField={"bis" + suffixe}
            label="Bis, Ter ..."
            error={errors.bis}
          />
          <SelectField
            register={register}
            disabled={disabled}
            blankValue=""
            data={streetType}
            id="street-type-field"
            formField={"streetType" + suffixe}
            label="Type de voie"
            error={errors.streetType}
            required={errorMessages.streetType}
          />
        </div>
        <div className="address__section">
          <TextField
            id="street-name-field"
            disabled={disabled}
            formField={"streetName" + suffixe}
            label="Nom de la rue"
            register={register}
            error={errors.streetName}
            required={errorMessages.streetName}
          />
        </div>
        <div className="address__section">
          <TextField
            id="postcode-field"
            disabled={disabled}
            formField={"postCode" + suffixe}
            label="Code postal"
            register={register}
            error={errors.postCode}
            required={errorMessages.postCode}
            isNumber
          />
          <TextField
            id="city-field"
            disabled={disabled}
            formField={"city" + suffixe}
            label="Ville"
            register={register}
            error={errors.city}
            required={errorMessages.city}
          />
        </div>
      </div>
    </>
  );
};

Address.propTypes = {

};

Address.defaultProps = {
  suffixe: '',
  disabled: false,
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
