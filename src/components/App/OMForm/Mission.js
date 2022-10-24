import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import TitleH3 from '../../generics/TitleH3';
import FormSectionTitle from '../../generics/FormSectionTitle';

const Mission = () => (
  <form className="form">
    <FormSectionTitle>Raison de la mission</FormSectionTitle>
    <FormSectionTitle>Départ et retour</FormSectionTitle>
    <FormSectionTitle>Lieu de la mission</FormSectionTitle>
  </form>
);

Mission.propTypes = {

};

export default Mission;
