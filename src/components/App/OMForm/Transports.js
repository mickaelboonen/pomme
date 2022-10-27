import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from '../../generics/FormSectionTitle';
import RefusalMessage from './Fields/RefusalMessage';
import Buttons from './Fields/Buttons';
import RadioInput from './Fields/RadioInput';
import CheckboxInput from './Fields/CheckboxInput';
import FileField from './Fields/FileField';
import SwitchButton from '../../generics/SwitchButton';
import SelectField from './Fields/SelectField';

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

    // TODO : Process Data

    // Next Step
    const nextStep = step++;
    navigate('/documents/ordre-de-mission/nouveau?etape=' + step++);

    
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";


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
  
  const vehicles = [
    'Véhicule personnel, de prêt', 
    'Véhicule 1', 
    'Véhicule 2', 
  ];
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="split-fields">
          <div className="split-fields__half">
            <h4>TRAIN</h4>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Classe</label>
              <RadioInput id="first-class" formField="train-class" label="Première classe (*)" register={register} handler={handleClick}/>
              <RadioInput id="second-class" formField="train-class" label="Deuxième classe" register={register} handler={handleClick} />
            </div>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Règlement</label>
              <RadioInput id="unimes-train" formField="train-payment" label="Réglé par Unîmes" register={register} />
              <RadioInput id="user-train" formField="train-payment" label="Avancé par l'agent" register={register} />
            </div>
          </div>
          <div className="split-fields__half">
            <h4>AVION</h4>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Classe</label>
              <RadioInput id="business-class" formField="plane-class" label="Classe Affaires (*)" register={register} handler={handleClick} />
              <RadioInput id="eco-class" formField="plane-class" label="Classe éco" register={register} handler={handleClick} />
            </div>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Règlement</label>
              <RadioInput id="unimes-plane" formField="plane-payment" label="Réglé par Unîmes" register={register} />
              <RadioInput id="user-plane" formField="plane-payment" label="Avancé par l'agent" register={register} />
            </div>
          </div>
        </div>
        <FileField id="class-certificate" formField="class-certificate" register={register} isHidden={true} />
      </div>
      <div className="form__section">
        <FormSectionTitle>Véhicule</FormSectionTitle>
        <SelectField
          data={vehicles}
          register={register}
          formField="work-adress"
          id="work-address-select"
          handler={handleVehicleChange}
          label="Véhicule utilisé"
          blankValue={"Pas de véhicule utilisé"}
        />
        <div className="form__section-container form__section-field--hidden" id="personal-car-field">
          <div className="form__section-container-options">
            <FileField id="vehicle-authorization" formField="vehicle-authorization-file" register={register} />
            OU
            <div className="form__section-container-button">
              <Link to="/documents/autorisation-de-vehicule/nouveau?etape=1">FAIRE LA DEMANDE</Link>
              {/* <a type="button">FAIRE LA DEMANDE</button> */}
            </div>
          </div>
          <p className="form__section-container-reminder">RAPPEL : Remboursement Forfait SNCF 2ème classe</p>
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Déplacement pendant la mission</FormSectionTitle>
        <div className="form__section-field">
          <SwitchButton
          register={register}
          handler={() => null}
          isInForm
          formField={'public-transports'}
          label="Transports en commun :"
        />

       </div>
        <div className="form__section-field">
          <p className="form__section-field-label">Autres</p>
          <CheckboxInput id="taxi" formField="others" label="Taxi" register={register} />
          <CheckboxInput id="parking" formField="others" label="Parking" register={register} />
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
