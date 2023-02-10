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
  addressType='familiale',
  data=[],
}) => {

  const {
    register, handleSubmit, watch,
    setError, setValue, unregister,
    trigger, formState:
    { errors }
  } = useForm();
  

  return (
    <div className="address">
      <TitleH3>{`Adresse ${addressType}`}</TitleH3>
      <div className="address__section">
        <TextField
          id="street-number-field"
          // disabled
          isNumber
          min="0"
          formField="streetNumber"
          label="N° de voie"
          register={register}
          error={errors.streetNumber}
          // required={errorMessages.missionPurpose}
        />
        <SelectField
          register={register}
          blankValue=""
          data={[]}
          id="bis-field"
          formField="bis"
          label="Bis, Ter ..."
          error={errors.bis}
        />
        <SelectField
          register={register}
          blankValue=""
          data={[]}
          id="street-type-field"
          formField="streetType"
          label="Type de voie"
          error={errors.streetType}
        />
      </div>
      <div className="address__section">
        <TextField
          id="street-name-field"
          // disabled
          formField="streetName"
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
          formField="postCode"
          label="Code postal"
          register={register}
          error={errors.postCode}
          // required={errorMessages.missionPurpose}
        />
        <TextField
          id="city-field"
          // disabled
          formField="city"
          label="Ville"
          register={register}
          error={errors.city}
          // required={errorMessages.missionPurpose}
        />
      </div>
    </div>
  );
};

Address.propTypes = {

};

export default Address;
