import { useForm } from "react-hook-form";
import classNames from "classnames";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import './style.scss';

// Components
import VehicleData from './VehicleData';
import PageTitle from 'src/components/PageTitle';
import ApiResponse from 'src/components/ApiResponse';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import ButtonElement from 'src/components/Fields/ButtonElement';
import FileOrSavedFile from 'src/components/Fields/FileOrSavedFile';

// Actions
import { clearSideForm, uploadFile } from 'src/reducer/omForm';
import { displayVehicle, createVehicle, requestVehicleAuthorization, stayOnAuthorizationForm, clearMessage, resetPdfNeed } from 'src/reducer/vehicle';
import CarAuthorizationPdf from "../../../components/PDF/CarAuthorizationPdf";
import LoaderCircle from "../../../components/LoaderCircle";


const VehicleUseForm = () => {
  
  const url = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const omId = url.searchParams.get('omId');

  let { 
    app : { apiMessage },
    agent : { agent },
    docs: { agentSignature },
    omForm: { isSideFormInDB },
    vehicle: { savedAuthorization, message, needsPdf ,vehicleTypes, vehicles, formDefaultValues, unimesVehicles, loader },
  } = useSelector((state) => state);


  useEffect(() => {
    if (isSideFormInDB) {
      dispatch(clearSideForm());

      if (!needsPdf) {
        dispatch(clearMessage());
        navigate('/modifier-un-document/ordre-de-mission?etape=2&id='+ omId);
      }
      else {

      }
    }
  }, [isSideFormInDB])

  useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues])
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
    formState:
    { errors },
  } = useForm({ defaultValues: formDefaultValues});
  
  const [showCarList, setShowCarList] = useState(true);
  const [hasSavedInsurance, setSavedInsurance] = useState(false);
  const [hasSavedRegistration, setSavedRegistration] = useState(false);
  const [vehiclesList, setVehiclesList] = useState([]);

  const [
    reasons,
    carType,
    externalSignature,
    savedRegistration,
    savedInsurance,
    carRegistrationFile,
    carInsuranceFile
  ] = watch(['reasons', 'carType', 'externalSignature', 'savedRegistration', 'savedInsurance', 'carRegistrationFile', 'carInsuranceFile']);

  useEffect(() => {
    if (formDefaultValues.savedInsurance) {
      setSavedInsurance(savedInsurance)
    }
    if (formDefaultValues.savedRegistration) {
      setSavedRegistration(savedRegistration)
    }

  }, [savedRegistration, savedInsurance])
  
  useEffect(() => {
    if (carType === 'company-car') {
      setVehiclesList(unimesVehicles)
      setShowCarList(true);
    }
    else if (carType === 'personal-car') {
      setVehiclesList(vehicles)
      setShowCarList(true);
    }
    else {
      setShowCarList(false);
    }
  }, [carType])
  
  const onSubmit = (data) => {
    console.log(data);
    let countErrors = 0;
    if (data.reasons.length === 0) {
      setError('reasons', {type: 'custom', message : "Merci de justifier l'utilisation du véhicule."})
      countErrors++;
    }
    
    if (!data.savedRegistration && typeof data.carRegistrationFile !== 'object') {
      setError('carRegistrationFile', {type: 'custom', message : "Merci de fournir la carte grise du véhicule."})
      countErrors++;
    }
    
    if (!data.savedInsurance && typeof data.carInsuranceFile !== 'object') {
      setError('carInsuranceFile', {type: 'custom', message : "Merci de fournir l'attestation d'assurance du véhicule."})
      countErrors++;
    }
    
    if (countErrors === 0) {

      if (data.externalSignature) {
        dispatch(stayOnAuthorizationForm({reasons: data.reasons}))
      }

      if (!data.selectedVehicle || data.selectedVehicle === '0') {
        
        dispatch(createVehicle(data));
      }
      else {
          const newDataFormat = {
            omId: Number(data.omId),
            vehicle_id: Number(data.selectedVehicle),
            registration_document: data.carRegistrationFile,
            externalSignature: [],
            insurance: data.carInsuranceFile,
            reasons: data.reasons,
            type: data.carType,
          };

        if (data.carRegistrationFile instanceof File || data.carInsuranceFile instanceof File) {

          dispatch(uploadFile({data: newDataFormat, step: 'authorization', docType: 'authorization'}));
        }
        else {

          dispatch(requestVehicleAuthorization(newDataFormat));
        }
      }
    }
  };

  useEffect(() => {
    if (carRegistrationFile instanceof File) {
      clearErrors('carRegistrationFile');
      setValue('carRegistrationFile', carRegistrationFile);
    }
    if (carInsuranceFile instanceof File) {
      clearErrors('carInsuranceFile');
      setValue('carInsuranceFile', carInsuranceFile);
    }
  }, [carRegistrationFile, carInsuranceFile])

  const staticReasons = [
    {
      id: "time",
      label: "Gain de temps",
    },
    {
      id: "no-public-transports",
      label: "Absence de transport en commun",
    },
    {
      id: "materials-transporting",
      label: "Obligation de transport de matériel lourd, encombrat, fragile",
    },
    {
      id: "handicap",
      label: "Handicap",
    },
    {
      id: "carpooling",
      label: "Transport d'autres missionnaires",
    },
  ];

  const handleOtherReason = (event) => {
  };

  const handleNewCar = (event) => {
    dispatch(displayVehicle(event.target.value));
  }

  const generatePdf = () => {
    dispatch(resetPdfNeed());
    navigate('/modifier-un-document/ordre-de-mission?etape=2&id='+ omId);
  }
  
  return (
    <div className="form-container form-container--vehicle">
      <PageTitle>Demande d'autorisation préalable d'utilisation d'un véhicule</PageTitle>
      {loader && <LoaderCircle />}
      {!loader &&(
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__section">
            <FormSectionTitle>Voiture</FormSectionTitle>
            <label className="form__section-field-label" htmlFor="departure-place">Type de véhicule</label>

            <div className="form__section  form__section--split">
              <RadioInput
                id="personal-car"
                formField="carType"
                label="Véhicule personnel, de prêt (*)"
                register={register}
              />
              <RadioInput
                id="rent-car"
                formField="carType"
                label="Véhicule de location"
                register={register}
              />
              <RadioInput
                id="company-car"
                formField="carType"
                label="Véhicule de service"
                register={register}
              />
            </div>
            {showCarList && (
              <SelectField 
                register={register}
                blankValue="Pas de véhicule enregistré"
                data={vehiclesList}
                id="vehicles-list"
                handler={handleNewCar}
                formField="selectedVehicle"
                label="Sélectionner un véhicule déjà enregistré"
              />
            )}
            <VehicleData register={register} errors={errors} />
            <p className="form__section-field-label form__section-field-label--infos" style={{marginBottom: '1rem'}}>(*) Produire obligatoirement la photocopie de la carte grise et de l'attestation d'assurance</p>
          </div>
          <div className="form__section">
            <FormSectionTitle>Raison</FormSectionTitle>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Raison(s) justifiant l'utilisation d'un véhicule</label>
              {staticReasons.map((reason) => (
                <CheckboxInput
                  key={reason.id}
                  id={reason.id}
                  label={reason.label}
                  formField="reasons"
                  register={register}
                />
              ))}
              <CheckboxInput
                id="other"
                label="Autre raison (à préciser)"
                formField="reasons"
                register={register}
                handler={handleOtherReason}
              />
            </div>
            <TextField
              id="other-reason"
              label="Autre raison"
              formField="otherReason"
              register={register}
              isHidden
            />
            { errors.reasons && <p className="form__section-field-error form__section-field-error--open">{errors.reasons.message}</p>}
          </div>
          <div className="form__section">
            <FormSectionTitle>Documents</FormSectionTitle>
            <FileOrSavedFile
              register={register}
              setValue={setValue}
              id="registration"
              label="Carte grise"
              hasSavedDocument={hasSavedRegistration}
              errors={errors}
            />
            <FileOrSavedFile
              register={register}
              setValue={setValue}
              id="insurance"
              label="Attestation d'assurance"
              hasSavedDocument={hasSavedInsurance}
              errors={errors}
            />
          </div>
          {externalSignature && (
            <div className="form__section">
              <FormSectionTitle>Signatures</FormSectionTitle>
              <FileField
                register={register}
                setValue={setValue}
                formField="signature"
                id="userSignature"
                label="Signature"
                pieces="Merci de fournir la signature de la personne à qui vous empruntez le véhicule."
              />
            </div>
          )}
          <div className="form__section">
            <FormSectionTitle>Dernière étape</FormSectionTitle>
            <HiddenField
              value={omId}
              register={register}
              id="omId"
            />
            {carType === 'personal-car' && (
              <div className="form__section-field">
                <SwitchButton
                  formField="externalSignature"
                  isInForm
                  register={register}
                  label="Est-ce qu'une personne extérieure doit signer le document ?"
                />
              </div>
            )}
            {externalSignature && (
              <div className="form__section-field" id="external-signature-button">
                <div className="form__section-field-button">
                  {(!savedAuthorization.hasOwnProperty('reasons')) && (
                    <ButtonElement 
                      type="submit"
                      label="Enregistrer la demande"
                    />
                  )}
                  {(needsPdf && savedAuthorization.hasOwnProperty('reasons')) && (
                    <BlobProvider document={<CarAuthorizationPdf reasons={staticReasons} agentSignature={agentSignature} agent={agent} data={savedAuthorization} vehicleTypes={vehicleTypes}/>}>
                      {({ blob, url, loading, error }) => {
          
                        const file = new File([blob], new Date().toLocaleDateString() + '-demande-d-autorisation-de-véhicule', {type: 'pdf'});
                        const fileUrl = URL.createObjectURL(file);
                        
                        return (
                          <a href={fileUrl} download={new Date().toLocaleDateString() + '-demande-d-autorisation-de-véhicule.pdf'} style={{textAlign: 'center'}}>
                            <button onClick={generatePdf} type="button">
                              Générer le PDF de la demande
                            </button>
                          </a>
                        );
                      }}
                    </BlobProvider>
                  )}
                </div>
                {needsPdf && <p className="form__section-field-label form__section-field-label--car-form">Veuillez télécharger le PDF de la demande et le faire signer aux personnes extérieures concernées</p>}
                {message && (
                  <div className="form__section-field">
                    <p className={classNames('form__section-message', {'form__section-message--success': message.status === 200, 'form__section-message--error': message.status !== 200})}>
                      {message.data}
                    </p>
                  </div>
                )}
                {needsPdf && <a href={'/modifier-un-document/ordre-de-mission?etape=2&id='+ omId}>Retourner au formulaire de l'ordre de mission</a>}
              </div>
            )} 
            {apiMessage.response && <ApiResponse apiResponse={apiMessage} />}

            {!externalSignature && (
              <div className="form__section-field">
                <div className="form__section-field-button">
                  <ButtonElement 
                    type="submit"
                    label="Valider la demande"
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      
      )}

      </div>
    );
  };

VehicleUseForm.propTypes = {

};

export default VehicleUseForm;
