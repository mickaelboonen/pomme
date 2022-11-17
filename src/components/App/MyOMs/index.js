import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import TitleH3 from '../../generics/TitleH3';
import FileMenu from '../../generics/FileMenu';
import FileDisplay from '../../generics/FileDisplay';
import SoloThread from '../../generics/SoloThread';
import PageTitle from '../../generics/PageTitle';
import Tabs from '../../generics/Tabs';

const MyOMs = () => {
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

  // FAKE DATA
  const pastOMs = [
    {
      id: 1,
      name: 'OM_BOONEN_120922',
      status: 10, 
    },
    {
      id: 3,
      name: 'OM_BOONEN_011022',
      status: 10, 
    },
  ];

  /**
   * Modifies the DOM to open the side menu for each file and closes the previous menu
   * @param {*} event 
   */
  const toggleMenu = (event) => {
    const { currentTarget } = event;
    const classes = currentTarget.classList;
    const searchedClass = Array.from(classes).find((classname) => classname === "myOms__files-container-item--open" ); 
    const currentMenu = currentTarget.querySelector('.file-menu');

    // Gets the last opened menu and closes it 
    const openedMenu = document.querySelector('.file-menu--open');
    if (openedMenu) {
      openedMenu.classList.remove('file-menu--open');
      openedMenu.parentNode.classList.remove('myOms__files-container-item--open');
    }
    
    // Toggles the class on the current elements
    if (searchedClass === undefined) {
      currentTarget.classList.add('myOms__files-container-item--open');
      currentMenu.classList.add('file-menu--open');
    } 
    else {
      currentTarget.classList.remove('myOms__files-container-item--open');
      currentMenu.classList.remove('file-menu--open');

    }
  };

  /**
   * Figures the li elements heights out based on their number in the list
   */
  useEffect(() => {
    const menus = document.querySelectorAll('.file-menu__list');

    menus.forEach((menu) => {
      const children = menu.children;
      Array.from(children).forEach((li) => {
        
        const newHeight = 100 / menu.children.length;
        li.style.height = newHeight + '%';
      })
    });
  });

  const displayWantedSection = (event) => {
    
    const wantedSection = document.querySelector(`#${event.currentTarget.id}-om`);
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

  const tabs = [
    {
      id: 'ec',
      name: 'En cours',
    },
    {
      id: 'ok',
      name: 'Validés',
    }
  ]
  return (
    <main className="my-documents">
      <PageTitle>Ordres de Mission de {'mboone01'}</PageTitle>
      <div className="my-documents__button">
        <a href="/documents/ordre-de-mission/nouveau?etape=1">NOUVEAU</a>
      </div>
      <Tabs tabs={tabs} handler={displayWantedSection} />
      {/* <<div className='tabs'>
        <div onClick={handleClickOnTab} className="tabs__item tabs__item--open" id="ec">En cours</div>
        <div onClick={handleClickOnTab} className="tabs__item" id="ok">Validés</div>
      </div>> */}
      <section id="ec-om" className="my-documents__files my-documents__files--open">
        <div className="my-documents__files-container">
          {currentOMs.map((om) => (
            <div key={om.id} className="my-documents__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section>
      <section id="ok-om" className="my-documents__files">
      {/* <TitleH3>Validés</TitleH3> */}
        <div className="my-documents__files-container">
          {pastOMs.map((om) => (
            <div key={om.id} className="my-documents__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

MyOMs.propTypes = {

};

export default MyOMs;
