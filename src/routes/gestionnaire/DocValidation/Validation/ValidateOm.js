import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import ButtonElement from 'src/components/Fields/ButtonElement';

import {  getAllFilenamesForProperty } from 'src/selectors/formDataGetters';

import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';
import OmPdf from 'src/components/PDF/OmPdf';
import OmAdvancePdf from 'src/components/PDF/OmAdvancePdf';

// import './style.scss';

// Actions
import { displayValidationActors } from 'src/reducer/omManager';

const ValidateOm = ({
  register,
  errors,
  setValue,
  watch, 
  omType,
  om,
  submitFunction,
}) => {
  const dispatch = useDispatch();
  const {
    omManager: { channels, uprOrDep, validationActorsToDisplay },
    agent: { agent, user },
    app: { countries },
    vehicle: { vehicleTypes },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress }
  } = useSelector((state) => state)

  const agentFullData = {
    ...tmpAgent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };

  let filesnames = getAllFilenamesForProperty(om.management.management_files);

  const handleChannelChange = (event) => {    
    const selectedChannel = channels.find((cir) => cir.id === Number(event.target.value));
    
    if (selectedChannel !== undefined) {
      dispatch(displayValidationActors(selectedChannel));
    }
  }
  
  

  const advanceRequested = om.advance.advance;
  
  // TODO : export ------------------------------------------------------------
  const selectActorsToDisplay = (actors, type, isAdvanceRequested) => {
    // Setting the array for actors to be displayed in the list
    return actors.map((actor) => {

      // Removing the DAF gest and the accountant when there is no advance requested
      if (!isAdvanceRequested && (actor.cptLogin === 'gest_daf' || actor.role === 'Agent Comptable')) {
        return null;
      }

      // Removing the VP and the PAPSA director if it's not an OM for the SUAPS
      if (type !== 'admin-suaps' && (actor.role === 'Directrice Département (PAPSA)' || actor.role === 'Vice-Président Formation')) {
        return null;
      }
      return actor;
    }).filter((actor) => actor !== null);

  }
  const divideActors = (actors, directors, isAdvanceRequested = false) => {
    let firstPartActors = [];
    let secondPartActors = [];

    if (directors.length > 0) {
      let middle;
  
      if (directors[0].role.includes('UPR')) {
        middle = 4;
      }
      else if ( directors[0].role.includes('Département')) {
        middle = isAdvanceRequested ? 3 : 1;
      }
      else {
        middle = 1;
      }
  
      firstPartActors = actors.slice(0, middle);
      secondPartActors = actors.slice(middle);
    }
    else {
      firstPartActors = actors;
    }

    return [firstPartActors, secondPartActors];
  }
  const toggleViewer = (event) => {
 
    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
  }
  // TODO : export ------------------------------------------------------------

  const actorsToDisplay = selectActorsToDisplay(validationActorsToDisplay, om.type, advanceRequested);
  const [firstPartActors, secondPartActors] = divideActors(actorsToDisplay, uprOrDep, om.advance.advance);

  useEffect(() => {
    const selectedChannel = channels.find((cir) => cir.shortName === omType[0]);
    if (selectedChannel !== undefined) {
      dispatch(displayValidationActors(selectedChannel));
    }
  }, [])

  const selectedWorkflow = watch('workflow');
  const [showUprOrDep, setShowUprOrDep] = useState(false);
  const [isPdfVisible, setIsPdfVisible] = useState(false)

  useEffect(() => {
    if (selectedWorkflow && (selectedWorkflow.indexOf('directeur.rice upr') >= 0 || selectedWorkflow.indexOf('directeur.rice dep') >= 0)) {
      setShowUprOrDep(true);
    }
    else {
      setShowUprOrDep(false);
    }
  }, [selectedWorkflow]);
  
  return (
  <>
    <div className="form__section">
      <FormSectionTitle>Imputations budgétaires</FormSectionTitle>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <TextField
              id="percent-field"
              formField="percent"
              label="%"
              register={register}
            /> 
          </div>
          <div className='form__section-half'>
            <TextField
              id="ub-field"
              formField="ub"
              label="UB"
              register={register}
            />
          </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <TextField
            id="rc-field"
            formField="cr"
            label="CR"
            register={register}
          /> 
        </div>
        <div className='form__section-half'>
          <TextField
            id="nacres-field"
            formField="nacres"
            label="Code Nacres"
            register={register}
          />
        </div>
        
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <TextField
            id="lolf-field"
            formField="lolf"
            label="Code LOLF"
            register={register}
          /> 
        </div>
        <div className='form__section-half'>
          <TextField
            id="analytic-field"
            formField="analytique"
            label="Code analytique"
            register={register}
          />
        </div>
        
      </div>
    </div>
    <div className="form__section">
      <FormSectionTitle>Rajouter des documents</FormSectionTitle>
      <FileField
        setValue={setValue}
        multiple
        id="files-field"
        formField="managementFiles"
        fileName={filesnames}
        register={register}
        error={errors.managementFiles}
      
      />
    </div>
    {om.status === 2 && (

      <div className="form__section">
        <FormSectionTitle>Circuit de validation</FormSectionTitle>
        <SelectField
          register={register}
          blankValue="Veuillez sélectionner un circuit de validation"
          data={channels}
          id="channel-field"
          formField="channel"
          handler={handleChannelChange}
          label="Circuit"
          error={errors.channel}
          required="Veuillez sélectionner un circuit de validation."
        />
        <div className="form__section-field">
          <p className="form__section-field-label">Acteurs de la validation</p>
          {firstPartActors.map((actor) => (
        <CheckboxInput
          key={actor.id}
          id={actor.cptLogin}
          formField="workflow"
          label={actor.role}
          register={register}
          checked={(advanceRequested && (actor.cptLogin === 'gest_daf' || actor.role === 'Agent Comptable')) ? true : null}
          disabled={(advanceRequested && (actor.cptLogin === 'gest_daf' || actor.role === 'Agent Comptable')) ? true : false}
        />
          ))}
          {showUprOrDep && (
        <div style={{margin: '0.5rem 1rem'}}>
          {uprOrDep.map((actor) => (
            <CheckboxInput key={actor.id} id={actor.cptLogin} formField="workflow" label={actor.role} register={register} />
          ))}
        </div>
          )}
          {secondPartActors.map((actor) => (
        <CheckboxInput
          key={actor.id}
          id={actor.cptLogin}
          formField="workflow"
          label={actor.role}
          register={register}
          checked={(advanceRequested && (actor.cptLogin === 'gest_daf' || actor.role === 'Agent Comptable')) ? true : null}
          disabled={(advanceRequested && (actor.cptLogin === 'gest_daf' || actor.role === 'Agent Comptable')) ? true : false}
        />
          ))}
          {errors.workflow && <p className="form__section-field-error form__section-field-error--open">{errors.workflow.message}</p>}
          
        </div>
      </div>
    )}

    <div className="form__section-field-buttons">
      <BlobProvider document={
        <Document>
          <ValidationMonitoringPdf
            om={om}
            user={user}
            agent={agent}
            isGest={true}
            gestData={watch()}
            isOm={true}
          />
          <OmPdf
            // creationDate={creationDate}
            // validationDate={validationDate}
            countries={countries}
            data={om}
            agent={agentFullData}
            vehicleTypes={vehicleTypes}
            manager={watch()}
            signature={''}
          />
          {om.advance.advance && (
            <OmAdvancePdf
              data={om.advance}
              // validationDate={validationDate}
              agent={agentFullData}
              // creationDate={creationDate}
              gest={om.management.workflow.find((actor) => actor.current_status === 3)}
              signature={''}
            />
          )}
        </Document>
      }>
        {({ blob }) => {          
          const file = new File([blob], "monitoring-om-" + om.id, {type: 'pdf'});
          
          return (
            <div className="form__section-field-buttons__row">
              <button style={{margin: 'auto'}}type="button" onClick={() => { const data = watch(); data.file = file; submitFunction(data)}}>
                Valider la demande
              </button>
              {/* <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}> */}
                {/* Visualiser <br /> le document */}
              {/* </button> */}
            </div>
          );
        }}
      </BlobProvider>
    </div>
    {isPdfVisible && (
      <div className="pdf-viewer">
        <div className="pdf-viewer__nav">
          <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
        </div>
        <PDFViewer className='form__section-recap'>
        <Document>
              <ValidationMonitoringPdf
                om={om}
                user={user}
                agent={agent}
                isGest={true}
                gestData={watch()}
                isOm={true}
              />
              <OmPdf
                // creationDate={creationDate}
                // validationDate={validationDate}
                countries={countries}
                data={om}
                agent={agentFullData}
                vehicleTypes={vehicleTypes}
                manager={watch()}
                signature={''}
                isGest
              />
              {om.advance.advance && (
                <OmAdvancePdf
                  data={om.advance}
                  // validationDate={validationDate}
                  agent={agentFullData}
                  // creationDate={creationDate}
                  gest={om.management.workflow.find((actor) => actor.current_status === 3)}
                  signature={''}
                />
              )}
            </Document>
        </PDFViewer>
      </div>
    )}
  </>
)};

ValidateOm.propTypes = {

};

export default ValidateOm;
