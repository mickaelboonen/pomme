import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import TitleH3 from '../../generics/TitleH3';
import FileMenu from '../../generics/FileMenu';
import FileDisplay from '../../generics/FileDisplay';
import Tabs from '../../generics/Tabs';
import PageTitle from '../../generics/PageTitle';

const MyEFs = () => {

  // FAKE DATA
  const currentEFs = [
    {
      id: 1,
      name: 'EF_BOONEN_091022',
      status: 8, 
    },
  ];

  // FAKE DATA
  const currentELs = [
    {
      id: 1,
      name: 'EF_BOONEN_120922',
      status: 10, 
    },
    {
      id: 3,
      name: 'EF_BOONEN_011022',
      status: 10, 
    },
  ];

  // FAKE DATA
  const pastELs = [
    {
      id: 1,
      name: 'EF_BOONEN_120922',
      status: 10, 
    },
    {
      id: 3,
      name: 'EF_BOONEN_011022',
      status: 10, 
    },
  ];

  const tabs = [
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
  const handleClickOnTab = (event) => {
    const { id } = event.currentTarget;
    const ecSection = document.querySelector('#ec-ef');
    const okSection = document.querySelector('#ok-ef');
    const ecTab = document.querySelector('#ec');
    const sections = [ ecSection, okSection, asSection];
    const asSection = document.querySelector('#as-ef');
    const asTab = document.querySelector('#as');
    const okTab = document.querySelector('#ok');
    const tabs = [ ecTab, asTab, okTab];

    if (id === "ec") {
      sections.forEach((sec) => {
        
        if (sec.id === 'ec-ef') {
          sec.classList.add('my-documents__files--open');
        }
        else {
          sec.classList.remove('my-documents__files--open');
        }
      })
      tabs.forEach((tab) => {
        
        console.log(tab);
        if (tab.id === 'ec') {
          tab.classList.add('tabs__item--open');
        }
        else {
          tab.classList.remove('tabs__item--open');
        }
      })
    }
    else if (id === "as") {
      
      sections.forEach((sec) => {
        console.log(sec);
        if (sec.id === 'as-ef') {
          sec.classList.add('my-documents__files--open');
        }
        else {
          sec.classList.remove('my-documents__files--open');
        }
      })
      tabs.forEach((tab) => {
        
        console.log(tab);
        if (tab.id === 'as') {
          tab.classList.add('tabs__item--open');
        }
        else {
          tab.classList.remove('tabs__item--open');
        }
      })
    }
    else {
    }
  }

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

  return (
    <main className="my-documents">
      <PageTitle>États de Frais de {'mboone01'}</PageTitle>
      <div className="my-documents__button">
        <a href="/documents/ordre-de-mission/nouveau?etape=1">NOUVEAU</a>
      </div>
      <Tabs tabs={tabs} handler={handleClickOnTab} />
      <section id="ec-ef" className="my-documents__files my-documents__files--open">
        <div className="my-documents__files-container">
          {currentEFs.map((om) => (
            <div key={om.id} className="my-documents__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section>
      <section id="as-ef" className="my-documents__files">
      {/* <TitleH3>Validés</TitleH3> */}
        <div className="my-documents__files-container">
          {currentELs.map((om) => (
            <div key={om.id} className="my-documents__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section>
      <section id="ok-ef" className="my-documents__files">
      {/* <TitleH3>Validés</TitleH3> */}
        <div className="my-documents__files-container">
          {pastELs.map((om) => (
            <div key={om.id} className="my-documents__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section>
      <section className="my-documents__files">
      <TitleH3>Mes états de frais en cours</TitleH3>
        <div className="my-documents__files-container">
          {currentEFs.map((om) => (
            <div key={om.id} className="my-documents__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section>
      {/* <section className="my-documents__files">
      <TitleH3>Mes états liquidatifs à signer</TitleH3>
        <div className="my-documents__files-container">
          {pastELs.map((om) => (
            <div key={om.id} className="my-documents__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section>
      <section className="my-documents__files">
      <TitleH3>Me états liquidatifs validés</TitleH3>
        <div className="my-documents__files-container">
          {pastELs.map((om) => (
            <div key={om.id} className="my-documents__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section> */}
    </main>
  );
};

MyEFs.propTypes = {

};

export default MyEFs;
