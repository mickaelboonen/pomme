import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import TitleH3 from '../../generics/TitleH3';
import FileMenu from '../../generics/FileMenu';
import FileDisplay from '../../generics/FileDisplay';

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
   * Modifies the DOM to open the side menu for each file
   * @param {*} event 
   */
  const toggleMenu = (event) => {
    const { currentTarget } = event;
    const menu = currentTarget.querySelector('.file-menu');
    currentTarget.classList.toggle('myOms__files-container-item--open');
    menu.classList.toggle('file-menu--open');
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
    <main className="myOms">
      <h2 className="myOms__title">Ordres de Mission de {'mboone01'}</h2>
      <div className="myOms__button">
        <button type='button'>NOUVEAU</button>
      </div>
      <section className="myOms__files">
        <TitleH3 title="En cours" />
        <div className="myOms__files-container">
          {currentOMs.map((om) => (
            <div key={om.id} className="myOms__files-container-item" onClick={toggleMenu}>
              <FileDisplay name={om.name} />
              <FileMenu status={om.status} />
            </div>
          ))}
        </div>
      </section>
      <section className="myOms__files">
        <TitleH3 title="Validés" />
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
