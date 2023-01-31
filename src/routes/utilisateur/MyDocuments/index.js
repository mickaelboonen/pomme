import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

// Components
import Section from './Section';
import Tabs from 'src/components/Tabs';
import PageTitle from 'src/components/PageTitle';

import { currentEFs , currentELs, pastELs } from 'src/data/fakeData';

import { toggleModal } from 'src/reducer/app';
import { addNewOM, clearOMTarget } from 'src/reducer/omForm';


import './style.scss';
import Modal from '../../../components/Modal';


const MyDocuments = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const loaderData = useLoaderData();
  

  const { currentOM, nextOMTarget, OMTabs, userOms } = useSelector((state) => state.omForm);
  const { nextEFTarget, EFTabs } = useSelector((state) => state.efForm);
  const { isModalOpen } = useSelector((state) => state.app);

  useEffect(() => {
    if (nextOMTarget !== '') {
      dispatch(toggleModal());
      dispatch(clearOMTarget());
      navigate(nextOMTarget);
    }
  }, [nextOMTarget])

  const currentOMs = userOms.filter((om) => om.status === 1);
  const pastOMs = userOms.filter((om) => om.status === 8);
  
  const pageData = (path, user) => {
    let pageData = {};

    if (path.includes('ordres-de-mission')) {
      pageData.isOm = true;
      pageData.title = 'Ordres de Mission de ' + user;
      pageData.slug = 'ordre-de-mission'
    }
    else {
      pageData.isOm = false;
      pageData.title = `États de Frais de ${user}`;
      pageData.slug = 'état-de-frais'
    }

    return pageData;
  }

  const { isOm, title, slug } = pageData(location.pathname, params.slug);

  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  const currentEF = JSON.parse(localStorage.getItem('newEf'));

  if (currentEF !== null) {
    currentEFs.push(currentEF);
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  

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
    dispatch(toggleModal())
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
      <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
      {isModalOpen && <Modal target={slug.replace(/-/g, ' ')} user={params.slug} />}
    </main>
  );
};

MyDocuments.propTypes = {

};

export default MyDocuments;
