import PropTypes from 'prop-types';

import './style.scss';
import SmallScreenMenu from './SmallScreenMenu';
import DesktopHeader from './DesktopHeader';
import { useSelector } from 'react-redux';

const Header = ({ cas }) => {
  const { isAuthenticated } = useSelector((state) => state.agent)
  return (
    <header className="header-container">
      <DesktopHeader cas={cas} isAuthenticated={isAuthenticated} />
      {isAuthenticated && <SmallScreenMenu cas={cas} />}
    </header>
  );
}

Header.propTypes = {

};

export default Header;
