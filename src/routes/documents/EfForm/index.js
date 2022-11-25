import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Mission from './Mission';
import PageTitle from 'src/components/PageTitle';
import Transports from './Transports';
import Hebergement from './Hebergement';
import Signature from './Signature';
import OmSelection from './OmSelection';
import Steps from './Steps';
import ThreadAsTabs from 'src/components/ThreadAsTabs';
import { useParams } from 'react-router-dom';

const EfForm = ({ step }) => {  

  let params = useParams();
  console.log(params);
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
  ];
  return (
    <div className='form-container'>
      <ThreadAsTabs step={step} tabs={steps} />
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

EfForm.propTypes = {

};

export default EfForm;