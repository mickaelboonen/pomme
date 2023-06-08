import React from 'react';
import PropTypes from 'prop-types';
import { FaFilePdf } from 'react-icons/fa';


import VideoPlayer from 'src/components/VideoPlayer';
import Presentation from 'src/assets/video/presentation-pom.mp4';
import PageTitle from 'src/components/PageTitle';
import RadioInput from 'src/components/Fields/RadioInput';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Docs
import ProfilVoyagerPdf from 'src/assets/docs/old-pdf/profil-voyageur.pdf'
import EventPdf from 'src/assets/docs/old-pdf/participation-événement.pdf'
import OmPdf from 'src/assets/docs/old-pdf/om.pdf'
import EfPdf from 'src/assets/docs/old-pdf/ef.pdf'
import AdvancePdf from 'src/assets/docs/old-pdf/demande-avance.pdf'
import CarPdf from 'src/assets/docs/old-pdf/autorisation-utilisation-véhicule.pdf'

import './style.scss';

const Assistance = () => {
  const oldPdfs = [
    {
      id: 1,
      doc: OmPdf,
      label: 'Ordre de mission'
    },
    {
      id: 2,
      doc: EfPdf,
      label: 'État de frais'
    },
    {
      id: 3,
      doc: AdvancePdf,
      label: "Demande d'avance"
    },
    {
      id: 4,
      doc: CarPdf,
      label: "Autorisation d'utilisation d'un véhicule"
    },
    {
      id: 5,
      doc: EventPdf,
      label: 'Participation à un événement'
    },
    {
      id: 6,
      doc: ProfilVoyagerPdf,
      label: 'Profil Voyageur'
    },
  ]

  const handleClick = (event) => {
    const { id } = event.target;
    const el = document.getElementById(id + '-section');
    el.classList.toggle('assistance__section--open');
  }
  
  return (
    <div className='my-preferences'>
      <PageTitle>Assistance</PageTitle>
      <div className='theme assistance'>
        <FormSectionTitle needsClarity handler={handleClick} id="presentation">POM : une présentation</FormSectionTitle>
        <div className='assistance__section' id='presentation-section'>
          <video className='assistance__section-video' src={Presentation}  controls="controls">
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>        </div>
        <FormSectionTitle needsClarity handler={handleClick} id="tuto">POM : le tutoriel</FormSectionTitle>
        <div className='assistance__section' id='tuto-section'>
          {oldPdfs.map((doc) => (
            <a key={doc.id} href={doc.doc} download target="_blank">{doc.label}</a>
          ))}
        </div>
        <FormSectionTitle needsClarity handler={handleClick} id="pdf">POM : les anciens PDFs</FormSectionTitle>
        <div className='assistance__section' id='pdf-section'>
          <ul className='assistance__section-docs'>
            {oldPdfs.map((doc) => (
              <a key={doc.id} className='assistance__section-docs-link' href={doc.doc} download target="_blank">
                <li className='assistance__section-docs-link-item'>
                  <div className='assistance__section-docs-link-item__icon'>
                    <FaFilePdf />
                  </div>
                  {doc.label}
                </li>
              </a>
            ))}
          </ul>
        </div>
        <FormSectionTitle needsClarity handler={handleClick} id="glpi">Une question ?</FormSectionTitle>
        <div className='assistance__section' id='glpi-section'>
          <p>Vous ne trouvez pas la réponse à votre problème ? Venez nous en faire part sur <a href='https://glpi.unimes.fr/front/ticket.form.php'>GLPI</a></p>
        </div>
      </div>
    </div>
  );
}

Assistance.propTypes = {

};

export default Assistance;
