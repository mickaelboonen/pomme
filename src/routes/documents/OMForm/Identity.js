import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink, BlobProvider, Page } from '@react-pdf/renderer';

import './style.scss';

// Components

import ApiResponse from 'src/components/ApiResponse';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import FileField from 'src/components/Fields/FileField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import Address from '../../../components/Fields/Address';
import MyPDF from 'src/components/PDF';

// Selectors 
import {  defineValidationRulesForMission } from 'src/selectors/formValidationsFunctions';

// Reducer
import { clearMessage } from 'src/reducer/app';
import { uploadFile, saveOmPdf } from 'src/reducer/omForm';


const Identity = ({ step, isEfForm }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  const areWeUpdatingData = loader.pathname.includes('modifier');
  

  const { app: { apiMessage, agent },
  omForm: { currentOM, omForm, refusal, adresses },
  docs: { agentSignature },
  } = useSelector((state) => state);
  
  // TODO : problem with setApiResponse when savingAsItis
  useEffect(() => {
    if (apiMessage.status && apiMessage.status === 200) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, "4900")
      setTimeout(() => {
        if (areWeUpdatingData) {
          const nextStep = step + 1;
          navigate(loader.pathname + '?etape=' + nextStep + '&id=' + omId);
        }
      }, "5000")
    }
  }, [apiMessage])
  
    const {
    register, handleSubmit, watch, setValue,
    trigger, getValues, formState:
    { errors }
  } = useForm({
    defaultValues: agent
  });
  

  const onSubmit = (data) => {
    console.log(data);
  };
  
  const errorMessages = defineValidationRulesForMission(isEfForm, false);


  // TODO : rendre le champ tjrs visible obligatoire
  // Rajouter un champ adresse normée si adresse différente
  
  const [employer, setEmployer] = useState(agent.employer);
  const [isCivil, setIsCivil] = useState('');

  const toggleWorker = (event) => {
    setEmployer(event.target.id);
  }

  const toggleIsCivil = (event) => {
    setIsCivil(event.target.id);
  }

  ///-------------------------------------------------------------------------------------------------------------------------------------------------------
  
  const { vehicle: { vehicleTypes },
} = useSelector((state) => state);
  const generatePDF = () => {
    const a = getValues('om');
    
    dispatch(uploadFile({ data: {omId: omId , file: a}, step: 'om'}))
  }
  
  ///-------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Missionnaire</FormSectionTitle>
        <div className="form__section form__section--split">
          <p className="form__section-field-label">Qualité : </p>
          <RadioInput disabled id="Mme" formField="gender" label="Madame" register={register} />
          <RadioInput disabled id="M." formField="gender" label="Monsieur" register={register} />
          {/* <RadioInput disabled id="Mlle" formField="gender" label="Mademoiselle" register={register} /> */}
          {/* <RadioInput id="non-binary" formField="gender" label="Non Binaire" register={register} /> */}
        </div>
        <div className='form__section form__section--documents' id="other-fields">
          <div className='form__section-half'>
            <TextField
              id="firstname"
              disabled
              formField="firstname"
              label="Prénom"
              register={register}
              error={errors.firstname}
              required={errorMessages.firstname}
            /> 
          </div>
          <div className='form__section-half'>
            <TextField
              id="lastname"
              disabled
              formField="lastname"
              label="Nom de famille"
              register={register}
              error={errors.lastname}
              required={errorMessages.lastname}
            />
          </div>
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Adresses du Missionnaire</FormSectionTitle>
        <Address
          addressType='familiale'
          register={register}
          errors={errors}
          disabled={true}
        />
        <Address
          addressType='administrative'
          errors={errors}
          register={register}
          suffixe='Pro'
          disabled={true}
        />
      </div>
      <div className="form__section">
        <FormSectionTitle>Personnel</FormSectionTitle>
        <div className="form__section form__section--split" style={{alignItems: 'center'}}>
          <div className="form__section__half">
            <div className="form__section-field">
              <p className="form__section-field-label">Personnel</p>
                <RadioInput
                  register={register}
                  disabled
                  formField="employer"
                  id="unimes"
                  label="Unîmes"
                  required={errorMessages.unimes}
                  handler={toggleWorker}
                />
                <RadioInput
                  register={register}
                  disabled
                  formField="employer"
                  id="external"
                  label="Extérieur"
                  required={errorMessages.unimes}
                  handler={toggleWorker}
                />
            </div>
          </div>
          {employer === 'unimes' && (
            <div className="form__section__half" style={{width: '70%'}}>
              
              <TextField
                id="category"
                disabled
                formField="unimesCategory"
                label="Catégorie"
                register={register}
                error={errors.unimesCategory}
                required={errorMessages.unimesCategory}
              /> 
              <TextField
                id="status"
                disabled
                formField="unimesStatus"
                label="Statut"
                register={register}
                error={errors.unimesStatus}
                required={errorMessages.unimesStatus}
              /> 
              <TextField
                id="department"
                disabled
                formField="unimesDepartment"
                label="Service / département"
                register={register}
                error={errors.unimesDepartment}
                required={errorMessages.unimesDepartment}
              /> 
            </div>
          )}
          {employer === 'external' && (
            <div className="form__section__half" style={{width: '50%'}}>
              <div className="form__section-field">
                <p className="form__section-field-label">Fonctionnaire</p>
                  <RadioInput
                    register={register}
                    formField="civilWorker"
                    id="isCivil"
                    label="Oui"
                    required={errorMessages.civilWorker}
                    handler={toggleIsCivil}
                  />
                  <RadioInput
                    register={register}
                    formField="civilWorker"
                    id="isNotCivil"
                    label="Non"
                    required={errorMessages.civilWorker}
                    handler={toggleIsCivil}
                  />
              </div>
              {isCivil === 'isNotCivil' && (
                <TextField
                  id="other"
                  formField="externalWorker"
                  label="Autre (à préciser)"
                  register={register}
                  error={errors.externalWorker}
                  required={errorMessages.externalWorker}
                /> 
              )}
            </div>
          )}
        </div>
      </div>
      {/* <img src={agentSignature}></img> */}
      {apiMessage.data && <ApiResponse response={apiMessage} updateForm={areWeUpdatingData} />}
      <div className="form__section">
        <div className="form__section-field-buttons">
          <PDFDownloadLink document={<MyPDF data={currentOM} agent={agent} om={currentOM} vehicleTypes={vehicleTypes} />} fileName="somename.pdf">
            {({ blob, url, loading, error }) => loading ? 'Loading document...' : 'Download now!'            }
          </PDFDownloadLink>
          <BlobProvider document={<MyPDF agentSignature={agentSignature} data={currentOM} agent={agent} vehicleTypes={vehicleTypes} />}>
            {({ blob, url, loading, error }) => {

              const file = new File([blob], 'name', {type: 'mime'});
              
              setValue('om', file);
                
              return (
                <>
                  <button type='button' files={file} onClick={generatePDF}>HERE</button>
                </>
                );
            }}
          </BlobProvider>
        </div>
        
        <PDFViewer width="100%" height="100%">
          <MyPDF agentSignature={agentSignature} data={currentOM} agent={agent} vehicleTypes={vehicleTypes} />
        </PDFViewer>
      </div>
    </form>
    
  );
};

Identity.propTypes = {

};

export default Identity;
