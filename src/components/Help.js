import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Help = ({message, id}) => (
  <div className='help' id={id}>
    <h4 className='help__title'>Besoin d'aide ?</h4>
    <p className='help__message'>{message}</p>
  </div>
);

Help.propTypes = {

};

export default Help;
