import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const Help = ({message, id, link, page, domId}) => (
  <div className={classNames('help', {'help--open': id === domId})} id={id}>
    <h4 className='help__title'>Besoin d'aide ?</h4>
    <p className='help__message'>{id === domId ? message : ''}</p>
    <p className='help__message'><a target="_blank" className='help__link' href={link}>{page} du Guide des Missions</a></p>
  </div>
);

Help.propTypes = {

};

export default Help;
