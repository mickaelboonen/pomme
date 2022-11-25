import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Map from '../../../assets/images/map.svg';
import Pin from '../../../assets/images/pin.svg';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import SplitFields from './Fields/SplitFields';
import TextFieldWithIcon from './Fields/TextFieldWithIcon';
import { displayRegionFieldsInFormMission } from '../../../selectors/domManipulators';
import RefusalMessage from './Fields/RefusalMessage';
import Buttons from './Fields/Buttons';
import FileField from './Fields/FileField';
import TextField from './Fields/TextField';
import RadioInput from './Fields/RadioInput';
import SelectField from './Fields/SelectField';
import CheckboxInput from './Fields/CheckboxInput';

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
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Raison de la mission</FormSectionTitle>
        <TextField id="motif" formField="mission-goal" label="Motif de la mission" register={register} />
        <FileField
          id="mission-goal"
          formField="mission-goal-file"
          register={register}
          pieces="Joindre impérativement convocation, mail ou tout autre document en attestant"
        />
      </div>
      <div className="form__section">
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <SplitFields register={register} />
        <SelectField
          isHidden
          data={adresses}
          register={register}
          formField="work-adress"
          id="work-address-select"
          label="Adresse administrative"
          blankValue={"Veuillez sélectionner l'adresse administrative qui vous correspond"}
        />
      </div>
      <div className="form__section">
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>
        <div className="split-fields">
          <RadioInput
            id="métropole"
            formField="region"
            label="France Métropolitaine"
            register={register}
            handler={handleRegionClick}
          />
          <RadioInput
            id="dom-tom"
            formField="region"
            label="DOM / TOM (*)"
            register={register}
            handler={handleRegionClick}
          />
          <RadioInput
            id="étranger"
            formField="region"
            label="Étranger (*)(**)"
            register={register}
            handler={handleRegionClick}
          />
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
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Mission.propTypes = {

};

export default Mission;
