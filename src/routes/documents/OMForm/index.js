import React, { useEffect } from 'react';

import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avance from './Avance';
import Mission from './Mission';
import Signature from './Signature';
import Transports from './Transports';
import Hebergement from './Hebergement';
import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';

import './style.scss';

const OMForm = () => {  
  const { steps, loader } = useSelector((state) => state.omForm);
  

  const loaderData = useLoaderData();
  
  const step = Number(loaderData.searchParams.get('etape'));
  const id = Number(loaderData.searchParams.get('id'));
  

  return (
    <div className='form-container'>
      <ThreadAsTabs step={step} tabs={steps} isOm/>
      <div className="form-page__title">
        <PageTitle>Création d'un Ordre de Mission</PageTitle>
      </div>
      <div className="form-page__container">
        
        {loader && <div>Loading</div>}

        {(step === 1 && !loader) && <Mission step={step} isEfForm={false} />}
        {(step === 2 && !loader) && <Transports step={step} />}
        {(step === 3 && !loader) && <Hebergement step={step} />}
        {(step === 4 && !loader) && <Avance step={step} />}
        {(step === 5 && !loader) && <Signature step={step} />}
        {step !== 5 && <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>}
        {step === 5 && <button className="form-page__container-link" type='button'>Retour : Avance</button>}
      </div>
    </div>
  );
};

export default OMForm;
