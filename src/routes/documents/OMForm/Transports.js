import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import RadioInput from 'src/components/Fields/RadioInput';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FileField from 'src/components/Fields/FileField';
import SwitchButton from 'src/components/SwitchButton';
import SelectField from 'src/components/Fields/SelectField';
import ButtonElement from 'src/components/Fields/ButtonElement';

const Transports = ({ step }) => {
  console.log("rendu");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    unregister,
    setError,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  // console.log(watch(errors));
  const onSubmit = (data) => {

    console.log(data);
    const errorElement = document.getElementById('transports-error');
    
    if (!data.trainClass && !data.planeClass && data.vehicle === "Pas de véhicule sélectionné") {
      console.log('fail');
      errorElement.textContent = "Vous devez choisir un moyen de transport pour vous rendre sur le lieu de la mission."
      errorElement.classList.add("form__section-field-error--open");
    }
    else {
      if (errorElement.textContent == '') {
        errorElement.textContent = ""
        errorElement.classList.remove("form__section-field-error--open");
      }
    }
    // navigate('/nouveau-document/ordre-de-mission?etape=' + step++);
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";


  const handleVehicleChange = (event) => {
    const personalCarField = document.querySelector('#personal-car-field');
    const isHidden = personalCarField.className.includes('hidden');
    console.log(personalCarField);

    if (event.target.value === 'Véhicule personnel, de prêt' && isHidden) {
      personalCarField.classList.remove('form__section-field--hidden');
    }
    else {
      personalCarField.classList.add('form__section-field--hidden');
    }
  };
  
  const vehicles = [
    'Véhicule personnel, de prêt', 
    'Véhicule 1', 
    'Véhicule 2', 
  ];

  // -----------------------------------------------------------------------------------------------------------------------------------------
  const [trainClass , planeClass, vehicle] = watch(['trainClass', 'planeClass', 'vehicle' ]);
  useEffect(() => {
    const parentSection = document.querySelector('#upper-class-request');
    if (trainClass) {
      register("trainPayment", {
        required: "Merci de sélectionner l'option qui correspond."
      });
      register("classCertificate", {
        required: "Merci de fournir la dérogation signée par le Président."
      });
    }
    if (trainClass === 'first-class') {
      parentSection.classList.remove('form__section-field--hidden');
    }
    else if (trainClass === 'second-class') {
      parentSection.classList.add('form__section-field--hidden');

    }
  }, [trainClass])
  useEffect(() => {
    const parentSection = document.querySelector('#upper-class-request');
    if (planeClass) {
      register("trainPayment", {
        required: "Merci de sélectionner l'option qui correspond."
      });
      register("classCertificate", {
        required: "Merci de fournir la dérogation signée par le Président."
      });
      required=""
    }
    if (planeClass === 'business-class') {
      parentSection.classList.remove('form__section-field--hidden');
    }
    else if (planeClass === 'eco-class') {
      parentSection.classList.add('form__section-field--hidden');

    }
  }, [planeClass])
  useEffect(() => {
    const personalCarField = document.querySelector('#personal-car-field');
    const isHidden = personalCarField.className.includes('hidden');
    
    if (vehicle !== "Pas de véhicule sélectionné") {

    }

    if (vehicle === 'Véhicule personnel, de prêt' && isHidden) {
      personalCarField.classList.remove('form__section-field--hidden');
    }
    else {
      personalCarField.classList.add('form__section-field--hidden');
    }
  }, [vehicle])
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="form__section"> */}
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="form__section form__section--split">
          <div className="form__section-half">
            <h4 className="form__section-half-title">TRAIN</h4>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Classe</label>
              <RadioInput id="first-class" formField="trainClass" label="Première classe (*)" register={register} />
              <RadioInput id="second-class" formField="trainClass" label="Deuxième classe" register={register} />
              { errors.trainClass && <p className={classNames("form__section-field-error", { "form__section-field-error--open": errors.trainClass.message.length > 0 })}>{errors.trainClass.message}</p> 
}
            </div>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Règlement</label>
              <RadioInput id="unimes-train" formField="trainPayment" label="Réglé par Unîmes" register={register} />
              <RadioInput id="user-train" formField="trainPayment" label="Avancé par l'agent" register={register} />
              { errors.trainPayment && <p className={classNames("form__section-field-error", { "form__section-field-error--open": errors.trainPayment.message.length > 0 })}>{errors.trainPayment.message}</p>}
            </div>
          </div>
          <div className="form__section-half--separator" />
          <div className="form__section-half">
            <h4 className="form__section-half-title">AVION</h4>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Classe</label>
              <RadioInput id="business-class" formField="planeClass" label="Classe Affaires (*)" register={register} />
              <RadioInput id="eco-class" formField="planeClass" label="Classe éco" register={register} />
              { errors.planeClass && <p className={classNames("form__section-field-error", { "form__section-field-error--open": errors.planeClass.message.length > 0 })}>{errors.planeClass.message}</p> }
            </div>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Règlement</label>
              <RadioInput id="unimes-plane" formField="planePayment" label="Réglé par Unîmes" register={register} />
              <RadioInput id="userPane" formField="planePayment" label="Avancé par l'agent" register={register} />
              { errors.planePayment && <p className={classNames("form__section-field-error", { "form__section-field-error--open": errors.planePayment.message.length > 0 })}>{errors.planePayment.message}</p> }
            </div>
          </div>
        </div>
        <div className="form__section-container form__section-field--hidden" id="upper-class-request">
          <h4 className="form__section-container-title">Demande de Première Classe ou Classe Affaire</h4>
          <div className="form__section-container-options">
            <FileField id="class-certificate" formField="classCertificate" error={errors.classCertificate} register={register} />
            OU
            <div className="form__section-container-button">
              <Link to="/documents/autorisation-de-vehicule/nouveau?etape=1">FAIRE LA DEMANDE</Link>
            </div>
          </div>
        </div>
      {/* </div> */}
      {/* <div className="form__section" */}
        <FormSectionTitle>Véhicule</FormSectionTitle>
        <SelectField
          data={vehicles}
          register={register}
          formField="vehicle"
          id="vehicle-select"
          handler={handleVehicleChange}
          label="Véhicule utilisé"
          blankValue={"Pas de véhicule sélectionné"}
        />
        <div className="form__section-container form__section-field--hidden" id="personal-car-field">
          <h4 className="form__section-container-title">DEMANDE D'AUTORISATION PRÉALABLE D'UTILISATION D'UN VÉHICULE</h4>
          <div className="form__section-container-options">
            <FileField id="vehicle-authorization" formField="vehicleAuthorizationFile" register={register} />
            OU
            <div className="form__section-container-button">
              <Link to="/nouveau-document/autorisation-de-véhicule?etape=1">FAIRE LA DEMANDE</Link>
              {/* <a type="button">FAIRE LA DEMANDE</button> */}
            </div>
          </div>
          <p className="form__section-container-reminder">RAPPEL : Remboursement Forfait SNCF 2ème classe</p>
        </div>
      {/* </div> */}
      {/* <div className="form__section"> */}
        <FormSectionTitle>Déplacement pendant la mission</FormSectionTitle>
        <div className="form__section-field">
          <SwitchButton
          register={register}
          handler={() => null}
          isInForm
          formField={'publicTransports'}
          label="Transports en commun :"
        />

       </div>
        <div className="form__section-field">
          <p className="form__section-field-label">Autres</p>
          <CheckboxInput id="taxi" formField="others" label="Taxi" register={register} />
          <CheckboxInput id="parking" formField="others" label="Parking" register={register} />
        </div>
      {/* </div> */}
      <p id="transports-error" className="form__section-field-error" />
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Transports.propTypes = {

};

export default Transports;
