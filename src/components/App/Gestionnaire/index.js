import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import PageTitle from '../../generics/PageTitle';
import Tabs from '../../generics/Tabs';
import Section from '../MyDocuments/Section';

const Gestionnaires = () => {
  
  // FAKE DATA
  const currentEFs = [
    {
      id: 1,
      name: 'EF_BOONEN_091022',
      status: 8, 
    },
  ];

  
  // FAKE DATA
  const currentOMs = [
    {
      id: 1,
      name: 'OM_BOONEN_091022',
      status: 8, 
    },
    {
      id: 2,
      name: 'OM_BOONENMICKAEL_121022',
      status: 9, 
    },
    {
      id: 3,
      name: 'OM_BOONEN_2010222',
      status: 6, 
    },
    {
      id: 4,
      name: 'OM_BOONEN_091022',
      status: 8, 
    },
    {
      id: 5,
      name: 'OM_BOONENMICKAEL_121022',
      status: 9, 
    },
    {
      id: 6,
      name: 'OM_BOONEN_2010222',
      status: 6, 
    },
  ];
  console.log(currentOMs.length);
  const tabs = [
    {
      id: 'om',
      name: 'Ordres de Missions',
      notification: currentOMs.length,
    },
    {
      id: 'ef',
      name: 'États de frais',
      notification: currentEFs.length,
    }
  ]
  /**
   * Toggles the section according to the clicked tab
   * @param object event 
   */
   const displayWantedSection = (event) => {

    const wantedSection = document.querySelector(`#${event.currentTarget.id}-section`);
    const allSections = document.querySelectorAll('.my-documents__files');

    allSections.forEach((currentSection) => {
      if (currentSection === wantedSection) {
        wantedSection.classList.add('my-documents__files--open');
      }
      else {
        currentSection.classList.remove('my-documents__files--open');
      }
    })
  };
  
  return (
    <main className="my-documents">
      <PageTitle>Documents à valider</PageTitle>
      <Tabs tabs={tabs} handler={displayWantedSection} />
      <Section id={"om-section"} data={currentOMs} isFirstSection />
      <Section id={"ef-section"} data={currentEFs} />
    </main>
);}

Gestionnaires.propTypes = {

};

export default Gestionnaires;
