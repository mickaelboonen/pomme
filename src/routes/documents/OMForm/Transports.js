import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import './style.scss';

// Components
import Buttons from 'src/components/Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import FileField from 'src/components/Fields/FileField';
import RadioInput from 'src/components/Fields/RadioInput';
import SelectField from 'src/components/Fields/SelectField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import RefusalMessage from 'src/components/Fields/RefusalMessage';

// Actions
import { updateTransports } from 'src/reducer/omForm';
import { uploadFile } from 'src/reducer/omForm';

// Selectors
import { turnTransportsDataToDbFormat } from 'src/selectors/dataToDbFormat';
import { handleValidationErrorsManually } from 'src/selectors/formValidationsFunctions';
import { toggleDerogationSection, toggleVehicleFields } from 'src/selectors/domManipulators';

const Transports = ({ step }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const omId = searchParams.get('id');

  const {
    register,
    unregister,
    setError,
    setValue,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {

    const errorElement = document.getElementById('transports-error');
    const dispensationErrorElement = document.getElementById('dispensation-error');
    const vehicleAuthorizationErrorElement = document.getElementById('vehicle-authorization-error');
    
    if (!data.trainClass && !data.planeClass && data.vehicle === "Pas de véhicule sélectionné") {
      handleValidationErrorsManually(errorElement, "Vous devez choisir un moyen de transport pour vous rendre sur le lieu de la mission.", true )
    }
    // Here at least one way to move is selected
    else {
      // So we reset the global error
        handleValidationErrorsManually(errorElement, "")

      if ((data.trainClass === "first-class" || data.planeClass === "business-class") && data.dispensation.length === 0 && !data.dispensationForValidation) {
        handleValidationErrorsManually(dispensationErrorElement,"Merci de fournir la dérogation signée par le Président ou d'en faire la demande.", true);
      }

      else if (data.vehicle === "Pas de véhicule sélectionné" && data.vehicleAuthorizationFile.length === 0 && !data.vehicleAuthorizationFileForValidation) {
        handleValidationErrorsManually(vehicleAuthorizationErrorElement,"Merci de fournir la demande d'autorisation d'utilisation d'un véhicule ou d'en faire la demande.", true);

      }
      else {
        // Clears the errors
        handleValidationErrorsManually(dispensationErrorElement, "");
        handleValidationErrorsManually(vehicleAuthorizationErrorElement, "");

        // Formats the data for the database
        const databaseData = turnTransportsDataToDbFormat(data);

        // If any file has been selected (for the train, plane or car), we upload it
        if (databaseData.transportDispensation || databaseData.vehicleAuthorization) {
          dispatch(uploadFile({data: databaseData, step: 'transports'}));
        }
        // Else we directly update the transports entity
        else {
          dispatch(updateTransports(databaseData));
        }

        // TODO : find how to go to the next page
      // const nextStep = step + 1;
      // navigate('/nouveau-document/ordre-de-mission?etape=' + nextStep + '&id=' + omId)
      }
      

    }
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";


  const handleVehicleChange = (event) => {
    toggleVehicleFields(event.target.value);
  };
  
  const vehicles = [
    'Véhicule personnel, de prêt', 
    'Véhicule 1', 
    'Véhicule 2', 
  ];

  // FORM FIELDS -----------------------------------------------------------------------------------------------------------------------------------------
  const [trainClass , planeClass, vehicle] = watch(['trainClass', 'planeClass', 'vehicle' ]);
  
  useEffect(() => {
    const parentSection = document.querySelector('#upper-class-request');
    if (trainClass) {
      register("trainPayment", {
        required: "Merci de sélectionner l'option qui correspond."
      });
    }
    toggleDerogationSection(parentSection, trainClass);
  }, [trainClass]);

  useEffect(() => {
    const parentSection = document.querySelector('#upper-class-request');
    if (planeClass) {
      register("planePayment", {
        required: "Merci de sélectionner l'option qui correspond."
      });
    }
    toggleDerogationSection(parentSection, planeClass);
  }, [planeClass]);

  useEffect(() => {
    const personalCarField = document.querySelector('#personal-car-field');
    toggleDerogationSection(personalCarField, vehicle)
  }, [vehicle]);

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
            </div>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Règlement</label>
              <RadioInput id="unimes-t" formField="trainPayment" label="Réglé par Unîmes" register={register} />
              <RadioInput id="agent" formField="trainPayment" label="Avancé par l'agent" register={register} />
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
            </div>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Règlement</label>
              <RadioInput id="unimes-p" formField="planePayment" label="Réglé par Unîmes" register={register} />
              <RadioInput id="user" formField="planePayment" label="Avancé par l'agent" register={register} />
              { errors.planePayment && <p className="form__section-field-error form__section-field-error--open">{errors.planePayment.message}</p> }
            </div>
          </div>
        </div>
        <div className="form__section-container form__section-field--hidden" id="upper-class-request">
          <h4 className="form__section-container-title">Demande de Dérogation Première Classe ou Classe Affaire</h4>
          <div className="form__section-container-options">
            <FileField id="dispensation-field" setValue={setValue} formField="dispensation" register={register} />
            <span className="form__section-container-options__separator">OU</span>
            <div className="form__section-field">
              <CheckboxInput id="dispensation-for-validation-field" formField="dispensationForValidation" label="Demande en cours" register={register} columnDisplay />
            </div>
            <span className="form__section-container-options__separator">OU</span>
            <div className="form__section-container-button">
              <Link to="/nouveau-document/demande-de-dérogation">FAIRE LA DEMANDE</Link>
            </div>
          </div>
          <p id="dispensation-error" className="form__section-field-error" />
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
            <FileField
              id="vehicle-authorization"
              setValue={setValue}
              formField="vehicleAuthorizationFile"
              register={register}
            />
            <span className="form__section-container-options__separator">OU</span>
            <div className="form__section-field">
              <CheckboxInput id="dispensation-for-validation-field" formField="vehicleAuthorizationFileForValidation" label="Demande en cours" register={register} columnDisplay />
            </div>
            <span className="form__section-container-options__separator">OU</span>
            <div className="form__section-container-button">
              <Link to="/nouveau-document/autorisation-de-véhicule">FAIRE LA DEMANDE</Link>
            </div>
          </div>
          <p className="form__section-container-reminder">RAPPEL : Remboursement Forfait SNCF 2ème classe</p>
          <p id="vehicle-authorization-error" className="form__section-field-error" />
        </div>
      {/* </div> */}
        <div className="form__section">
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
          <HiddenField id="omId" value={omId} register={register} />
        </div>
      <p id="transports-error" className="form__section-field-error" />
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Transports.propTypes = {

};

export default Transports;
