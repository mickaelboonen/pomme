import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import Upload from '../../../assets/images/upload.svg';

import './style.scss';
import FormSectionTitle from '../../generics/FormSectionTitle';

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
  }
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
        <div className="form__section-field">
          <div style={{'display': 'flex'}}>
            <div>Départ
              <div>
                <label htmlFor="departure"></label>
                <input type="datetime-local" id="departure" {...register('departure')} />
              </div>
              <div>
                <label htmlFor="departure-place">Lieu</label>
                <div><input type="radio" name="" id="departure-home" /><label htmlFor="departure-home">Lieu</label></div>
                <div><input type="radio" name="" id="departure-work" /><label htmlFor="departure-work">Lieu</label></div>
              </div>
            </div>
            <div>Retour
              <div>
                <label htmlFor="departure"></label>
                <input type="datetime-local" id="departure" {...register('departure')} />
              </div>
              <div>
                <label htmlFor="departure-place">Lieu</label>
                <div><input type="radio" name="" id="return-home" /><label htmlFor="return-home">Lieu</label></div>
                <div><input type="radio" name="" id="return-work" /><label htmlFor="return-work">Lieu</label></div>
              </div>
            </div>
          </div>
          <div>
            <label className="form__section-field-label" htmlFor="motif">Adresse administrative</label>
            <select
              id="motif"
              className="form__section-field-input"
                {...register('motif')}
              />
          </div>
        </div>
      </div>
      <div className="form__section">
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

Mission.propTypes = {

};

export default Mission;
