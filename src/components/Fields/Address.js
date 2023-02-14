import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import HelpImg from 'src/assets/images/help.svg';
import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
import TitleH3 from 'src/components/TitleH3';

import './style.scss';
import classNames from 'classnames';
import Help from '../Help';

const Address = ({
  addressType,
  data=[],
  register,
  errors,
  suffixe
}) => {  

  const bisArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',]
  
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

      <div className="address">
        {/* <TitleH3>{`Adresse ${addressType}`}</TitleH3> */}
        <div className="address__section">
          <TextField
            id="street-number-field"
            // disabled
            isNumber
            min="0"
            formField={"streetNumber" + suffixe}
            label="N° de voie"
            register={register}
            error={errors.streetNumber}
            // required={errorMessages.missionPurpose}
          />
          <SelectField
            register={register}
            blankValue=""
            data={bisArray}
            id="bis-field"
            formField={"bis" + suffixe}
            label="Bis, Ter ..."
            error={errors.bis}
          />
          <SelectField
            register={register}
            blankValue=""
            data={streetType}
            id="street-type-field"
            formField={"streetType" + suffixe}
            label="Type de voie"
            error={errors.streetType}
          />
        </div>
        <div className="address__section">
          <TextField
            id="street-name-field"
            // disabled
            formField={"streetName" + suffixe}
            label="Nom de la rue"
            register={register}
            error={errors.streetName}
            // required={errorMessages.missionPurpose}
          />
        </div>
        <div className="address__section">
          <TextField
            id="postcode-field"
            // disabled
            formField={"postCode" + suffixe}
            label="Code postal"
            register={register}
            error={errors.postCode}
            // required={errorMessages.missionPurpose}
          />
          <TextField
            id="city-field"
            // disabled
            formField={"city" + suffixe}
            label="Ville"
            register={register}
            error={errors.city}
            // required={errorMessages.missionPurpose}
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
};

export default Address;
