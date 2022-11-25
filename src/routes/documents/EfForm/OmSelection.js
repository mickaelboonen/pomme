import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import Buttons from 'src/components/Fields/Buttons';
import SelectField from 'src/components/Fields/SelectField';

const OmSelection = ({ step }) => {
  return (
    <div className="form">
      <div className="form__section">
        <FormSectionTitle>Ordre de Mission</FormSectionTitle>
        <SelectField
          data={['1','2','3','4']}
          register={() => {}}
          formField="work-adress"
          id="work-address-select"
          label="Sélectionner l'OM dont vous voulez faire l'état de frais"
          blankValue={"Liste des OMs disponibles pour un remboursement"}
        />
      </div>
      <Buttons step={step} />
    </div>
  );
};

OmSelection.propTypes = {

};

export default OmSelection;
