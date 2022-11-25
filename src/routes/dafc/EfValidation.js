import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import FileField from 'src/components/Fields/FileField';
import { useForm } from 'react-hook-form';
import TextField from 'src/components/Fields/TextField';
import TextareaField from 'src/components/Fields/Textarea';
import ButtonElement from 'src/components/Fields/ButtonElement';
import PageTitle from 'src/components/PageTitle';

const EfValidation = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <main className='dafc'>
      <PageTitle>Valider un état de frais</PageTitle>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormSectionTitle>Validation</FormSectionTitle>
        <FileField
          register={register}
          formField="el-field"
          id="el"
          label="État liquidatif à télécharger"
        />
        <TextField
          id="mission-goal"
          formField="mission-goal-file"
          register={register}
          label="Validé par"
          placeholder="Pré-rempli"
        />
        <TextareaField 
          id="comments"
          register={register}
          formField="comments"
          label="Commentaires"
          placeholder="Commentaires si le montant est différent que celui calculé par l'utilisateur"
          className="form__section-field-textarea"
          rows="5"
        />
        <div className="form__section-field-button">
          <ButtonElement
            type="submit"
            label="Valider l'État liquidatif"          
          />
        </div>
      </form>
    </main>
  );
};

EfValidation.propTypes = {

};

export default EfValidation;
