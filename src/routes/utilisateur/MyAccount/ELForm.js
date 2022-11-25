import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextField from 'src/components/Fields/TextField';
import ButtonElement from 'src/components/Fields/ButtonElement';
import Logo from '../../../assets/images/pdf.svg';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';
import FileField from 'src/components/Fields/FileField';

const ELForm = () => {
  
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
  const message = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eos rem possimus expedita dolores odio qui voluptas architecto culpa nobis.'
  
  return (

    <main className="form-page">
      <div className="form-page__title">
        <PageTitle>Signer un État liquidatif</PageTitle>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormSectionTitle>État liquidatif</FormSectionTitle>
            <div className="form__section-field-button">
              <ButtonElement
                type="button"
                label="Télécharger l'état liquidatif"          
              />
            </div>
          {message !== "" && <FormSectionTitle>Commentaire</FormSectionTitle>}
          {message !== "" && (
            <div className='form__section'>
              <p className='form__section-notification-message'>
                {message}
              </p>
            </div>
          )}
          <FormSectionTitle>Signatures</FormSectionTitle>
          <FileField
            register={register}
            formField="signature-input"
            id="signature"
            label="Signature"
            placeholder="Joindre votre signature"
          />
          <div className="form__section-field-button">
            <ButtonElement
              type="submit"
              label="Signer"          
            />
        </div>
      </form>
    </main>
  );
};

ELForm.propTypes = {

};

export default ELForm;
