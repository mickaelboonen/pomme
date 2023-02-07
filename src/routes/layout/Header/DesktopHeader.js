import React from 'react';
import PropTypes from 'prop-types';
import Apple from 'src/assets/images/apple.png';

import './style.scss';
import { Link } from 'react-router-dom';
import Preferences from './Preferences';
import { toggleBurgerMenu, toggleNavList } from 'src/selectors/domManipulators';
import BurgerIcon from './BurgerIcon';
import { useSelector } from 'react-redux';

const DesktopHeader = ({ cas }) => {

  const role = 'dev'
  
  const { app : { user }} = useSelector((state) => state);
  const handleLogOut = () => {
    cas.logout("/");
  }

  return (
  <div className="header">
      <div className="header__identity">
        <Link to="/"><img className="header__identity-logo" src={Apple} alt="react logo" /></Link>   
        <Link to="/"><h1 className="header__identity-title">POM</h1></Link>   
        <p className="header__identity-user">Bonjour {user}</p>
      </div>
      <BurgerIcon handler={toggleBurgerMenu} />
      <nav className="header__menu">
        <Preferences />
        {user === 'mboone01' &&(
          <div className="header__menu-section" id="dafc" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
            <p>DAFC</p>
            <ul className="header__menu-section-list">
              <li><Link to="/dafc/ordres-de-mission">Ordres de Mission <span id="mes-oms">1</span></Link></li>
              <li><Link to="/dafc/états-de-frais">États de Frais <span id="mes-oms">1</span></Link></li>
            </ul>
          </div>
        )}
        {user === 'mboone01' &&(
          <Link to={`/gestionnaire/${role}/documents-a-signer`}>
            <div className="header__menu-section" id="a-signer">GESTIONNAIRE</div>
          </Link>
        )}
        <div className="header__menu-section" id="mon-compte" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
          <p>MON COMPTE</p>
          <ul className="header__menu-section-list">
            <li><Link to={`/utilisateur/${user}/mes-ordres-de-mission`}>Mes Ordres de Mission {/*<span id="mes-oms">1</span>*/}</Link></li>
            {user === 'mboone01' &&<li><Link to={`/utilisateur/${user}/mes-états-de-frais`}>Mes États de Frais <span id="mes-efs"></span></Link></li>}
            <li><Link to={`/utilisateur/${user}/mes-documents`}>Mes Justificatifs</Link></li>
            <li><Link to={`/utilisateur/${user}/mes-préférences`}>Mes Préférences</Link></li>
            <li><a onClick={handleLogOut}>Se déconnecter</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

DesktopHeader.propTypes = {

};

export default DesktopHeader;
