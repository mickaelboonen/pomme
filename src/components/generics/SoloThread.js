import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const SoloThread = ({ children }) => (
  <div className="form-page__thread">
    <div className="form-page__thread-step form-page__thread-step--open form-page__thread-step--solo">
      { children }
    </div>
  </div>
);

SoloThread.propTypes = {

};

export default SoloThread;
