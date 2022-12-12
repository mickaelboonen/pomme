import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import FileField from 'src/components/Fields/FileField';
import SwitchButton from 'src/components/SwitchButton';
import TextareaField from 'src/components/Fields/TextareaField';

const EfMission = ({ register, errors, handler, unregister, modificationSwitch }) => {

  const handleSwitch = (event) => {
    handler(event);
  }

  useEffect(() => {
    if (!modificationSwitch || modificationSwitch === undefined) {
      unregister('missionGoalFile');


    }
  }, [modificationSwitch])

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
        error={errors.modificationJustifications}
      />
      <FileField
        isHidden
        register={register}
        formField="modificationFiles"
        id="modification-files-input"
        multiple
        label="Joindre les documents justifiant la modification"
        error={errors.modificationJustifications}
      />
    </div>
    
  );
};

EfMission.propTypes = {

};

export default EfMission;
