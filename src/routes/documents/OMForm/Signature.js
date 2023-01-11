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
import { updateMore, updateSignature, uploadFile } from '../../../reducer/omForm';

const Signature = ({ step }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { userSignature } = useSelector((state) => state.app);
  
  const omId = searchParams.get('id');
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    const formattedData = turnSignatureDataToDbFormat(data, signature);

    if (data.savedSignature) {

      dispatch(updateSignature(formattedData));
      
      if (data.otherFiles.length > 0) {
        dispatch(uploadFile({ data: formattedData, step: 'more'})); 
      }
      else {
        dispatch(updateMore(formattedData));
      }
    }
    else {
      
      if (data.signature.length === 0) {
        setError('signature', { type: 'custom', message: "Merci de signer votre ordre de mission." });
      }

      dispatch(uploadFile({ data: formattedData, step: 'signature'}));

      if (data.otherFiles.length > 0) {
        dispatch(uploadFile({ data: formattedData, step: 'more'})); 
      }
      else {
        dispatch(updateMore(formattedData));
      }
    }
    // navigate('/nouveau-document/ordre-de-mission?etape=' + step++);

    
  };

  const [hasNoSignatureSaved, setHasNoSignatureSaved] = useState(true);
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

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Signature</FormSectionTitle>
        <div className="form__section-field" id="abroad-field">
          <CheckboxInput
            register={register}
            formField="savedSignature"
            id="saved-signature-field"
            label="Utiliser la signature enregistrée dans mon profil"
          />
        </div>
        {hasNoSignatureSaved && (
          <FileField 
            setValue={setValue}
            register={register}
            formField="signature"
            id="signature"
            error={errors.signature}
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
        />
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Signature.propTypes = {

};

export default Signature;
