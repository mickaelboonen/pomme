import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Link, useLoaderData } from 'react-router-dom';
import { FaEye, FaDownload, FaEyeSlash } from 'react-icons/fa';
import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';

import '../style.scss';

// Components
import TextareaField from 'src/components/Fields/TextareaField';
import ButtonElement from 'src/components/Fields/ButtonElement';
import FileField from 'src/components/Fields/FileField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import { useDispatch, useSelector } from 'react-redux';
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';
import OmPdf from 'src/components/PDF/OmPdf';
import OmAdvancePdf from 'src/components/PDF/OmAdvancePdf';

import { setValidationDate, setExistingValidationDate} from 'src/selectors/pdfFunctions';

// Actions
import { getSavedFileName } from 'src/selectors/formDataGetters';
import {  addEfMonitoringPdf,addOmMonitoringPdf } from 'src/reducer/omManager';
import { getDDMMYYDate } from '../../../selectors/dateFunctions';

const OmVisa = ({ data, user, gest, isOm, om}) => {

  const dispatch = useDispatch();
  const { app: { countries },
    vehicle: { vehicleTypes },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress, loader, signature, acSignature}
  } = useSelector((state) => state);
  // console.log(signature);
  const {
    register,
    watch,
    handleSubmit,
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

const currentActor = om.management.workflow.find((actor) => actor.agent === user);
const needsSignature = om.management.workflow.indexOf(currentActor) === om.management.workflow.length - 1;
//---------------------------------------------------------------------------

  // console.log("errors = ", errors);
  const agentFullData = {
    ...tmpAgent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };


  // console.log(agentFullData);
  //---------------------------------------------------------------------------
  const submitFunction = (data) => {
    console.log("I AM HERE");
    let errorCount = 0;
    console.log(data);
    // return;
    if (data.savedSignature) {
      if (signature === "") {
        setError('signature', { type: 'custom', message: 'Aucune signature enregistrée dans le profil.'})
        setValue('savedSignature', false)
        errorCount++;
      }
      delete data.savedSignature;
      data.signature = signature;
    }
    else {
      if (data.signature instanceof File === false) {
        setError('signature', { type: 'custom', message: "Aucune signature n'a été fournie pour valider l'OM."})
        errorCount++;
      }
    };

    if (data.action === null) {
      setError('action', { type: 'custom', message: "Veuillez valider ou rejeter l'ordre de mission."})
      errorCount++;
    }

    console.log("errorCount = ", errorCount);
    if (errorCount > 0) {
      console.log("here ? ");
      return;
    }

    if (isOm) {
      dispatch(addOmMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampOm' : 'rejectVisaOm'}));
    }
    else {
      dispatch(addEfMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampEf' : 'rejectVisaEf'}));
    }

    

}
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
      {needsSignature && (
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
                  // creationDate={creationDate}
                  // validationDate={validationDate}
                  countries={countries}
                  data={om}
                  agent={agentFullData}
                  vehicleTypes={vehicleTypes}
                  manager={om.management}
                  signature={signature ? signature.link : ''}
                />
                {data.advance.advance && (
                  <OmAdvancePdf
                    data={data.advance}
                    validationDate={needsSignature ? setValidationDate() : ''}
                    agent={agentFullData}
                    // creationDate={creationDate}
                    gest={om.management.workflow.find((actor) => actor.current_status === 3)}
                    signature={signature ? signature.link : ''}
                    acSignature={acSignature ? acSignature.link : ''}
                    acValidationDate={setExistingValidationDate(om.management.workflow.find((actor) => actor.role === "Agent Comptable").validation_date)}
                    />
                )}
              </Document>
            }>
              {({ blob }) => (
                <>
                  <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}>
                    Valider le document
                  </button>
                  {gest.roles.indexOf('MANAGER') && (
                    <>
                      {/* <a href={URL.createObjectURL(new File([blob], data.name, {type: 'pdf'}))} download={om.name + '.pdf'} style={{textAlign: 'center'}}> */}
                        {/* <button type='button' files={new File([blob], data.name, {type: 'pdf'})}>DOWNLOAD</button> */}
                      {/* </a> */}
                      <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                        VOIR
                      </button>
                    </>
                  )}
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
                isOm={isOm}
              />
              <OmPdf
                // creationDate={creationDate}
                // validationDate={validationDate}
                countries={countries}
                data={om}
                agent={agentFullData}
                vehicleTypes={vehicleTypes}
                manager={om.management}
                signature={signature ? signature.link : ''}
              />
              {data.advance.advance && (
                <OmAdvancePdf
                  data={data.advance}
                  validationDate={needsSignature ? setValidationDate() : ''}
                  agent={agentFullData}
                  // creationDate={creationDate}
                  gest={om.management.workflow.find((actor) => actor.current_status === 3)}
                  signature={signature ? signature.link : ''}
                  acSignature={acSignature ? acSignature.link : ''}
                  acValidationDate={setExistingValidationDate(om.management.workflow.find((actor) => actor.role === "Agent Comptable").validation_date)}
                  />
              )}
            </Document>
          </PDFViewer>
        </div>
      )}
    </form>    
  );
};

OmVisa.propTypes = {
};

export default OmVisa;
