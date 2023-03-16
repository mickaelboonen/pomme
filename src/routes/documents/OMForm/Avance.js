import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';

import './style.scss';

// Components
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import CheckboxInput from 'src/components/Fields/CheckboxInput';

import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';
import TextareaField from 'src/components/Fields/TextareaField';
import HiddenField from 'src/components/Fields/HiddenField';

// Actions
import { uploadFile, updateAdvance } from 'src/reducer/omForm';
import { turnAdvanceDataToDbFormat } from 'src/selectors/dataToDbFormat';
import { getMaxMealsAndNights } from 'src/selectors/formValidationsFunctions';

// Selectors

import { clearMessage } from 'src/reducer/app';
import ApiResponse from 'src/components/ApiResponse';
import { getSavedFileName } from '../../../selectors/formDataGetters';

const Avance = ({ step }) => {
  // ATTENTION : lots of rendu
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  const areWeUpdatingData = loader.pathname.includes('modifier');
  

  const { app: { apiMessage, agentDocuments },
    omForm: { omForm },
  } = useSelector((state) => state);

  
  const defaultValues = omForm.find((omStep) => omStep.step === 'advance').data;
  
  const ribFileName = defaultValues.rib ? getSavedFileName(defaultValues.rib): '';
  const quotationFileName = defaultValues.hotelQuotation ? getSavedFileName(defaultValues.hotelQuotation): '';


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState:
    { errors },
  } = useForm({ defaultValues: defaultValues});
  
  const [total] = watch(['total']);
  
  const [isAdvanceRequested, setIsAdvanceRequested] = useState(defaultValues.advance);

  const onSubmit = (data) => {
    // If the user is requesting an advance
    console.log('PLOP : ', data);
    
    if (data.advance) {

      let errorCount = 0;
      if (!data.hotelQuotation || data.hotelQuotation.length === 0) {
        setError('hotelQuotation', { type: 'custom', message: "Merci de fournir le devis de l'hôtel." });
        errorCount++;
      }
      else {
        clearErrors('hotelQuotation');
      }
      
      if (!data.rib instanceof File && !data.savedRib) {
        setError('rib', { type: 'custom', message: "Veuillez fournir votre RIB." });
        errorCount++;
      }
      else {
        clearErrors('rib');
      }

      if (data.otherExpensesAmount > 0 && data.otherExpensesNames === '') {
        setError('otherExpensesNames', { type: 'custom', message: "Merci de justifier le montant des autres frais." });
        errorCount++;
      }
      else {
        clearErrors('otherExpensesNames');
      }

      if (errorCount !== 0) {
        return;
      }

      data.advanceAmount = Number(document.querySelector('#advance-amount').value);


      if (data.savedRib) {
        data.rib = agentDocuments.rib;
      }
      
      // We upload the hotel quotation first
      data.meals = maxMealsNumber;
      data.nights = Number(maxNightsNumber);
      data.status = 1;
      const dataToBeSubmitted = turnAdvanceDataToDbFormat(data);    
      
      if ( dataToBeSubmitted.agentRib instanceof File || dataToBeSubmitted.hotelQuotation instanceof File) {

        dispatch(uploadFile({data: dataToBeSubmitted, step: 'advance'}))
      }
      else {
        dispatch(updateAdvance(dataToBeSubmitted));
      }
    }
    else {
      
      data.status = 1;
      
      const dataToBeSubmitted = turnAdvanceDataToDbFormat(data);
      dispatch(updateAdvance(dataToBeSubmitted));
    }
  };


  const handleSwitch = (event) => {
    setIsAdvanceRequested(event.target.checked);
  };
  
  const [advance, setAdvance] = useState(defaultValues.advanceAmount ? defaultValues.advanceAmount : 0)

  useEffect(() => {

    if (total) {
      // const advanceInput = document.getElementById('advance-amount');
      const advance = (total * 75) / 100;
      setAdvance(advance);
      // advanceInput.max = advance;
      // advanceInput.placeholder= "Limite de l'avance : " + advance + " euros."
    }
  }, [total]);

  const [hasNoRibSaved, setHasNoRibSaved] = useState(agentDocuments.rib === '' ? true : false);
  const savedRib = watch('savedRib');

  useEffect(() => {
    

    if (!savedRib) {
      setHasNoRibSaved(true);
    }
    else {
      setHasNoRibSaved(false);
    }
  }, [savedRib])

  useEffect(() => {
    if (agentDocuments.rib) {
      setHasNoRibSaved(false);
      setValue("savedRib", true);
    }
  }, [agentDocuments.rib])


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
                disabled
                value={advance}
                formField="advanceAmount"
                register={register}
                isNumber
                min="0"
                label="Montant de l'avance"
                // required="Veuillez renseigner le montant de l'avance souhaitée."
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
              fileName={quotationFileName}
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
          <p className='form__section-field-label form__section-field-label--infos'>Détail prévisionnel de la mission : énumérer les étapes du voyage (cf page suivante)</p>

          <div className="form__section">
            <FormSectionTitle>Documents personnels</FormSectionTitle>
            {/* <FileField
              setValue={setValue}
              register={register}
              formField="rib"
              id="rib-file-field"
              label="RIB"
              fileName={ribFileName}
              error={errors.rib}
              // required="Veuillez fournir votre RIB."            
            /> */}
            {agentDocuments.rib && (
              <div className="form__section-field">
                <CheckboxInput
                  register={register}
                  formField="savedRib"
                  id="saved-rib-field"
                  label="Utiliser le RIB enregistré dans mon profil"
                />
              </div>
            )}
            {hasNoRibSaved && (
              <FileField
                setValue={setValue}
                register={register}
                formField="rib"
                id="rib-file-field"
                label="RIB"
                fileName={ribFileName}
                error={errors.rib}
              />
            )}
          </div>
        </div>
      )} 
      {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={areWeUpdatingData} />}      <Buttons
        step={step}
        id={omId}
        url={loader}
        watch={watch}
        update={updateAdvance}
      />
    </form>
    
  );
};

Avance.propTypes = {

};

export default Avance;
