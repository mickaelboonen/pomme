import PropTypes from 'prop-types';

import './style.scss';
import SmallScreenMenu from './SmallScreenMenu';
import DesktopHeader from './DesktopHeader';

const Header = ({ cas }) => (
  <header className="header-container">
    <DesktopHeader cas={cas} />
    <SmallScreenMenu cas={cas} />
  </header>
);

Header.propTypes = {

};

export default Header;
