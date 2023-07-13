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

const ValidateOm = ({ register, secondSelect, errors, setValue, circuits, displayServiceOrDepartment, services, departments, serviceOrDepartments}) => {
  const [validationActors, setValidationActors] = useState([]);
  const [servicesToDisplay, setServicesToDisplay] = useState(secondSelect === "services" ? services : []);
  const [departmentsToDisplay, setDepartmentsToDisplay] = useState(secondSelect === "departments" ? services : []);
  // const [service, setService] = useState(services.find((s) => s.name.toLowerCase() === type[1]));
  // console.log(type);
  
  const displayValidationActors = (event) => {
    const { value } = event.target;
    const selectedChannel = circuits.find((cir) => cir.id === Number(value));
    
    if (selectedChannel !== undefined) {
      
      setValidationActors(selectedChannel.validationActors);
      displayServiceOrDepartment(selectedChannel);
    }

  }

  console.log("HERE = ", serviceOrDepartments);
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
        id="files-field"
        formField="files"
        register={register}
        error={errors.files}
      
      />
    </div>
    <div className="form__section">
      <FormSectionTitle>Circuit de validation</FormSectionTitle>
      <SelectField
        register={register}
        blankValue="Veuillez sélectionner un circuit de validation"
        data={circuits}
        id="channel-field"
        formField="channel"
        handler={displayValidationActors}
        label="Circuit"
        error={errors.channel}
        required="Veuillez sélectionner un circuit de validation."
      />
      {servicesToDisplay.length > 0 && (
        <SelectField
          register={register}
          blankValue="Veuillez sélectionner le service ou département rattaché"
          data={serviceOrDepartments}
          id="service-field"
          formField="service"
          handler={displayValidationActors}
          label="Service / Département"
          error={errors.service}
          required="Veuillez sélectionner le service ou département concerné."
        />
      )}
      {departmentsToDisplay.length > 0 && (
        <SelectField
          register={register}
          blankValue="Veuillez sélectionner le service ou département rattaché"
          data={serviceOrDepartments}
          id="service-field"
          formField="service"
          handler={displayValidationActors}
          label="Service / Département"
          error={errors.service}
          required="Veuillez sélectionner le service ou département concerné."
        />
      )}
      <div className="form__section-field">
        <p className="form__section-field-label">Acteurs de la validation</p>
        {validationActors.map((actor) => (
          <CheckboxInput key={actor.id} id={actor.cpt_login} formField="workflow" label={actor.role} register={register} />
        ))}
      </div>
    </div>
    <div className="form__section-field">
      <ButtonElement
        type="submit"
        label="Valider l'ordre de mission"
      />
    </div>
  </>
)};

ValidateOm.propTypes = {

};

export default ValidateOm;
