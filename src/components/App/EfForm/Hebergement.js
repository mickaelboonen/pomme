import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from '../../generics/FormSectionTitle';
import RefusalMessage from './Fields/RefusalMessage';
import Buttons from './Fields/Buttons';
import RadioInput from './Fields/RadioInput';
import SwitchButton from '../../generics/SwitchButton';
import TextField from './Fields/TextField';
import FileField from './Fields/FileField';

const Hebergement = ({ step }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);    
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  <TextField
  id="outside-meals-number"
  formField="outside-meals-number"
  register={register}
  isNumber
  min="0"
  label="Nombre de repas payés par l'agent"
/>
  const mealFields = [
    {
      id: 'admin-restaurant-field',
      formField: 'admin-restaurant',
      label: 'Repas pris dans un restaurant administratif ou assimilé',
    },
    {
      id: 'paid-by-agent-in-France-field',
      formField: 'paid-by-agent-in-France',
      label: 'Repas à titre onéreux en France',
    },
    {
      id: 'free-in-France-field',
      formField: 'free-in-France',
      label: 'Repas à titre gratuit en France',
    },
    {
      id: 'paid-by-agent-overseas-field',
      formField: 'paid-by-agent-overseas',
      label: "Repas à titre onéreux à l'étranger",
    },
  ];

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormSectionTitle>Hébergement</FormSectionTitle>
      <div className='form__section form__section--documents' id="other-fields">
        <div className='form__section-half'>
          <TextField
            isNumber
            min='0'
            id="hotel-field"
            formField="hotel"
            register={register}
            label="Hébergement à titre onéreux (France et étranger)"
            placeholder="Montant"
          />
        </div>
        <div className='form__section-half'>
          <FileField
            register={register}
            formField="hotel-files"
            id="hotel-files-field"
            multiple
            label="Facture"
            placeholder=""
          />
        </div>
      </div>
      <TextField 
        isNumber
        min='0'
        id="free-accomodation-field"
        formField="free-accomodation"
        register={register}
        label="Hébergement à titre gratuit"
        placeholder="Nombre de nuits"
      />
      <div className="form__section-field" id="meals">
        <FormSectionTitle>Repas</FormSectionTitle>
        {mealFields.map((field) => (
          <TextField
            key={field.id}
            id={field.id}
            formField={field.formField}
            register={register}
            isNumber
            min="0"
            placeholder="Nombre de repas"
            label={field.label}
          />
        ))}
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Hebergement.propTypes = {

};

export default Hebergement;
