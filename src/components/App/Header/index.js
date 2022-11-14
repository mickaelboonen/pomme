import PropTypes from 'prop-types';
import Apple from '../../../assets/images/apple.png';
import Moon from '../../../assets/images/moon.svg';
import Sun from '../../../assets/images/sun.svg';
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
  const handleToggleTheme = (event) => {
    // TODO : localstorage etc
    const { checked } = event.target;

    if (checked) {
      localStorage.setItem('theme', 'dark');
    }
    else {
      localStorage.removeItem('theme');
    }
    !event.target.checked;
    document.querySelector(':root').classList.toggle('dark');
  }

  const handleHover = (event) => {
    const el = event.currentTarget.querySelector('.menu-section__item-list');
    el.classList.add('menu-section__item-list--open');

    if (event.currentTarget.id === 'mon-compte') {
      event.currentTarget.nextElementSibling.classList.add('menu-section__item--last-open');
    }
  };

  const handleMouseOut = (event) => {
    const el = event.currentTarget.querySelector('.menu-section__item-list');
    el.classList.remove('menu-section__item-list--open')

    if (event.currentTarget.id === 'mon-compte') {
      event.currentTarget.nextElementSibling.classList.remove('menu-section__item--last-open');
    }
  };
  
  return (
    <header className="header-container" style={{'display': 'flex'}}>
      <div className="header">
        <div className="header__identity">
          <img className="header__identity-logo" src={Apple} alt="react logo" />
          <Link to="/"><h1 className="header__identity-title">POMME</h1></Link>   
          <p style={{'margin-left': '1rem'}}>Bonjour mboone01</p>
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
        <nav className="menu">
          <div className="header-theme">
            <img src={Sun} alt="" />
            <label className="switch">
              <input id="theme-preferences" type="checkbox" onChange={handleToggleTheme}/>
              <span className="slider round"></span>
            </label>
            <img src={Moon} alt="" />
          </div>
          <div className="menu-section__item" id="dafc" onMouseOver={handleHover} onMouseOut={handleMouseOut}>
            <p>DAFC</p>
            <ul className="menu-section__item-list">
              <li>
                <a>Ordres de Mission</a>
              </li>
              <li>
                <a>États de frais</a>
              </li>
            </ul>
          </div>
          <div className="menu-section__item" id="a-signer" onMouseOver={handleHover} onMouseOut={handleMouseOut}>
            <p>A SIGNER</p>
            <ul className="menu-section__item-list">
              <li>
                <a>Ordres de Mission</a>
              </li>
              <li>
                <a>États de frais</a>
              </li>
            </ul>
          </div>
          <div className="menu-section__item" id="mon-compte" onMouseOver={handleHover} onMouseOut={handleMouseOut}>
            <p>MON COMPTE</p>
            <ul className="menu-section__item-list">
              <li><Link to="/utilisateur/mboone01/mes-ordres-de-mission">Mes Ordres de Mission <span id="mes-oms">1</span></Link></li>
              <li><Link to="/utilisateur/mboone01/mes-états-de-frais">Mes États de Frais <span id="mes-efs"></span></Link></li>
              <li><a>Mes Justificatifs</a></li>
              <li><a>Se déconnecter</a></li>
            </ul>
          </div>
          <div className="menu-section__item"/>
        </nav>
      </div>
      {/* <nav className="menu">
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
            <li><Link to="/utilisateur/mboone01/mes-ordres-de-mission">Mes Ordres de Mission <span id="mes-oms">1</span></Link></li>
            <li><Link to="/utilisateur/mboone01/mes-états-de-frais">Mes États de Frais <span id="mes-efs"></span></Link></li>
            <li><a>Mes Justificatifs</a></li>
            <li><a>Se déconnecter</a></li>
          </ul>
        </div>
      </nav> */}
    </header>
  );
};

Header.propTypes = {

};

export default Header;
