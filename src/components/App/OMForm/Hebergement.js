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

    // TODO : Process Data

    // Next Step
    const nextStep = step++;
    navigate('/documents/ordre-de-mission/nouveau?etape=' + step++);

    
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

const handleHotelSwitch = (event) => {
  const { checked } = event.target;
    const section = event.target.closest('.form__section-field');
    const nightNumberField = section.nextSibling;
    const nightPaymentField = nightNumberField.nextSibling;

  if (checked) {
    nightNumberField.classList.remove('form__section-field--hidden');
    nightPaymentField.classList.remove('form__section-field--hidden');
  }
  else {
    nightNumberField.classList.add('form__section-field--hidden');
    nightPaymentField.classList.add('form__section-field--hidden');
  }

};
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Hébergement</FormSectionTitle>
        <div className="form__section-field">
          <SwitchButton
            register={register}
            handler={handleHotelSwitch}
            isInForm
            formField={'hotel'}
            label="Hotel :"
          />
        </div>
        <TextField
          id="nights-number"
          formField="nights-number"
          register={register}
          isNumber
          isHidden
          label="Nombre de nuits"
        />
        <div className="form__section-field form__section-field--hidden">
          <p className="form__section-field-label">Réglement</p>
          <RadioInput id="unimes" formField="hotel-payment" label="Payé par Unîmes" register={register} />
          <RadioInput id="agent" formField="hotel-payment" label="Avancé par l'agent" register={register} />
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Repas</FormSectionTitle>
        <TextField
          id="outside-meals-number"
          formField="outside-meals-number"
          register={register}
          isNumber
          label="Nombre de repas payés par l'agent"
        />
        <TextField
          id="admin-meals-number"
          formField="admin-meals-number"
          register={register}
          isNumber
          label="Nombre de repas en restaurant administratif"
        />
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Hebergement.propTypes = {

};

export default Hebergement;
