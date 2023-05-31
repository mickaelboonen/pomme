import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../style.scss';

// Components
import Buttons from 'src/components/Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import FileField from 'src/components/Fields/FileField';
import NumberField from 'src/components/Fields/NumberField';
import HiddenField from 'src/components/Fields/HiddenField';
import TextareaField from 'src/components/Fields/TextareaField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';

// Actions

// Selectors & actions
import { uploadFile, updateAdvance } from 'src/reducer/omForm';
import { getSavedFileName } from 'src/selectors/formDataGetters';
import { turnAdvanceDataToDbFormat } from 'src/selectors/dataToDbFormat';

const Avance = ({ step }) => {
  
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  

  const { app: { agentDocuments },
    omForm: { omForm, currentOM },
  } = useSelector((state) => state);
  
  const defaultValues = omForm.find((omStep) => omStep.step === 'advance').data;
  
  const ribFileName = defaultValues.agent_rib ? getSavedFileName(defaultValues.agent_rib): '';
  let quotationFileName = '';
  
  if (defaultValues.hotelQuotations) {
    defaultValues.hotelQuotations.forEach((file) => {

      quotationFileName += getSavedFileName(file);

      if (defaultValues.hotelQuotations.length > 1) {
        quotationFileName += ' - ';
      }
    })
  }
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState:
    { errors },
  } = useForm({ defaultValues: {
    ...defaultValues,
    unknownAmount: defaultValues.unknownAmount ? "unknown-amount-field" : false,
    mealsNumber: currentOM.accomodations.meals_paid_by_agent + currentOM.accomodations.meals_in_admin_restaurants,
    nightsNumber: currentOM.accomodations.nights_number,
  }});
  
  const [totalAmount, savedRib, advance] = watch(['totalAmount', 'savedRib', 'advance']);
  
  
  const [isAdvanceRequested, setIsAdvanceRequested] = useState(defaultValues.advance);

  const onSubmit = (data) => {
    
    if (data.advance) {

      let errorCount = 0;
      if (!data.hotelQuotations || data.hotelQuotations.length === 0) {
        setError('hotelQuotations', { type: 'custom', message: "Merci de fournir le devis de l'hôtel." });
        errorCount++;
      }
      else {
        clearErrors('hotelQuotations');
      }
      
      
      if (data.rib && data.rib.length === 0 && !data.savedRib) {
        setError('rib', { type: 'custom', message: "Veuillez fournir votre RIB." });
        errorCount++;
      }
      else {
        clearErrors('rib');
      }
      
      if (data.otherExpensesAmount > 0 && data.otherExpensesJustitication === '') {
        setError('otherExpensesJustitication', { type: 'custom', message: "Merci de justifier le montant des autres frais." });
        errorCount++;
      }
      else {
        clearErrors('otherExpensesJustitication');
      }

      if (errorCount !== 0) {
        return;
      }
      
      if (data.savedRib) {
        data.rib = agentDocuments.rib;
      }
      
      data.status = 1;
      const dataToBeSubmitted = turnAdvanceDataToDbFormat(data);  
      
      if ( dataToBeSubmitted.agentRib instanceof File || dataToBeSubmitted.hotelQuotations.find((file) => file instanceof File)) {

        dispatch(uploadFile({data: dataToBeSubmitted, step: 'advance'}))
      }
      else {
        dispatch(updateAdvance(dataToBeSubmitted));
      }
    }
    else {

      const noAdvanceData = {
        id: data.id,
        docId: data.docId,
        advance: false,
        advanceAmount: null,
        totalAmount: null,
        hotelQuotations: null,
        nightsNumber: null,
        mealsNumber: null,
        otherExpensesAmount: null,
        otherExpensesJustification: null,
        agentRib: null,
        agentSignature: null,
        unknownAmount: false,
        status: 1,
      }
      
      dispatch(updateAdvance(noAdvanceData));
    }
  };


  const handleSwitch = (event) => {
    setIsAdvanceRequested(event.target.checked);
  };
  
  useEffect(() => {
    setValue('advanceAmount', (totalAmount * 75) / 100)
  }, [totalAmount]);

  const [hasNoRibSaved, setHasNoRibSaved] = useState(agentDocuments.rib === '' ? true : false);

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
  }, [agentDocuments.rib]);
  
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
          {!advance && <p className="form__section-message">Si vous <span>ne souhaitez pas</span> faire de demande d'avance, veuillez quand même <span>valider la saisie décisive</span> pour valider cette étape et ne pas bloquer la création de l'OM.</p>}
          <HiddenField id="docId" value={omId} register={register} />
        </div>
      </div>
      {isAdvanceRequested === true && (
        <div className='form__section' id='advance-container'>
          <FormSectionTitle>Montants</FormSectionTitle>
          <div className="form__section" style={{marginBottom: '1rem'}}>
            <CheckboxInput
              register={register}
              formField="unknownAmount"
              id="unknown-amount-field"
              label="Je ne connais pas le montant total de la mission / J'ai besoin d'aide"
            />
          </div>
          <div className='form__section form__section--documents'>
            <div className='form__section-half'>
              <NumberField
                id="total-amount"
                formField="totalAmount"
                register={register}
                // required="Merci de renseigner le montant total de la mission."
                label="Montant total de la mission"
                error={errors.totalAmount}
                isAmount
              />
            </div>
            <div className='form__section-half'>
              <NumberField
                id="advance-amount"
                disabled
                formField="advanceAmount"
                register={register}
                label="Montant de l'avance"
                error={errors.advanceAmount}
                isAmount
              />
            </div>
          </div>
          {/* <FormSectionTitle>Détail état prévisionnel des frais</FormSectionTitle> */}
          <div className='form__section' style={{padding: '0 0.8rem'}}>
            <FileField
              setValue={setValue}
              register={register}
              multiple
              formField="hotelQuotations"
              id="hotel-quote-file-field"
              label="Devis de l'hôtel"
              fileName={quotationFileName}
              error={errors.hotelQuotations}
            />
          </div>
          <div className="form__section form__section--documents">
            <div className='form__section-half'>
              <NumberField
                id="nights-field"
                formField="nightsNumber"
                register={register}
                disabled
                label="Nombre de nuits"
              />
            </div>
            <div className='form__section-half'>
              <NumberField
                id="meals-field"
                formField="mealsNumber"
                register={register}
                disabled
                label="Nombre de repas"
              />
            </div>
          </div>
          <div className="form__section form__section--documents">
            <div className='form__section-half'>
              <NumberField
                id="other-expenses-amount-field"
                formField="otherExpensesAmount"
                register={register}
                label="Montant des autres frais"
                isAmount
              />
            </div>
            <div className='form__section-half'>
              <TextareaField
                id="other-expenses-name-field"
                formField="otherExpensesJustification"
                register={register}
                rows={3}
                label="Justification des autres frais"
                error={errors.otherExpensesJustification}
              />
            </div>
          </div>
          <div className="form__section">
            <FormSectionTitle>Document bancaire</FormSectionTitle>
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
      {/* {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />} */}
      <Buttons
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
