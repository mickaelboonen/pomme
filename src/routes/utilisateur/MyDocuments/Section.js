import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FileMenu from 'src/components/FileMenu';
import FileDisplay from 'src/components/FileDisplay';

import './style.scss';
import classNames from 'classnames';
import FileDisplayLink from 'src/components/FileDisplayLink';
import SelectField from 'src/components/Fields/SelectField';

const Section = ({ id, data, isFirstSection, hasLinks }) => {

  /**
   * Modifies the DOM to open the side menu for each file and closes the previous menu
   * @param {*} event 
   */
  const toggleMenu = (event) => {
    const { currentTarget } = event;
    const classes = currentTarget.classList;
    const searchedClass = Array.from(classes).find((classname) => classname === "my-documents__files-container-item--open" ); 
    const currentMenu = currentTarget.querySelector('.file-menu');

    // Gets the last opened menu and closes it 
    const openedMenu = document.querySelector('.file-menu--open');
    if (openedMenu) {
      openedMenu.classList.remove('file-menu--open');
      openedMenu.parentNode.classList.remove('my-documents__files-container-item--open');
    }
    
    // Toggles the class on the current elements
    if (searchedClass === undefined) {
      currentTarget.classList.add('my-documents__files-container-item--open');
      currentMenu.classList.add('file-menu--open');
    } 
    else {
      currentTarget.classList.remove('my-documents__files-container-item--open');
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

  let docType;


  if (id.includes('om')) {
    docType = 'ordre-de-mission';

  }
  else if (id.includes('ef')) {
    docType = 'etat-de-frais';
  }
  
  return (
    <section id={id} className={classNames("my-documents__files", {"my-documents__files--open": isFirstSection})}>
    {!hasLinks && (
      <div className="my-documents__files-container">
        {data.map((currentData) => (
          <div key={currentData.id} className="my-documents__files-container-item" onClick={toggleMenu}>
            <FileDisplay name={currentData.name} />
            <FileMenu status={currentData.status} id={currentData.id}/>
          </div>
        ))}
      </div>
    )}
    {hasLinks && (
      <div className="my-documents__files-container">
        {data.map((currentData) => (
          <div key={currentData.id} className="my-documents__files-container-item" onClick={toggleMenu}>
            <FileDisplayLink {...currentData} docType={docType} role="dgs" />
          </div>
        ))}
      </div>
    )}
    </section>
  );
};

Section.propTypes = {

};

Section.defaultPropTypes = {
  isFirstSection: false,
  hasLinks: false,
};

export default Section;
