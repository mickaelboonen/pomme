import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';

import './style.scss';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';

const Signature = ({ step }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');

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
        <HiddenField id="omId" value={efId} register={register} />
      </div>
      <Buttons
        step={step}
        id={efId}
        url={loader}
        watch={watch}
      />
    </form>
    
  );
};

Signature.propTypes = {

};

export default Signature;
