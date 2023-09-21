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

  const test = () => {
    
    dispatch(checkAuthentication({username : 'emonte01', password: 'fsdf'}))
    // dispatch(checkAuthentication({username : 'ymarti01', password: 'fsdf'}))
    // dispatch(checkAuthentication({username : 'nathalie', password: 'fsdf'}))
    // dispatch(checkAuthentication({username : 'acadie02', password: 'fsdf'}))
    // dispatch(checkAuthentication({username : 'clegalla', password: 'fsdf'}))
    // dispatch(checkAuthentication({username : 'sseddo01', password: 'fsdf'}))
  }
  
  return (
  <div className="header">
      <div className="header__identity">
        <Link to="/" className="header__identity-logo">
          <p>POM</p>
        </Link>
        <>
          <button onClick={() => {dispatch(checkAuthentication({username : 'emonte01', password: 'fsdf'}))}}>Estelle</button>
          <button onClick={() => {dispatch(checkAuthentication({username : 'ymarti01', password: 'fsdf'}))}}>Yannick</button>
          <button onClick={() => {dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))}}>Moi</button>
          <button onClick={() => {dispatch(checkAuthentication({username : 'nathalie', password: 'fsdf'}))}}>Nathalie</button>
          <button onClick={() => {dispatch(checkAuthentication({username : 'acadie02', password: 'fsdf'}))}}>Axelle</button>
          {/* <button onClick={() => {dispatch(checkAuthentication({username : 'clegalla', password: 'fsdf'}))}}>Corinne</button> */}
        </>
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
          {(agent.roles && agent.roles.indexOf('GEST') >=0) && (
            <div className="header__menu-section" id="gest" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
              <p>GESTIONNAIRE</p>
              <ul className="header__menu-section-list">
                <li><Link to={`/gestionnaire/${user}/${encodeURIComponent('ordres-de-mission-à-signer')}`}>Ordres de Mission</Link></li>
                <li><Link to={`/gestionnaire/${user}/${encodeURIComponent('états-de-frais-à-signer')}`}>États de Frais <span id="mes-efs"></span></Link></li>
                <li><Link to={`/gestionnaire/${user}/${encodeURIComponent('préférences-de-gestionnaire')}`}>Mes Préférences</Link></li>
              </ul>
            </div>
          )}
          <div className="header__menu-section" id="mon-compte" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
            <p>MON COMPTE</p>
            <ul className="header__menu-section-list">
              <li><Link to={`/utilisateur/${user}/mes-ordres-de-mission`}>Mes Ordres de Mission {/*<span id="mes-oms">1</span>*/}</Link></li>
              <li><Link to={`/utilisateur/${user}/${encodeURIComponent('mes-états-de-frais')}`}>Mes États de Frais <span id="mes-efs"></span></Link></li>
              <li><Link to={`/utilisateur/${user}/mes-documents`}>Mes Justificatifs</Link></li>
              {user === 'mboone01' &&(<li><Link to={`/utilisateur/${user}/mes-documents/profil-voyageur`}>Mon Profil Voyageur</Link></li>)}
              <li><Link to={`/utilisateur/${user}/${encodeURIComponent('mes-préférences')}`}>Mes Préférences</Link></li>
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
