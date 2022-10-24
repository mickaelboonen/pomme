import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import Upload from '../../../assets/images/upload.svg';

import './style.scss';
import FormSectionTitle from '../../generics/FormSectionTitle';
import SplitFields from './Fields/SplitFields';

const Mission = () => {
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

  const handleClickOnFileInput = (event) => {
    event.currentTarget.firstChild.click();
  };

  const handleChange = (event) => {
    const { nextSibling, value } = event.target;
    const filename = value.slice(12);
    nextSibling.textContent = filename;
  };

  const handleRegionClick = () => {
    const isAbroad = document.querySelector('#étranger');
    const domTom = document.querySelector('#dom-tom');

    if ( isAbroad.checked ) {
      document.querySelector('#country-field').classList.remove('form__section-field--hidden');
      document.querySelector('#abroad-field').classList.remove('form__section-field--hidden');
      document.querySelector('#abroad-report').classList.remove('form__section-field--hidden');
    }
    else if (domTom.checked) {
      document.querySelector('#abroad-field').classList.remove('form__section-field--hidden');

    }
    else {
      document.querySelector('#country-field').classList.add('form__section-field--hidden');
      document.querySelector('#abroad-field').classList.add('form__section-field--hidden');
      document.querySelector('#abroad-report').classList.add('form__section-field--hidden');
    }
  };
  
  const adresses = [
    'adresse Vauban', 
    'adresse Carmes', 
    'adresse Hoche', 
    'adresse XYZ', 
  ];
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
      <FormSectionTitle>Raison de la mission</FormSectionTitle>
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="motif">Motif de la mission</label>
          <input
            id="motif"
            className="form__section-field-input"
              {...register('motif')}
            />
        </div>
        <div className="form__section-field" >
          <label className="form__section-field-label" htmlFor="motif-justif">Pièce justificative</label>
          <div className="form__section-field-input form__section-field-input--file" onClick={handleClickOnFileInput}>
            <input
              id="motif-justif"
              type="file"
              {...register('motif-justif')}
              onChange={handleChange}
            />
            <div />
          </div>
          <p className="form__section-field-label form__section-field-label--infos">Joindre impérativement convocation, mail ou tout autre document en attestant</p>
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <SplitFields register={register} />
        <div className="form__section-field form__section-field--hidden" id="work-adress">
          <label className="form__section-field-label" htmlFor="motif">Adresse administrative</label>
          <select
            id="adresse-select"
            className="form__section-field-input"
              {...register('adresse-select')}
          >
            <option value="">Veuillez sélectionner l'adresse administrative qui vous correspond</option>
            {adresses.map((adresse) => <option key={adresse} value={adresse}>{adresse}</option>)}
          </select>
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>


        <div className="split-fields">
          <div className="form__section-field-radio">
            <input
              type="radio"
              name=""
              id="métropole"
              value="métropole"
              {...register('region')}
              onClick={handleRegionClick}
            />
            <label htmlFor="métropole">France Métropolitaine</label>
          </div>
          <div className="form__section-field-radio">
            <input
              type="radio"
              name=""
              id="dom-tom"
              value="dom-tom"
              {...register('region')}
              onClick={handleRegionClick}
            />
            <label htmlFor="dom-tom">DOM / TOM (*)</label>
          </div>
          <div className="form__section-field-radio">
            <input
              type="radio"
              name=""
              id="étranger"
              value="étranger"
              {...register('region')}
              onClick={handleRegionClick}
            />
            <label htmlFor="étranger">Étranger (*)(**)</label>
          </div>
        </div>
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="mission-adress">Adresse de la mission</label>
          <input
            id="mission-adress"
            className="form__section-field-input"
              {...register('mission-adress')}
            />
        </div>

{/* -------------------------------------------------------------------------------------------------- */}
        <div className="form__section-field form__section-field--hidden" id="country-field">
          <label className="form__section-field-label" htmlFor="mission-adress">Pays</label>
          <input
            id="country"
            className="form__section-field-input"
              {...register('country')}
            />
        </div>
{/* -------------------------------------------------------------------------------------------------- */}
        <div className="form__section-field form__section-field--hidden" id="abroad-field">
          <div>
            <label className="form__section-field-label" htmlFor="mission-adress">Per diem</label>
            <input
              id="country"
              type="checkbox"
              className="form__section-field-input"
                {...register('abroad')}
              />
          </div>
          <div>
            <label className="form__section-field-label" htmlFor="mission-adress">Frais réels</label>
            <input
              id="country"
              type="checkbox"
              className="form__section-field-input"
                {...register('abroad')}
              />
          </div>
        </div>
        <p className="form__section-field form__section-field--hidden" id="abroad-report">
          (**) Compte rendu à fournir au retour de la mission sur financement RI
        </p>


      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

Mission.propTypes = {

};

export default Mission;
