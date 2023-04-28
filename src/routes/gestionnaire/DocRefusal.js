import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';

import './style.scss';
import TextField from 'src/components/Fields/TextField';

import './style.scss';
import TextareaField from 'src/components/Fields/TextareaField';

const DocRefusalForm = ({ role = "DGS"}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  // TODO : gérer le définitif vs en l'état


  const onSubmit = (data) => {
    // TODO : Process Data
  };

  return (
    <main className="form-page">
      <PageTitle>Valider un document</PageTitle>
      {role}
      <form className='form' style={{'margin': 'auto'}} onSubmit={handleSubmit(onSubmit)}>
        
        <FormSectionTitle>Raisons du refus</FormSectionTitle>
        <TextField
          id={"om-id"}
          label={"Identifiant de l'Ordre de Mission"}
          formField={"om-id"}
          register={register}
        />
        <TextField
          id={"gestionnaire"}
          label={"Refusé par "}
          formField={"administrator"}
          register={register}
        />
        <TextareaField
          id={"reasons"}
          label={"Raisons du refus"}
          formField={"reasons"}
          register={register}
          placeholder={"Raisons du refus - facultatif"}
        />
        <div className="form__section">
          <div className="form__section-container-button form__section-field-buttons--validation">
            <button id="submit-button" type="submit">Valider le refus</button>
          </div>
        </div>
      </form>
    </main>
  );
};

DocRefusalForm.propTypes = {

};

export default DocRefusalForm;
