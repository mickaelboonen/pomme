import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import RadioInput from 'src/components/Fields/RadioInput';
import DateField from 'src/components/Fields/DateField';

// TODO : non utilisé, à vérifier et supprimer
const SplitFields = ({ register }) => {
  const handleClickonRadio = (event) => {
    const departureFromWork = document.querySelector('#departure-work');
    const returnToWork = document.querySelector('#return-work');

    if ( departureFromWork.checked || returnToWork.checked ) {

      document.querySelector('#work-adress').classList.remove('form__section-field--hidden');
    }
    else {
      document.querySelector('#work-adress').classList.add('form__section-field--hidden');
    }
  }
  return (
    <div className="form__section form__section--split">
      <div className="form__section-half">
        <DateField
          type="datetime-local"
          id="departure"
          label="Jour et Heure de départ"
          register={register}
          formField="departure"
        />
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="departure-place">Lieu de départ</label>
          <RadioInput
            id="departure-home"
            formField="train-class"
            label="Résidence familiale"
            register={register}
            handler={handleClickonRadio}
          />
          <RadioInput
            id="departure-work"
            formField="train-class"
            label="Résidence administrative"
            register={register}
            handler={handleClickonRadio}
          />
        </div>
      </div>
      <div className="form__section-half form__section-half--separator" />
      <div className="form__section-half">
        <DateField
          type="datetime-local"
          id="return"
          label="Jour et Heure de retour"
          register={register}
          formField="return"
        />
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="departure-place">Lieu de retour</label>
          <RadioInput
            id="return-home"
            formField="return-place"
            label="Résidence familiale"
            register={register}
            handler={handleClickonRadio}
          />
          <RadioInput
            id="return-work"
            formField="return-place"
            label="Résidence administrative"
            register={register}
            handler={handleClickonRadio}
          />
        </div>
      </div>
    </div>
  );
};

SplitFields.propTypes = {

};

export default SplitFields;
