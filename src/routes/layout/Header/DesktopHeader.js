import React from 'react';
import PropTypes from 'prop-types';
import { persistor } from 'src/store';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

// Components
import Preferences from './Preferences';
import BurgerIcon from './BurgerIcon';

// Actions and selectors
import { logout } from 'src/reducer/app';
import { toggleBurgerMenu, toggleNavList } from 'src/selectors/domManipulators';

const DesktopHeader = ({ cas }) => {

  const dispatch = useDispatch();

  const role = 'dev';
  
  const { agent : { user, agent }} = useSelector((state) => state);
  const handleLogOut = () => {
    localStorage.removeItem('persist:root');
    dispatch(logout());
    persistor.purge();
    cas.logout("/");
  }
  
  return (
  <div className="header">
      <div className="header__identity">
        <Link to="/" className="header__identity-logo"><p>POM</p></Link>
        {agent.firstname && <p className="header__identity-user">Bonjour {agent.firstname}</p>}
      </div>
      <BurgerIcon handler={toggleBurgerMenu} />
      <nav className="header__menu">
        <Preferences />
        {/* {user === 'mboone01' &&(
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
        )} */}
        {/* {user === 'mboone01' &&(
          <Link to={`/test/pdf`}>
            <div className="header__menu-section" id="a-signer">TEST PDF</div>
          </Link>
        )} */}
        <div className="header__menu-section" id="mon-compte" onMouseOver={toggleNavList} onMouseOut={toggleNavList}>
          <p>MON COMPTE</p>
          <ul className="header__menu-section-list">
            <li><Link to={`/utilisateur/${user}/mes-ordres-de-mission`}>Mes Ordres de Mission {/*<span id="mes-oms">1</span>*/}</Link></li>
            {(user === 'mboone01' || user === 'nathalie') &&<li><Link to={`/utilisateur/${user}/mes-états-de-frais`}>Mes États de Frais <span id="mes-efs"></span></Link></li>}
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
