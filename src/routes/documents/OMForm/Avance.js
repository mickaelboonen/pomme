import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';

const Avance = ({ step }) => {
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
    navigate('/nouveau-document/ordre-de-mission?etape=' + step++);

    
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  const handleSwitch = (event) => {
    const { checked } = event.target;
      const amountField = event.target.closest('.form__section-field').nextSibling;
  
    if (checked) {
      amountField.classList.remove('form__section-field--hidden');
    }
    else {
      amountField.classList.add('form__section-field--hidden');
    }
  
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Avance</FormSectionTitle>
        <div className="form__section-field">
          <SwitchButton
            register={register}
            isInForm
            formField={'advance'}
            label="Demander une avance :"
            handler={handleSwitch}
          />
        </div>
        <TextField
          id="advance-amount"
          formField="advance-"
          register={register}
          isNumber
          isHidden
          min="0"
          label="Montant de l'avance"
        />
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Avance.propTypes = {

};

export default Avance;
