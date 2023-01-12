import React from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Avance from './Avance';
import Mission from './Mission';
import Signature from './Signature';
import Transports from './Transports';
import Hebergement from './Hebergement';
import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';

import './style.scss';

const OMForm = () => {  
  const dispatch = useDispatch();
  const { steps, omForm } = useSelector((state) => state.omForm);
  
  const [searchParams] = useSearchParams();
  const step = Number(searchParams.get('etape'));

  return (
    <div className='form-container'>
      <ThreadAsTabs step={step} tabs={steps} isOm/>
      <div className="form-page__title">
        <PageTitle>Création d'un Ordre de Mission</PageTitle>
      </div>
      <div className="form-page__container">
        {step === 1 && <Mission step={step} isEfForm={false} />}
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

export default OMForm;
