import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import '../style.scss';

// Components
// import OmPdf from 'src/components/PDF/OmPdf';
import HiddenField from 'src/components/Fields/HiddenField';
import FileField from 'src/components/Fields/FileField';
import SelectField from 'src/components/Fields/SelectField';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextareaField from 'src/components/Fields/TextareaField';
import ButtonElement from 'src/components/Fields/ButtonElement';

// Selectors & actions
import { uploadFile } from 'src/reducer/omForm';
import {  defineValidationRulesForMission } from 'src/selectors/formValidationsFunctions';
import { setValidationDate } from 'src/selectors/pdfFunctions';
import RejectOm from './RejectOm';
import ValidateOm from './ValidateOm';


const Validation = ({  }) => {
  
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  
  const {
    omForm: { omLoader, currentOM },
    omManager: { channels, unimes, deveDepartments }
  } = useSelector((state) => state);

    // console.log(currentOM);
  const missionStatus = currentOM.mission ? currentOM.mission.status : null;
  const transportsStatus = currentOM.transports ? currentOM.transports.status : null;
  const accomodationsStatus = currentOM.accomodations ? currentOM.accomodations.status : null;
  const advanceStatus = currentOM.advance ? currentOM.advance.status : null;

  const statusArray = [
    {step: 'mission', status: missionStatus, label: 'Mission'},
    {step: 'transports', status: transportsStatus, label: 'Transports'},
    {step: 'accomodations', status: accomodationsStatus, label: 'Hébergement & repas'},
    {step: 'advance', status: advanceStatus, label: 'Avance'}
  ];
  const isOneStepRejected = statusArray.find((e) => e.status === false);

  const rejectedFields = [];
  if (isOneStepRejected) {
    statusArray.forEach((e) => {
      if (e.status === false) {
        rejectedFields.push(e.step)
      }
    });
  }





  //--------------------------------------------------------------------------------

  const omType = currentOM.type.toLowerCase().split('-');

  const chosenChannel = omType[0];
  const relatedChannel = channels.find((channel) => channel.short_name === chosenChannel);
  let secondSelectToDisplay = '';
  let [serviceOrDepartments, setServiceOrDepartments] = useState([]);

  if (chosenChannel === "deve") {
    serviceOrDepartments = deveDepartments
    secondSelectToDisplay = "departments";
  }
  else if (chosenChannel === "admin") {
    serviceOrDepartments = unimes;
    secondSelectToDisplay = "services";
  }

  const matchingServiceOrDep = serviceOrDepartments.find((service) => service.name.toLowerCase() === omType[1].toLowerCase());

  //--------------------------------------------------------------------------------
  
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    getValues,
    formState:
      { errors }
  } = useForm({ defaultValues: {
    validation: isOneStepRejected === undefined ? null : 'reject',
    rejectedFields: rejectedFields,
    channel: channels.find((channel) => channel.short_name === omType[0]).id,
    service: matchingServiceOrDep ? matchingServiceOrDep.id : null,
  }
  });
  
  const onSubmit = (data) => {
    console.log(data);
  
  };
  
  const [isValidated, setIsValidated] = useState(isOneStepRejected === undefined ? null : 'reject')
  const handleValidation = (event) => {
    setIsValidated(event.target.value)
  }

  const displayServiceOrDepartment = (e) => {
    const chosenChannel = e.short_name;
    if (chosenChannel === "deve") {
      setServiceOrDepartments(deveDepartments)
    }
    else if (chosenChannel === "admin") {
      setServiceOrDepartments(unimes);
    }
    else {
      setServiceOrDepartments([])
    }
  }
  
  return (
    <>
    {!omLoader && (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__section">
          <FormSectionTitle>Validation</FormSectionTitle>
          <div className="form__section-field">
            <label className="form__section-field-label" htmlFor="departure-place">Valider l'ordre de mission</label>
            <RadioInput
              id="validate"
              formField="validation"
              label="Oui"
              register={register}
              required="Veuillez renseigner ce champ."
              handler={handleValidation}
            />
            <RadioInput
              id="reject"
              formField="validation"
              label="Non"
              register={register}
              required="Veuillez renseigner ce champ."
              handler={handleValidation}
            />
            <HiddenField id="docId" value={omId} register={register} />
            {errors.validation && <p className="form__section-field-error form__section-field-error--open">{errors.validation.message}</p>}
          </div>
          {isValidated === "reject" && (
            <RejectOm stepArray={statusArray} register={register} errors={errors} />
          )}
          {isValidated === 'validate' && (
            <ValidateOm
              circuits={channels}
              register={register}
              errors={errors}
              setValue={setValue}
              services={unimes}
              departments={deveDepartments}
              watch={watch}
              secondSelect={secondSelectToDisplay}
              serviceOrDepartments={serviceOrDepartments}
              displayServiceOrDepartment={displayServiceOrDepartment}
            />
          )}
        </div>  
      </form>
    )}
    </>
  );
};

Validation.propTypes = {

};

export default Validation;
