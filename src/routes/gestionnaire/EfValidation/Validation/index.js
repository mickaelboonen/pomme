import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

import '../style.scss';

// Components
import RejectEf from './RejectEf';
import ValidateEf from './ValidateEf';
import HiddenField from 'src/components/Fields/HiddenField';
import RadioInput from 'src/components/Fields/RadioInput';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextareaField from 'src/components/Fields/TextareaField';

// Selectors & actions
import { addEfMonitoringPdf, rejectEf } from 'src/reducer/omManager';
// import { current } from '@reduxjs/toolkit';


const Validation = ({ data }) => {
  
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
  const ribStatus = currentOM.rib ? currentOM.rib.status : null;

  const statusArray = [
    {step: 'mission', status: missionStatus, label: 'Mission'},
    {step: 'transports', status: transportsStatus, label: 'Transports'},
    {step: 'accomodations', status: accomodationsStatus, label: 'Hébergement & repas'},
    {step: 'rib', status: ribStatus, label: 'RIB'}
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
  
  const efType = data.type.toLowerCase().split('-');
  const currentChannel = channels.find((channel) => channel.shortName === efType[0]);
  
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
    comments: data.comments
  }
  });
  
  const onSubmit = (data) => {
    
    let errorCount;

    const actors = [
      {
        cptLogin: user,
        name: agent.firstname + ' ' + agent.lastname,
        role: agent.position,
        comments: data.comments === null ? '' : data.comments,
        ef_current_status: 2,
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
      
      let dafActors = [];

      validationActorsToDisplay.forEach((actor) => {

        if (actor.cptLogin === 'directeur.rice upr' || actor.cptLogin === 'directeur.rice dep') {
          uprOrDep.forEach((dir) => {
            if (data.workflow.indexOf(dir.cptLogin) !== -1) {
              actors.push(dir)
            }
          })
        }
        else if (actor.cptLogin === 'gest_daf') {
          dafActors.push(actor);
        }
        else if (actor.role === 'DGS' || actor.role === 'Président' || actor.role === 'Présidente') {
          if (data.workflow.indexOf(actor.cptLogin) !== -1) {
            dafActors.push(actor)
          }
        }
        else if (actor.role === 'Agent Comptable') {
        }
        else {
          if (data.workflow.indexOf(actor.cptLogin) !== -1) {
            actors.push(actor)
          }
        }
      })

      // If the DGS or the President have not been selected, we force the DGS as the manager
      if (
        dafActors.find((daf) => daf.role === 'DGS') === undefined
        && dafActors.find((daf) => daf.role === 'Président') === undefined
        && dafActors.find((daf) => daf.role === 'Présidente') === undefined
      ) {
        dafActors.push(validationActorsToDisplay.find((actor) => actor.role === 'DGS'));
      }

      // Then we push another DAF validation post manager validation
      dafActors.push(validationActorsToDisplay.find((actor) => actor.cptLogin === 'gest_daf'));

      // And then we concat both the array of actors and daf actors to have the full workflow
      data.workflow = actors.concat(dafActors);

      dispatch(addEfMonitoringPdf({data: data, task: 'add', nextAction: 'manageEf'}));
    
    }
    else {
      data.workflow = actors;
      delete data.channel;
      delete data.validation;
      
   // console.log(data);
      dispatch(rejectEf(data));
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
            <label className="form__section-field-label" htmlFor="departure-place">Valider l'état de frais</label>
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
            <RejectEf
              stepArray={statusArray}
              watch={watch}
              register={register}
              errors={errors}
              ef={data}
              agent={agent}
            />
          )}
          {isValidated === 'validate' && (
            <ValidateEf
              uprOrDep={uprOrDep}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              circuits={channels}
              efType={efType}
              validationActorsToDisplay={validationActorsToDisplay}
              ef={data}
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
