import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const PageTitle = ({ children, isHomePage }) => {

  const handleHover = (event) => {
    if (isHomePage) {
      console.log(event.currentTarget.textContent);
      const { target } = event;
      target.classList.add('a');
      target.style.textTransform = 'Capitalize';
      target.textContent = 'Préparer son Ordre de Mission Même Endormi';
    }
  }
  return (
    <h2 className="page-title" onMouseOver={handleHover}>{children}</h2>
  );
};

PageTitle.propTypes = {

};

PageTitle.defaultProps = {
  isHomePage: false,
};

export default PageTitle;
