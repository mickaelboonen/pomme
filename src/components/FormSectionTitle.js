import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const FormSectionTitle = ({ needsClarity, children, id, handler }) => {

  const handleClick = (event) => {
    if (handler) {
      handler(event);
    }
  }
  return (
    <h3
      id={id}
      onClick={handleClick}
      className={classNames("form-section-title", {"form-section-title--over-blur" : needsClarity})}
    >
      {children}
    </h3>
  );
}

FormSectionTitle.propTypes = {

};

FormSectionTitle.defaultProps = {
  id: null,
  handler: null
}

export default FormSectionTitle;
