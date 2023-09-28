import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import { FaEye, FaDownload, FaEyeSlash } from 'react-icons/fa';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import '../style.scss';

// Components
import TextareaField from 'src/components/Fields/TextareaField';
import ButtonElement from 'src/components/Fields/ButtonElement';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import { useDispatch } from 'react-redux';
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';

// Actions
import {  addEfMonitoringPdf,addOmMonitoringPdf } from 'src/reducer/omManager';

const OmVisa = ({ data, user, agent, isOm }) => {

  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleSubmit,
    formState:
    { errors },
  } = useForm();
  
  const submitFunction = (data) => {

    console.log(data);
    if (isOm) {
      dispatch(addOmMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampOm' : 'rejectVisaOm'}));
    }
    else {
          dispatch(addEfMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampEf' : 'rejectVisaEf'}));
    }

    
  };

  const [viewer, setViewer] = useState('');
  const isFileTooLong = data.file.length > 2000000 ? true : false;

  const handleClick = () => {
    viewer === '' ? setViewer(data.file) : setViewer('');
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
    <form className='form'>
      <FormSectionTitle>Viser le document</FormSectionTitle>
      <div className="form__section">
        <div className="form__section-field">
          <div className='my-documents__files-buttons'>
            {!isFileTooLong && (
              <button onClick={handleClick} type="button">
                <FaEye className='my-documents__files-buttons-icon'/>
                <p>Voir le document</p>
              </button>
            )}
            <a  href={data.file} download={`${data.name}.pdf`} >
              <FaDownload className='my-documents__files-buttons-icon' /> Télécharger le document
            </a>
          </div>
          {isFileTooLong && <p style={{textAlign: 'center', marginBottom: '1rem'}}>Le fichier est trop lourd pour être visualisé dans le navigateur. Veuillez le télécharger.</p>}
        </div>
        {viewer !== '' && (
          <div style={{height: '600px', marginBottom: '1rem'}}>
            <embed
              className="form-layout__viewer-pdf__embed"
              src={viewer}
              width="100%"
              height="1200px"
              type="application/pdf"
            />
          </div>
        )}
        <TextareaField 
          id="comments-field"
          label="Commentaires"
          formField="comments"
          register={register}
        />
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="action">Valider de l'Ordre de Mission</label>
          <RadioInput
            id="validate"
            formField="action"
            label="Oui"
            register={register}
            required="Veuillez valider ou non l'Ordre de Mission."
          />
          <RadioInput
            id="reject"
            formField="action"
            label="Non"
            register={register}
            required="Veuillez valider ou non l'Ordre de Mission."
          />
          {errors.action && <p className="form__section-field-error form__section-field-error--open">{errors.action.message}</p>}
        </div>
        <HiddenField id="docId" value={data.id} register={register} />
        <HiddenField id="actor" value={user} register={register} />

        <div className="form__section-field-buttons" style={{textAlign: 'center'}}>
          <BlobProvider document={<ValidationMonitoringPdf om={data} user={user} agent={agent} isGest={false} gestData={watch()} isOm={isOm} />}>
            {({ blob }) => (
              <>
                <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}>
                {/* <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); handleSubmit(onSubmit);submitFunction(data)}}> */}
                  Valider le document
                </button>
                 <a href={URL.createObjectURL(new File([blob], data.name, {type: 'pdf'}))} download={'currentOM.name' + '.pdf'} style={{textAlign: 'center'}}>
                   <button type='button' files={new File([blob], data.name, {type: 'pdf'})} onClick={() => {}}>DOWNLOAD</button>
                 </a>
                <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                  VOIR
                </button>
              </>
            )}
          </BlobProvider>
          <ButtonElement
            type="button"
            label="Retour"
          />
        </div>
      </div>
      
      {isPdfVisible && (
        <div className="pdf-viewer">
          <div className="pdf-viewer__nav">
            <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
          </div>
          <PDFViewer>
            <ValidationMonitoringPdf om={data} user={user} agent={agent} isGest={false} gestData={watch()} />
          </PDFViewer>
        </div>
      )}
    </form>    
  );
};

OmVisa.propTypes = {
};

export default OmVisa;
