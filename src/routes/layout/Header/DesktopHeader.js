import React from 'react';
import PropTypes from 'prop-types';
import { persistor } from 'src/store';
import { Link } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

// Components
import Preferences from './Preferences';
import BurgerIcon from './BurgerIcon';

// Actions and selectors
import { logout } from 'src/reducer/agent';
import { toggleBurgerMenu, toggleNavList } from 'src/selectors/domManipulators';
import { checkAuthentication } from "src/reducer/agent";

const DesktopHeader = ({ cas, isAuthenticated}) => {

  const dispatch = useDispatch();  
  const { agent : { user, agent }} = useSelector((state) => state);
  
  const handleLogOut = () => {
    localStorage.removeItem('persist:root');
    dispatch(logout());
    persistor.purge();
    cas.logout("/se-connecter");
  }
    
  return (
  <div className="header">
      <div className="header__identity">
        <Link to="/" className="header__identity-logo">
          <p>POM</p>
        </Link>
        {(user === 'mboone01' || user === 'nathalie' || user === 'sseddo01' ) && (
          <div style={{height: '100%', display: 'flex', flexDirection: 'column', zIndex: '999'}}>
            <button onClick={() => {dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))}}>Moi</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'nathalie', password: 'fsdf'}))}}>Nathalie</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'sseddo01', password: 'fsdf'}))}}>S. Seddoukki</button>
          </div>
        )}
        {(user === 'mboone01' || user === 'nathalie' || user === 'emonte01' ||user === 'ymarti01' || user === 'acadie02' ||user === 'clegalla' ||user === 'sseddo01' ) && (
          <div style={{height: '100%', display: 'flex', flexDirection: 'column', zIndex: '999'}}>
          <button onClick={() => {dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))}}>Moi</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'emonte01', password: 'fsdf'}))}}>Estelle</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'ymarti01', password: 'fsdf'}))}}>Yannick</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'acadie02', password: 'fsdf'}))}}>Axelle</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'clegalla', password: 'fsdf'}))}}>Corinne</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'sseddo01', password: 'fsdf'}))}}>S. Seddoukki</button>
          </div>
        )}
        {(user === 'mboone01' || user === 'nathalie' || user === 'solivi01'  || user === 'sjorge' ||user === 'sseddo01' ) && (
          <div style={{height: '100%', display: 'flex', flexDirection: 'column', zIndex: '999'}}>
          <button onClick={() => {dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))}}>Moi</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'sjorge', password: 'fsdf'}))}}>Suzanne</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'solivi01', password: 'fsdf'}))}}>Sylvain</button>
            <button onClick={() => {dispatch(checkAuthentication({username : 'sseddo01', password: 'fsdf'}))}}>S. Seddoukki</button>
          </div>
        )}
        {agent.firstname && <p className="header__identity-user">Bonjour {agent.firstname}</p>}
      </div>
      {isAuthenticated && <BurgerIcon handler={toggleBurgerMenu} />}
      {isAuthenticated && (
        <nav className="header__menu">
          <Preferences />
          {(agent.roles && agent.roles.indexOf('DAF') >=0) && (
            <div className="header__menu-section" id="dafc" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
              <p>DAFC</p>
              <ul className="header__menu-section-list">
                <li><Link to="/dafc/demandes-d-avance">Demandes d'avance</Link></li>
                <li><Link to="/dafc/ordres-de-mission">Ordres de Mission</Link></li>
                <li><Link to="/dafc/états-de-frais">États de Frais</Link></li>
              </ul>
            </div>
          )}
          {(agent.roles && (agent.roles.indexOf('GEST') >=0 || agent.roles.indexOf('MANAGER') >=0)) && (
            <div className="header__menu-section" id="gest" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
              <p>GESTIONNAIRE</p>
              <ul className="header__menu-section-list">
                <li><Link to={`/gestionnaire/${encodeURIComponent('ordres-de-mission-à-signer')}`}>Ordres de Mission</Link></li>
                <li><Link to={`/gestionnaire/${encodeURIComponent('états-de-frais-à-signer')}`}>États de Frais <span id="mes-efs"></span></Link></li>
                <li><Link to={`/gestionnaire/${encodeURIComponent('préférences-de-gestionnaire')}`}>Mes Préférences</Link></li>
              </ul>
            </div>
          )}
          <div className="header__menu-section" id="mon-compte" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
            <p>MON COMPTE</p>
            <ul className="header__menu-section-list">
              <li><Link to={`/utilisateur/mes-ordres-de-mission`}>Mes Ordres de Mission {/*<span id="mes-oms">1</span>*/}</Link></li>
              <li><Link to={`/utilisateur/${encodeURIComponent('mes-états-de-frais')}`}>Mes États de Frais <span id="mes-efs"></span></Link></li>
              <li><Link to={`/utilisateur/mes-documents`}>Mes Justificatifs</Link></li>
              {user === 'mboone01' &&(<li><Link to={`/utilisateur/mes-documents/profil-voyageur`}>Mon Profil Voyageur</Link></li>)}
              <li><Link to={`/utilisateur/${encodeURIComponent('mes-préférences')}`}>Mes Préférences</Link></li>
              <li><a onClick={handleLogOut}>Se déconnecter</a></li>
            </ul>
          </div>
          <Link to={`/assistance`}>
            <div className="header__menu-section header__menu-section--help">
              <FaQuestionCircle />
            </div>
          </Link>
        </nav>  
      )}
    </div>
  );
}

DesktopHeader.propTypes = {

};

export default DesktopHeader;
