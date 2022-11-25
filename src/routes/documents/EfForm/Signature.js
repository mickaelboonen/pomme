import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from './Fields/RefusalMessage';
import Buttons from './Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import TextField from './Fields/TextField';
import FileField from './Fields/FileField';
import TextareaField from './Fields/Textarea';

const Signature = ({ step }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // TODO : Process Data

    navigate('/nouveau-document/état-de-frais?etape=' + step++)
    
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";


  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Signature</FormSectionTitle>
        <FileField 
          register={register}
          formField="signature-file"
          id="signature"
          pieces=""
        />
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
      <Buttons step={step} />
    </form>
    
  );
};

Signature.propTypes = {

};

export default Signature;
