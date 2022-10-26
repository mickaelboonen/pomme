import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Mission from './Mission';
import PageTitle from '../../generics/PageTitle';
import Transports from './Transports';

const OMForm = () => {
  const location = useLocation();
  const step = Number(location.search.split('=')[1]);
  
  return (
  <main className="form-page">
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
        <Mission step={step} />
        <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>
      </div>
    )}
    {step === 4 && (
      <div className="form-page__container">
        <Mission step={step} />
        <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>
      </div>
    )}
    {step === 5 && (
      <div className="form-page__container">
        <Mission step={step} />
        <button className="form-page__container-link" type='button'>Retour : Avance</button>
      </div>
    )}
  </main>
);}

OMForm.propTypes = {

};

export default OMForm;
