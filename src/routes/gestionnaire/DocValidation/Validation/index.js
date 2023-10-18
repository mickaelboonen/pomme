import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

import '../style.scss';

// Components
import RejectOm from './RejectOm';
import ValidateOm from './ValidateOm';
import HiddenField from 'src/components/Fields/HiddenField';
import RadioInput from 'src/components/Fields/RadioInput';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextareaField from 'src/components/Fields/TextareaField';

// Selectors & actions
import { addOmMonitoringPdf, rejectOm } from 'src/reducer/omManager';
import { uploadFile } from 'src/reducer/omForm';


const Validation = () => {
  
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  
  const {
    omForm: { omLoader, currentOM },
    omManager: { channels, uprOrDep, validationActorsToDisplay },
    agent: { agent, user }
  } = useSelector((state) => state);

  const missionStatus = currentOM.mission ? currentOM.mission.status : null;
  const transportsStatus = currentOM.transports ? currentOM.transports.status : null;
  const accomodationsStatus = currentOM.accomodations ? currentOM.accomodations.status : null;
  const advanceStatus = currentOM.advance ? currentOM.advance.status : null;

  const statusArray = [
    {step: 'mission', status: missionStatus, label: 'Mission'},
    {step: 'transports', status: transportsStatus, label: 'Transports'},
    {step: 'accomodations', status: accomodationsStatus, label: 'Hébergement & repas'},
    {step: 'advance', status: advanceStatus, label: 'Avance'}
  ];
  const isOneStepRejected = statusArray.find((e) => e.status === false);

  const rejectedFields = [];
  if (isOneStepRejected) {
    statusArray.forEach((e) => {
      if (e.status === false) {
        rejectedFields.push(e.step)
      }
    });
  }

  // console.log(currentOM);
  const omType = currentOM.type ? currentOM.type.toLowerCase().split('-') : '';
  const currentChannel = channels.find((channel) => channel.shortName === omType[0]);

  const {
    register,
    setValue,
    watch,
    setError,
    handleSubmit,
    formState:
      { errors }
  } = useForm({ defaultValues: {
    validation: isOneStepRejected === undefined ? null : 'reject',
    rejectedFields: rejectedFields,
    channel: currentChannel.id,
    comments: currentOM.comments,
    codeLolf: currentOM.management.code_lolf,
    codeNacres: currentOM.management.code_nacres,
    codeAnalytique: currentOM.management.code_analytique,
    ...currentOM.management
  }});
  
  const onSubmit = (data) => {
    
    let errorCount;
    
    const isAdvanceRequested = currentOM.advance.advance;

    const actors = [
      {
        cptLogin: user,
        name: agent.firstname + ' ' + agent.lastname,
        role: agent.position,
        comments: data.comments === null ? '' : data.comments,
        om_current_status: 2,
        next_status: 3
      }
    ];

    if (data.validation === 'validate') {
      if (!data.workflow || data.workflow.length === 0) {
        setError('workflow', {type: 'custom', message: "Merci de sélectionner au moins un agent pour valider l'ordre de mission."})
        errorCount++;
      }

      if (errorCount > 0) {
        return;
      }
      
      validationActorsToDisplay.forEach((actor) => {

        if (isAdvanceRequested && (actor.cptLogin === 'gest_daf' || actor.role === 'Agent Comptable')) {
          actors.push(actor);
        }
        else if (actor.cptLogin === 'directeur.rice upr' || actor.cptLogin === 'directeur.rice dep') {
          uprOrDep.forEach((dir) => {
            if (data.workflow.indexOf(dir.cptLogin) !== -1) {
              actors.push(dir)
            }
          })
        }
        else {
          if (data.workflow.indexOf(actor.cptLogin) !== -1) {
            actors.push(actor)
          }
        }
      })

      data.workflow = actors;
      
      const file = Array.from(data.managementFiles).find((file) => file instanceof File)
      if (!file) {
        // data.managementFiles = [];
        dispatch(addOmMonitoringPdf({data: data, task: 'replace', nextAction: 'manageOm'}));

      }
      else {
        dispatch(uploadFile({data: data, step: 'management', docType: 'om'}));
      }
      
      
    
    }
    else {
      data.workflow = actors;
      delete data.channel;
      delete data.validation;
      
      dispatch(rejectOm(data));
    }
  };
  
  const [isValidated, setIsValidated] = useState(isOneStepRejected === undefined ? null : 'reject')
  const handleValidation = (event) => {
    setIsValidated(event.target.value)
  }
  
  return (
    <>
    {!omLoader && (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__section">
          <FormSectionTitle>Validation</FormSectionTitle>
          <div className="form__section-field">
            <label className="form__section-field-label" htmlFor="departure-place">Valider l'ordre de mission</label>
            <RadioInput
              id="validate"
              formField="validation"
              label="Oui"
              register={register}
              required="Veuillez renseigner ce champ."
              handler={handleValidation}
            />
            <RadioInput
              id="reject"
              formField="validation"
              label="Non"
              register={register}
              required="Veuillez renseigner ce champ."
              handler={handleValidation}
            />
            <HiddenField id="docId" value={omId} register={register} />
            {errors.validation && <p className="form__section-field-error form__section-field-error--open">{errors.validation.message}</p>}
          </div>
          <TextareaField 
            id="comments-field"
            label="Commentaires du gestionnaire"
            formField="comments"
            register={register}
          />
          {isValidated === "reject" && (
            <RejectOm stepArray={statusArray} register={register} errors={errors} />
          )}
          {isValidated === 'validate' && (
            <ValidateOm
              // uprOrDep={uprOrDep}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              // circuits={channels}
              omType={omType}
              // validationActorsToDisplay={validationActorsToDisplay}
              om={currentOM}
              agent={agent}
              submitFunction={onSubmit}
            />
          )}
        </div>  
      </form>
    )}
    </>
  );
};

Validation.propTypes = {

};

export default Validation;
