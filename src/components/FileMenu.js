import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const FileMenu = ({ status, id}) => {
  // TODO : faire toutes les verifs de statut une fois les statuts décidés

  let validated = false;
  if (status === 10) {
    validated = true;
  }
  
  //TODO : changer le lien
  return (
    <div className="file-menu">
    {!validated && (
      <ul className="file-menu__list">
        <li  className="file-menu__list-li"><a href={"/modifier-un-document/ordre-de-mission?etape=1&id=" + id}>Reprendre / Modifier</a></li>
        <li  className="file-menu__list-li"><a href="#">Faire une demande de déplacement</a></li>
        { status === 9 && (<li  className="file-menu__list-li"><a href="#">Prendre connaissance du refus et supprimer</a></li>)}
      </ul>
    )}
    {validated && (
      <ul className="file-menu__list">
        <li  className="file-menu__list-li"><a href="#">Télécharger</a></li>
        <li  className="file-menu__list-li"><a href="#">Saisir l'état de frais</a></li>
      </ul>
    )}
    </div>
  );
};

FileMenu.propTypes = {

};

export default FileMenu;
