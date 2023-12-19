import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
// import { Link, useLoaderData } from 'react-router-dom';
// import { FaEye, FaDownload, FaEyeSlash } from 'react-icons/fa';
import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';
import '../style.scss';

// Components
// import TextareaField from 'src/components/Fields/TextareaField';
// import ButtonElement from 'src/components/Fields/ButtonElement';
// import FileField from 'src/components/Fields/FileField';
// import CheckboxInput from 'src/components/Fields/CheckboxInput';
// import FormSectionTitle from 'src/components/FormSectionTitle';
// import RadioInput from 'src/components/Fields/RadioInput';
// import HiddenField from 'src/components/Fields/HiddenField';
import { useDispatch, useSelector } from 'react-redux';
// import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';
import OmPdf from 'src/components/PDF/OmPdf';
import OmAdvancePdf from 'src/components/PDF/OmAdvancePdf';

import Decision from 'src/components/Visas/Decision';
import Signature from 'src/components/Visas/Signature';
import VisaViewer from 'src/components/Visas/VisaViewer';
import VisaHiddenFields from 'src/components/Visas/VisaHiddenFields';
import ReturnLink from 'src/components/Visas/ReturnLink';

import OneFileForm from 'src/components/OneFileForm';

import { setValidationDate, setExistingValidationDate} from 'src/selectors/pdfFunctions';

// Actions
// import { getSavedFileName } from 'src/selectors/formDataGetters';
import {  addEfMonitoringPdf,addOmMonitoringPdf } from 'src/reducer/omManager';
// import { getDDMMYYDate } from '../../../selectors/dateFunctions';
import ScienceEventPdf from 'src/components/PDF/ScienceEventPdf';
import CarAuthorizationPdf from 'src/components/PDF/CarAuthorizationPdf';
import DispensationPdf from 'src/components/PDF/DispensationPdf';
import classNames from 'classnames';
import Magnifier from '../../../components/Visas/Magnifier';

