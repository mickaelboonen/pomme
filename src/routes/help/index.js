import React from 'react';
import PropTypes from 'prop-types';
import { FaFilePdf } from 'react-icons/fa';


import VideoPlayer from 'src/components/VideoPlayer';
import Presentation from 'src/assets/video/trailer.mp4';
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
import Guide from 'src/assets/docs/old-pdf/guide-mission.pdf'
// import PowerPoint from 'src/assets/docs/presentation-eMissions.pptx'

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

    const sectionHeights = [
      {
        id: 'presentation',
        height: '23rem',
        responsive: '12rem',
      },
      {
        id: 'tuto',
        height: '10rem',
        responsive: '',
      },
      {
        id: 'pdf',
        height: '12rem',
        responsive: '18rem',
      },
      {
        id: 'glpi',
        height: '6rem',
        responsive: '8rem',
      },
      {
        id: 'guide',
        height: '5rem',
        responsive: '5rem',
      },
    ]
    const { id } = event.target;
    const el = document.getElementById(id + '-section');
    el.classList.toggle('assistance__section--open');
    
    if (Array.from(el.classList).indexOf('assistance__section--open') >= 0) {

      const { height, responsive } = sectionHeights.find((section) => section.id === id);

      if (window.innerWidth < 600) {
        el.style.height = responsive;
      } else {
        el.style.height = height;
      }
      
    }
    else {
      el.style.height = 0;
    }
  }
  
  return (
    <div className='my-preferences'>
      <PageTitle>Assistance</PageTitle>
      <div className='form assistance'>
        <FormSectionTitle needsClarity handler={handleClick} id="presentation">eMissions - trailer</FormSectionTitle>
        <div className='assistance__section assistance__section--video' id='presentation-section'>
          <video className='assistance__section-video' src={Presentation}  controls="controls">
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
        </div>
        {/* <FormSectionTitle needsClarity handler={handleClick} id="tuto">Le tutoriel</FormSectionTitle>
        <div className='assistance__section' id='tuto-section'>
        </div> */}
        <FormSectionTitle needsClarity handler={handleClick} id="guide">Le Guide des Missions de la DAFC</FormSectionTitle>
        <div className='assistance__section' id='guide-section'>
          <ul className='assistance__section-docs'>
              <a className='assistance__section-docs-link' href={Guide} download target="_blank">
                <li className='assistance__section-docs-link-item'>
                  <div className='assistance__section-docs-link-item__icon'>
                    <FaFilePdf />
                  </div>
                  Télécharger le Guide des Missions - 2019
                </li>
              </a>
          </ul>
        </div>
        <FormSectionTitle needsClarity handler={handleClick} id="pdf">Les anciens PDFs</FormSectionTitle>
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
          <p className='assistance__section-text'>
            Vous ne trouvez pas la réponse à votre problème ? Rendez-vous sur <a className='assistance__section-link' href='https://glpi.unimes.fr/front/ticket.form.php'>GLPI</a> pour prendre contact avec le Service Informatique de l'Université.
          </p>
        </div>
      </div>
    </div>
  );
}

Assistance.propTypes = {

};

export default Assistance;
