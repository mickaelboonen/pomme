import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';
import TextareaField from 'src/components/Fields/TextareaField';

const Avance = ({ step }) => {
  // ATTENTION : lots of rendu
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // TODO : Process Data
    navigate('/nouveau-document/ordre-de-mission?etape=' + step++);
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  const handleSwitch = (event) => {
    const { checked } = event.target;
    const advanceForm = document.getElementById('advance-container');
  
    if (checked) {
      advanceForm.classList.remove('form__section--hidden');
    }
    else {
      advanceForm.classList.add('form__section--hidden');
    }
  
  };

  const [total, otherExpensesAmount, advance] = watch(['total', 'otherExpensesAmount', 'advance']);
  
  useEffect(() => {
    if (advance) {
      register("hotelQuotation", {
        required: "Merci de fournir le devis de l'hôtel.",
      });
      register("rib", {
        required: "Veuillez fournir votre RIB.",
      });
      register("signature", {
        required: "Veuillez signer la demande.",
      });
      register("total", {
        required: "Merci de renseigner le montant total de la mission.",
      });
      register("advanceAmount", {
        required: "Veuillez renseigner le montant de l'avance souhaitée.",
      });
    }

  })

  useEffect(() => {

    if (total) {
      const advanceInput = document.getElementById('advance-amount');
      const advance = (total * 75) / 100;
      advanceInput.max = advance;
      advanceInput.placeholder= "Limite de l'avance : " + advance + " euros."
    }
  }, [total]);

  useEffect(() => {
    if (Number(otherExpensesAmount) >= 0 && otherExpensesAmount !== '') {
      register("otherExpensesNames", {
        required: "Merci de justifier le montant des autres frais."
      });
    }
  }, [otherExpensesAmount])

  let { nightsNumber, outsideMealsNumber, adminMealsNumber} = JSON.parse(localStorage.getItem('hebergement'));
  const totalMeals = Number(adminMealsNumber) + Number(outsideMealsNumber);
  nightsNumber = nightsNumber === '' ? 0 : nightsNumber;

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
      </div>
      <div className='form__section form__section--hidden' id='advance-container'>
        <FormSectionTitle>Montants</FormSectionTitle>
        <div className='form__section form__section--documents' id="other-fields">
          <div className='form__section-half'>
            <TextField
              id="total-amount"
              formField="total"
              register={register}
              isNumber
              min="0"
              label="Montant total de la mission"
              error={errors.total}
            />
          </div>
          <div className='form__section-half'>
            <TextField
              id="advance-amount"
              formField="advanceAmount"
              register={register}
              isNumber
              min="0"
              label="Montant de l'avance"
              error={errors.advanceAmount}
            />
          </div>
        </div>
        <FormSectionTitle>Détail état prévisionnel des frais</FormSectionTitle>
        <div className='form__section'>
        <FileField
            register={register}
            formField="hotelQuotation"
            id="hotel-quote-file-field"
            label="Devis de l'hôtel"
            error={errors.hotelQuotation}
          />
        </div>
        <div className="form__section form__section--documents">
          <div className='form__section-half'>
            <TextField
              id="nights-field"
              formField="nights"
              register={register}
              isNumber
              min="0"
              value={nightsNumber}
              label="Nombre de nuits"
            />
          </div>
          <div className='form__section-half'>
            <TextField
              id="meals-field"
              formField="meals"
              register={register}
              isNumber
              min="0"
              label="Nombre de repas"
              value={totalMeals}
              
            />
          </div>
        </div>
        <div className="form__section form__section--documents">
          <div className='form__section-half'>
            <TextField
              id="other-expenses-amount-field"
              formField="otherExpensesAmount"
              register={register}
              isNumber
              min="0"
              label="Montant des autres frais"
            />
          </div>
          <div className='form__section-half'>
            <TextareaField
              id="other-expenses-name-field"
              formField="otherExpensesNames"
              register={register}
              rows={3}
              label="Justification des autres frais"
              error={errors.otherExpensesNames}
            />
          </div>
        </div>
        <p style={{marginBottom: '1rem'}}>Détail prévisionnel de la mission : énumérer les étapes du voyage (cf page suivante)</p>
        <FormSectionTitle>Documents personnels</FormSectionTitle>
        <div className="form__section">
          <FileField
            register={register}
            formField="rib"
            id="rib-file-field"
            label="RIB"
            error={errors.rib}
          
          />
          <FileField
            register={register}
            formField="signature"
            id="signature-field"
            label="Votre signature"
            error={errors.signature}
          
          />
        </div>
      </div>  
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Avance.propTypes = {

};

export default Avance;
