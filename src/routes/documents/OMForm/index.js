import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Mission from './Mission';
import PageTitle from 'src/components/PageTitle';
import Transports from './Transports';
import Hebergement from './Hebergement';
import Avance from './Avance';
import Signature from './Signature';
import Thread from 'src/components/Thread';
import ThreadAsTabs from 'src/components/ThreadAsTabs';

const OMForm = ({ step }) => {  
  
  const steps = [
    {
      name: 'Mission',
      id: 1,
    },
    {
      name: 'Transports',
      id: 2,
    },
    {
      name: 'Hébergements',
      id: 3,
    },
    {
      name: 'Étapes',
      id: 4,
    },
    {
      name: 'Signature',
      id: 5,
    },
  ];
  return (
    <div className='form-container'>
      <ThreadAsTabs step={step} tabs={steps} isOm/>
      <div className="form-page__title">
        <PageTitle>Création d'un Ordre de Mission</PageTitle>
      </div>
      <div className="form-page__container">
        {step === 1 && <Mission step={step} />}
        {step === 2 && <Transports step={step} />}
        {step === 3 && <Hebergement step={step} />}
        {step === 4 && <Avance step={step} />}
        {step === 5 && <Signature step={step} />}
        {step !== 5 && <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>}
        {step === 5 && <button className="form-page__container-link" type='button'>Retour : Avance</button>}
      </div>
    </div>
  );
};

OMForm.propTypes = {

};

export default OMForm;
