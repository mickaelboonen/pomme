import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

// Components
import Buttons from 'src/components/Fields/Buttons';
import ApiResponse from 'src/components/ApiResponse';
import FileField from 'src/components/Fields/FileField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import TextareaField from 'src/components/Fields/TextareaField';

// ACTIONS
import { updateMoreAndSignature, uploadFile } from 'src/reducer/omForm';

// Selectors
import { turnSignatureDataToDbFormat } from 'src/selectors/dataToDbFormat';
import { getSavedFileName } from 'src/selectors/formDataGetters';

const Signature = ({ step }) => {
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  const areWeUpdatingData = loader.pathname.includes('modifier');
  

  const { app: { apiMessage, userSignature },
    omForm: { omForm },
  } = useSelector((state) => state);
  
  const defaultValues = omForm.find((omStep) => omStep.step === 'signature').data;
  
  let fileNames= '';
  
  if (defaultValues.otherFiles.length === 1) {
    fileNames = getSavedFileName(defaultValues.otherFiles[0]);
  }
  else if (defaultValues.otherFiles.length > 1) {
    defaultValues.otherFiles.forEach((file) => {
      fileNames += getSavedFileName(file) + ' - ';
    })
  }
  
  let signatureFilename = '';
  if (defaultValues.signature && defaultValues.signature.length > 1) {
    signatureFilename = getSavedFileName(defaultValues.signature);
  }
  
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState:
    { errors },
  } = useForm({ defaultValues: defaultValues });
  
  const onSubmit = (data) => {
    console.log(data);
    console.log("-------------------------------------------------");
    const formattedData = turnSignatureDataToDbFormat(data, userSignature);

    // return;
    if (data.savedSignature) {

      const infosFile = formattedData.files.find((file) => file instanceof File);

      formattedData.status = 1;
      if (formattedData.agentSignature instanceof File || infosFile instanceof File) {
        dispatch(uploadFile({ data: formattedData, step: 'more-and-signature'}));
      } 
      else {
        dispatch(updateMoreAndSignature(formattedData));
      }
    }
    else {
      
      if (data.signature.length === 0) {
        setError('signature', { type: 'custom', message: "Merci de signer votre ordre de mission." });
        return;
      }

      formattedData.status = 1;

      const infosFile = formattedData.files.find((file) => file instanceof File);
      if (formattedData.agentSignature instanceof File || infosFile instanceof File) {
        dispatch(uploadFile({ data: formattedData, step: 'more-and-signature'}));
      } 
      else {
        dispatch(updateMoreAndSignature(formattedData));
      }
    }
  };

  const [hasNoSignatureSaved, setHasNoSignatureSaved] = useState(userSignature === '' ? true : false);
  const savedSignature = watch('savedSignature');
  
  useEffect(() => {
    
    if (!savedSignature) {
      setHasNoSignatureSaved(true);
    }
    else {
      setHasNoSignatureSaved(false);
    }
  }, [savedSignature])

  useEffect(() => {
    if (userSignature) {
      setHasNoSignatureSaved(false);
      setValue("savedSignature", true);
    }
  }, [userSignature])

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Signature</FormSectionTitle>
        {userSignature && (
          <div className="form__section-field">
            <CheckboxInput
              register={register}
              formField="savedSignature"
              id="saved-signature-field"
              label="Utiliser la signature enregistrée dans mon profil"
            />
          </div>
        )}
        {hasNoSignatureSaved && (
          <FileField 
            setValue={setValue}
            register={register}
            formField="signature"
            id="signature"
            error={errors.signature}
            fileName={signatureFilename}
          />
        )}
        <HiddenField id="docId" value={omId} register={register} />
      </div>

      <div className="form__section">
        <FormSectionTitle>Autres</FormSectionTitle>
        <TextareaField 
          register={register}
          formField="otherInfos"
          id="other"
          label="Autres renseignements utiles"
          placeholder="Tout renseignements utiles, des cas articuliers non pris en charge par le formulaire"
        />
        <FileField 
          setValue={setValue}
          register={register}
          formField="otherFiles"
          id="other"
          multiple
          fileName={fileNames}
        />
      </div>
      {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={areWeUpdatingData} />}
      <Buttons
        step={step}
        id={omId}
        url={loader}
        watch={watch}
        update={updateMoreAndSignature}
        userSignature={userSignature}
      />
    </form>
    
  );
};

Signature.propTypes = {

};

export default Signature;
