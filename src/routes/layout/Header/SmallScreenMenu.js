import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { persistor } from "src/store";

// Icons
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaHome, FaSun, FaMoon } from "react-icons/fa";

// Selectors
import { logout } from 'src/reducer/agent';
import { closeBurgerMenu  } from 'src/selectors/domManipulators';

import './style.scss';

const SmallScreenMenu = ({ cas, role = 'dev'}) => {
  const { agent : { user }} = useSelector((state) => state);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const openMenu = document.querySelector('.small-screen-menu--open');
    if (openMenu) {
      closeBurgerMenu();
    }
    
  }, [location.pathname])

  const dafcLinks = {
    category: 'DAFC',
    links: [
      {
        id: 'dafc-om',
        url: '/dafc/ordres-de-mission',
        label: 'Ordres de Mission'
      },
      {
        id: 'dafc-ef',
        url: '/dafc/états-de-frais',
        label: 'États de frais'
      },
    ],
  };

  const gestLinks = {
    category: 'GESTIONNAIRE',
    links: [
      {
        id: 'gest-om',
        url: `/gestionnaire/${role}/documents-a-signer`,
        label: 'Ordres de Mission'
      },
      {
        id: 'gest-ef',
        url: `/gestionnaire/${role}/documents-a-signer`,
        label: 'États de frais'
      },
      {
        id: 'gest-pref',
        url: `/gestionnaire/${user}/mes-préférences`,
        label: 'Mes préférences'
      },
    ],
  };

  const userLinks = {
    category: 'MON COMPTE',
    links: [
      {
        id: 'user-om',
        url: `/utilisateur/${user}/mes-ordres-de-mission`,
        label: 'Mes ordres de Mission'
      },
      {
        id: 'user-ef',
        url: `/utilisateur/${user}/${encodeURIComponent('mes-états-de-frais')}`,
        label: 'Mes états de frais'
      },
      {
        id: 'user-files',
        url: `/utilisateur/${user}/mes-documents`,
        label: 'Mes justificatifs'
      },
      {
        id: 'user-pref',
        url: `/utilisateur/${user}/${encodeURIComponent('mes-préférences')}`,
        label: 'Mes préférences'
      },
    ],
  };

  const handleLogOut = () => {
    localStorage.removeItem('persist:root');
    dispatch(logout());
    persistor.purge();
    cas.logout("/se-connecter");
  }

  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(!savedTheme ? 'light' : savedTheme);

  const handleToggleTheme = () => {
    

    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
    else {
      localStorage.removeItem('theme');
      setTheme('light');
    }

    document.querySelector(':root').classList.toggle('dark');
  }


  return (
    <nav className="small-screen-menu">
      <div className="small-screen-menu__section">
        <ul className="small-screen-menu__section-icons">
         <Link to="/">
            <FaHome
              className='small-screen-menu__section-icons-item'
            />
          </Link>
          <RiLogoutBoxRFill
            onClick={handleLogOut}
            className='small-screen-menu__section-icons-item'
          />
          {theme === "dark" && (
            <FaSun
            onClick={handleToggleTheme}
              className='small-screen-menu__section-icons-item small-screen-menu__section-icons-item--theme'
            />
          )}
          {theme === "light" && (
            <FaMoon
              onClick={handleToggleTheme}
              className='small-screen-menu__section-icons-item small-screen-menu__section-icons-item--theme'
            />
          )}
        </ul>
      </div>
      <div className="small-screen-menu__section">
        <h3  className="small-screen-menu__section-title">{userLinks.category}</h3>
        <ul className="small-screen-menu__section-list">
          {userLinks.links.map((li) => (
            <Link to={li.url} key={li.id}>
              <li className="small-screen-menu__section-list-item">
                {li.label} {/*<span id="mes-oms"></span>*/}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {user === 'mboone01' &&(
        <div className="small-screen-menu__section">
          <h3  className="small-screen-menu__section-title">{gestLinks.category}</h3>
          <ul className="small-screen-menu__section-list">
            {gestLinks.links.map((li) => <Link to={li.url} key={li.id}><li className="small-screen-menu__section-list-item">{li.label} {/*<span id="mes-oms"></span>*/}</li></Link>)}
          </ul>
        </div>
      )}
      {user === 'mboone01' &&(
        <div className="small-screen-menu__section">
          <h3  className="small-screen-menu__section-title">{dafcLinks.category}</h3>
          <ul className="small-screen-menu__section-list">
            {dafcLinks.links.map((li) => <Link to={li.url} key={li.id}><li className="small-screen-menu__section-list-item">{li.label} {/*<span id="mes-oms"></span>*/}</li></Link>)}

          </ul>
        </div>
      )}
    </nav>
  );
};

SmallScreenMenu.propTypes = {

};

export default SmallScreenMenu;
