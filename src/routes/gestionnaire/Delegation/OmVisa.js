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
import { stampOm } from 'src/reducer/omManager';
import { addOmMonitoringPdf } from 'src/reducer/omManager';

const OmVisa = ({ data, user, agent }) => {

  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleSubmit,
    formState:
    { errors },
  } = useForm();

  // const { }
  console.log(data);
  const onSubmit = (data) => {

    console.log(data);
    dispatch(addOmMonitoringPdf({data: data}));
    // dispatch(stampOm(data))
  };

  const [viewer, setViewer] = useState('');
    
  const handleClick = () => {
    const formElement = document.querySelector('.form-layout__data');
    if (viewer === '') {
      setViewer(data.file)
    formElement.style = "";
    formElement.style.width= '1400px'
    }
    else {
      setViewer('')
      formElement.style = "";
    }
    
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
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <FormSectionTitle>Viser le document</FormSectionTitle>

      <div className="form__section">
        <div className="form__section-field" style={{display: 'flex'}}>
          <div className='my-documents__files-buttons'>
            <button onClick={handleClick} type="button">
              <FaEye className='my-documents__files-buttons-icon'/>
              <p>Voir le document</p>
            </button>
            <a  href={data.file} download={`${data.name}.pdf`} >
              <FaDownload className='my-documents__files-buttons-icon' /> Télécharger le document
            </a>
          </div>
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
          <ButtonElement
            type="submit"
            label="Valider le document"
          />
          <ButtonElement
            type="button"
            label="Retour"
          />
          <div className="form__section-field">
            {/* <ButtonElement
              type="submit"
              label="Valider l'ordre de mission"
            /> */}
            <BlobProvider document={<ValidationMonitoringPdf om={data} agent={agent} isGest={false} gestData={watch('comments')} />}>
              {({ blob }) => {          
                const file = new File([blob], "blol", {type: 'pdf'});
                
                const fileUrl = URL.createObjectURL(file);
                const data = watch();
                data.file = file;
                
                return (
                  <>
                    <button type="button" onClick={() => { const data = watch(); data.file = file; submitFunction(data)}}>
                      Valider la demande
                    </button>
                    <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                      Visualiser <br /> le document
                    </button>
                  </>
                );
              }}
            </BlobProvider>
          </div>
          {isPdfVisible && (
            <div className="pdf-viewer" style={{height:'100vh'}}>
              <div className="pdf-viewer__nav">
                <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
              </div>
              <PDFViewer className='form__section-recap'>
                <ValidationMonitoringPdf om={data} agent={agent} isGest={false} gestData={watch('comments')} user={user}/>
              </PDFViewer>
            </div>
          )}
        </div>
      </div>
    </form>    
  );
};

OmVisa.propTypes = {
};

export default OmVisa;
