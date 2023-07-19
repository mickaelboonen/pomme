import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import '../style.scss';

// Components
// import OmPdf from 'src/components/PDF/OmPdf';
import HiddenField from 'src/components/Fields/HiddenField';
import FileField from 'src/components/Fields/FileField';
import SelectField from 'src/components/Fields/SelectField';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextareaField from 'src/components/Fields/TextareaField';
import ButtonElement from 'src/components/Fields/ButtonElement';

// import './style.scss';

const RejectOm = ({ stepArray, register, errors}) => (
  <>
    <div className="form__section-field">
      <p className="form__section-field-label">Si non, veuillez préciser les étapes refusées</p>
      {stepArray.map((step) => (
        <CheckboxInput key={step.step} id={step.step} formField="rejectedFields" label={step.label} register={register} />
      ))}
    </div>
    <TextareaField 
      id="comments-field"
      label="Justifier le refus (facultatif)"
      formField="comments"
      register={register}
      placeholder="plop"
    />
    {/* <div className="form__section-field">
      <label className="form__section-field-label" htmlFor="departure-place">Annuler définitivement l'ordre de mission</label>
      <RadioInput
        id="cancel"
        formField="cancellation"
        label="Oui"
        register={register}
        // required={errorMessages.cancellation}
      />
      <RadioInput
        id="don't-cancel"
        formField="cancellation"
        label="Non"
        register={register}
        // required={errorMessages.cancellation}
      />
      {errors.comebackPlace && <p className="form__section-field-error form__section-field-error--open">{errors.comebackPlace.message}</p>}
    </div> */}
    <div className="form__section-field">
      <ButtonElement
      type="submit"
      label="Refuser l'ordre de mission"
      />
    </div>
  </>
);

RejectOm.propTypes = {

};

export default RejectOm;
