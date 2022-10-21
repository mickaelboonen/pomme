import PropTypes from 'prop-types';
import Apple from '../../../assets/images/apple.png';
import { Link } from 'react-router-dom';

import './style.scss';

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
    
    const menu = document.querySelector('.menu');
    menu.classList.toggle('menu--open')
  };

  
  return (
    <header className="header-container">
      <div className="header">
        <div className="header__identity">
          <img className="header__identity-logo" src={Apple} alt="react logo" />
          <Link to="/"><h1 className="header__identity-title">POMME</h1></Link>   
          <p>mboone01</p>
        </div>
        <div className="header__menu" onClick={handleBarsClick}>
          <div className="header__menu-bars">
            <div id="first-bar" className='menu-bar'/>
            <div id="second-bar" className='menu-bar'>
              <div id="secondbis-bar" className='menu-bar'/>
            </div>
            <div id="third-bar" className='menu-bar'/>
          </div>
        </div>
      </div>
      <div className="menu">
        <div className="menu-section">
          <h3>DAFC</h3>
          <ul>
            <li>
              <a>Ordres de Mission</a>
            </li>
            <li>
              <a>États de frais</a>
            </li>
          </ul>
        </div>
        <div className="menu-section">
          <h3>A SIGNER</h3>
          <ul>
            <li>
              <a>Ordres de Mission</a>
            </li>
            <li>
              <a>États de frais</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>MON COMPTE</h3>
          <ul>
            <li>
              <Link to="/utilisateur/mboone01/mes-ordres-de-mission">Mes Ordres de Mission <span id="mes-oms">1</span></Link>  
            </li>
            <li>
              <a>Mes États de frais</a>
            </li>
            <li>
              <a>Mes Justificatifs</a>
            </li>
            <li>
              <a>Se déconnecter</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {

};

export default Header;
