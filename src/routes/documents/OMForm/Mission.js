import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Map from '../../../assets/images/map.svg';
import Pin from '../../../assets/images/pin.svg';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextFieldWithIcon from 'src/components/Fields/TextFieldWithIcon';
import { displayRegionFieldsInFormMission } from '../../../selectors/domManipulators';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import SelectField from 'src/components/Fields/SelectField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import DateField from 'src/components/Fields/DateField';
import TextareaField from 'src/components/Fields/Textarea';
import SwitchButton from 'src/components/SwitchButton';

const Mission = ({ step, isEF }) => {
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
    navigate('/nouveau-document/ordre-de-mission?etape=' + step++);
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";
  
  const handleRegionClick = () => {
    displayRegionFieldsInFormMission();
  };
  
  const adresses = [
    'adresse Vauban', 
    'adresse Carmes', 
    'adresse Hoche', 
    'adresse XYZ', 
  ];
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

  const toggleDisabledFields = () => {
    const justificationTextareaField = document.getElementById('justifications');
    justificationTextareaField.classList.toggle('form__section-field--hidden');

    const justificationFileField = document.getElementById('modification-files-input');
    justificationFileField.classList.toggle('form__section-field--hidden');

    // TODO : toggle tous les disabled yay
  }
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Raison de la mission</FormSectionTitle>
        <TextField
          id="motif"
          disabled={isEF}
          formField="mission-goal"
          label="Motif de la mission"
          register={register}
        />
        <FileField
          disabled={isEF}
          id="mission-goal"
          formField="mission-goal-file"
          register={register}
          pieces="Joindre impérativement convocation, mail ou tout autre document en attestant"
        />
      </div>
      <div className="form__section">
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="form__section form__section--split">
          <div className="form__section-half">
            <DateField
              disabled={isEF}
              type="datetime-local"
              id="departure"
              label="Jour et Heure de départ"
              register={register}
              formField="departure"
            />
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Lieu de départ</label>
              <RadioInput
                disabled={isEF}
                id="departure-home"
                formField="train-class"
                label="Résidence familiale"
                register={register}
                handler={handleClickonRadio}
              />
              <RadioInput
                disabled={isEF}
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
              disabled={isEF}
              type="datetime-local"
              id="return"
              label="Jour et Heure de retour"
              register={register}
              formField="return"
            />
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Lieu de retour</label>
              <RadioInput
                disabled={isEF}
                id="return-home"
                formField="return-place"
                label="Résidence familiale"
                register={register}
                handler={handleClickonRadio}
              />
              <RadioInput
                disabled={isEF}
                id="return-work"
                formField="return-place"
                label="Résidence administrative"
                register={register}
                handler={handleClickonRadio}
              />
            </div>
          </div>
        </div>
        <SelectField
          isHidden
          disabled={isEF}
          data={adresses}
          register={register}
          formField="work-adress"
          id="work-address-select"
          label="Adresse administrative"
          blankValue={"Veuillez sélectionner l'adresse administrative qui vous correspond"}
        />
      </div>
      <div className='form__section'>
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>
        <div className="form__section form__section--split">
          <RadioInput
            disabled={isEF}
            id="métropole"
            formField="region"
            label="France Métropolitaine"
            register={register}
            handler={handleRegionClick}
          />
          <RadioInput
            disabled={isEF}
            id="dom-tom"
            formField="region"
            label="DOM / TOM (*)"
            register={register}
            handler={handleRegionClick}
          />
          <RadioInput
            disabled={isEF}
            id="étranger"
            formField="region"
            label="Étranger (*)(**)"
            register={register}
            handler={handleRegionClick}
          />
        </div>
        <TextFieldWithIcon
          disabled={isEF}
          isHidden={false}
          id={"mission-adress"}
          name="Adresse de la mission"
          icon={Pin}
          register={register}
        />
        <TextFieldWithIcon
          disabled={isEF}
          isHidden={true}
          id={"country"}
          name="Pays de la mission"
          icon={Map}
          register={register}
        />
        <div className="form__section-field form__section-field--hidden" id="abroad-field">
          <p className="form__section-field-label">(*) Préciser : </p>
          <CheckboxInput
            register={register}
            formField="abroad"
            id="per-diem"
            label="Per diem"
          />
          <CheckboxInput
            register={register}
            formField="abroad"
            id="frais-reels"
            label="Frais réels"
          />
        </div>
        <div className="form__section-field form__section-field--hidden" id="abroad-report">
          <p className="form__section-field-label">(**) Compte rendu à fournir au retour de la mission sur financement RI</p>
        </div>
      </div>
      {isEF && (
        <div className="form__section">
          <FormSectionTitle>Modifications</FormSectionTitle>
          <SwitchButton
              handler={toggleDisabledFields}
              formField="modification-switch"
              isInForm
              register={register}
              label="Déclarer des modification de mission :"
          />
          <TextareaField
            isHidden
            id="justifications"
            label="Justifier la modification"
            formField="modification-input"
            register={register}
            placeholder="Merci d'expliquer la raison du changement de votre Ordre de Mission"
          />
          <FileField
            isHidden
            register={register}
            formField="modification-files"
            id="modification-files-input"
            multiple
            label="Joindre les documents justifiant la modification"
          />
        </div>
      )}
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Mission.propTypes = {

};

export default Mission;
