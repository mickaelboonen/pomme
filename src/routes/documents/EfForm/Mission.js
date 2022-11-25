import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Map from '../../../assets/images/map.svg';
import Pin from '../../../assets/images/pin.svg';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import SplitFields from 'src/components/Fields/SplitFields';
import TextFieldWithIcon from 'src/components/Fields/TextFieldWithIcon';
import { displayRegionFieldsInFormMission } from '../../../selectors/domManipulators';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import SelectField from 'src/components/Fields/SelectField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import SwitchButton from 'src/components/SwitchButton';
import TextareaField from 'src/components/Fields/Textarea';

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
    navigate('/nouveau-document/état-de-frais?etape=' + step++)
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
        <TextField id="motif" formField="mission-goal" label="Motif de la mission" register={register} disabled />
        <FileField
          id="mission-goal"
          formField="mission-goal-file"
          register={register}
          disabled
          pieces="Joindre impérativement convocation, mail ou tout autre document en attestant"
        />
      </div>
      <div className="form__section">
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <SplitFields register={register} />
        <SelectField
          isHidden
          disabled
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
            disabled
          />
          <RadioInput
            id="dom-tom"
            formField="region"
            label="DOM / TOM (*)"
            register={register}
            handler={handleRegionClick}
            disabled
          />
          <RadioInput
            id="étranger"
            formField="region"
            label="Étranger (*)(**)"
            register={register}
            handler={handleRegionClick}
            disabled
          />
        </div>
        <TextFieldWithIcon
          isHidden={false}
          id={"mission-adress"}
          name="Adresse de la mission"
          icon={Pin}
          disabled
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
      <div className="form__section">
        <FormSectionTitle>Modifications</FormSectionTitle>
        <SwitchButton
            handler={() => {}}
            formField="modification-switch"
            isInForm
            register={register}
            label="Déclarer des modification de mission :"
        />
        <TextareaField 
          id="justifications"
          label="Justifier la modification"
          formField="modification-input"
          register={register}
          placeholder="Merci d'expliquer la raison du changement de votre Ordre de Mission"
        />
        <FileField
          register={register}
          formField="modification-files"
          id="modification-files-input"
          multiple
          label="Joindre les documents justifiant la modification"
        />
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Mission.propTypes = {

};

export default Mission;
