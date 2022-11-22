import React from 'react';
import PropTypes from 'prop-types';
import FormSectionTitle from '../../generics/FormSectionTitle';
import ButtonElement from '../OMForm/Fields/ButtonElement';

import Logo from '../../../assets/images/pdf.svg';

import './style.scss';

const EfControl = () => (
  <div className='dafc__container'>
    <FormSectionTitle>État de Frais à contrôler</FormSectionTitle>
      <ButtonElement
        type="button"
        label="Télécharger l'EF"
      />
    <FormSectionTitle>Pièces justificatives</FormSectionTitle>
    <div className='dafc__container-section'>
      {['1', '2', '3', '4'].map((id) => (
        <img key={id} src={Logo} alt="" />
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
