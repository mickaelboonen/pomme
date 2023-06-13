import React from 'react';
import PropTypes from 'prop-types';
import { FaCertificate } from 'react-icons/fa'
import { BiLoader } from 'react-icons/bi'

import './style.scss';
import classNames from 'classnames';

const StatusChecker = ({ status }) => (
  <div className={classNames('form__graphic-validation', {'form__graphic-validation--validated': status})}>
    {status && (
      <span className='form__graphic-validation-ribbon  form__graphic-validation-ribbon--validated'>
        <FaCertificate />
        Validé
      </span>
    )}
    {!status && (
      <span className='form__graphic-validation-ribbon'>
        <BiLoader />
        En cours
      </span>
    )}
  </div>
);

StatusChecker.propTypes = {

};

export default StatusChecker;
