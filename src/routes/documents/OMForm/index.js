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

  const mission = {
    abroadCosts:null,
    country:"",
    departure:"2022-12-07T15:47",
    departurePlace:"departure-home",
    listWorkAddresses:"",
    missionAdress:"Paris",
    missionGoal:"Formation Java",
    missionGoalFile:"path",
    region:"métropole",
    return:"2022-12-20T15:47",
    returnPlace:"return-home",
  };
  
  localStorage.setItem('mission', JSON.stringify(mission));



  return (
    <div className='form-container'>
      <ThreadAsTabs step={step} tabs={steps} isOm/>
      <div className="form-page__title">
        <PageTitle>Création d'un Ordre de Mission</PageTitle>
      </div>
      <div className="form-page__container">
        {step === 1 && <Mission dispatch={dispatch} step={step} />}
        {step === 2 && <Transports dispatch={dispatch} step={step} />}
        {step === 3 && <Hebergement dispatch={dispatch} step={step} />}
        {step === 4 && <Avance dispatch={dispatch} step={step} />}
        {step === 5 && <Signature dispatch={dispatch} step={step} />}
        {step !== 5 && <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>}
        {step === 5 && <button className="form-page__container-link" type='button'>Retour : Avance</button>}
      </div>
    </div>
  );
};

export default OMForm;
