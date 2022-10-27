import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Mission from './Mission';
import PageTitle from '../../generics/PageTitle';
import Transports from './Transports';
import Hebergement from './Hebergement';
import Avance from './Avance';
import Signature from './Signature';
import Thread from '../../generics/Thread';

const OMForm = ({ step }) => {  
  return (
    <div>
      <Thread step={step} />
      <div className="form-page__title">
        <PageTitle>Création d'un Ordre de Mission</PageTitle>
      </div>
      {step === 1 && (
        <div className="form-page__container">
          <Mission step={step} />
          <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>
        </div>
        
      )}
      {step === 2 && (
        <div className="form-page__container">
          <Transports step={step} />
          <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>
        </div>
      )}
      {step === 3 && (
        <div className="form-page__container">
          <Hebergement step={step} />
          <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>
        </div>
      )}
      {step === 4 && (
        <div className="form-page__container">
          <Avance step={step} />
          <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>
        </div>
      )}
      {step === 5 && (
        <div className="form-page__container">
          <Signature step={step} />
          <button className="form-page__container-link" type='button'>Retour : Avance</button>
        </div>
      )}
    </div>
  );
};

OMForm.propTypes = {

};

export default OMForm;
