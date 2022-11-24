import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Mission from './Mission';
import PageTitle from '../../generics/PageTitle';
import Tabs from '../../generics/Tabs';
import Transports from './Transports';
import Hebergement from './Hebergement';
import Signature from './Signature';
import Thread from '../../generics/Thread';
import OmSelection from './OmSelection';
import Steps from './Steps';
import ThreadAsTabs from '../../generics/ThreadAsTabs';

const OMForm = ({ step }) => {  
  console.log(step);
  // <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 1})}>
  //   Mission <span>- Étape {step} / 5</span>
  // </div>
  // <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 2})}>
  //   Transports <span>- Étape {step} / 5</span>
  // </div>
  // <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 3})}>
  //   Hébergements <span>- Étape {step} / 5</span>
  // </div>
  // <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 4})}>
  //   Avance <span>- Étape {step} / 5</span>
  // </div>
  // <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === 5})}>
  //   Signature <span>- Étape {step} / 5</span>
  // </div>
  const steps = [
    {
      name: 'OM',
      id: 1,
    },
    {
      name: 'Mission',
      id: 2,
    },
    {
      name: 'Transports',
      id: 3,
    },
    {
      name: 'Hébergements',
      id: 4,
    },
    {
      name: 'Étapes',
      id: 5,
    },
    {
      name: 'Signature',
      id: 6,
    },
  ]
  return (
    <div className='form-container'>
      <ThreadAsTabs step={step} />
      <div className="form-page__title">
        <PageTitle>Création d'un État de frais</PageTitle>
      </div>
      <div className="form-page__container">
        {step === 1 && <OmSelection step={step} />}
        {step === 2 && <Mission step={step} />}
        {step === 3 && <Transports step={step} />}
        {step === 4 && <Hebergement step={step} />}
        {step === 5 && <Steps step={step} />}
        {step === 6 && <Signature step={step} />}
        {step !== 6 && <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>}
        {step === 6 && <button className="form-page__container-link" type='button'>Retour : Avance</button>}
      </div>
    </div>
  );
};

OMForm.propTypes = {

};

export default OMForm;
