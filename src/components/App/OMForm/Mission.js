import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Map from '../../../assets/images/map.svg';
import Pin from '../../../assets/images/pin.svg';

import './style.scss';
import FormSectionTitle from '../../generics/FormSectionTitle';
import SplitFields from './Fields/SplitFields';
import TextFieldWithIcon from './Fields/TextFieldWithIcon';
import { displayRegionFieldsInFormMission } from '../../../selectors/domManipulators';
import RefusalMessage from './Fields/RefusalMessage';
import Buttons from './Fields/Buttons';

const Mission = ({ step }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // TODO : Process Data

    // Next Step
    const nextStep = step++;
    navigate('/documents/ordre-de-mission/nouveau?etape=' + step++);

    
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  const handleClickOnFileInput = (event) => {
    event.currentTarget.firstChild.click();
  };

  const handleChange = (event) => {
    const { nextSibling, value } = event.target;
    const filename = value.slice(12);
    nextSibling.textContent = filename;
  };

  const handleRegionClick = () => {
    displayRegionFieldsInFormMission();
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
          <label className="form__section-field-label" htmlFor="classe-certificate">Pièce justificative</label>
          <div className="form__section-field-input form__section-field-input--file" onClick={handleClickOnFileInput}>
            <input
              id="classe-certificate"
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

        <TextFieldWithIcon
          isHidden={false}
          id={"mission-adress"}
          name="Adresse de la mission"
          icon={Pin}
          register={register}
        />
        <TextFieldWithIcon
          isHidden={true}
          id={"country"}
          name="Pays de la mission"
          icon={Map}
          register={register}
        />
        <div className="form__section-field form__section-field--hidden" id="abroad-field">
          <p className="form__section-field-label">(*) Préciser : </p>
          <div className="form__section-field-checkbox">
            <input
              type="checkbox"
              id="per-diem"
              value="per-diem"
                {...register('abroad')}
              />
            <label className="form__section-field-label" htmlFor="per-diem">Per diem</label>
          </div>
          <div className="form__section-field-checkbox">
            <input
              type="checkbox"
              id="frais-reels"
              value="frais-reels"
                {...register('abroad')}
              />
            <label className="form__section-field-label" htmlFor="mission-adress">Frais réels</label>
          </div>
        </div>
        <div className="form__section-field form__section-field--hidden" id="abroad-report">
          <p className="form__section-field-label">(**) Compte rendu à fournir au retour de la mission sur financement RI</p>
        </div>
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Mission.propTypes = {

};

export default Mission;
