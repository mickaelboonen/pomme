import React from 'react';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';

const ScientificEvent = ({ setValue, register, errors, filename}) => {
     return (
    <div className="form__section">
      <FormSectionTitle>Événement scientifique</FormSectionTitle>
      <div className="form__section-field">
        <p className="form__section-field-label">Type de présentation</p>
        <CheckboxInput
          id="poster"
          formField="presentation"
          label="Poster"
          register={register}
        />
        <CheckboxInput
          id="abstract"
          formField="presentation"
          label="Abstract"
          register={register}
        />
        <CheckboxInput
          id="intervention orale"
          formField="presentation"
          label="Intervention orale"
          register={register}
          required="Merci de sélectionner l'option qui correspond."
        />
        {errors.presentation && <p className="form__section-field-error form__section-field-error--open">{errors.presentation.message}</p>}
      </div>
      <TextField 
        register={register}
        id="budget-field"
        label="Quel budget / contrat est concerné ?"
        formField="budget"
        required="Merci de renseigner lu budget ou le contrat concerné par l'événement."
        placeholder=""
        error={errors.budget}
      />
      <FileField
        setValue={setValue}
        id="missionPurposeFile-field"
        formField="missionPurposeFile"
        fileName={filename}
        register={register}
        error={errors.missionPurposeFile}
        label="Jutificatif d'événement"
      />
    </div>
  );
};

ScientificEvent.propTypes = {

};

export default ScientificEvent;
