import React from 'react';
import PropTypes from 'prop-types';
import FormSectionTitle from '../../generics/FormSectionTitle';
import ButtonElement from '../OMForm/Fields/ButtonElement';

import Logo from '../../../assets/images/pdf.svg';

import './style.scss';
import FileProof from './FileProof';

const EfControl = () => (
  <div className='dafc__container'>
    <FormSectionTitle>État de Frais à contrôler</FormSectionTitle>
      <ButtonElement
        type="button"
        label="Télécharger l'EF"
      />
    <FormSectionTitle>Pièces justificatives</FormSectionTitle>
    <div className='dafc__container-section'>
      {['1', '2', '3', '4', '5', '6', '7', '8'].map((id) => (
        <FileProof {...id} />
      ))}
    </div>
    <div className='dafc__container-buttons'>
      <ButtonElement
        type="button"
        label="Valider l'EF"
      />
    </div>
  </div>
);

EfControl.propTypes = {

};

export default EfControl;
