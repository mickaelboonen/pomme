import React from 'react';

import '../style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';
import NumberField from 'src/components/Fields/NumberField';
import DateField from 'src/components/Fields/DateField';
import RadioInput from 'src/components/Fields/RadioInput';
import CheckboxInput from 'src/components/Fields/CheckboxInput';

const ScientificEvent = ({ setValue, register, errors, filename, isEfForm, isMissionFormDisabled }) => {
  return (
    <div className="form__section">
      <FormSectionTitle>Événement scientifique</FormSectionTitle>
      <div className="form__section-field">
        <label className="form__section-field-label" htmlFor="departure-place">Prise en charge de l'événement scientifique (Inscription colloque, séminaire, conférence)</label>
          <RadioInput
          disabled={isEfForm && isMissionFormDisabled}
          id="unimes-science"
          formField="sciencePayment"
          label="Réglé par Unîmes"
          register={register}
        />
        <RadioInput
          disabled={isEfForm && isMissionFormDisabled}
          id="user-science"
          formField="sciencePayment"
          label="Avancé par l'agent"
          register={register}
          required={isEfForm && isMissionFormDisabled ? null : "Veuillez renseigner le champ."}
        />
        <RadioInput
          disabled={isEfForm && isMissionFormDisabled}
          id="free-science"
          formField="sciencePayment"
          label="Pris en charge par un autre organisme"
          register={register}
          required={isEfForm && isMissionFormDisabled ? null : "Veuillez renseigner le champ."}
        />
      </div>
      {errors.sciencePayment && <p className="form__section-field-error form__section-field-error--open">{errors.sciencePayment.message}</p>}

      <div className="form__section-field">
        <p className="form__section-field-label">Type de présentation</p>
        <CheckboxInput
          disabled={isEfForm && isMissionFormDisabled}
          id="poster"
          formField="presentation"
          label="Poster"
          register={register}
        />
        <CheckboxInput
          disabled={isEfForm && isMissionFormDisabled}
          id="abstract"
          formField="presentation"
          label="Abstract"
          register={register}
        />
        <CheckboxInput
          disabled={isEfForm && isMissionFormDisabled}
          id="intervention orale"
          formField="presentation"
          label="Intervention orale"
          register={register}
          required={isEfForm && isMissionFormDisabled ? null : "Merci de sélectionner l'option qui correspond."}
        />
        {errors.presentation && <p className="form__section-field-error form__section-field-error--open">{errors.presentation.message}</p>}
      </div>
      <NumberField
        id="cost-field"
        label="Montant de l'inscription"
        error={errors.scienceCost}
        disabled={isEfForm && isMissionFormDisabled}
        register={register}
        formField="cost"
        isAmount
      />
      <DateField
        type="date"
        id="deadline-field"
        label="Date limite du règlement de l'inscription"
        register={register}
        formField="deadline"
        disabled={isEfForm && isMissionFormDisabled}
        error={errors.deadline}
      />
      <TextField 
        disabled={isEfForm && isMissionFormDisabled}
        register={register}
        id="budget-field"
        label="Quel budget / contrat est concerné ?"
        formField="budget"
        placeholder=""
        error={errors.budget}
      />
      <FileField
        disabled={isEfForm}
        setValue={setValue}
        multiple
        id="missionPurposeFile-field"
        formField="missionPurposeFile"
        fileName={filename}
        register={register}
        error={errors.missionPurposeFile}
        label="Jutificatif d'événement"
        pieces="Si le document est langue étrangère, merci de fournir une traduction en plus."
      />
      <TextareaField
        id="comment-field"
        label="Commentaires"
        formField="comment"
        register={register}
        // placeholder
        // isHidden
        // rows
        // required
        error={errors.comment}
      />
    </div>
  );
};

ScientificEvent.propTypes = {

};

export default ScientificEvent;
