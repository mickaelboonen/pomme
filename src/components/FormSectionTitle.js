import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const FormSectionTitle = ({ needsClarity, children }) => (
  <h3 className={classNames("form-section-title", {"form-section-title--over-blur" : needsClarity})}>{children}</h3>
);

FormSectionTitle.propTypes = {

};

export default FormSectionTitle;
