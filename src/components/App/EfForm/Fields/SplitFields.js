import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

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
    <div className="split-fields">
      <div className="split-fields__half">
        <div className="split-fields__half-field">
          <label className="split-fields__half-field-label" htmlFor="departure">Départ</label>
          <input className="split-fields__half-field-input" type="datetime-local" id="departure" {...register('departure')} />
        </div>
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="departure-place">Lieu</label>
          <div className="form__section-field-radio">
            <input
              type="radio"
              name=""
              id="departure-home"
              value="departure-home"
              onClick={handleClickonRadio}
              {...register('departure-place')}
            />
            <label htmlFor="departure-home">Résidence familiale</label>
          </div>
          <div className="form__section-field-radio">
            <input
              type="radio"
              name=""
              id="departure-work"
              value="departure-work"
              onClick={handleClickonRadio}
              {...register('departure-place')}
            />
            <label htmlFor="departure-work">Résidence administrative</label>
          </div>
        </div>
      </div>
      <div className="split-fields__half">
        <div className="split-fields__half-field">
          <label className="split-fields__half-field-label" htmlFor="return">Retour</label>
          <input className="split-fields__half-field-input" type="datetime-local" id="return" {...register('return')} />
        </div>
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="return-place">Lieu</label>
          <div className="form__section-field-radio">
            <input
              type="radio"
              onClick={handleClickonRadio}
              name=""
              id="return-home"
              value="return-home"
              {...register('return-place')}
            />
            <label htmlFor="return-home">Résidence familiale</label>
          </div>
          <div className="form__section-field-radio">
            <input
              type="radio"
              name=""
              id="return-work"
              value="return-work"
              {...register('return-place')}
              onClick={handleClickonRadio}
            />
            <label htmlFor="return-work">Résidence administrative</label>
          </div>
        </div>
      </div>
    </div>
  );
};

SplitFields.propTypes = {

};

export default SplitFields;
