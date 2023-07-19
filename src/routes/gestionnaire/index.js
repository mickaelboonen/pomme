import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './style.scss';
import Tabs from 'src/components/Tabs';
import PageTitle from 'src/components/PageTitle';

const Gestionnaires = () => {

  const { omManager: { pendingDocs, loader },
    agent: { user }} = useSelector((state) => state);
    
  const tabs = [
    {
      id: 'om',
      name: 'Ordres de Missions',
    },
    {
      id: 'ef',
      name: 'États de frais',
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
        <div className='my-documents__files'>
        {!loader && (
          <div className='my-documents__files-buttons my-documents__files-buttons--menu'>
          {pendingDocs.map((doc) => (
            <Link key={doc.id} to={`/gestionnaire/${user}/valider-un-document/ordre-de-mission?etape=1&id=${doc.id}`}>{doc.name}</Link>
          ))}
          </div>
        )}
        </div>
    </main>
);}

Gestionnaires.propTypes = {

};

export default Gestionnaires;
