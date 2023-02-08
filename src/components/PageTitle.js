import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const PageTitle = ({ children, isHomePage }) => {


  return (
    <h2 className="page-title">{children}</h2>
  );
};

PageTitle.propTypes = {

};

PageTitle.defaultProps = {
  isHomePage: false,
};

export default PageTitle;
