import PropTypes from 'prop-types';
import Apple from 'src/assets/images/apple.png';
import { Link } from 'react-router-dom';

import './style.scss';
import Preferences from './Preferences';
import SmallScreenMenu from './SmallScreenMenu';

const Header = () => {

  const handleBarsClick = () => {

    const firstBar = document.querySelector('#first-bar');
    const secondBar = document.querySelector('#second-bar');
    const secondBarChild = document.querySelector('#secondbis-bar');
    const thirdBar = document.querySelector('#third-bar');
    firstBar.classList.toggle('menu-bar--ext')
    secondBar.classList.toggle('menu-bar--int')
    secondBarChild.classList.toggle('menu-bar--int-bis')
    thirdBar.classList.toggle('menu-bar--ext')
    
    const menu = document.querySelector('.small-screen-menu');
    menu.classList.toggle('small-screen-menu--open')
  };

  const handleHover = (event) => {
    const el = event.currentTarget.querySelector('.header__menu-section-list');
    el.classList.add('header__menu-section-list--open');
  };

  const handleMouseOut = (event) => {
    const el = event.currentTarget.querySelector('.header__menu-section-list');
    el.classList.remove('header__menu-section-list--open')
  };

  const userName = 'mboone01';
  const role = 'dev'
  
  return (
    <header className="header-container">
      <div className="header">
        <div className="header__identity">
          <img className="header__identity-logo" src={Apple} alt="react logo" />
          <Link to="/"><h1 className="header__identity-title">POM</h1></Link>   
          <p style={{'marginLeft': '1rem'}}>Bonjour {userName}</p>
        </div>
        <div className="header__burger" onClick={handleBarsClick}>
          <div className="header__burger-bars">
            <div id="first-bar" className='menu-bar'/>
            <div id="second-bar" className='menu-bar'>
              <div id="secondbis-bar" className='menu-bar'/>
            </div>
            <div id="third-bar" className='menu-bar'/>
          </div>
        </div>
        <nav className="header__menu">
          <Preferences />
          <div className="header__menu-section" id="dafc" onMouseOver={handleHover} onMouseOut={handleMouseOut}>
            <p>DAFC</p>
            <ul className="header__menu-section-list">
              <li><Link to="/dafc/ordres-de-mission">Ordres de Mission <span id="mes-oms">1</span></Link></li>
              <li><Link to="/dafc/états-de-frais">États de Frais <span id="mes-oms">1</span></Link></li>
            </ul>
          </div>
          <div className="header__menu-section" id="a-signer" onMouseOver={handleHover} onMouseOut={handleMouseOut}>
            <Link to={`/gestionnaire/${role}/documents-a-signer`}>GESTIONNAIRE</Link>
            {/* <ul className="header__menu-section-list">
              <li><Link to={`/gestionnaire/${userName}/documents-a-signer/ordres-de-missions`}>Ordres de Mission <span id="mes-oms">1</span></Link></li>
              <li><Link to={`/gestionnaire/${userName}/documents-a-signer/états-de-frais`}>États de Frais <span id="mes-oms">1</span></Link></li>
            </ul> */}
          </div>
          <div className="header__menu-section" id="mon-compte" onMouseOver={handleHover} onMouseOut={handleMouseOut}>
            <p>MON COMPTE</p>
            <ul className="header__menu-section-list">
              <li><Link to={`/utilisateur/${userName}/mes-ordres-de-mission`}>Mes Ordres de Mission <span id="mes-oms">1</span></Link></li>
              <li><Link to={`/utilisateur/${userName}/mes-états-de-frais`}>Mes États de Frais <span id="mes-efs"></span></Link></li>
              <li><Link to={`/utilisateur/${userName}/mes-documents`}>Mes Justificatifs</Link></li>
              <li><Link to={`/utilisateur/${userName}/mes-préférences`}>Mes Préférences</Link></li>
              <li><a>Se déconnecter</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <SmallScreenMenu />
    </header>
  );
};

Header.propTypes = {

};

export default Header;
