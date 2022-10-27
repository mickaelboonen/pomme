import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const Thread = ({ step }) => (
  <div className="form-page__thread">
    <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 1})}>
      Mission <span>- Étape {step} / 5</span>
    </div>
    <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 2})}>
      Transports <span>- Étape {step} / 5</span>
    </div>
    <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 3})}>
      Hébergements <span>- Étape {step} / 5</span>
    </div>
    <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 4})}>
      Avance <span>- Étape {step} / 5</span>
    </div>
    <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 5})}>
      Signature <span>- Étape {step} / 5</span>
    </div>
  </div>
);

Thread.propTypes = {

};

export default Thread;
