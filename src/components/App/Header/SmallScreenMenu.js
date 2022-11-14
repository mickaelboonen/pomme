import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';
import Preferences from './Preferences';

const SmallScreenMenu = () => (
  <nav className="small-screen-menu">
    <Preferences isSkewed />
    <div className="small-screen-menu__section">
      <h3  className="small-screen-menu__section-title">DAFC</h3>
      <ul className="small-screen-menu__section-list">
        <li className="small-screen-menu__section-list-item">
          <a>Ordres de Mission</a>
        </li>
        <li className="small-screen-menu__section-list-item">
          <a>États de frais</a>
        </li>
      </ul>
    </div>
    <div className="small-screen-menu__section">
      <h3  className="small-screen-menu__section-title">A SIGNER</h3>
      <ul className="small-screen-menu__section-list">
        <li className="small-screen-menu__section-list-item">
          <a>Ordres de Mission</a>
        </li>
        <li className="small-screen-menu__section-list-item">
          <a>États de frais</a>
        </li>
      </ul>
    </div>
    <div className="small-screen-menu__section">
      <h3  className="small-screen-menu__section-title">MON COMPTE</h3>
      <ul className="small-screen-menu__section-list">
        <li className="small-screen-menu__section-list-item"><Link to="/utilisateur/mboone01/mes-ordres-de-mission">Mes Ordres de Mission <span id="mes-oms">1</span></Link></li>
        <li className="small-screen-menu__section-list-item"><Link to="/utilisateur/mboone01/mes-états-de-frais">Mes États de Frais <span id="mes-efs"></span></Link></li>
        <li className="small-screen-menu__section-list-item"><a>Mes Justificatifs</a></li>
        <li className="small-screen-menu__section-list-item"><a>Se déconnecter</a></li>
      </ul>
    </div>
  </nav>
);

SmallScreenMenu.propTypes = {

};

export default SmallScreenMenu;
