import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import '../style.scss';

// Components
import OmPdf from 'src/components/PDF/OmPdf';
import Address from 'src/components/Fields/Address';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors & actions
import { uploadFile } from 'src/reducer/omForm';
import {  defineValidationRulesForMission } from 'src/selectors/formValidationsFunctions';


const Identity = ({ isEfForm }) => {
  
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  
  const { app: { countries },
    agent: { agent, agentProfessionalAddress, agentPersonalAddress, user},
    omForm: { currentOM },
    docs: { agentSignature },
    vehicle: { vehicleTypes },
  } = useSelector((state) => state);
  
  const agentFullData = {
    ...agent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };
  const {
    register,
    setValue,
    getValues,
    formState:
      { errors }
  } = useForm({ defaultValues: agentFullData});

  const errorMessages = defineValidationRulesForMission(isEfForm, false);
  
  const [employer, setEmployer] = useState(agent.employer);
  const [isCivil, setIsCivil] = useState('');

  const toggleWorker = (event) => {
    setEmployer(event.target.id);
  }

  const toggleIsCivil = (event) => {
    setIsCivil(event.target.id);
  }
  
  const generatePDF = () => {
    const file = getValues('om');
    const validationDate = Date.now();
    dispatch(uploadFile({ data: {docId: omId , file: file, agent: user, validationDate: validationDate}, step: 'om'}))
  }
  
  const [isPdfVisible, setIsPdfVisible] = useState(false)

  const toggleViewer = (event) => {

    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
  }

  return (
    <>
      <form className="form">
        <div className="form__section">
          <FormSectionTitle>Missionnaire</FormSectionTitle>
          <div className="form__section form__section--split">
            <p className="form__section-field-label">Qualité : </p>
            <RadioInput disabled id="Mme" formField="gender" label="Madame" register={register} />
            <RadioInput disabled id="M." formField="gender" label="Monsieur" register={register} />
          </div>
          <div className='form__section form__section--documents' id="other-fields">
            <div className='form__section-half'>
              <TextField
                id="firstname"
                disabled
                formField="firstname"
                label="Prénom"
                register={register}
              /> 
            </div>
            <div className='form__section-half'>
              <TextField
                id="lastname"
                disabled
                formField="lastname"
                label="Nom de famille"
                register={register}
              />
            </div>
          </div>
        </div>
        <div className="form__section">
          <FormSectionTitle>Adresses du Missionnaire</FormSectionTitle>
          <Address
            register={register}
            disabled
            countries={countries}
            title="Adresse familiale"
            stepNumber=''
          />
          <Address
            title="Adresse administrative"
            register={register}
            disabled
            countries={countries}
            stepNumber='Pro'
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
                    handler={toggleWorker}
                  />
                  <RadioInput
                    register={register}
                    disabled
                    formField="employer"
                    id="external"
                    label="Extérieur"
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
                /> 
                <TextField
                  id="status"
                  disabled
                  formField="unimesStatus"
                  label="Statut"
                  register={register}
                /> 
                <TextField
                  id="department"
                  disabled
                  formField="unimesDepartment"
                  label="Service / département"
                  register={register}
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
        <div className="form__section">
          <p className="form__section-recap form__section-recap--infos">
            <span>Attention :</span> en cas d'erreur dans vos données personnelles ou si votre situation a changé, veuillez vous rapprocher du Service DRH pour les mettre à jour.
          </p>
        </div>
        <div className="form__section">
          <div className="form__section-field-buttons" style={{display: 'flex', justifyContent: 'center'}}>
            <BlobProvider document={<OmPdf countries={countries} agentSignature={agentSignature} data={currentOM} agent={agentFullData} vehicleTypes={vehicleTypes} />}>
              {({ blob }) => {

                const file = new File([blob], currentOM.name, {type: 'pdf'});
                const fileUrl = URL.createObjectURL(file);
                
                setValue('om', file);

                return (
                  <>
                    <a href={fileUrl} download={currentOM.name + '.pdf'} style={{textAlign: 'center'}}>
                      <button type='button' files={file} onClick={generatePDF}>Valider les données <br /> et télécharger <br /> l'Ordre de Mission</button>
                    </a>
                    <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                      Visualiser <br /> le document
                    </button>
                  </>
                );
              }}
            </BlobProvider>
          </div>
          <Link to={"/utilisateur/" + user + "/mes-ordres-de-mission"} style={{display: 'block', marginBottom: '2rem', textAlign: 'center'}}>Retour au menu des Ordres de Mission</Link>
        </div>
      </form>
      {isPdfVisible && (
        <div className="pdf-viewer">
          <div className="pdf-viewer__nav">
            <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
          </div>
          <PDFViewer>
            <OmPdf countries={countries} agentSignature={agentSignature} data={currentOM} agent={agentFullData} vehicleTypes={vehicleTypes} />
          </PDFViewer>
        </div>
      )}
    </>
  );
};

Identity.propTypes = {

};

export default Identity;
