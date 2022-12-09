import React from 'react';
import PropTypes from 'prop-types';

import '../style.scss';

const RefusalMessage = ({ message}) => (
  <div className="form__section-field">
    <div className="form__section-field-refusal">
      <p className="form__section-field-refusal-message" id="refusal-message">{message}</p>
    </div>
  </div>
);

RefusalMessage.propTypes = {

};

export default RefusalMessage;