const OmVisa = ({ data, user, gest, isOm, om}) => {

  const dispatch = useDispatch();
  const {
    docs: { isModalOpen },
    app: { countries },
    vehicle: { vehicleTypes },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress, loader, signature, acSignature, researchSignature}
  } = useSelector((state) => state);

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


  //---------------------------------------------------------------------------
  const submitFunction = (data) => {
 // console.log("I AM HERE");
    let errorCount = 0;
    // console.log(data, needsSignature);
    // return;
    if (needsSignature) {
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
  
    }

    if (data.action === null) {
      setError('action', { type: 'custom', message: "Veuillez valider ou rejeter l'ordre de mission."})
      errorCount++;
    }

    if (errorCount > 0) {
   // console.log("here ? ");
      return;
    }

    if (isOm) {
      dispatch(addOmMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampOm' : 'rejectVisaOm'}));
    }
    else {
      dispatch(addEfMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampEf' : 'rejectVisaEf'}));
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
  

  const [isFormMagnified, setIsFormMagnified] = useState(false);
  const handleClickOnGlass = () =>  {
    setIsFormMagnified(!isFormMagnified);
  }


  return (
    <>
      <form className={classNames('form', {'form--magnified': isFormMagnified})}>
        <Magnifier isFormMagnified={isFormMagnified} handleClickOnGlass={handleClickOnGlass} />
        <VisaViewer
          data={data}
          user={user}
          watch={watch}
          gest={gest}
          register={register}
        />        
        <VisaHiddenFields id={data.id} user={user} register={register} />
        {needsSignature && (
          <Signature
            register={register}
            signature={signature}
            user={user}
            clearErrors={clearErrors}
            watch={watch}
          />
        )}
        <Decision
          register={register}
          errors={errors}
        />
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
                    signature={signature ? signature.link : ''}
                  />
                  {data.advance.advance && (
                    <OmAdvancePdf
                      data={data.advance}
                      validationDate={needsSignature ? setValidationDate() : ''}
                      agent={agentFullData}
                      gest={om.management.workflow.find((actor) => actor.current_status === 3)}
                      signature={signature ? signature.link : ''}
                      acSignature={acSignature ? acSignature.link : ''}
                      acValidationDate={setExistingValidationDate(om.management.workflow.find((actor) => actor.role === "Agent Comptable").validation_date)}
                      />
                  )}
                  {data.transports.authorizations.length > 0 && data.transports.authorizations.map((auth) => (
                    <CarAuthorizationPdf
                      key={'c-a-' + data.transports.authorizations.indexOf(auth)}
                      data={auth}
                      agent={agentFullData}
                      vehicleTypes={vehicleTypes}
                      reasons={staticReasons}
                      signature={signature ? signature.link : ''}
                      gest={om.management.workflow.find((actor) => om.management.workflow.indexOf(actor) === om.management.workflow.length - 1 && actor.agent === user)}
                  
                    />
                  ))}
                  {data.transports.dispensations.length > 0 && data.transports.dispensations.map((disp) => (
                    <DispensationPdf
                      key={'d-' + data.transports.dispensations.indexOf(disp)}
                      data={disp}
                      signature={signature ? signature.link : ''}
                      gest={om.management.workflow.find((actor) => om.management.workflow.indexOf(actor) === om.management.workflow.length - 1 && actor.agent === user)}
                  
                    />
                  ))}
                  {data.mission.scientificEvents.length > 0 && data.mission.scientificEvents.map((event) => (
                    <ScienceEventPdf
                      key={'s-e-' + data.mission.scientificEvents.indexOf(event)}
                      data={event}
                      agent={agentFullData}
                      creationDate={setExistingValidationDate(data.created_at)}
                      signature={researchSignature ? researchSignature.link : ''}
                      gest={om.management.workflow.find((actor) => actor.current_status === 7)}
                    />
                  ))}
                </Document>
              }>
                {({ blob }) => (
                  <>
                    <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}>
                      Valider le document
                    </button>
                    {/* <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}> */}
                      {/* VOIR */}
                    {/* </button> */}
                  </>
                )}
              </BlobProvider>
            )}
          </div>
        </div>
        <ReturnLink
          link={"/gestionnaire/" + encodeURIComponent(isOm ? 'ordres-de-mission-à-signer' : 'états-de-frais-à-signer')}
        />
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
                  signature={signature ? signature.link : ''}
                />
                {data.advance.advance && (
                  <OmAdvancePdf
                    data={data.advance}
                    validationDate={needsSignature ? setValidationDate() : ''}
                    agent={agentFullData}
                    gest={om.management.workflow.find((actor) => actor.current_status === 3)}
                    signature={signature ? signature.link : ''}
                    acSignature={acSignature ? acSignature.link : ''}
                    acValidationDate={setExistingValidationDate(om.management.workflow.find((actor) => actor.role === "Agent Comptable").validation_date)}
                    />
                )}
                {data.transports.authorizations.length > 0 && data.transports.authorizations.map((auth) => (
                  <CarAuthorizationPdf
                    key={'c-a-' + data.transports.authorizations.indexOf(auth)}
                    data={auth}
                    agent={agentFullData}
                    vehicleTypes={vehicleTypes}
                    reasons={staticReasons}
                    signature={signature ? signature.link : ''}
                    gest={om.management.workflow.find((actor) => om.management.workflow.indexOf(actor) === om.management.workflow.length - 1 && actor.agent === user)}

                  />
                ))}
                {data.transports.dispensations.length > 0 && data.transports.dispensations.map((disp) => (
                  <DispensationPdf
                    key={'d-' + data.transports.dispensations.indexOf(disp)}
                    data={disp}
                    signature={signature ? signature.link : ''}
                    gest={om.management.workflow.find((actor) => om.management.workflow.indexOf(actor) === om.management.workflow.length - 1 && actor.agent === user)}

                  />
                ))}
                {data.mission.scientificEvents.length > 0 && data.mission.scientificEvents.map((event) => (
                  <ScienceEventPdf
                    key={'s-e-' + data.mission.scientificEvents.indexOf(event)}
                    data={event}
                    agent={agentFullData}
                    creationDate={setExistingValidationDate(data.created_at)}
                    signature={researchSignature ? researchSignature.link : ''}
                    gest={om.management.workflow.find((actor) => actor.current_status === 7)}

                  />
                ))}
              </Document>
            </PDFViewer>
          </div>
        )}
      </form>    
      <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
      {isModalOpen && <OneFileForm onUserPage={false} />}
    </>
  );
};

OmVisa.propTypes = {
};

export default OmVisa;
