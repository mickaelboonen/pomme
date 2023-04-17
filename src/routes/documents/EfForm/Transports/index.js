import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';

import '../style.scss';
import ApiResponse from 'src/components/ApiResponse';
import FormSectionTitle from 'src/components/FormSectionTitle';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';
import HiddenField from 'src/components/Fields/HiddenField';

// Selectors  && actions
import { equalizeFields } from 'src/selectors/domManipulators';
import { filterEfTransportsFields } from 'src/selectors/formValidationsFunctions';
import { uploadFile } from 'src/reducer/omForm';
import { updateEfTransports } from 'src/reducer/ef';
import { declareCamelCaseKeys, setEfTranportsFilenames } from 'src/selectors/keyObjectService';

const Transports = ({ step }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');

  const { ef: { transportsFields, currentEf: { transports} },
    omForm: { omForm, currentOM },
    app: { apiMessage }
  } = useSelector((state) => state);
  
  let defaultValues = null;
  if (transports !== undefined) {
    defaultValues = declareCamelCaseKeys(transports);
  }

  const filenames = setEfTranportsFilenames(defaultValues);

  const {
    register, handleSubmit, watch,
    setValue,  setError, trigger,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues});
  
  const onSubmit = (data) => {    
    delete data.fields;
    delete data.otherSwitch;

    const propertiesArray = Object.entries(data);

    console.log(data);
    let errors = 0;

    const dataWithoutEmptyFields = {};

    // Handling the paired up properties ( property + propertyFiles)
    propertiesArray.forEach((property) => {

      const propertiesToIgnore = ['id', 'status', 'docId', 'personalCar', 'km', 'horsepower', 'fields', 'otherSwitch'];

      if (!property[0].includes('Files') && (property[1] !== '' && property[1]) && propertiesToIgnore.indexOf(property[0]) === -1) {
        const filesProperty = property[0] + 'Files';
        
        if (data[filesProperty].length < 1) {
          setError(filesProperty, { type: 'custom', message: "Veuillez justifier la demande de remboursement pour ce type de transport."})
          errors++;
        }
        else {
          dataWithoutEmptyFields[property[0]] = property[1];
          dataWithoutEmptyFields[filesProperty] = data[filesProperty];
        }
      }
    })

    // Handling personalCar-related properties
    if (data.personalCar > 0) {

      dataWithoutEmptyFields.personalCar = data.personalCar;
      if (data.km === '') {
        setError('km', { type: 'custom', message: "Veuillez renseigner le kilométrage."})
        errors++;
      }
      else {
        dataWithoutEmptyFields.km = data.km;
      }

      if (data.horsepower === '') {
        setError('horsepower', { type: 'custom', message: "Veuillez renseigner les chevaux fiscaux."})
        errors++;
      }
      else {
        dataWithoutEmptyFields.horsepower = data.horsepower;
      }
    }

    if (errors > 0) {
      return ;
    }

    dataWithoutEmptyFields.status = 1;
    dataWithoutEmptyFields.docId = data.docId;
    console.log(dataWithoutEmptyFields);
    


    const filesArray = Object.entries(dataWithoutEmptyFields).filter((entry) => entry[0].includes('Files'));
    const firstFoundFile = filesArray.find((property) => property[1].find((value) => value instanceof File));

    if (firstFoundFile === undefined) {
      dispatch(updateEfTransports(dataWithoutEmptyFields));
    }
    else {
      dispatch(uploadFile({data: dataWithoutEmptyFields, step: 'transports', docType: 'ef'}))
    }

        
    // dispatch(uploadFile({data: dataWithoutEmptyFields, step: 'transports', docType: 'ef'}))

  };
  
  const [otherSwitch, fields] = watch(['otherSwitch', 'fields']);


  // useEffect(() => {
  //   equalizeFields();
  // }, []);

  const displayFields = (event) => {
    if (event.target.checked) {
      setFieldsToBeDisplayed(transportsFields);
    }
    else {
      setFieldsToBeDisplayed(filterEfTransportsFields(transportsFields, currentOM.transports));
    }
    
  }
  
  const [fieldsToBeDisplayed, setFieldsToBeDisplayed] = useState(filterEfTransportsFields(transportsFields, currentOM.transports))

  if (currentOM.mission.visa && fieldsToBeDisplayed.find((field) => field.formField === 'visa') === undefined) {

    fieldsToBeDisplayed.push(transportsFields.find((field) => field.formField === 'visa'));
  }
  
  const hasUsedPersonalCar = currentOM.transports.authorizations.length > 0 &&  currentOM.transports.authorizations[0].type === 'personal-car' ? true : false;
  

  useEffect(() => {
    equalizeFields();
  }, [fieldsToBeDisplayed.length]);
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section" style={{display: 'flex', flexDirection: 'column'}}>
        <FormSectionTitle>Frais de transports</FormSectionTitle>
        <HiddenField id="docId" register={register} value={efId} />
        <SwitchButton
          formField="fields"
          isInForm
          handler={displayFields}
          register={register}
          label="Afficher tous les champs"
        />
        {fieldsToBeDisplayed.map( (field) => (
          <div className='form__section form__section--documents' key={field.id} style={{order: field.index}}>
            <div className='form__section-half'>
              <TextField
                isNumber
                min='0'
                register={register}
                formField={field.formField}
                id={field.id}
                label={field.label}
                error={errors[field.formField]}
                placeholder="Montant"
              />
            </div>
            <div className='form__section-half'>
              <FileField
                setValue={setValue}
                register={register}
                formField={`${field.formField}Files`}
                id={`${field.formField}-files`}
                multiple
                label={field.filelabel}
                placeholder=""
                error={errors[`${field.formField}Files`]}
                fileName={filenames[`${field.formField}Files`]}
              />
            </div>
          </div>
        ))}
        {(hasUsedPersonalCar || fields) && (
          <div className='form__section form__section--documents'style={{order: 4}}>
            <div className='form__section-half' style={{display: 'flex', alignItems: 'center'}}>
              <TextField
                isNumber
                min='0'
                register={register}
                formField="personalCar"
                id="personal-car-field"
                label="Véhicule personnel (sur autorisation préalable)"
                error={errors.personalCar}
                placeholder="Montant"
              />
            </div>
            <div className='form__section-half'>
              <TextField
                isNumber
                min='0'
                register={register}
                formField="horsepower"
                id="horsepower-field"
                label="Nombre de Chevaux fiscaux"
                error={errors.horsepower}
                placeholder="Nombre de Chevaux fiscaux"
              />
              <TextField
                isNumber
                min='0'
                register={register}
                formField="km"
                id="km-field"
                label="Kilométrage"
                error={errors.km}
                placeholder="Kilométrage"
              />
            </div>
          </div>
        )}
        </div>
        <div className='form__section'>
        <SwitchButton
          formField="otherSwitch"
          isInForm
          register={register}
          label="Autres (à préciser)"
        />
        {otherSwitch && (
          <TextField
            placeholder=""
            id="other-field"
            isHidden
            label="Noms des autres dépenses"
            formField="other"
            register={register}
            error={errors.other}
          />
        )}
        {otherSwitch && (
          <div className='form__section form__section--documents' id="other-fields">
            <div className='form__section-half'>
              <TextField
                isNumber
                min='0'
                register={register}
                formField="otherAmount"
                id="other-amount-field"
                label="Montant total des autres dépenses"
                placeholder="Montant"
              />
            </div>
            <div className='form__section-half'>
              <FileField
                register={register}
                setValue={setValue}
                formField="otherAmountFiles"
                id="other-amount-field-files"
                multiple
                label="Justificatifs de paiements, factures"
                placeholder=""
                error={errors.otherAmountFiles}
              />
            </div>
          </div>
        )}
      </div>
      {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />}
      <Buttons
        step={step}
        id={efId}
        url={loader}
        watch={watch}
        update={updateEfTransports}
        type={"ef"}
      />
    </form>
    
  );
};

Transports.propTypes = {

};

export default Transports;
