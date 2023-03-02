import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Mission from 'src/routes/documents/OMForm/Mission';
import PageTitle from 'src/components/PageTitle';
import Transports from './Transports';
import Hebergement from './Hebergement';
import Signature from './Signature';
import OmSelection from './OmSelection';
import Steps from './Steps';
import ThreadAsTabs from 'src/components/ThreadAsTabs';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Help from 'src/components/Help';

const EfForm = () => {      

  const loaderData = useLoaderData();
  const step = Number(loaderData.searchParams.get('etape'));
  
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
    <div className='form-root'>
      <ThreadAsTabs step={step} tabs={steps} urlData={loaderData} />
      <PageTitle>Création d'un État de frais</PageTitle>
      <div className='form-root__container'>
        <div className="form-page__container">
          {/* {step === 1 && <OmSelection step={step} />} */}
          {step === 1 && <Mission step={step} isEfForm />}
          {step === 2 && <Transports step={step} />}
          {step === 3 && <Hebergement step={step} />}
          {step === 4 && <Steps step={step} />}
          {step === 5 && <Signature step={step} />}
          {/* {step !== 6 && <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>}
          {step === 6 && <button className="form-page__container-link" type='button'>Retour : Avance</button>} */}
        </div>
      </div>
    </div>
  );
};

EfForm.propTypes = {

};

export default EfForm;
