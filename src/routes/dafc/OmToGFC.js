import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import FileField from 'src/components/Fields/FileField';
import { useForm } from 'react-hook-form';
import TextField from 'src/components/Fields/TextField';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import ButtonElement from 'src/components/Fields/ButtonElement';
import PageTitle from 'src/components/PageTitle';

const OmToGFC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
  };
  const progress = '95%'
  const message = "Affiche l'erreur rencontrée, l'étape et invite à se rediriger sur l'appli GFC_MISSIONS pour finaliser la saisie et corriger l'erreur. Si la première étape a été validée, retourne l'ID de l'OM dans la base de données. Première erreur possible : le missionnaire n'est pas fournisseur dans la BDD GFC Missions et donc l'OM ne peut pas etre saisi pour lui.";
  return (
    <main className='dafc'>
      <PageTitle>Déverser un OM dans GFC Missions</PageTitle>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormSectionTitle>Ordre de Mission</FormSectionTitle>
        <FileField
          register={register}
          formField="om-field"
          id="om"
          label="Ordre de Mission à télécharger"
        />
        <FormSectionTitle>Déversement dans GFC Missions</FormSectionTitle>
        <div className='form__section'>
          <div className='form__section-progress'>
            <div className='form__section-progress-partial' style={{'width': progress}}>
              <p className='form__section-progress-partial-percent'>{progress}</p>
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
    </main>
  );
};

OmToGFC.propTypes = {

};

export default OmToGFC;
