import { useForm } from "react-hook-form";
import classNames from "classnames";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import './style.scss';
import PageTitle from 'src/components/PageTitle';
import ApiResponse from 'src/components/ApiResponse';
import TextField from 'src/components/Fields/TextField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';
import TextareaField from 'src/components/Fields/TextareaField';

import DispensationPdf from "src/components/PDF/DispensationPdf";
import { createDerogation, uploadFile } from 'src/reducer/omForm';

import './style.scss';

// Actions
import { clearMessage } from 'src/reducer/app';
import CarAuthorizationPdf from "src/components/PDF/CarAuthorizationPdf";
import LoaderCircle from "src/components/LoaderCircle";



const Derogation = () => {
  
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const dispatch = useDispatch();
  const { isSideFormInDB } = useSelector((state) => state.omForm);

  let { 
    app : { apiMessage },
    agent : { agent },
    docs: { agentSignature },
    vehicle: { needsPdf ,vehicleTypes, vehicles, formDefaultValues, loader },
  } = useSelector((state) => state);

  const types = loaderData.searchParams.get('type').split(',');
  const omId = loaderData.searchParams.get('omId');
  let dispensationTitle = 'Demande de dérogation pour '

  if (types.length === 2) {
    dispensationTitle += "le train et l'avion";
  }
  else if (types.length ===1) {
    if (types[0] === 'train') {
      dispensationTitle += "le train";
      
    }
    else if (types[0] === 'plane') {
      dispensationTitle += "l'avion";
    }
    else if (types[0] === 'taxi') {
      dispensationTitle += "le taxi";
    }
  }
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm({
    defaultValues: {
      type: dispensationTitle
    }
  });

  useEffect(() => {
    if (isSideFormInDB) {
      dispatch(clearSideForm());
      navigate('/modifier-un-document/ordre-de-mission?etape=2&id=' + omId);
    }
  }, [isSideFormInDB])

  const onSubmit = (data) => {
    data.type = dispensationTitle;
    console.log(data);

    dispatch(createDerogation(data));
    // TODO : Process Data
    // On récupère les données de l'utilisateur et on envoie à la validation.
    // navigate('/nouveau-document/ordre-de-mission?etape=2');
  };
  return (
    <div className="form-container form-container--vehicle">
      <PageTitle>Demande de prise en charge d’une dépense par voie dérogatoire au GDM </PageTitle>
      { agentSignature && (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__section">
            <FormSectionTitle>Dérogation</FormSectionTitle>
            <HiddenField id="omId" value={omId} register={register} />
            <TextField
              register={register}
              disabled={true}
              id="type-field"
              label="Type de dérogation"
              formField="type"
              value={dispensationTitle}
            />
            <TextareaField 
              register={register}
              id="reasons-field"
              label="Raisons de la dérogation"
              formField="reasons"
              required="Merci de renseigner les raisons de la dérogation"
              error={errors.reasons}
            />
            <TextareaField 
              register={register}
              id="rule-field"
              label="Règle du guide des missions faisant l’objet de la demande de dérogation"
              formField="rule"
              required="Merci de renseigner la règle du GDM faisant l’objet de la demande de dérogation"
              placeholder=""
              error={errors.rule}
            />
          </div>
          <div className="form__section">
            <div className="form__section-field-button">
              <ButtonElement
                type="submit"
                label="Envoyer la demande"          
              />
            </div>
          </div>
          <div className="form__section-field" id="external-signature-button">
              <div className="form__section-field-button">
            
                  <BlobProvider document={<DispensationPdf agentSignature={agentSignature} agent={agent} data={watch()}/>}>
                    {({ blob }) => {
        
                      const file = new File([blob], new Date().toLocaleDateString() + '-demande-d-autorisation-de-véhicule', {type: 'pdf'});
                      const fileUrl = URL.createObjectURL(file);
                      
                      return (
                        <>
                        <button type="button" onClick={() => { const data = watch(); data.file = file; onSubmit(data)}}>
                          Valider la demande
                        </button>
                        <div style={{width:"100%", height:"100vh"}}>
                          <PDFViewer>
                            <DispensationPdf agentSignature={agentSignature} agent={agent} data={watch()}/>
                          </PDFViewer>
                        </div>
                        </>
                      );
                    }}
                  </BlobProvider>
              </div>
              {needsPdf && <p className="form__section-field-label form__section-field-label--car-form">Veuillez télécharger le PDF de la demande et le faire signer aux personnes extérieures concernées</p>}
              {needsPdf && <a href={'/modifier-un-document/ordre-de-mission?etape=2&id='+ omId}>Retourner au formulaire de l'ordre de mission</a>}
            </div>
            {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />}

        </form>
      )}
      { !agentSignature && (
        <LoaderCircle />
      )}
    </div>
  );
};

Derogation.propTypes = {

};

export default Derogation;

