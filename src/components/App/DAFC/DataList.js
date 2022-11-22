import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from '../../generics/FormSectionTitle';
import SelectField from '../OMForm/Fields/SelectField';
import ButtonElement from '../OMForm/Fields/ButtonElement';

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
            type="button"
            label="Saisir l'OM dans GFC Missions"
          />
        </div>
      )}
      {isEf && (
        <div className='dafc__container-buttons'>
          <ButtonElement
            type="button"
            label="Contrôler"
          />
          <ButtonElement
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
