import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import TitleH3 from '../../generics/TitleH3';
import FileMenu from '../../generics/FileMenu';
import FileDisplay from '../../generics/FileDisplay';
import SoloThread from '../../generics/SoloThread';
import PageTitle from '../../generics/PageTitle';

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

  const handleClickOnTab = (event) => {
    const { id } = event.currentTarget;
    const ecSection = document.querySelector('#ec-om');
    const okSection = document.querySelector('#ok-om');
    const ecTab = document.querySelector('#ec');
    const okTab = document.querySelector('#ok');

    if (id === "ec") {
      ecTab.classList.add('tabs__item--open');
      okTab.classList.remove('tabs__item--open');
      ecSection.classList.add('myOms__files--open');
      okSection.classList.remove('myOms__files--open');
    }
    else {
      ecTab.classList.remove('tabs__item--open');
      okTab.classList.add('tabs__item--open');
      ecSection.classList.remove('myOms__files--open');
      okSection.classList.add('myOms__files--open');
    }
  }

  return (
    <main className="myOms">
      {/* <SoloThread>Ordres de Missions de {'mboone01'}</SoloThread> */}
      <h2 className="myOms__title"></h2>
      <PageTitle>Ordres de Mission de {'mboone01'}</PageTitle>
      
      <div className="myOms__button">
        {/* <button type='button'>NOUVEAU</button> */}
        <a href="/documents/ordre-de-mission/nouveau?etape=1">NOUVEAU</a>
      </div>
      <div className='tabs'>
        
        <div onClick={handleClickOnTab} className="tabs__item tabs__item--open" id="ec">En cours</div>
        <div onClick={handleClickOnTab} className="tabs__item" id="ok">Validés</div>
        
        
      </div>
        
      <section id="ec-om" className="myOms__files myOms__files--open">
        <div className="myOms__files-container">
          {currentOMs.map((om) => (
            <div key={om.id} className="myOms__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section>
      <section id="ok-om" className="myOms__files">
      {/* <TitleH3>Validés</TitleH3> */}
        <div className="myOms__files-container">
          {pastOMs.map((om) => (
            <div key={om.id} className="myOms__files-container-item" onClick={toggleMenu}>
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
