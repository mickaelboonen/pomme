import React from 'react';
import PropTypes from 'prop-types';
import FormSectionTitle from 'src/components/FormSectionTitle';
import PageTitle from 'src/components/PageTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';

import Logo from 'src/assets/images/pdf.svg';

import './style.scss';
import FileProof from './FileProof';

const EfControl = () => (
  <main className='dafc'>
    <PageTitle>Contrôler un état de frais</PageTitle>
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
          isLink
          link="/dafc/états-de-frais/valider/1"
          label="Valider l'EF"
        />
      </div>
    </div>
  </main>
);

EfControl.propTypes = {

};

export default EfControl;
