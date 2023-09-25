import React  from 'react';

import '../style.scss';

// Components
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import ButtonElement from 'src/components/Fields/ButtonElement';

const RejectEf = ({ stepArray, register, errors }) => (
  <>
    <div className="form__section-field">
      <p className="form__section-field-label">Si non, veuillez préciser les étapes refusées</p>
      {stepArray.map((step) => (
        <CheckboxInput key={step.step} id={step.step} formField="rejectedFields" label={step.label} register={register} />
      ))}
    </div>
    <div className="form__section-field">
      <ButtonElement
      type="submit"
      label="Refuser l'ordre de mission"
      />
    </div>
  </>
);

RejectEf.propTypes = {

};

export default RejectEf;
