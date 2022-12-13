import React from 'react';
import PropTypes from 'prop-types';
// import FileMenu from '.src/components/FileMenu';
// import FileDisplay from '.src/components/FileDisplay';
import Tabs from 'src/components/Tabs';
import PageTitle from 'src/components/PageTitle';

import { currentOMs, pastOMs, currentEFs , currentELs, pastELs } from 'src/data/fakeData';

import './style.scss';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Section from './Section';


const MyDocuments = () => {

  const navigate = useNavigate();
  const location = useLocation();
  let isOm = false;
  let title = `États de Frais de ${"mboone01"}`;
  let slug = 'état-de-frais'
  
  if (location.pathname.includes('ordres-de-mission')) {
    isOm = true;
    title = `Ordres de Mission de ${"mboone01"}`;
    slug = 'ordre-de-mission';
  }

  const currentOM = JSON.parse(localStorage.getItem('newOm'));
  
  if (currentOM !== null) {
    currentOMs.push(currentOM);
  }
  console.log(currentOMs);
  



  const OMTabs = [
    {
      id: 'ec',
      name: 'En cours',
    },
    {
      id: 'ok',
      name: 'Validés',
    }
  ];
  const EFTabs = [
    {
      id: 'ec',
      name: 'En cours',
    },
    {
      id: 'as',
      name: 'A Signer',
    },
    {
      id: 'ok',
      name: 'Validés',
    }
  ]
  

  /**
   * Toggles the section according to the clicked tab
   * @param object event 
   */
   const displayWantedSection = (event) => {
    const id = isOm ? 'om' : 'ef';

    const wantedSection = document.querySelector(`#${event.currentTarget.id}-${id}`);
    const allSections = document.querySelectorAll('.my-documents__files');

    allSections.forEach((currentSection) => {
      if (currentSection === wantedSection) {
        wantedSection.classList.add('my-documents__files--open');
      }
      else {
        currentSection.classList.remove('my-documents__files--open');
      }
    })
  }
  const handleClickOnNewOM = () => {

    
    if (window.confirm('Voulez-vous créer un nouvel ' + slug.replace(/-/g, ' ') + ' ?')) {
      const userId = "mboone01";
      const omName = `OM_${userId}_`;
      const newOM = {
        id: 1,
        omName: omName,
        status: 1,
        omUrl: 'path',
        userId: userId,
        comments: '',
      }
      localStorage.setItem('newOm', JSON.stringify(newOM));

      // NAVIGATE TO DO IN THE REDUCER
      navigate(`/nouveau-document/${slug}?etape=1&id=${1}`)
      // TODO : add new entry into Db with these two infos
    }
  }

  return (
    <main className="my-documents">
      <PageTitle>{title}</PageTitle>
      <div className="my-documents__button">
        <button type="button" onClick={handleClickOnNewOM}>NOUVEAU</button>
      </div>
      {isOm && <Tabs tabs={OMTabs} handler={displayWantedSection} />}
      {!isOm && <Tabs tabs={EFTabs} handler={displayWantedSection} />}
      {isOm && <Section id={"ec-om"} data={currentOMs} isFirstSection />}
      {isOm && <Section id={"ok-om"} data={pastOMs} />}
      {!isOm && <Section id={"ec-ef"} data={currentEFs} isFirstSection />}
      {!isOm && <Section id={"as-ef"} data={currentELs} />}
      {!isOm && <Section id={"ok-ef"} data={pastELs} />}
    </main>
  );
};

MyDocuments.propTypes = {

};

export default MyDocuments;
