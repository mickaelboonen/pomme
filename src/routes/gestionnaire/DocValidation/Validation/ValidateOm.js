import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

// import '../style.scss';

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

const ValidateOm = ({ register , errors, setValue, circuits}) => (
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
    <div className="form__section-field">
      <ButtonElement
        type="submit"
        label="Valider l'ordre de mission"
      />
    </div>
  </>
);

ValidateOm.propTypes = {

};

export default ValidateOm;
