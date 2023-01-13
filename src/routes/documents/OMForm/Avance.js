import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './style.scss';

// Components
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';
import TextareaField from 'src/components/Fields/TextareaField';
import HiddenField from 'src/components/Fields/HiddenField';

// Actions
import { uploadFile, updateAdvance } from 'src/reducer/omForm';
import { turnAdvanceDataToDbFormat } from '../../../selectors/dataToDbFormat';
import { getMaxMealsAndNights } from '../../../selectors/formValidationsFunctions';

// Selectors


const Avance = ({ step }) => {
  // ATTENTION : lots of rendu
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const omId = searchParams.get('id');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState:
    { errors },
  } = useForm();
  
  const [total, otherExpensesAmount] = watch(['total', 'otherExpensesAmount']);
  
  const [isAdvanceRequested, setIsAdvanceRequested] = useState(false);

  const onSubmit = (data) => {
    // If the user is requesting an advance
    console.log(data);
    
    if (data.advance) {

      let errorCount = 0;
      if (data.hotelQuotation.length === 0) {
        setError('hotelQuotation', { type: 'custom', message: "Merci de fournir le devis de l'hôtel." });
        errorCount++;
      }
      else {
        clearErrors('hotelQuotation');
      }
      
      if (data.rib.length === 0) {
        setError('rib', { type: 'custom', message: "Veuillez fournir votre RIB." });
        errorCount++;
      }
      else {
        clearErrors('rib');
      }

      if (errorCount !== 0) {
        return;
      }

      // We upload the hotel quotation first
      data.meals = maxMealsNumber;
      data.nights = Number(maxNightsNumber);
      const dataToBeSubmitted = turnAdvanceDataToDbFormat(data);      
      dispatch(uploadFile({data: dataToBeSubmitted, step: 'advance'}))

    }
    else {
      const dataToBeSubmitted = turnAdvanceDataToDbFormat(data);
      dispatch(updateAdvance(dataToBeSubmitted));
    }

    const nextStep = step + 1;
    // navigate('/nouveau-document/ordre-de-mission?etape=' + nextStep + '&id=' + omId)
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";


  const handleSwitch = (event) => {
    setIsAdvanceRequested(event.target.checked);
  };
  

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

  const { omForm } = useSelector((state) => state.omForm);

  const missionData = omForm[0].data;

  const maxMealsNumber = getMaxMealsAndNights(missionData);
  const maxNightsNumber = getMaxMealsAndNights(missionData, true);
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Avance</FormSectionTitle>
        <div className="form__section-field">
          <SwitchButton
            register={register}
            isInForm
            formField='advance'
            label="Demander une avance :"
            handler={handleSwitch}
          />
          <HiddenField id="omId" value={omId} register={register} />
        </div>
      </div>
      {isAdvanceRequested === true && (
        <div className='form__section' id='advance-container'>
          <FormSectionTitle>Montants</FormSectionTitle>
          <div className='form__section form__section--documents' id="other-fields">
            <div className='form__section-half'>
              <TextField
                id="total-amount"
                formField="total"
                register={register}
                required="Merci de renseigner le montant total de la mission."
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
                required="Veuillez renseigner le montant de l'avance souhaitée."
                error={errors.advanceAmount}
              />
            </div>
          </div>
          <FormSectionTitle>Détail état prévisionnel des frais</FormSectionTitle>
          <div className='form__section'>
            <FileField
              setValue={setValue}
              register={register}
              formField="hotelQuotation"
              id="hotel-quote-file-field"
              label="Devis de l'hôtel"
              // required="Merci de fournir le devis de l'hôtel."
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
                disabled
                min="0"
                value={maxNightsNumber}
                label="Nombre de nuits"
              />
            </div>
            <div className='form__section-half'>
              <TextField
                id="meals-field"
                formField="meals"
                register={register}
                isNumber
                disabled
                min="0"
                label="Nombre de repas"
                value={maxMealsNumber}
                
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
              setValue={setValue}
              register={register}
              formField="rib"
              id="rib-file-field"
              label="RIB"
              error={errors.rib}
              // required="Veuillez fournir votre RIB."            
            />
            {/* <FileField
              setValue={setValue}
              register={register}
              formField="signature"
              id="signature-field"
              label="Votre signature"
              error={errors.signature}
              // required="Veuillez signer la demande."
            /> */}
          </div>
        </div>
      )} 
      
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Avance.propTypes = {

};

export default Avance;
