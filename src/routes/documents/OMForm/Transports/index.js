import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';

import '../style.scss';

// Components

import Buttons from 'src/components/Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import RadioInput from 'src/components/Fields/RadioInput';
import StatusChecker from 'src/components/StatusChecker';
import SelectField from 'src/components/Fields/SelectField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import RequestWithFile from 'src/components/Fields/RequestWithFile';

// Actions
import { updateTransports, uploadFile} from 'src/reducer/omForm';

// Selectors
import { turnTransportsDataToDbFormat } from 'src/selectors/dataToDbFormat';

const Transports = ({ step }) => {
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');


  
  const { omForm: { omForm, currentOM }} = useSelector((state) => state);

  // TODO 
  let permanentOm = true;
  
  const defaultValues = omForm.find((omStep) => omStep.step === 'transports').data;

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues});
  
  const onSubmit = (data) => {

    if (data.trainClass === 'no-train') {
      data.trainClass = null;
      data.trainPayment = null;
    }
    if (data.planeClass === 'no-plane') {
      data.planeClass = null;
      data.planePayment = null;
    }
    
    // If no transports have been chosen
    if (data.trainClass === null && data.planeClass === null &&  data.vehicle === null) {
      setError('transports', { type: 'custom', message: 'Vous devez choisir un moyen de transport pour vous rendre sur le lieu de la mission.' });
    }
    else {
      // We initialize the error count
      let countErrors = 0;
   // console.log(data);
      // If first class train or business class plane has been selected but no dispensation was submitted or given
      if ((data.trainClass === "first-class" || data.planeClass === "business-class") && !data.dispensationForValidation && (!data.dispensation || data.dispensation.length === 0) ) {
        setError('dispensation', { type: 'custom', message: "Merci de fournir la dérogation signée par le Président ou d'en faire la demande." });
        countErrors++;
      }

      // If a vehicle has been selected but no authorization was submitted or given
      if ((data.vehicle !== "" && data.vehicle != 1 && data.vehicle) && !data.vehicleAuthorizationFileForValidation && (!data.vehicleAuthorizationFile || data.vehicleAuthorizationFile.length === 0)) {
        setError('authorization', { type: 'custom', message: "Merci de fournir la demande d'autorisation d'utilisation d'un véhicule ou d'en faire la demande." });
        countErrors++;
      }
      
      // If taxi has been selected but no file was given nor dispensation requested
      if (data.others.indexOf('taxi') >= 0 && (!data.taxiDispensationForValidation && (!data.taxiDispensation || data.taxiDispensation.length === 0))) {
        setError('taxiDispensation', { type: 'custom', message: "Merci de fournir la demande de dérogation signée par le Président ou d'en faire la demande." });
        countErrors++;
      }

      if (data.trainClass !== null && data.trainPayment === null) {
        setError('trainPayment', { type: 'custom', message: "Merci de sélectionner le règlement de votre transport." });
        countErrors++;
      }

      if (data.planeClass !== null && data.planePayment === null) {
        setError('planePayment', { type: 'custom', message: "Merci de sélectionner le règlement de votre transport." });
        countErrors++;
      }
            
      // If there are no errors, we go on
      if (countErrors === 0) {
        if (data.authorizations.length > 0) {
          data.status = data.authorizations[0].file === 'pending' && !data.vehicleAuthorizationFile ? 0 : 1;
        }
        else {
          data.status = 1;
        }

        // Formats the data for the database
        const databaseData = turnTransportsDataToDbFormat(data);
        
        // If any file has been selected (for the train, plane or car), we upload it
        if (databaseData.transportDispensation instanceof File || databaseData.vehicleAuthorization instanceof File || databaseData.taxiDispensation instanceof File ) {
          
          dispatch(uploadFile({data: databaseData, step: 'transports'}));
        }
        // Else we directly update the transports entity
        else {
          dispatch(updateTransports(databaseData));
        }
      }
    }
  };

  // State to manage components
  const [needsDerogation, setNeedsDerogation] = useState(false);
  const [needsAuthorization, setNeedsAuthorization] = useState(defaultValues.vehicle !== null && defaultValues.vehicle !== 1 ? true : false);
  const [needsTaxiDispensation, setNeedsTaxiDispensation] = useState(defaultValues.taxiDispensationForValidation);

  const vehiclePossibilities = [
    {
      id: 0,
      name: 'Véhicule personnel, de prêt'
    },
    {
      id: 1,
      name: 'Covoiturage (passager)'
    },
    {
      id: 2,
      name: 'Véhicule de service'
    },
    {
      id: 3,
      name: 'Véhicule de location'
    },
  ];
  // FORM FIELDS -----------------------------------------------------------------------------------------------------------------------------------------
  const [trainClass , planeClass, others] = watch(['trainClass', 'planeClass', 'others']);
  
  // TODO : Selecteurs
  let dispensationTarget = [];
  if (trainClass ==='first-class') {
    dispensationTarget.push('train');
  }
  else {
    const index = dispensationTarget.indexOf('train');
    if (index > 0) {
      dispensationTarget.splice(index, 1);
    }
  }
  if (planeClass ==='business-class') {
    dispensationTarget.push("plane");
  }
  else {
    const index = dispensationTarget.indexOf('plane');
    if (index > 0) {
      dispensationTarget.splice(index, 1);
    }
  }

  useEffect(() => {
    if (others && others.indexOf('taxi') >= 0) {
      setNeedsTaxiDispensation(true);
    }
    else {
      setNeedsTaxiDispensation(false);
    }
  }, [others])

  // Clears the derogation error
  useEffect(() => {
    if (planeClass !== null) {
      register("trainPayment", {
        required: "Merci de sélectionner l'option qui correspond."
      });
      if (planeClass === 'business-class') {
        setNeedsDerogation(true);
      }
    }

    if (trainClass !== null) {
      register("trainPayment", {
        required: "Merci de sélectionner l'option qui correspond."
      });
      if (trainClass === 'first-class') {
        setNeedsDerogation(true);
      }
    }

    if (trainClass !== 'first-class' && planeClass !== 'business-class') {
      setNeedsDerogation(false);
    }

    clearErrors('transports');
  }, [trainClass, planeClass])
  
  /**
   * Toggles the FileOrSavedFileComponent
   * @param {*} event 
   */
  const changeVehicle = (event) => {
    if (event.target.value !== "1" && event.target.value !== "") {
      setNeedsAuthorization(true);
      clearErrors('transports');
    }
    else {
      setNeedsAuthorization(false);
    }
  }
  console.log("errors = ", errors);
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StatusChecker status={currentOM.transports.status} />
      <FormSectionTitle>Départ et retour</FormSectionTitle>
      <div className="form__section form__section--split">
        <div className="form__section-half">
          <h4 className="form__section-half-title">TRAIN</h4>
          <div className="form__section-field">
            <label className="form__section-field-label" htmlFor="departure-place">Classe</label>
            <RadioInput
              id="first-class"
              formField="trainClass"
              label="Première classe"
              register={register}
              hasInfo
            />
            <RadioInput
              id="second-class"
              formField="trainClass"
              label="Deuxième classe"
              register={register}
            />
            <RadioInput
              id="no-train"
              formField="trainClass"
              label="Pas de train (facultatif)"
              register={register}
            />
          </div>
          <div className="form__section-field">
            <label className="form__section-field-label" htmlFor="departure-place">Règlement</label>
            <RadioInput
              id="unimes-t"
              formField="trainPayment"
              label="Réglé par Unîmes"
              register={register}
            />
            <RadioInput
              id="agent"
              formField="trainPayment"
              label="Avancé par l'agent"
              register={register}
            />
            { errors.trainPayment && <p className={classNames("form__section-field-error", { "form__section-field-error--open": errors.trainPayment.message.length > 0 })}>{errors.trainPayment.message}</p>}
          </div>
        </div>
        <div className="form__section-half--separator" />
        <div className="form__section-half">
          <h4 className="form__section-half-title">AVION</h4>
          <div className="form__section-field">
            <label className="form__section-field-label" htmlFor="departure-place">Classe</label>
            <RadioInput
              id="business-class"
              formField="planeClass"
              label="Classe Affaires"
              hasInfo
              register={register}
            />
            <RadioInput
              id="eco-class"
              formField="planeClass"
              label="Classe éco"
              register={register}
            />
            <RadioInput
              id="no-plane"
              formField="planeClass"
              label="Pas d'avion (facultatif)"
              register={register}
            />
          </div>
          <div className="form__section-field">
            <label className="form__section-field-label" htmlFor="departure-place">Règlement</label>
            <RadioInput id="unimes-p" formField="planePayment" label="Réglé par Unîmes" register={register} />
            <RadioInput id="user" formField="planePayment" label="Avancé par l'agent" register={register} />
            { errors.planePayment && <p className="form__section-field-error form__section-field-error--open">{errors.planePayment.message}</p> }
          </div>
        </div>
      </div>
      {needsDerogation && (
        <RequestWithFile
          requestType="dispensation"
          register={register}
          setValue={setValue}
          errors={errors}
          watch={watch}
          clearErrors={clearErrors}
          id="dispensation"
          data={defaultValues}
          permanentOm={permanentOm}
          link={`/nouveau-document/${encodeURIComponent('demande-de-dérogation')}?omId=` + omId + "&type=" + dispensationTarget}
        />
      )}
      <FormSectionTitle>Véhicule</FormSectionTitle>
      <SelectField
        data={vehiclePossibilities}
        register={register}
        formField="vehicle"
        handler={changeVehicle}
        id="vehicle-select"
        label="Véhicule utilisé"
        blankValue={"Pas de véhicule sélectionné"}
        isRequired
      />
      {needsAuthorization && (
        <RequestWithFile
          requestType="vehicleAuthorizationFile"
          register={register}
          setValue={setValue}
          watch={watch}
          clearErrors={clearErrors}
          errors={errors}
          id="vehicleAuthorizationFile"
          data={defaultValues}
          permanentOm={permanentOm}
          link={`/nouveau-document/${encodeURIComponent('autorisation-de-véhicule')}?omId=` + omId}
        />
      )}
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
          <CheckboxInput id="taxi" formField="others" label="Taxi" register={register} hasInfo />
          <CheckboxInput id="parking" formField="others" label="Parking" register={register} />
          <CheckboxInput id="toll" formField="others" label="Péage" register={register} />
          <CheckboxInput id="ferry" formField="others" label="Ferry (bateau)" register={register} />
        </div>
        {needsTaxiDispensation && (
          <RequestWithFile
            requestType="taxiDispensation"
            register={register}
            setValue={setValue}
            watch={watch}
            clearErrors={clearErrors}
            errors={errors}
            id="taxiDispensation"
            data={defaultValues}
            permanentOm={permanentOm}
            link={`/nouveau-document/${encodeURIComponent('demande-de-dérogation')}?omId=${omId}&type=taxi`}
          />
        )}
        <HiddenField id="docId" value={omId} register={register} />
      </div>
      {errors.transports && <p className="form__section-field-error form__section-field-error--open">{errors.transports.message}</p>}
      {/* {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={areWeUpdatingData} />} */}
      <div className='form__section-field form__section-field--infos-container'>
        <p className="form__section-field-label form__section-field-label--infos" style={{marginBottom: '0', textAlign: 'center'}}><span className='form__section-field-label--required'></span>: Soumis à dérogation</p>
      </div>
      <Buttons
        step={step}
        id={omId}
        url={loader}
        watch={watch}
        update={updateTransports}
        trigger={trigger}
      />
    </form>
  );
};

Transports.propTypes = {

};

export default Transports;
