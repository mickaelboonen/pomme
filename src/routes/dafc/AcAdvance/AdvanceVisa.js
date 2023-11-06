import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLoaderData } from 'react-router-dom';
import { FaEye, FaDownload, FaEyeSlash } from 'react-icons/fa';
import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';

// import '../style.scss';

// Components
import ButtonElement from 'src/components/Fields/ButtonElement';
import TextareaField from 'src/components/Fields/TextareaField';
import FileField from 'src/components/Fields/FileField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';
import OmPdf from 'src/components/PDF/OmPdf';
import OmAdvancePdf from 'src/components/PDF/OmAdvancePdf';

import { setValidationDate, setExistingValidationDate } from 'src/selectors/pdfFunctions';

// Actions
import { addOmMonitoringPdf } from 'src/reducer/omManager';

const AdvanceVisa = ({ data, user, gest, isOm, om}) => {

  const dispatch = useDispatch();

  const { app: { countries },
    vehicle: { vehicleTypes },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress, loader, signature}
  } = useSelector((state) => state);

  const {
    register,
    watch,
    setValue,
    clearErrors,
    setError,
    formState:
    { errors },
  } = useForm({
    defaultValues: {
      savedSignature: (signature && signature.hasOwnProperty('link')) ? true : false
    }
  });

  const agentFullData = {
    ...tmpAgent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };


  const submitFunction = (data) => {

    if (data.savedSignature) {
      if (signature === "") {
        setError('signature', { type: 'custom', message: 'Aucune signature enregistrée dans le profil.'})
        setValue('savedSignature', false)
        return;
      }
      delete data.savedSignature;
      data.signature = signature;
    }

    dispatch(addOmMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampOm' : 'rejectAcAdvance'}));

    
  };
  let signatureFilename = signature !== null ? signature.name : '';

  const [viewer, setViewer] = useState('');
  const isFileTooLong = data.file.length > 2000000 ? true : false;

  const handleClick = () => {
    viewer === '' ? setViewer(data.file) : setViewer('');
  }
  const savedSignature = watch('savedSignature');
  
  
  const [isPdfVisible, setIsPdfVisible] = useState(false)

  const toggleViewer = (event) => {
    
    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
  }
  
  const handleSignatureCheckbox = () => {
    clearErrors('signature');
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
        <HiddenField id="docId" value={data.id} register={register} />
        <HiddenField id="actor" value={user} register={register} />
      </div>
      {gest.roles.indexOf('MANAGER') && (
        <div className="form__section">
        <FormSectionTitle>SIGNATURE</FormSectionTitle>
        <div className="form__section-field">
          <CheckboxInput
            register={register}
            formField="savedSignature"
            handler={handleSignatureCheckbox}
            id="saved-signature-field"
            label="Utiliser la signature enregistrée dans mon profil"
          />
        </div>

        {!savedSignature && (
          <FileField 
            register={register}
            formField="signature"
            id="signature-field"
            label="Signature"
            error={errors.signature}
            setValue={setValue}
            fileName={signatureFilename}
          />
        )}
        {/* { errors.signature && <p className="form__section-field-error form__section-field-error--open">{errors.signature.message}</p>} */}

        </div>
      )}
      <div className="form__section">
        <FormSectionTitle>DÉCISION FINALE</FormSectionTitle>
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="action">Valider de la demande d'avance</label>
          <RadioInput
            id="validate"
            formField="action"
            label="Oui"
            register={register}
            required="Veuillez valider ou non la demande d'avance."
          />
          <RadioInput
            id="reject"
            formField="action"
            label="Non"
            register={register}
            required="Veuillez valider ou non la demande d'avance."
          />
          {errors.action && <p className="form__section-field-error form__section-field-error--open">{errors.action.message}</p>}
        </div>

      </div>

      <div className='form__section'>
        <div className="form__section-field-buttons" style={{textAlign: 'center'}}>
          {!loader &&(
            <BlobProvider document={
              <Document>
                <ValidationMonitoringPdf
                  om={data}
                  user={user}
                  agent={gest}
                  isGest={false}
                  gestData={watch()}
                  isOm={isOm}
                />
                <OmPdf
                  countries={countries}
                  data={om}
                  agent={agentFullData}
                  vehicleTypes={vehicleTypes}
                  manager={om.management}
                  signature={''}
                />
                {data.advance.advance && (
                  <OmAdvancePdf
                    data={data.advance}
                    acValidationDate={setValidationDate()}
                    validationDate={''}
                    agent={agentFullData}
                    gest={om.management.workflow.find((actor) => actor.current_status === 3)}
                    acSignature={signature ? signature.link : ''}
                  />
                )}
              </Document>
            }>
              {({ blob }) => (
                <>
                  <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}>
                    Valider le document
                  </button>
                  {/* {gest.roles.indexOf('MANAGER') && (
                    <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                      VOIR
                    </button>
                  )} */}
                </>
              )}
            </BlobProvider>
          )}
        </div>
      </div>
      <div className="form__section">
        <div className='form__section-field-buttons form__section-field-buttons--solo'>
          <ButtonElement
            // type="button"
            isLink
            link={"/gestionnaire/" + encodeURIComponent(isOm ? 'ordres-de-mission-à-signer' : 'états-de-frais-à-signer')}
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
            <Document>
            <ValidationMonitoringPdf
                  om={data}
                  user={user}
                  agent={gest}
                  isGest={false}
                  gestData={watch()}
                  docType='advance'
                />
                <OmPdf
                  countries={countries}
                  data={om}
                  agent={agentFullData}
                  vehicleTypes={vehicleTypes}
                  manager={om.management}
                  signature={''}
                />

              <OmAdvancePdf
                data={data.advance}
                acValidationDate={setValidationDate()}
                validationDate={''}
                agent={agentFullData}
                gest={om.management.workflow.find((actor) => actor.current_status === 3)}
                acSignature={signature ? signature.link : ''}
              />
            </Document>
          </PDFViewer>
        </div>
      )}
    </form>    
  );
};

AdvanceVisa.propTypes = {
};

export default AdvanceVisa;
