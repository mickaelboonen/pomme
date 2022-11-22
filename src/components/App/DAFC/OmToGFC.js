import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from '../../generics/FormSectionTitle';
import FileField from '../OMForm/Fields/FileField';
import { useForm } from 'react-hook-form';
import TextField from '../OMForm/Fields/TextField';
import RefusalMessage from '../OMForm/Fields/RefusalMessage';
import ButtonElement from '../OMForm/Fields/ButtonElement';

const OmToGFC = () => {
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
  const progress = '40%'
  const message = '';
  return (
  <form className='form' onSubmit={handleSubmit(onSubmit)}>
    <FormSectionTitle>Ordre de Mission</FormSectionTitle>
    <FileField
      register={register}
      formField="om-field"
      id="om"
      label="Ordre de Mission à télécharger"
    />
    <FormSectionTitle>Processus de Saisie</FormSectionTitle>
    <div className='form__section'>
      <div className='form__section-progress'>
        <div className='form__section-progress-partial' style={{'width': progress}}>
          40%
        </div>
      </div>
    </div>
    {message !== '' && <FormSectionTitle>Erreurs</FormSectionTitle>}
    {message !== '' && <RefusalMessage message={message} />}
    <div className="form__section-field-button">
      <ButtonElement
        type="submit"
        label="Lancer la saisie"          
      />
    </div>
  </form>
);}

OmToGFC.propTypes = {

};

export default OmToGFC;
