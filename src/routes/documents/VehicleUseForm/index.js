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
import LoaderCircle from "src/components/LoaderCircle";
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import ButtonElement from 'src/components/Fields/ButtonElement';
import FileOrSavedFile from 'src/components/Fields/FileOrSavedFile';
import CarAuthorizationPdf from "src/components/PDF/CarAuthorizationPdf";

// Actions
import { uploadFile } from 'src/reducer/omForm';
import {
  displayVehicle,
  createVehicle,
  requestVehicleAuthorization,
  // stayOnAuthorizationForm,
  // resetPdfNeed,
  // saveAuthorizationFile
} from 'src/reducer/vehicle';
import { clearMessage } from 'src/reducer/app';
import { getSavedFileName } from 'src/selectors/formDataGetters'
import { uploadVehicleFiles } from "../../../reducer/otherDocuments";


const VehicleUseForm = () => {
  
  const url = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const omId = url.searchParams.get('omId');

  let { 
    app : { apiMessage },
    agent : { agent , user , oms },
    docs: { agentSignature },
    vehicle: { needsPdf ,vehicleTypes, vehicles, formDefaultValues, loader },
  } = useSelector((state) => state);
  
  useEffect(() => {
    if (apiMessage.response && apiMessage.response.status === 200) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, "950")
      setTimeout(() => {
        navigate('/modifier-un-document/ordre-de-mission?etape=2&id='+ omId);
        
      }, "1000")
    }
  }, [apiMessage]);


  useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues])
  

  let insuranceFilename = '';
  let registrationFilename = '';
  if (formDefaultValues.insuranceFile) {
    insuranceFilename = getSavedFileName(formDefaultValues.insuranceFile);
  }
  if (formDefaultValues.registrationFile) {
    registrationFilename = getSavedFileName(formDefaultValues.registrationFile);
  }
  
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
  } = useForm({ defaultValues: {
      ...formDefaultValues,
  }});

  const [
    reasons,
    carType,
    externalSignature,
  ] = watch([
    'reasons',
    'carType',
    'externalSignature',
  ]);
  
  const onSubmit = (data) => {
    let countErrors = validateDataInSubmit(data);
    
    if (countErrors === 0) {      
      clearErrors();
      
      if ((!data.selectedVehicle || data.selectedVehicle === '0') && data.carType === 'personal-car') {
        
        dispatch(uploadVehicleFiles({data: data, user: user, isUpdate: false}));
      }
      else {
        const newDataFormat = {
          docId: Number(data.docId),
          vehicle_id: Number(data.selectedVehicle) === 0 ? null : Number(data.selectedVehicle),
          registration_document: '',
          externalSignature: null,
          insurance: '',
          reasons: data.reasons,
          type: data.carType,
          file: data.file,
        };

        if (newDataFormat.file instanceof File
          || newDataFormat.insurance instanceof File
          || newDataFormat.registration_document instanceof File)
        {
          dispatch(uploadFile({data: newDataFormat, step: 'authorization', docType: 'authorization'}));
        }
        else {
          dispatch(requestVehicleAuthorization(newDataFormat));
        }
      }
    }
  };

  const validateDataInSubmit = (data) => {
    let countErrors = 0;
    if (data.reasons.length === 0) {
      setError('reasons', {type: 'custom', message : "Merci de justifier l'utilisation du véhicule."})
      countErrors++;
    }
    if (!data.carType) {
      setError('carType', {type: 'custom', message : "Merci de sélectionner l'option qui correspond à vore demande."})
      countErrors++;
    }

    if (data.carType === 'personal-car') {
      if (!data.make) {
        setError('make', {type: 'custom', message: "Veuillez indiquer la marque du véhicule."});
        countErrors++;
      }
      if (!data.licensePlate) {
        setError('licensePlate', {type: 'custom', message: "Veuillez indiquer la plaque d'immatriculation du véhicule."});
        countErrors++;
      }
      if (!data.insurance) {
        setError('insurance', {type: 'custom', message: "Veuillez indiquer la compagnie d'assurance qui assure le véhicule."});
        countErrors++;
      }
      if (!data.police) {
        setError('police', {type: 'custom', message: "Veuillez indiquer le n° de police."});
        countErrors++;
      }
      if (!data.rating) {
        setError('rating', {type: 'custom', message: "Veuillez indiquer la puissance fiscale du véhicule."});
        countErrors++;
      }
      if (!data.insuranceFile) {
        setError('insuranceFile', {type: 'custom', message: "Merci de fournir l'attestation d'assurance du véhicule."});
        countErrors++;
      }
      if (!data.registrationFile) {
        setError('registrationFile', {type: 'custom', message: "Merci de fournir la carte grise du véhicule."});
        countErrors++;
      }
    }
    

    return countErrors;
  }

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
            { errors.carType && <p className="form__section-field-error form__section-field-error--open">{errors.carType.message}</p>}

            {carType === 'personal-car' && (
              <>
                <SelectField 
                  register={register}
                  blankValue="Pas de véhicule enregistré"
                  data={vehicles}
                  id="vehicles-list"
                  handler={handleNewCar}
                  formField="selectedVehicle"
                  label="Sélectionner un véhicule déjà enregistré"
                />
                <VehicleData setValue={setValue} register={register} errors={errors} registrationFilename={registrationFilename} insuranceFilename={insuranceFilename} />
                <p className="form__section-field-label form__section-field-label--infos" style={{marginBottom: '1rem'}}>(*) Produire obligatoirement la photocopie de la carte grise et de l'attestation d'assurance</p>
              </>
            )}
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
            {reasons.indexOf('other') >= 0 && (
              <TextField
                id="other-reason"
                label="Autre raison"
                formField="otherReason"
                register={register}
              />
            )}
            { errors.reasons && <p className="form__section-field-error form__section-field-error--open">{errors.reasons.message}</p>}
          </div>
          <div className="form__section">
            <FormSectionTitle>Dernière étape</FormSectionTitle>
            <HiddenField
              value={omId}
              register={register}
              id="docId"
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
            <div className="form__section-field" id="external-signature-button">
              <div className="form__section-field-button">
            
                  <BlobProvider document={<CarAuthorizationPdf reasons={staticReasons} agentSignature={agentSignature} agent={agent} data={watch()} vehicleTypes={vehicleTypes}/>}>
                    {({ blob }) => {
        
                      const { mission } = oms.find((om) => om.id == omId);
                      const fileName = `${agent.lastname.toUpperCase()}-${new Date(mission.departure).toLocaleDateString().split('/').join('-')}-demande-d-autorisation-de-véhicule`
                      const file = new File([blob], fileName, {type: 'pdf'});
                      
                      const fileUrl = URL.createObjectURL(file);
                      
                      if (externalSignature) {

                        return (
                          <a href={fileUrl} download={fileName} style={{textAlign: 'center'}}>
                            <button onClick={() => { const data = watch(); data.file = 'pending'; onSubmit(data)}} type="button">
                              Générer le PDF de la demande
                            </button>
                          </a>
                        );
                      }
                      return (
                        <>
                          <button type="button" onClick={() => { const data = watch(); data.file = file; onSubmit(data)}}>
                            Valider la demande
                          </button>
                          {/* <div style={{width:"100%", height:"100vh"}}>
                            <PDFViewer>
                              <CarAuthorizationPdf reasons={staticReasons} agentSignature={agentSignature} agent={agent} data={watch()} vehicleTypes={vehicleTypes}/>
                            </PDFViewer>
                          </div> */}
                        </>
                      );
                    }}
                  </BlobProvider>
              </div>
              {externalSignature && <p className="form__section-container-text form__section-container-text--infos">Veuillez télécharger le PDF de la demande, le faire signer aux personnes extérieures concernées puis le redéposer dans l'application à l'étape Transports.</p>}
            </div>
            {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />}
          </div>
        </form>
      )}
    </div>
  );
};

VehicleUseForm.propTypes = {

};

export default VehicleUseForm;
