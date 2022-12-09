import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import FileField from 'src/components/Fields/FileField';
import SwitchButton from 'src/components/SwitchButton';
import TextareaField from 'src/components/Fields/TextareaField';

const EfMission = ({ watch, register, errors, handler, unregister }) => {

  const handleSwitch = (event) => {
    handler(event);
  }
  const x = watch('modificationSwitch');
  console.log(x);

  useEffect(() => {
    if (!x || x === undefined) {
      unregister('missionGoalFile');

    }
  }, [x])

  useEffect(() => {
    unregister('region');
  }, [])
  return (
    <div className="form__section">
      <FormSectionTitle>Modifications</FormSectionTitle>
      <SwitchButton
          handler={handleSwitch}
          formField="modificationSwitch"
          isInForm
          register={register}
          label="Déclarer des modification de mission :"
      />
      <TextareaField
        isHidden
        id="justifications"
        label="Justifier la modification"
        formField="modificationJustifications"
        register={register}
        placeholder="Merci d'expliquer la raison du changement de votre Ordre de Mission"
        required="Merci de justifier la ou les modifications."
        error={errors.modificationJustifications}
      />
      <FileField
        isHidden
        register={register}
        formField="modificationFiles"
        id="modification-files-input"
        multiple
        label="Joindre les documents justifiant la modification"
        required="Merci de fournir la ou les pièces justifiant la modification des champs."
        error={errors.modificationJustifications}
      />
    </div>
    
  );
};

EfMission.propTypes = {

};

export default EfMission;
