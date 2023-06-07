import React from 'react';
import PropTypes from 'prop-types';


import VideoPlayer from 'src/components/VideoPlayer';
import Presentation from 'src/assets/video/presentation-pom.mp4';
import PageTitle from 'src/components/PageTitle';
import RadioInput from 'src/components/Fields/RadioInput';
import FormSectionTitle from 'src/components/FormSectionTitle';

import ProfilVoyager from 'src/assets/docs/old-pdf/profil-voyageur.pdf'

import './style.scss';

const Assistance = () => (

  <div className='my-preferences'>
    <PageTitle>Assistance</PageTitle>
    <form className='theme'>
      <FormSectionTitle>POM : une présentation</FormSectionTitle>
      <VideoPlayer link={Presentation} />
      <FormSectionTitle>POM : le tutoriel</FormSectionTitle>
      <FormSectionTitle>POM : les anciens PDFs</FormSectionTitle>
      <a href={ProfilVoyager} download target="_blank">Télécharger le PDF</a>
    </form>
  </div>
);

Assistance.propTypes = {

};

export default Assistance;
