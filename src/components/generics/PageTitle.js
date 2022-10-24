import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const PageTitle = ({ children }) => (
  <h2 className="page-title">{children}</h2>
);

PageTitle.propTypes = {

};

export default PageTitle;
