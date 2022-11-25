import React from 'react';
import PropTypes from 'prop-types';
import FormSectionTitle from 'src/components/FormSectionTitle';
import { Link } from 'react-router-dom';

import './style.scss';

const DoubleAuthentication = () => {
  const handleCancelClick = () => {
    const authElement = document.querySelector('.form__section-authentication');
    authElement.classList.remove('form__section-authentication--open');
  }
  return (
    <div className='double-auth'>
      <FormSectionTitle needsClarity >Sécurité</FormSectionTitle>
      <div className="double-auth__button">
        <Link to="#">Double authentification CAS</Link>
        <p>Veuillez vous double authentifier pour autoriser la validation.</p>
      </div>
      <div className="double-auth__button">
        <button type='button' onClick={handleCancelClick}>Annuler</button>
      </div>
    </div>
  );
};

DoubleAuthentication.propTypes = {

};

export default DoubleAuthentication;
