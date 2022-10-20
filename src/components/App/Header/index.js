import PropTypes from 'prop-types';
import Apple from '../../../assets/images/apple.png';

import './style.scss';

const Header = () => {

  const handleBarsClick = () => {

    const firstBar = document.querySelector('#first-bar');
    firstBar.classList.toggle('menu-bar--ext')
    const secondBar = document.querySelector('#second-bar');
    secondBar.classList.toggle('menu-bar--int')
    const secondBarChild = document.querySelector('#secondbis-bar');
    secondBarChild.classList.toggle('menu-bar--int-bis')
    const thirdBar = document.querySelector('#third-bar');
    thirdBar.classList.toggle('menu-bar--ext')
    
    const menu = document.querySelector('.menu');
    menu.classList.toggle('menu--open')
  };

  
  return (
    <header className="header-container">
      <div className="header">
        <div className="header__identity">
          <img className="header__identity-logo" src={Apple} alt="react logo" />
          <h1 className="header__identity-title">POMME</h1>
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
              <a>Mes Ordres de Mission <span id="mes-oms">1</span> </a> 
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
