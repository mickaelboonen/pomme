import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FileField from 'src/components/Fields/FileField';
import TextareaField from 'src/components/Fields/TextareaField';
import HiddenField from 'src/components/Fields/HiddenField';

const Signature = ({ step }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const omId = searchParams.get('id');
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    setValue,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    
    if (typeof data.signature === 'object') {
      // TODO : save image then get the path
    }

    if (data.savedSignature) {
      // TODO : fetch signature
      data.signature = "path";
    }

    localStorage.setItem('signatureEF', JSON.stringify(data))
    const nextStep = step + 1;
    navigate('/nouveau-document/état-de-frais?etape=' + nextStep + '&id=' + omId)
    
  };

  const savedSignature = watch('savedSignature');
  useEffect(() => {
    
    const checkbox = document.getElementById('saved-signature-field');
    checkbox.checked = true;
    setValue("savedSignature", true);
  }, [])

  useEffect(() => {
      const signatureField = document.getElementById('signature');

    if (!savedSignature) {
      signatureField.classList.remove('form__section-field--hidden');
      register("signature", {
        required:"Merci de signer votre ordre de mission.",
      })
    }
    else {
      signatureField.classList.add('form__section-field--hidden');
      unregister("signature")
    }
    

  }, [savedSignature])

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
        <FileField 
          register={register}
          isHidden
          formField="signature"
          id="signature"
          error={errors.signature}
        />
        <HiddenField id="omId" value={omId} register={register} />
      </div>
      <div className="form__section">
        <FormSectionTitle>Autres</FormSectionTitle>
        <TextareaField 
          register={register}
          formField="other-infos"
          id="other"
          label="Autres renseignements utiles"
          placeholder="Tout renseignements utiles, des cas articuliers non pris en charge par le formulaire"
        />
        <FileField 
          register={register}
          formField="other-files"
          id="other"
          pieces=""
          multiple
        />
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      {/* <Buttons step={step} /> */}
    </form>
    
  );
};

Signature.propTypes = {

};

export default Signature;
