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
  // const boBaseUrl = process.env.NODE_ENV === 'development' ? <process.env.DEFAULT_USER> : '';

  return (
  <div className="header">
      <div className="header__identity">
        <Link to="/" className="header__identity-logo">
          <p>POM</p>
        </Link>
        {agent.firstname && <p className="header__identity-user">Bonjour {agent.firstname}</p>}
      </div>
      {isAuthenticated && <BurgerIcon handler={toggleBurgerMenu} />}
      {isAuthenticated && (
        <nav className="header__menu">
          <Preferences />
          {(agent.roles && agent.roles.indexOf('PRESIDENCE') >=0) && (
            <div className="header__menu-section" id="dafc" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
              <p>PRESIDENCE</p>
              <ul className="header__menu-section-list">
                <li><Link to={`/${encodeURIComponent('présidence')}`}>Menu de la présidence</Link></li>
              </ul>
            </div>
          )}
          {/* {(agent.roles && (agent.roles.indexOf('GEST') >=0 || agent.roles.indexOf('VALIDATOR') >=0)) && ( */}
          {user === 'mboone01' && (
            <div className="header__menu-section" id="dafc" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
              <p>IDENTITÉ</p>
              <ul className="header__menu-section-list">
                <li>ADMIN DSIUN</li>
                {(user === 'mboone01' || user === 'fjacquet' || user === 'nathalie' || user === 'sseddo01' || user === 'broig' || user === 'xmoulin') && (
                  <div style={{height: '100%', display: 'flex', flexDirection: 'column', zIndex: '999'}}>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))}}>Moi</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'nathalie', password: 'fsdf'}))}}>Nathalie</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'xmoulin', password: 'fsdf'}))}}>Xavier</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'fjacquet', password: 'fsdf'}))}}>Fabrice</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'sseddo01', password: 'fsdf'}))}}>M. Seddouki</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'broig', password: 'fsdf'}))}}>M. Roig</button>
                  </div>
                )}
                <li>RECHERCHE</li>

                {(user === 'mboone01' || user === 'nathalie' || user === 'emonte01' || user === 'mevandil' || user === 'fjacquet' ||user === 'ymarti01' || user === 'acadie02' ||user === 'clegalla' ||user === 'sseddo01' ) && (
                  <div style={{height: '100%', display: 'flex', flexDirection: 'column', zIndex: '999'}}>
                  <button onClick={() => {dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))}}>Moi</button>
                  <button onClick={() => {dispatch(checkAuthentication({username : 'emonte01', password: 'fsdf'}))}}>Estelle</button>
                  <button onClick={() => {dispatch(checkAuthentication({username : 'mevandil', password: 'fsdf'}))}}>Marion</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'ymarti01', password: 'fsdf'}))}}>Yannick</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'acadie02', password: 'fsdf'}))}}>Axelle</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'clegalla', password: 'fsdf'}))}}>Corinne</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'fjacquet', password: 'fsdf'}))}}>Fabrice</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'sseddo01', password: 'fsdf'}))}}>M. Seddouki</button>
                  </div>
                )}
                <li>FORMATION</li>

                {(user === 'mboone01' || user === 'csanch10' || user === 'atourre'  || user === 'nduboi01' ||user === 'sseddo01' ) && (
                  <div style={{height: '100%', display: 'flex', flexDirection: 'column', zIndex: '999'}}>
                  <button onClick={() => {dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))}}>Moi</button>
                
                  <button onClick={() => {dispatch(checkAuthentication({username : 'csanch10', password: 'fsdf'}))}}>Clément</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'atourre', password: 'fsdf'}))}}>Audrey</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'nduboi01', password: 'fsdf'}))}}>Nelly</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'sseddo01', password: 'fsdf'}))}}>S. Seddouki</button>
                  </div>
                )}
                                <li>ENSEIGNEMENT</li>
                
                {(user === 'mboone01' || user === 'agimen01' || user === 'vcompan'  || user === 'solivi01' ||user === 'sseddo01' ) && (
                  <div style={{height: '100%', display: 'flex', flexDirection: 'column', zIndex: '999'}}>
                  <button onClick={() => {dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))}}>Moi</button>
                
                  <button onClick={() => {dispatch(checkAuthentication({username : 'agimen01', password: 'fsdf'}))}}>Audrey Gimenz</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'vcompan', password: 'fsdf'}))}}>V. Compan</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'solivi01', password: 'fsdf'}))}}>S. Olivier</button>
                    <button onClick={() => {dispatch(checkAuthentication({username : 'sseddo01', password: 'fsdf'}))}}>S. Seddouki</button>
                  </div>
                )}
              </ul>
            </div>
          )}
          {(agent.roles && agent.roles.indexOf('DAF_AC') >=0) && (
            <div className="header__menu-section" id="dafc" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
              <p>DAFC</p>
              <ul className="header__menu-section-list">
                <li><Link to="/dafc/demandes-d-avance">Demandes d'avance</Link></li>
                {/* <li><Link to="/dafc/ordres-de-mission">Ordres de Mission</Link></li> */}
                {/* <li><Link to="/dafc/états-de-frais">États de Frais</Link></li> */}
              </ul>
            </div>
          )}
          {(agent.roles && (agent.roles.indexOf('GEST') >=0 || agent.roles.indexOf('VALIDATOR') >=0 || agent.roles.indexOf('MANAGER') >=0)) && (
            <div className="header__menu-section" id="gest" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
              <p>GESTIONNAIRE</p>
              <ul className="header__menu-section-list">
                <li><Link to={`/gestionnaire/${encodeURIComponent('ordres-de-mission-à-signer')}`}>Ordres de Mission</Link></li>
                <li><Link to={`/gestionnaire/${encodeURIComponent('états-de-frais-à-signer')}`}>États de Frais <span id="mes-efs"></span></Link></li>
                <li><Link to={`/gestionnaire/${encodeURIComponent('préférences-de-gestionnaire')}`}>Mes Préférences</Link></li>
                {process.env.NODE_ENV === 'development' && <li><Link to="/admin">Back Office</Link></li>}
                {process.env.NODE_ENV !== 'development' && <a href="https://pom-test.unimes.fr/back/admin" target="_blank">Back Office</a>}
              </ul>
            </div>
          )}
          <div className="header__menu-section" id="mon-compte" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
            <p>MON COMPTE</p>
            <ul className="header__menu-section-list">
              <li><Link to={`/utilisateur/mes-ordres-de-mission`}>Mes Ordres de Mission</Link></li>
              <li><Link to={`/utilisateur/${encodeURIComponent('mes-états-de-frais')}`}>Mes États de Frais</Link></li>
              <li><Link to={`/utilisateur/mes-documents`}>Mes Justificatifs</Link></li>
              <li><Link to={`/utilisateur/mes-documents/profil-voyageur`}>Mon Profil Voyageur</Link></li>
              <li><Link to={`/utilisateur/${encodeURIComponent('mes-préférences')}`}>Mes Préférences</Link></li>
              <li><a onClick={handleLogOut}>Se déconnecter</a></li>
            </ul>
          </div>
          <Link to={`/assistance`}>
            <div className="header__menu-section">
              ASSISTANCE <FaQuestionCircle style={{marginLeft: '1rem'}}/>
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
