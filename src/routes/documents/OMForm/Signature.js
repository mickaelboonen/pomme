import React, { useEffect } from 'react';
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
import { uploadFile } from '../../../reducer/omForm';

const Signature = ({ step }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { signature } = useSelector((state) => state.app);

  const omId = searchParams.get('id');
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // TODO : Process Data

    if (data.savedSignature) {

      const formattedData = turnSignatureDataToDbFormat(data, signature);
      console.log(formattedData.otherFiles.length);

      // TODO : modifier le File Field pour prendre en compte le multi file parce que la il ne prend que l premier.
      // TODO : Ensuite faire la verif pour l'upload des pieces
      // TODO : ensuite créer la table pour le OM_More
      // TODO : update signature et update more
      if (typeof formattedData.agentSignature === 'object') {
        dispatch(uploadFile({ data: formattedData, step: 'signature'})); 
        console.log('NO');
      }
      else if (formattedData.otherFiles.getName()) {

        dispatch(uploadFile({ data: formattedData, step: 'more'})); 
        console.log('YO');
      }

      // dispatch(uploadFile({ data: formattedData, step: 'signature'})); 

      // dispatch(updateSignature({ 
      //   omId: data.omId,
      //   otherFiles: data.otherFiles,
      //   otherInfos: data.otherInfos,
      // }))

    }
    // navigate('/nouveau-document/ordre-de-mission?etape=' + step++);

    
  };

  useEffect(() => {
    if (signature !== null) {
      const checkbox = document.getElementById('saved-signature-field');
      checkbox.checked = true;
      setValue("savedSignature", true);

    }
  }, [signature])

  const savedSignature = watch('savedSignature');
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
          setValue={setValue}
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
