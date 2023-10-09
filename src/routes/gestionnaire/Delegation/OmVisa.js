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

import { setValidationDate } from 'src/selectors/pdfFunctions';

// Actions
import { getSavedFileName } from 'src/selectors/formDataGetters';
import {  addEfMonitoringPdf,addOmMonitoringPdf } from 'src/reducer/omManager';
import { getDDMMYYDate } from '../../../selectors/dateFunctions';

const OmVisa = ({ data, user, gest, isOm, om}) => {

  const dispatch = useDispatch();
  const { app: { countries },
    vehicle: { vehicleTypes },
    tmp: { agent, agentProfessionalAddress, agentPersonalAddress, loader, signature}
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
  //---------------------------------------------------------------------------

  const validationDate = setValidationDate();
  // console.log(validationDate);
  const nowTimestamp = Date(om.created_at);
  const now = new Date(om.created_at);
  const date = getDDMMYYDate(now, '-');
  const splitDate = now.toString().split(' ');
  const creationDate = date + ' ' + splitDate[4];
  // console.log("HERE  = ", date + ' ' + splitDate[4]);
    
  // return date + ' ' + splitDate[4];

  const agentFullData = {
    ...agent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };


  // console.log(agentFullData);
  //---------------------------------------------------------------------------
  const submitFunction = (data) => {

    if (data.savedSignature) {
      if (signature === "") {
        setError('signature', { type: 'custom', message: 'Aucune signature enregistrée dans le profil.'})
        setValue('savedSignature', false)
        return;
      }
      delete data.savedSignature;
      data.signature = agentDocuments.signature;
    }
    console.log(data);
    console.log(data.file);
    // data.file = new File([<BlobProvider document={<ValidationMonitoringPdf om={data} user={user} agent={agent} isGest={false} gestData={data} isOm={isOm} />} />], om.name, {type: 'pdf'})
    data.file = new File([<BlobProvider document={<OmPdf validationDate={validationDate} countries={countries} data={om} agent={agentFullData} vehicleTypes={vehicleTypes} />} />], om.name, {type: 'pdf'})

    console.log(data.file);
    // return;
    if (isOm) {
      dispatch(addOmMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampOm' : 'rejectVisaOm'}));
    }
    else {
      dispatch(addEfMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampEf' : 'rejectVisaEf'}));
    }

    
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
          {/* <BlobProvider document={<ValidationMonitoringPdf om={data} user={user} agent={gest} isGest={false} gestData={watch()} isOm={isOm} />}> */}
            {/* {({ blob }) => ( */}
              {/* <> */}
                {/* <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}> */}
                  {/* Valider le document */}
                {/* </button> */}
                {/* {gest.roles.indexOf('MANAGER') && ( */}
                  {/* <> */}
                    {/* <a href={URL.createObjectURL(new File([blob], data.name, {type: 'pdf'}))} download={'currentOM.name' + '.pdf'} style={{textAlign: 'center'}}> */}
                       {/* <button type='button' files={new File([blob], data.name, {type: 'pdf'})} onClick={() => {}}>DOWNLOAD</button> */}
                     {/* </a> */}
                    {/* <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}> */}
                      {/* VOIR */}
                    {/* </button> */}
                  {/* </> */}
                {/* )} */}
              {/* </> */}
            {/* )} */}
          {/* </BlobProvider> */}
          { !loader &&(
          <BlobProvider document={
            <Document>
              <ValidationMonitoringPdf om={data} user={user} agent={gest} isGest={false} gestData={watch()} isOm={isOm} />
              <OmPdf creationDate={creationDate} validationDate={validationDate} countries={countries} data={om} agent={agentFullData} vehicleTypes={vehicleTypes} manager={watch()}signature={signature.link}/>
            </Document>
          }>
            {({ blob }) => (
              <>
                <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}>
                {/* <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); handleSubmit(onSubmit);submitFunction(data)}}> */}
                  Valider le document
                </button>
                {gest.roles.indexOf('MANAGER') && (
                  <>
                    <a href={URL.createObjectURL(new File([blob], data.name, {type: 'pdf'}))} download={om.name + '.pdf'} style={{textAlign: 'center'}}>
                       <button type='button' files={new File([blob], data.name, {type: 'pdf'})}>DOWNLOAD</button>
                     </a>
                    <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                      VOIR
                    </button>
                  </>
                )}
              </>
            )}
          </BlobProvider>
          )}

          {/* <ButtonElement
            type="button"
            label="Retour"
          /> */}
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
              <ValidationMonitoringPdf om={data} user={user} agent={gest} isGest={false} gestData={watch()} isOm={isOm} />
              <OmPdf creationDate={creationDate} validationDate={validationDate} countries={countries} data={om} agent={agentFullData} vehicleTypes={vehicleTypes} manager={watch()}signature={signature.link}/>
              <OmAdvancePdf data={data.advance} validationDate={validationDate} agent={agentFullData} creationDate={creationDate} gest={om.management.workflow.find((actor) => actor.current_status === 3)} signature={signature.link} />
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
