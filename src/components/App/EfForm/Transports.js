import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/pdf.svg';

import './style.scss';
import FormSectionTitle from '../../generics/FormSectionTitle';
import RefusalMessage from './Fields/RefusalMessage';
import Buttons from './Fields/Buttons';
import RadioInput from './Fields/RadioInput';
import CheckboxInput from './Fields/CheckboxInput';
import FileField from './Fields/FileField';
import SwitchButton from '../../generics/SwitchButton';
import SelectField from './Fields/SelectField';
import TextField from './Fields/TextField';

const Transports = ({ step }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  const fields = [
    {
      formField: 'plane',
      id: 'plane-field',
      max: '',
      label: 'Avion',
      filename: 'Avion.png',
    },
    {
      formField: 'train',
      id: 'train-field',
      max: '',
      label: 'Train',
      filename: 'train.pdf',
    },
    {
      formField: 'personal-car',
      id: 'personal-car-field',
      max: '',
      label: 'Véhicule personnel (sur autorisation préalable)',
      filename: 'A changer',
    },
    {
      formField: 'rent-car',
      id: 'rent-car-field',
      max: '',
      label: 'Véhicule de location (sur autorisation préalable)',
      filename: 'Filename.pdf',
    },
    {
      formField: 'fuel',
      id: 'fuel-field',
      max: '',
      label: 'Carburant pour véhicule personnel ou de location (sur autorisation préalable)',
      filename: 'Facture',
    },
    {
      formField: 'toll',
      id: 'toll-field',
      max: '',
      label: 'Frais de péage',
      filename: 'filename.pdf',
    },
    {
      formField: 'parking',
      id: 'parking-field',
      max: '',
      label: 'Parking',
      filename: 'filename.pdf',
    },
    {
      formField: 'Taxi',
      id: 'taxi-field',
      max: '',
      label: 'Taxi',
      filename: 'filename.pdf',
    },
    {
      formField: 'public-transports',
      id: 'public-transports-field',
      max: '',
      label: 'Bus, RER, métro',
      filename: 'filename.pdf',
    },
    {
      formField: 'research',
      id: 'research-field',
      max: '',
      label: "Frais d'inscription à un colloque ou réunion / séminaire scientifique (*)",
      filename: 'filename.pdf',
    },
    // {
    //   formField: 'other',
    //   id: 'other-field',
    //   max: '',
    //   label: 'Autres (à préciser)',
    //   filename: 'filename.pdf',
    // },
  ];


  const handleVehicleChange = (event) => {
    const personalCarField = document.querySelector('#personal-car-field');
    const isHidden = personalCarField.className.includes('hidden');

    if (event.target.value === 'Véhicule personnel, de prêt' && isHidden) {
      personalCarField.classList.remove('form__section-field--hidden');
    }
    else {
      personalCarField.classList.add('form__section-field--hidden');
    }
  };

  const handleClick = () => {
    
    const firstClassTrain = document.querySelector('#first-class');
    const businessClassPlane = document.querySelector('#business-class');
    const parentSection = document.querySelector('#class-certificate').closest('.form__section-field');

    if (firstClassTrain.checked || businessClassPlane.checked) {
      parentSection.classList.remove('form__section-field--hidden');
    }
    else {
      parentSection.classList.add('form__section-field--hidden');
    }
  };

  const handleSwitch = (event) => {
    const otherFieldsGroupElement = document.getElementById('other-fields');
    const otherTextFieldElement = document.getElementById('other');
    const { checked } = event.target;

    if (checked) {
      otherFieldsGroupElement.classList.remove('form__section--hidden');
      otherTextFieldElement.classList.remove('form__section-field--hidden');
    }
    else {
      otherFieldsGroupElement.classList.add('form__section--hidden');
      otherTextFieldElement.classList.add('form__section-field--hidden');
    }
  }
  
  const vehicles = [
    'Véhicule personnel, de prêt', 
    'Véhicule 1', 
    'Véhicule 2', 
  ];
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        {fields.map( (field) => (
          <div className='form__section form__section--documents' key={field.id}>
            <div className='form__section-half'>
              <TextField
                isNumber
                min='0'
                register={register}
                formField={field.formField}
                id={field.id}
                label={field.label}
                placeholder="Montant"
              />
            </div>
            <div className='form__section-half'>
              <img src={Logo} alt="" />
              <p>{field.filename}</p>

            </div>
          </div>
        ))}
        <SwitchButton
          handler={handleSwitch}
          formField="ds"
          isInForm
          register={() => {}}
          label="Autres (à préciser)"
        />
        <TextField
          placeholder=""
          id="other-field"
          isHidden
          label="Noms des autres dépenses"
          formField="other"
          register={register}
        />
        <div className='form__section form__section--documents form__section--hidden' id="other-fields">
          <div className='form__section-half'>
            <TextField
              isNumber
              min='0'
              register={register}
              formField="other-amount"
              id="other-amount-field"
              label="Montant total des autres dépenses"
              placeholder="Montant"
            />
          </div>
          <div className='form__section-half'>
            <img src={Logo} alt="" />
            <p>{'filename.png'}</p>
          </div>
        </div>
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Transports.propTypes = {

};

export default Transports;
