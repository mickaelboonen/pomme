import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData, Link } from 'react-router-dom';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import './style.scss';

// Components
import PageTitle from 'src/components/PageTitle';
import SwitchButton from 'src/components/SwitchButton';
import LoaderCircle from "src/components/LoaderCircle";
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';
import HiddenField from 'src/components/Fields/HiddenField';
import RadioInput from 'src/components/Fields/RadioInput';
import NumberField from 'src/components/Fields/NumberField';
import DateField from 'src/components/Fields/DateField';
import TextareaField from 'src/components/Fields/TextareaField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import ScienceEventPdf from "src/components/PDF/ScienceEventPdf";

// Actions
import { uploadFile } from 'src/reducer/omForm';
import { setValidationDate } from 'src/selectors/pdfFunctions';
import {
  displayVehicle,
  requestVehicleAuthorization,
} from 'src/reducer/vehicle';
import { clearMessage } from 'src/reducer/app';
import { getSavedFileName } from 'src/selectors/formDataGetters'
import { uploadVehicleFiles } from "src/reducer/otherDocuments";


const ScientificEvent = () => {
  
  const url = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const omId = url.searchParams.get('omId');

  let { 
    app : { apiMessage },
    agent : { agent , user , oms },
  } = useSelector((state) => state);
  
  useEffect(() => {
    if (apiMessage.response && apiMessage.response.status === 200) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, "950")
      setTimeout(() => {
        navigate('/modifier-un-document/ordre-de-mission?etape=2&id='+ omId);
        
      }, "1000")
    }
  }, [apiMessage]);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
    formState:
    { errors },
  } = useForm({
    defaultValues: {
      presentation: [],
      payment: null,
      cost: null,
      deadline:null, 
      budget: null,
      files: [],
      docId: omId,
      comment: null,
    }
  });
  
  
  const onSubmit = (data) => {

    console.log("DATA = ", data);
    
    const errorNumber = handleErrorsOnSubmit(data);
    return;
    if (errorNumber > 0) {
      return;
    }

    dispatch(uploadFile({data: data, step: 'science', docType: 'science'}));

  };
  
  const handleErrorsOnSubmit = (data) => {
    let errorCount = 0;

    if (data.payment === "" || !data.payment) {
      setError('payment', {type: 'custom', message: "Merci de renseigner comment sera pris en charge l'événement."})
      errorCount++;
    }

    if (!data.presentation || data.presentation.length === 0 ) {
      setError('presentation', {type: 'custom', message: "Merci de renseigner le type de présentation."})
      errorCount++;
    }

    if (data.budget === "" || !data.budget) {
      setError('budget', {type: 'custom', message: "Merci de renseigner le budget ou le contrat concerné par l'événement."})
      errorCount++;
    }

    if (data.files.length === 0) {
      setError('files', {type: 'custom', message: "Merci de fournir les justificatifs d'événement."})
      errorCount++;
    }

    if (data.payment === "unimes") {
      if (data.cost === "" || !data.cost) {
        setError('cost', {type: 'custom', message: "Merci de renseigner le montant de l'événement."})
        errorCount++;
      }

      if (!data.deadline) {
        setError('deadline', {type: 'custom', message: "Merci d'indiquer la date limite de paiement de l'événement."})
        errorCount++;
      }
    }
    else {
      clearErrors('deadline');
      clearErrors('cost');
    }

    return errorCount;
  }
  
  const [isPdfVisible, setIsPdfVisible] = useState(false)

  const toggleViewer = (event) => {

    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
  }
  
  return (
    <>
      <div className="form-container form-container--vehicle">
        <PageTitle>Participation à un événement scientifique</PageTitle>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__section">
            <FormSectionTitle>Événement scientifique</FormSectionTitle>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Prise en charge de l'événement scientifique (Inscription colloque, séminaire, conférence)</label>
                <RadioInput
                id="unimes"
                formField="payment"
                label="Réglé par Unîmes"
                register={register}
                required="Veuillez renseigner le champ."
              />
              <RadioInput
                id="agent"
                formField="payment"
                label="Avancé par l'agent"
                register={register}
                required="Veuillez renseigner le champ."
              />
              <RadioInput
                id="free"
                formField="payment"
                label="Pris en charge par un autre organisme"
                register={register}
                required="Veuillez renseigner le champ."
              />
            </div>
            {errors.payment && <p className="form__section-field-error form__section-field-error--open">{errors.payment.message}</p>}

            <div className="form__section-field">
              <p className="form__section-field-label">Type de présentation</p>
              <CheckboxInput
                id="poster"
                formField="presentation"
                label="Poster"
                register={register}
              />
              <CheckboxInput
                id="abstract"
                formField="presentation"
                label="Abstract"
                register={register}
              />
              <CheckboxInput
                id="intervention orale"
                formField="presentation"
                label="Intervention orale"
                register={register}
                required="Merci de sélectionner l'option qui correspond."
              />
              {errors.presentation && <p className="form__section-field-error form__section-field-error--open">{errors.presentation.message}</p>}
            </div>
            <NumberField
              id="cost-field"
              label="Montant de l'inscription"
              error={errors.cost}
              register={register}
              formField="cost"
              isAmount
            />
            <DateField
              type="date"
              id="deadline-field"
              label="Date limite du règlement de l'inscription"
              register={register}
              formField="deadline"
              error={errors.deadline}
            />
            <TextField 
              register={register}
              id="budget-field"
              label="Quel budget / contrat est concerné ?"
              formField="budget"
              placeholder=""
              error={errors.budget}
            />
            <TextareaField
              id="comment-field"
              label="Commentaires"
              formField="comment"
              register={register}
              error={errors.comment}
            />
            <FileField
              setValue={setValue}
              multiple
              id="file-field"
              formField="files"
              register={register}
              error={errors.files}
              label="Jutificatif d'événement"
              pieces="Si le document est langue étrangère, merci de fournir une traduction en plus."
            />
            <HiddenField
              value={omId}
              register={register}
              id="docId"
            />
          </div>
          <div className="form__section-field" id="external-signature-button">
            <div className="form__section-field-button">
          
                <BlobProvider document={<ScienceEventPdf data={watch()} agent={agent} creationDate={setValidationDate()} />}>
                  {({ blob }) => {
      
                    const { mission } = oms.find((om) => om.id == omId);
                    const fileName = `${agent.lastname.toUpperCase()}-${new Date(mission.departure).toLocaleDateString().split('/').join('-')}-demande-d-autorisation-de-véhicule`
                    const file = new File([blob], fileName, {type: 'application/pdf'});
                    
                    const fileUrl = URL.createObjectURL(file);
                    
                    return (
                      <>
                        <button type="button" onClick={() => { const data = watch(); data.file = file; onSubmit(data)}}>
                          Valider la demande
                        </button>
                        <button type="button" id="viewer-opener" onClick={toggleViewer}>
                          Visualiser le PDF
                        </button>

                      </>
                    );
                  }}
                </BlobProvider>
            </div>
            {/* {externalSignature && <p className="form__section-container-text form__section-container-text--infos">Veuillez télécharger le PDF de la demande, le faire signer aux personnes extérieures concernées puis le redéposer dans l'application à l'étape Transports.</p>} */}
          </div>
        </form>
      </div>
      {isPdfVisible && (
        <div className="pdf-viewer">
          <div className="pdf-viewer__nav">
            <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
          </div>
          <PDFViewer>
            <ScienceEventPdf data={watch()} agent={agent} creationDate={setValidationDate()}/>
          </PDFViewer>
        </div>
      )}
    </>

  );
};

ScientificEvent.propTypes = {

};

export default ScientificEvent;