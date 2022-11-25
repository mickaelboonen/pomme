import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import SelectField from 'src/components/Fields/SelectField';
import ButtonElement from 'src/components/Fields/ButtonElement';

const DataList = ({ data, title, isEf }) => {
  let label = '';
  let value = '';
  
  if (isEf) {
    label = 'états de frais';
    value = 'EF';
  }
  else {
    label = 'ordres de mission';
    value = 'OM';
  }
  
  return (
    <div className='dafc__container'>
      <FormSectionTitle>{title}</FormSectionTitle>
      <SelectField
        data={data}
        register={() => {}}
        formField="select-input"
        id="list"
        label={`Liste des ${label}`}
        blankValue={`Veuillez sélectionner un ${value}`}
      />
      {!isEf && (
        <div className='dafc__container-buttons'>
          <ButtonElement
            isLink
            link="/dafc/ordres-de-mission/saisir-un-ordre/1"
            type="button"
            label="Saisir l'OM dans GFC Missions"
          />
        </div>
      )}
      {isEf && (
        <div className='dafc__container-buttons'>
          <ButtonElement
            isLink
            link="/dafc/états-de-frais/contrôler/1"
            type="button"
            label="Contrôler"
          />
          <ButtonElement
            isLink
            link="/dafc/états-de-frais/valider/1"
            type="button"
            label="Valider"
          />
        </div>
      )}
    </div>
  );
};

DataList.propTypes = {
 
};

DataList.defaultProptypes = {
  isEf : false,
};

export default DataList;
