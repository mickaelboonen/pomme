import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../style.scss';

// Components
import FormSectionTitle from 'src/components/FormSectionTitle';
import RadioInput from 'src/components/Fields/RadioInput';

// Actions

const Decision = ({ register, errors }) => (
  <div className="form__section">
    <FormSectionTitle>DÉCISION FINALE</FormSectionTitle>
    <div className="form__section-field">
      <label className="form__section-field-label" htmlFor="action">Valider de l'Ordre de Mission</label>
      <RadioInput
        id="validate"
        formField="action"
        label="Oui"
        register={register}
        required="Veuillez valider ou non l'Ordre de Mission."
      />
      <RadioInput
        id="reject"
        formField="action"
        label="Non"
        register={register}
        required="Veuillez valider ou non l'Ordre de Mission."
      />
      {errors.action && <p className="form__section-field-error form__section-field-error--open">{errors.action.message}</p>}
    </div>
  </div>
);

Decision.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default Decision;
