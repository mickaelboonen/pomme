import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

import '../style.scss';
import Buttons from 'src/components/Fields/Buttons';
import StatusChecker from 'src/components/StatusChecker';
import FileField from 'src/components/Fields/FileField';
import NumberField from 'src/components/Fields/NumberField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors  && actions
import { uploadFile } from 'src/reducer/omForm';
import { updateEfTransports } from 'src/reducer/ef';
import { equalizeFields } from 'src/selectors/domManipulators';
import { filterEfTransportsFields } from 'src/selectors/formValidationsFunctions';
import { declareCamelCaseKeys, setEfTranportsFilenames } from 'src/selectors/keyObjectService';

const Transports = ({ step }) => {
  
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');
  
  const { ef: { transportsFields, transportsFieldsBis, currentEf: { transports } },
    omForm: { currentOM }
  } = useSelector((state) => state);
  
  let defaultValues = null;
  if (transports !== undefined) {
    defaultValues = declareCamelCaseKeys(transports);
  }

  const filenames = setEfTranportsFilenames(defaultValues);

  const  horsepower = (currentOM.transports.authorizations[0] && currentOM.transports.authorizations[0].vehicle) ? currentOM.transports.authorizations[0].vehicle.rating : null

  const {
    register, handleSubmit, watch,
    setValue,  setError,
    formState: { errors },
  } = useForm({ defaultValues: {
    ...defaultValues,
    horsepower: horsepower,
  }});
  
  const onSubmit = (data) => {    
    delete data.fields;
    delete data.otherSwitch;
    
    const propertiesArray = Object.entries(data);
    
    let errors = 0;

    const dataWithoutEmptyFields = {};

    // Handling the paired up properties ( property + propertyFiles)
    propertiesArray.forEach((property) => {

      const propertiesToIgnore = ['id', 'status', 'docId', 'personalCar', 'km', 'horsepower', 'fields', 'otherSwitch'];

      if (!property[0].includes('Files') && (property[1] !== '' && property[1]) && propertiesToIgnore.indexOf(property[0]) === -1) {
        const filesProperty = property[0] + 'Files';
        
        if (data[filesProperty].length < 1) {
          setError(filesProperty, { type: 'custom', message: "Veuillez justifier la demande de remboursement pour ce type de dépense."})
          errors++;
        }
        else {
          dataWithoutEmptyFields[property[0]] = Number(property[1]);
          dataWithoutEmptyFields[filesProperty] = data[filesProperty];
        }
      }
    })
    
    // Past handling of km, horsepower, etc
    // // Handling personalCar-related properties
    // if (data.personalCar > 0) {

    //   dataWithoutEmptyFields.personalCar = data.personalCar;
    //   if (data.km === '') {
    //     setError('km', { type: 'custom', message: "Veuillez renseigner le kilométrage."})
    //     errors++;
    //   }
    //   else {
    //     dataWithoutEmptyFields.km = data.km;
    //   }

    //   if (data.horsepower === '') {
    //     setError('horsepower', { type: 'custom', message: "Veuillez renseigner les chevaux fiscaux."})
    //     errors++;
    //   }
    //   else {
    //     dataWithoutEmptyFields.horsepower = data.horsepower;
    //   }
    // }

    dataWithoutEmptyFields.km = data.km;
    dataWithoutEmptyFields.horsepower = data.horsepower;
    
    if (errors > 0) {
      return ;
    }
    
    dataWithoutEmptyFields.status = 1;
    dataWithoutEmptyFields.docId = data.docId;

    const filesArray = Object.entries(dataWithoutEmptyFields).filter((entry) => entry[0].includes('Files'));
    const firstFoundFile = filesArray.find((property) => property[1].find((value) => value instanceof File));

    if (firstFoundFile === undefined) {
      dispatch(updateEfTransports(dataWithoutEmptyFields));
    }
    else {
      dispatch(uploadFile({data: dataWithoutEmptyFields, step: 'transports', docType: 'ef'}))
    }
  };

  useEffect(() => {
    if (errors) {
      
      const fields = [
        'train', 'plane', 'rentCar', 'fuel', 'toll', 'parking', 'taxi', 'visa', 'ferry', 'public_transports'
      ]

      const carFields = [ 'rentCar', 'fuel', 'toll', 'parking', 'taxi'];
      const otherFields = [ 'visa', 'ferry', 'public_transports'];
      fields.forEach((currentField) => {
        
        if (errors.hasOwnProperty(currentField + 'Files')) {

          if (otherFields.indexOf(currentField) >= 0) {
            currentField = 'others';
          }
          else if (carFields.indexOf(currentField) >= 0) {
          currentField = 'vehicles';
          }

          const el = document.getElementById(currentField + '-section');
          el.classList.add('form__section-category__body--open');
          
        }
      })
    }
    
  }, [errors]);
  
  const [fieldsToBeDisplayed, setFieldsToBeDisplayed] = useState(filterEfTransportsFields(transportsFields, currentOM.transports))

  useEffect(() => {
    equalizeFields();
  }, [fieldsToBeDisplayed.length]);
  
  const handleClick = (event) => {
    const { id } = event.target;
    const el = document.getElementById(id + '-section');
    el.classList.toggle('form__section-category__body--open');
  }
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StatusChecker status={defaultValues.status} />
      <div className="form__section" style={{display: 'flex', flexDirection: 'column'}}>
        <FormSectionTitle>Frais de transports</FormSectionTitle>
        <HiddenField id="docId" register={register} value={efId} />
        <div className='form__section-category'>
          <FormSectionTitle needsClarity id="plane" handler={handleClick}>AVION</FormSectionTitle>
          <div className='form__section-category__body' id="plane-section">
            {transportsFieldsBis.find((category) => category.id === 'plane').fields.map( (field) => (
              <div className='form__section form__section--documents' key={field.id} style={{order: field.index}}>
                <div className='form__section-half'>
                  <NumberField
                    register={register}
                    formField={field.formField}
                    id={field.id}
                    label={field.label}
                    error={errors[field.formField]}
                    placeholder="Montant en euros"
                    isAmount
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
          </div>
        </div>
        <div className='form__section-category'>
          <FormSectionTitle needsClarity id="train" handler={handleClick}>TRAIN</FormSectionTitle>
          <div className='form__section-category__body' id='train-section'>
            {transportsFieldsBis.find((category) => category.id === 'train').fields.map( (field) => (
              <div className='form__section form__section--documents' key={field.id} style={{order: field.index}}>
                <div className='form__section-half'>
                  <NumberField
                    register={register}
                    formField={field.formField}
                    id={field.id}
                    label={field.label}
                    error={errors[field.formField]}
                    placeholder="Montant en euros"
                    isAmount
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
          </div>
        </div>
        <div className='form__section-category'>
          <FormSectionTitle needsClarity id="vehicles" handler={handleClick}>VEHICULES</FormSectionTitle>
          <div className='form__section-category__body' id="vehicles-section">
            
            {transportsFieldsBis.find((category) => category.id === 'vehicles').fields.map( (field) => (
              <div className='form__section form__section--documents' key={field.id} style={{order: field.index}}>
                <div className='form__section-half'>
                  <NumberField
                    register={register}
                    formField={field.formField}
                    id={field.id}
                    label={field.label}
                    error={errors[field.formField]}
                    placeholder="Montant en euros"
                    isAmount
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
            <div className='form__section form__section--documents'style={{order: 4}}>
              <div className='form__section-half' style={{display: 'flex', alignItems: 'center'}}>
                <NumberField
                  register={register}
                  formField="horsepower"
                  id="horsepower-field"
                  label="Nombre de Chevaux fiscaux"
                  error={errors.horsepower}
                  placeholder="Nombre de Chevaux fiscaux"
                />
              </div>
              <div className='form__section-half'>
                <NumberField
                  register={register}
                  formField="km"
                  id="km-field"
                  label="Kilométrage"
                  error={errors.km}
                  placeholder="Kilométrage"
                  isAmount // Not an amount but we need km can be a double
                />
              </div>
            </div>
          </div>
        </div>
        <div className='form__section-category'>
          <FormSectionTitle needsClarity id="others" handler={handleClick}>AUTRES</FormSectionTitle>
          <div className='form__section-category__body' id="others-section">
            {transportsFieldsBis.find((category) => category.id === 'others').fields.map( (field) => (
              <div className='form__section form__section--documents' key={field.id} style={{order: field.index}}>
                <div className='form__section-half'>
                  <NumberField
                    register={register}
                    formField={field.formField}
                    id={field.id}
                    label={field.label}
                    error={errors[field.formField]}
                    placeholder="Montant"
                    isAmount
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
          </div>
        </div>
      </div>
      {/* // TODO: autres dépenses à implémenter  */}
      {/* <div className='form__section'>
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
              <NumberField
                register={register}
                formField="otherAmount"
                id="other-amount-field"
                label="Montant total des autres dépenses"
                placeholder="Montant"
                isAmount
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
      </div> */}
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
