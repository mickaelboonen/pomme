import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './style.scss';
import Preferences from './Preferences';

const SmallScreenMenu = ({ role = 'dev'}) => {
  const { app : { user }} = useSelector((state) => state);

  const handleMouseDown = () => {
    const menu = document.querySelector('.small-screen-menu');
    menu.classList.remove('small-screen-menu--open');
  }
  return (
    <nav className="small-screen-menu">
      <Preferences isSkewed id="menu" />
      {/* <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}> */}
        <Link to={`/`}>Accueil</Link>
      {/* </li> */}

        {user === 'mboone01' &&(
      <div className="small-screen-menu__section">
        <h3  className="small-screen-menu__section-title">DAFC</h3>
        <ul className="small-screen-menu__section-list">
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/dafc/ordres-de-mission`}>Ordres de Mission <span id="mes-oms"></span></Link></li>
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/dafc/états-de-frais`}>États de Frais <span id="mes-oms"></span></Link></li>
        </ul>
      </div>
        )}
        {user === 'mboone01' &&(
      <div className="small-screen-menu__section">
        <h3  className="small-screen-menu__section-title">A SIGNER</h3>
        <ul className="small-screen-menu__section-list">
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/gestionnaire/${role}/documents-a-signer`}>Ordres de Mission <span id="mes-oms">1</span></Link></li>
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/gestionnaire/${role}/documents-a-signer`}>États de Frais <span id="mes-oms">1</span></Link></li>
        </ul>
      </div>
        )}
      <div className="small-screen-menu__section">
        <h3  className="small-screen-menu__section-title">MON COMPTE</h3>
        <ul className="small-screen-menu__section-list">
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/utilisateur/${user}/mes-ordres-de-mission`}>Mes Ordres de Mission {/*<span id="mes-oms">1</span>*/}</Link></li>
          {user === 'mboone01' &&<li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/utilisateur/${user}/mes-états-de-frais`}>Mes États de Frais <span id="mes-efs"></span></Link></li>}
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/utilisateur/${user}/mes-documents`}>Mes Justificatifs</Link></li>
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><Link to={`/utilisateur/${user}/mes-préférences`}>Mes préférences</Link></li>
          <li className="small-screen-menu__section-list-item" onMouseDown={handleMouseDown}><a>Se déconnecter</a></li>
        </ul>
      </div>
    </nav>
  );
};

SmallScreenMenu.propTypes = {

};

export default SmallScreenMenu;
