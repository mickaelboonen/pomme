import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import '../style.scss';

// Components
// import OmPdf from 'src/components/PDF/OmPdf';
import Address from 'src/components/Fields/Address';
import FileField from 'src/components/Fields/FileField';
import SelectField from 'src/components/Fields/SelectField';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextareaField from 'src/components/Fields/TextareaField';

// Selectors & actions
import { uploadFile } from 'src/reducer/omForm';
import {  defineValidationRulesForMission } from 'src/selectors/formValidationsFunctions';
import { setValidationDate } from 'src/selectors/pdfFunctions';


const Validation = ({ isEfForm }) => {
  
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  
  const { app: { countries },
    agent: { agent, agentProfessionalAddress, agentPersonalAddress, user},
    omForm: { currentOM },
    docs: { agentSignature },
    vehicle: { vehicleTypes },
  } = useSelector((state) => state);
  
  const agentFullData = {
    ...agent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };
  
  const {
    register,
    setValue,
    watch,
    getValues,
    formState:
      { errors }
  } = useForm({ defaultValues: agentFullData});

  const errorMessages = defineValidationRulesForMission(isEfForm, false);
  
  const [isValidated, setIsValidated] = useState(null)
  const handleValidation = (event) => {
    setIsValidated(event.target.value)
  }

  return (
    <form className="form">
      <div className="form__section">
        <FormSectionTitle>Validation</FormSectionTitle>
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="departure-place">Valider l'ordre de mission</label>
          <RadioInput
            id="validate"
            formField="validation"
            label="Oui"
            register={register}
            required={errorMessages.validation}
            handler={handleValidation}
          />
          <RadioInput
            id="reject"
            formField="validation"
            label="Non"
            register={register}
            required={errorMessages.validation}
            handler={handleValidation}
          />
          {errors.validation && <p className="form__section-field-error form__section-field-error--open">{errors.validation.message}</p>}
        </div>
        {isValidated === "reject" && (
          <>
            <div className="form__section-field">
              <p className="form__section-field-label">Si non, veuillez préciser les étapes refusées</p>
              <CheckboxInput id="mission" formField="rejectedFields" label="Mission" register={register} />
              <CheckboxInput id="transports" formField="rejectedFields" label="Transports" register={register} />
              <CheckboxInput id="accomodations" formField="rejectedFields" label="Hébergement & repas" register={register} />
              <CheckboxInput id="advance" formField="rejectedFields" label="Avance" register={register} />
            </div>
            <TextareaField 
              id="comments-field"
              label="Justifier le refus (facultatif)"
              formField="comments"
              register={register}
              placeholder="plop"
            />
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Annuler définitivement l'ordre de mission</label>
              <RadioInput
                id="cancel"
                formField="cancellation"
                label="Oui"
                register={register}
                required={errorMessages.cancellation}
              />
              <RadioInput
                id="don't-cancel"
                formField="cancellation"
                label="Non"
                register={register}
                required={errorMessages.cancellation}
              />
              {errors.comebackPlace && <p className="form__section-field-error form__section-field-error--open">{errors.comebackPlace.message}</p>}
            </div>
          </>
        )}
      </div>  
      {isValidated === 'validate' && (
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
                  formField="analytic"
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
              id="mission-goal"
              formField="missionPurposeFile"
              fileName={'fileName'}
              register={register}
              error={errors.missionPurposeFile}
              pieces="Joindre impérativement convocation, mail ou tout autre document en attestant"
            
            />
          </div>
          <div className="form__section">
            <FormSectionTitle>Circuit de signature</FormSectionTitle>
            <SelectField
              register={register}
              blankValue="Veuillez sélectionner un circuit de validation"
              data={[]}
              id="channel-field"
              formField="channel"
              label="Circuit"
              error={errors.channel}
              required="Veuillez sélectionner un circuit de validation."
            />
              <div className="form__section-field">
                <p className="form__section-field-label">Autres</p>
                <CheckboxInput id="taxi" formField="others" label="Taxi" register={register} />
                <CheckboxInput id="parking" formField="others" label="Parking" register={register} />
                <CheckboxInput id="toll" formField="others" label="Péage" register={register} />
                <CheckboxInput id="ferry" formField="others" label="Ferry (bateau)" register={register} />
              </div>
          </div>
        </>
      )}
    </form>
  );
};

Validation.propTypes = {

};

export default Validation;
