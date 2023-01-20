import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';

import './style.scss';

// Components

import Buttons from 'src/components/Fields/Buttons';
import ApiResponse from 'src/components/ApiResponse';
import SwitchButton from 'src/components/SwitchButton';
import FileField from 'src/components/Fields/FileField';
import RadioInput from 'src/components/Fields/RadioInput';
import SelectField from 'src/components/Fields/SelectField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import RefusalMessage from 'src/components/Fields/RefusalMessage';

// Actions
import { updateTransports, uploadFile} from 'src/reducer/omForm';
import { clearMessage } from 'src/reducer/app';

// Selectors
import { turnTransportsDataToDbFormat } from 'src/selectors/dataToDbFormat';
import { getSavedFileName } from 'src/selectors/formDataGetters';

const Transports = ({ step }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');

  const areWeUpdatingData = loader.pathname.includes('modifier');

  
  const { app: { apiMessage },
    omForm: { omForm }
  } = useSelector((state) => state);

    
  useEffect(() => {
    if (apiMessage.status && apiMessage.status === 200) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, "4900");
      setTimeout(() => {
        if (areWeUpdatingData) {
          const nextStep = step + 1;
          navigate(loader.pathname + '?etape=' + nextStep + '&id=' + omId);
        }
      }, "5000")
    }
  }, [apiMessage])
  
  const transportsData = omForm.find((omStep) => omStep.step === 'transports');

  const defaultValues = transportsData.data;

  const dispensationFileName = defaultValues.dispensation ? getSavedFileName(defaultValues.dispensation): '';
  const authorizationFileName = defaultValues.vehicleAuthorizationFile ? getSavedFileName(defaultValues.vehicleAuthorizationFile): '';

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState:
    { errors },
  } = useForm({ defaultValues: defaultValues});
  

  const onSubmit = (data) => {
    console.log(data);
    // return;
    // If no transports have been chosen
    if (data.trainClass === null && data.planeClass === null &&  data.vehicle === "") {
      setError('transports', { type: 'custom', message: 'Vous devez choisir un moyen de transport pour vous rendre sur le lieu de la mission.' });
    }
    else {
      // We initialize the error count
      let countErrors = 0;
      // If first class train or business class plane has been selected but no dispensation was submitted or given
      if ((data.trainClass === "first-class" || data.planeClass === "business-class") && !data.dispensationForValidation && (!data.dispensation || data.dispensation.length === 0) ) {
        setError('derogation', { type: 'custom', message: "Merci de fournir la dérogation signée par le Président ou d'en faire la demande." });
        countErrors++;
      }

      // If a vehicle has been selected but no authorization was submitted or given
      if (data.vehicle !== "" && !data.vehicleAuthorizationFileForValidation && (!data.vehicleAuthorizationFile || data.vehicleAuthorizationFile.length === 0)) {
        setError('authorization', { type: 'custom', message: "Merci de fournir la demande d'autorisation d'utilisation d'un véhicule ou d'en faire la demande." });
        countErrors++;
      }
      
      // If there are no errors, we go on
      if (countErrors === 0) {
        
        // Formats the data for the database
        const databaseData = turnTransportsDataToDbFormat(data);
        console.log('HERE : ', databaseData);

        // If any file has been selected (for the train, plane or car), we upload it
        if (typeof databaseData.transportDispensation !== 'string' || typeof databaseData.vehicleAuthorization !== 'string') {
          console.log('there is aa least one file');
          dispatch(uploadFile({data: databaseData, step: 'transports'}));
        }
        // Else we directly update the transports entity
        else {
          dispatch(updateTransports(databaseData));
        }
      }
    }
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  // State to manage components
  const [needsDerogation, setNeedsDerogation] = useState(false);
  const [needsAuthorization, setNeedsAuthorization] = useState(false);
  const { vehicles } = useSelector((state) => state.app);
  // FORM FIELDS -----------------------------------------------------------------------------------------------------------------------------------------
  const [trainClass , planeClass, vehicle, vehicleAuthorizationFile, vehicleAuthorizationFileForValidation, dispensation, dispensationForValidation] = watch(['trainClass', 'planeClass', 'vehicle', 'vehicleAuthorizationFile', 'vehicleAuthorizationFileForValidation', 'dispensation', 'dispensationForValidation' ]);

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

    if (vehicle !== "") {
      setNeedsAuthorization(true);
    }
    else {
      setNeedsAuthorization(false);
    }

    clearErrors('transports');
  }, [trainClass, planeClass, vehicle])

  // Clears the authorization error
  useEffect(() => {
    if (dispensation instanceof File || dispensationForValidation) {
      clearErrors('derogation');
    }
    if (vehicleAuthorizationFile instanceof File || vehicleAuthorizationFileForValidation) {
      clearErrors('authorization');
    }

  }, [vehicleAuthorizationFile, vehicleAuthorizationFileForValidation, dispensation, dispensationForValidation])

  const handleClickOnDelete = (event) => {
    const { id } = event.target;
    
    let target = id.slice(7);

    if (target === 'authorization') {
      target = 'vehicleAuthorizationFile';
    }
  
    setValue(target, null);
    const nameElement = document.getElementById(target + '-field').nextElementSibling;
    nameElement.textContent = '';
  }
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="form__section"> */}
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="form__section form__section--split">
          <div className="form__section-half">
            <h4 className="form__section-half-title">TRAIN</h4>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Classe</label>
              <RadioInput
                id="first-class"
                formField="trainClass"
                label="Première classe (*)"
                register={register}
              />
              <RadioInput
                id="second-class"
                formField="trainClass"
                label="Deuxième classe"
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
                label="Classe Affaires (*)"
                register={register}
              />
              <RadioInput
                id="eco-class"
                formField="planeClass"
                label="Classe éco"
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
          <div className="form__section-container" id="upper-class-request">
            <h4 className="form__section-container-title">Demande de Dérogation Première Classe ou Classe Affaire</h4>
            <div className="form__section-container-options">
              <FileField fileName={dispensationFileName} id="dispensation-field" setValue={setValue} formField="dispensation" register={register} />
              <span className="form__section-container-options__separator">OU</span>
              <div className="form__section-field">
                <CheckboxInput id="dispensation-for-validation-field" formField="dispensationForValidation" label="Demande en cours" register={register} columnDisplay />
              </div>
              <span className="form__section-container-options__separator">OU</span>
              <div className="form__section-container-button">
                <Link to={"/nouveau-document/demande-de-dérogation?omId=" + omId + "&type=" + dispensationTarget}>FAIRE LA DEMANDE</Link>
              </div>
            </div>
            {dispensation && <button className="form__section-container-delete-button" id ='delete-dispensation' type='button' onClick={handleClickOnDelete}>Supprimer la pièce choisie</button>}
            {errors.derogation && <p className="form__section-field-error form__section-field-error--open">{errors.derogation.message}</p>}
          </div>
        )}
      {/* </div> */}
      {/* <div className="form__section" */}
        <FormSectionTitle>Véhicule</FormSectionTitle>
        <SelectField
          data={vehicles}
          register={register}
          formField="vehicle"
          id="vehicle-select"
          label="Véhicule utilisé"
          blankValue={"Pas de véhicule sélectionné"}
        />
        {needsAuthorization && (
          <div className="form__section-container" id="personal-car-field">
            <h4 className="form__section-container-title">DEMANDE D'AUTORISATION PRÉALABLE D'UTILISATION D'UN VÉHICULE</h4>
            <div className="form__section-container-options">
              <FileField
                id="vehicleAuthorizationFile-field"
                setValue={setValue}
                formField="vehicleAuthorizationFile"
                register={register}
                fileName={authorizationFileName}
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
            {vehicleAuthorizationFile && <button id ='delete-authorization' className="form__section-container-delete-button" type='button' onClick={handleClickOnDelete}>Supprimer la pièce choisie</button>}
            <p className="form__section-container-reminder">RAPPEL : Remboursement Forfait SNCF 2ème classe</p>
            {errors.authorization && <p className="form__section-field-error form__section-field-error--open">{errors.authorization.message}</p>}
          </div>
        )}
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
      {errors.transports && <p className="form__section-field-error form__section-field-error--open">{errors.transports.message}</p>}
      {refusal !== '' && <RefusalMessage message={refusal} />}
      {apiMessage.data && <ApiResponse response={apiMessage} updateForm={areWeUpdatingData} />}

      <Buttons
        step={step}
        id={omId}
        url={loader}
        watch={watch}
        update={updateTransports}
        />
    </form>
    
  );
};

Transports.propTypes = {

};

export default Transports;
