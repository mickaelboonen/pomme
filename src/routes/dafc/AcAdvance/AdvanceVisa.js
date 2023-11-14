import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLoaderData } from 'react-router-dom';
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
import InputValueDisplayer from 'src/routes/gestionnaire/DocValidation/InputValueDisplayer';

import { setValidationDate, setExistingValidationDate } from 'src/selectors/pdfFunctions';

// Actions
import { addOmMonitoringPdf } from 'src/reducer/omManager';
import VisaComponent from 'src/components/VisaComponent';
import FullPdf from 'src/components/PDF/fullPdf';
import ScienceEventPdf from 'src/components/PDF/ScienceEventPdf';
import CarAuthorizationPdf from 'src/components/PDF/CarAuthorizationPdf';
import DispensationPdf from 'src/components/PDF/DispensationPdf';

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

  const staticReasons = [
    {
      id: "time",
      label: "Gain de temps",
    },
    {
      id: "no-public-transports",
      label: "Absence de transport en commun",
    },
    {
      id: "materials-transporting",
      label: "Obligation de transport de matériel lourd, encombrant, fragile",
    },
    {
      id: "handicap",
      label: "Handicap",
    },
    {
      id: "carpooling",
      label: "Transport d'autres missionnaires",
    },
  ];


  console.log(om.advance);
  const { advance } = om;
  return (
    <form className='form'>
      <FormSectionTitle>Viser le document</FormSectionTitle>
      <div className="form__section">
        <VisaComponent
          data={data}
          user={user}
          watch={watch}
          gest={gest}
          isOm={isOm}
        />
        <TextareaField
          id="comments-field"
          label="Commentaires"
          formField="comments"
          register={register}
        />
      </div>
      <FormSectionTitle>Avance à verser</FormSectionTitle>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Montant de l'avance accordée"
            value={advance.advance_amount.toString() + ' euros.'}
          />
        </div>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Montant total estimé de la mission"
            value={advance.total_amount.toString() + ' euros.'}
          />
        </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Nombre de nuits"
            value={advance.nights_number.toString()}
          />
        </div>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Nombre de repas"
            value={advance.meals_number.toString()}
          />
        </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Montants des autres frais"
            value={advance.other_expenses_amount}
          />
        </div>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Justification des autres frais"
            value={advance.other_expenses_justification}
          />
        </div>
      </div>

        <HiddenField id="docId" value={data.id} register={register} />
        <HiddenField id="actor" value={user} register={register} />
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
              {data.transports.authorizations.length > 0 && data.transports.authorizations.map((auth) => (
                <CarAuthorizationPdf
                  key={'c-a-' + data.transports.authorizations.indexOf(auth)}
                  data={auth}
                  agent={agentFullData}
                  vehicleTypes={vehicleTypes}
                  reasons={staticReasons}
                />
              ))}
              {data.transports.dispensations.length > 0 && data.transports.dispensations.map((disp) => (
                <DispensationPdf
                  key={'d-' + data.transports.dispensations.indexOf(disp)}
                  data={disp}
                />
              ))}
              {data.mission.scientificEvents.length > 0 && data.mission.scientificEvents.map((event) => (
                <ScienceEventPdf
                  key={'s-e-' + data.mission.scientificEvents.indexOf(event)}
                  data={event}
                  agent={agentFullData}
                  creationDate={setExistingValidationDate(data.created_at)}
                />
              ))}
            </Document>
            }>
              {({ blob }) => (
                <>
                  <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}>
                    Valider le document
                  </button>
                    <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                      VOIR
                    </button>
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
              {data.transports.authorizations.length > 0 && data.transports.authorizations.map((auth) => (
                <CarAuthorizationPdf
                  key={'c-a-' + data.transports.authorizations.indexOf(auth)}
                  data={auth}
                  agent={agentFullData}
                  vehicleTypes={vehicleTypes}
                  reasons={staticReasons}
                />
              ))}
              {data.transports.dispensations.length > 0 && data.transports.dispensations.map((disp) => (
                <DispensationPdf
                  key={'d-' + data.transports.dispensations.indexOf(disp)}
                  data={disp}
                />
              ))}
              {data.mission.scientificEvents.length > 0 && data.mission.scientificEvents.map((event) => (
                <ScienceEventPdf
                  key={'s-e-' + data.mission.scientificEvents.indexOf(event)}
                  data={event}
                  agent={agentFullData}
                  creationDate={setExistingValidationDate(data.created_at)}
                />
              ))}
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
