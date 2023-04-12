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
import { createDispensation, uploadFile } from 'src/reducer/omForm';

import './style.scss';

// Actions
import { clearMessage } from 'src/reducer/app';
import CarAuthorizationPdf from "src/components/PDF/CarAuthorizationPdf";
import LoaderCircle from "src/components/LoaderCircle";



const Derogation = () => {
  
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const dispatch = useDispatch();
  const omId = loaderData.searchParams.get('omId');
  const types = loaderData.searchParams.get('type').split(',');

  let { 
    app : { apiMessage },
    agent : { agent },
    docs: { agentSignature }
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
    clearErrors,
    setError,
    formState:
    { errors },
  } = useForm({
    defaultValues: {
      type: dispensationTitle
    }
  });

  const onSubmit = (data) => {
    
    let errorCount = 0;

    if (data.reasons === "") {
      setError('reasons', {type: 'custom', message: "Merci d'expliquer les raisons de votre demande de dérogation."})
      errorCount++;
    }

    if (data.rule === "") {
      setError('rule', {type: 'custom', message: "Merci de renseigner la règle du guide des missions daisant l'objet de la demande de dérogation."})
      errorCount++;
    }

    if (errorCount > 0) {
      return;
    }
    
    clearErrors();
    dispatch(uploadFile({data: data, step: 'dispensation', docType: 'dispensation'}))
  };

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
      <div className="form-container form-container--vehicle">
        <PageTitle>Demande de prise en charge d’une dépense par voie dérogatoire au GDM </PageTitle>
        { agentSignature && (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__section">
              <FormSectionTitle>Dérogation</FormSectionTitle>
              <HiddenField id="docId" value={omId} register={register} />
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
              <a
                href="https://nuxeo.unimes.fr/nuxeo/ui/#!/browse/default-domain/workspaces/Les%20procedures%20formulair/Missions/Guide%20des%20missions%20UN%C3%8EME"
                target="_blank"
                style={{display: 'block', width: '100%', textAlign: 'center', marginBottom: '1rem', textDecoration: 'underline', fontStyle: 'italic'}}
              >
                Lien vers le Guide des Missions
              </a>
            </div>
            <div className="form__section-field" id="external-signature-button">
              <div className="form__section-field-button">
                <BlobProvider document={<DispensationPdf agentSignature={agentSignature} agent={agent} data={watch()}/>}>
                  {({ blob }) => {
      
                    const file = new File([blob], new Date().toLocaleDateString() + dispensationTitle.replace(' ', '-'), {type: 'pdf'});
                    const fileUrl = URL.createObjectURL(file);
                    
                    return (
                      <>
                      <button type="button" onClick={() => { const data = watch(); data.file = file; onSubmit(data)}}>
                        Valider la demande
                      </button>
                      <button type="button" id="viewer-opener" onClick={toggleViewer}>
                        Visualiser le PDF
                      </button>
                      </>
                    );
                  }}
                </BlobProvider>
              </div>
              {/* {needsPdf && <p className="form__section-field-label form__section-field-label--car-form">Veuillez télécharger le PDF de la demande et le faire signer aux personnes extérieures concernées</p>}
              {needsPdf && <a href={'/modifier-un-document/ordre-de-mission?etape=2&id='+ omId}>Retourner au formulaire de l'ordre de mission</a>} */}
            </div>
            {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />}
          </form>
        )}
        { !agentSignature && (
          <LoaderCircle />
        )}
      </div>
      {isPdfVisible && (
        <div className="pdf-viewer">
          <div className="pdf-viewer__nav">
            <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
          </div>
          <PDFViewer>
            <DispensationPdf agentSignature={agentSignature} agent={agent} data={watch()}/>
          </PDFViewer>
        </div>
      )}
    </>
  );
};

Derogation.propTypes = {

};

export default Derogation;

