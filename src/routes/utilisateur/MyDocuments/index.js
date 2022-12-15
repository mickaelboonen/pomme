import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Tabs from 'src/components/Tabs';
import PageTitle from 'src/components/PageTitle';

import { currentOMs, pastOMs, currentEFs , currentELs, pastELs } from 'src/data/fakeData';

import './style.scss';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import Section from './Section';
import { useDispatch, useSelector } from 'react-redux';
import { addNewOM } from 'src/reducer/omForm';


const MyDocuments = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const loaderData = useLoaderData();
  console.log(loaderData);

  const { currentOM, nextOMTarget, OMTabs } = useSelector((state) => state.omForm);
  const { nextEFTarget, EFTabs } = useSelector((state) => state.omForm);

  // useEffect(() => {
  //   if (nextOMTarget !== '') {
  //     navigate(nextOMTarget);
  //   }
  //   else if (nextEFTarget !== '') {
  //     navigate(nextEFTarget);
  //   }
  // }, [nextOMTarget, nextEFTarget]);

  let isOm = false;
  let title = `États de Frais de ${"mboone01"}`;
  let slug = 'état-de-frais'
  
  if (location.pathname.includes('ordres-de-mission')) {
    isOm = true;
    title = `Ordres de Mission de ${"mboone01"}`;
    slug = 'ordre-de-mission';
  }

  const currentEF = JSON.parse(localStorage.getItem('newEf'));
  
  if (currentOM !== null) {
    currentOMs.push(currentOM);
  }
  if (currentEF !== null) {
    currentEFs.push(currentEF);
  }
  

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
      if (slug === 'ordre-de-mission') {
        const userId = params.slug;
        const omName = `OM_${userId}_`;
        const newOM = {
          name: omName,
          status: 1,
          url: 'path',
          missioner: userId,
          comments: '',
        }
        
        dispatch(addNewOM(newOM)); 
      }
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
