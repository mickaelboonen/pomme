import PropTypes from 'prop-types';

import './style.scss';
import SmallScreenMenu from './SmallScreenMenu';
import DesktopHeader from './DesktopHeader';

const Header = () => (
  <header className="header-container">
    <DesktopHeader />
    <SmallScreenMenu />
  </header>
);

Header.propTypes = {

};

export default Header;
