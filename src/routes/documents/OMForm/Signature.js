import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FileField from 'src/components/Fields/FileField';
import TextareaField from 'src/components/Fields/TextareaField';
import HiddenField from 'src/components/Fields/HiddenField';
import { useDispatch, useSelector } from 'react-redux';
import { turnSignatureDataToDbFormat } from '../../../selectors/dataToDbFormat';
import { updateMoreAndSignature, updateSignature, uploadFile } from '../../../reducer/omForm';
import { clearMessage } from '../../../reducer/app';
import ApiResponse from '../../../components/ApiResponse';
import { getSavedFileName } from 'src/selectors/formDataGetters';

const Signature = ({ step }) => {
  const navigate = useNavigate();
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

  console.log('HERE : ', defaultValues);
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
  
    console.log(userSignature);
  const onSubmit = (data) => {
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
        <HiddenField id="omId" value={omId} register={register} />
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
      {apiMessage.data && <ApiResponse response={apiMessage} updateForm={areWeUpdatingData} />}

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
