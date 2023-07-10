import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../style.scss';

// Components
import Buttons from 'src/components/Fields/Buttons';
import StatusChecker from 'src/components/StatusChecker';
import FileField from 'src/components/Fields/FileField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
// import CheckboxInput from 'src/components/Fields/CheckboxInput';
import TextareaField from 'src/components/Fields/TextareaField';

// ACTIONS
import { updateMoreAndSignature, uploadFile } from 'src/reducer/omForm';

// Selectors
// import { turnSignatureDataToDbFormat } from 'src/selectors/dataToDbFormat';
import { getSavedFileName } from 'src/selectors/formDataGetters';

const Other = ({ step }) => {
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  // const areWeUpdatingData = loader.pathname.includes('modifier');
  

  const { app: { apiMessage },
    agent: { userSignature },
    omForm: { omForm },
  } = useSelector((state) => state);
  
  const defaultValues = omForm.find((omStep) => omStep.step === 'signature').data;
  
  let fileNames= '';
  
  if (defaultValues.files.length === 1) {
    fileNames = getSavedFileName(defaultValues.files[0]);
  }
  else if (defaultValues.files.length > 1) {
    defaultValues.files.forEach((file) => {
      fileNames += getSavedFileName(file) + ' - ';
    })
  }
  
  // let signatureFilename = '';
  // if (defaultValues.agentSignature && defaultValues.agentSignature.length > 1) {
  //   signatureFilename = getSavedFileName(defaultValues.agentSignature);
  // }
  
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

    data.status = 1;
    const infosFile = data.files.find((file) => file instanceof File);
    

    // if (data.savedSignature) {

    //   data.agentSignature = userSignature;
      
      if (infosFile instanceof File) {
        dispatch(uploadFile({ data: data, step: 'more'}));
      } 
      else {
        dispatch(updateMoreAndSignature(data));
      }
    // }
    // else {
      
    //   if (data.agentSignature.length === 0) {
    //     setError('signature', { type: 'custom', message: "Merci de signer votre ordre de mission." });
    //     return;
    //   }
      
    //   if (typeof data.agentSignature !== 'string' || infosFile instanceof File) {
    //     dispatch(uploadFile({ data: data, step: 'more-and-signature'}));
    //   } 
    //   else {
    //     dispatch(updateMoreAndSignature(data));
    //   }
    // }
  };

  // const [hasNoSignatureSaved, setHasNoSignatureSaved] = useState(userSignature === '' ? true : false);
  // const savedSignature = watch('savedSignature');
  
  // useEffect(() => {
    
  //   if (!savedSignature) {
  //     setHasNoSignatureSaved(true);
  //   }
  //   else {
  //     setHasNoSignatureSaved(false);
  //   }
  // }, [savedSignature])

  // useEffect(() => {
  //   if (userSignature) {
  //     setHasNoSignatureSaved(false);
  //     setValue("savedSignature", true);
  //   }
  // }, [userSignature])

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StatusChecker status={defaultValues.status} />
      <div className="form__section">
        <FormSectionTitle>Autres</FormSectionTitle>
        <TextareaField 
          register={register}
          formField="informations"
          id="other"
          label="Autres renseignements utiles"
          placeholder="Tous renseignements utiles, des cas particuliers non pris en charge par le formulaire"
        />
        <FileField 
          setValue={setValue}
          register={register}
          formField="files"
          id="other"
          multiple
          fileName={fileNames}
        />
        <HiddenField id="docId" value={omId} register={register} />
      </div>
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

Other.propTypes = {

};

export default Other;
