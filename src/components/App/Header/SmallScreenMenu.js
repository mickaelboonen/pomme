import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useNavigation } from 'react-router-dom';

import './style.scss';
import Preferences from './Preferences';

const SmallScreenMenu = ({ userName = "mboone01", role = 'dev'}) => {
  const handleMouseDown = () => {
    const menu = document.querySelector('.small-screen-menu');
    menu.classList.remove('small-screen-menu--open');
  }
  return (
    <nav className="small-screen-menu">
      <Preferences isSkewed id="menu" />
      <div className="small-screen-menu__section">
        <h3  className="small-screen-menu__section-title">DAFC</h3>
        <ul className="small-screen-menu__section-list">
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/dafc/ordres-de-mission`}>Ordres de Mission <span id="mes-oms"></span></Link></li>
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/dafc/etats-de-frais`}>États de Frais <span id="mes-oms"></span></Link></li>
        </ul>
      </div>
      <div className="small-screen-menu__section">
        <h3  className="small-screen-menu__section-title">A SIGNER</h3>
        <ul className="small-screen-menu__section-list">
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/gestionnaire/${role}/documents-a-signer`}>Ordres de Mission <span id="mes-oms">1</span></Link></li>
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/gestionnaire/${role}/documents-a-signer`}>États de Frais <span id="mes-oms">1</span></Link></li>
        </ul>
      </div>
      <div className="small-screen-menu__section">
        <h3  className="small-screen-menu__section-title">MON COMPTE</h3>
        <ul className="small-screen-menu__section-list">
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/utilisateur/${userName}/mes-ordres-de-mission`}>Mes Ordres de Mission <span id="mes-oms">1</span></Link></li>
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/utilisateur/${userName}/mes-états-de-frais`}>Mes États de Frais <span id="mes-efs"></span></Link></li>
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/utilisateur/${userName}/mes-documents`}>Mes Justificatifs</Link></li>
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><a>Se déconnecter</a></li>
        </ul>
      </div>
    </nav>
  );
};

SmallScreenMenu.propTypes = {

};

export default SmallScreenMenu;
