import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';

import './style.scss';

// Components 
import Steps from './Steps';
import Signature from './Signature';
import Transports from './Transports';
import Hebergement from './Hebergement';
import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';
import LoaderCircle from 'src/components/LoaderCircle';
import Mission from 'src/routes/documents/OMForm/Mission';

const EfForm = () => {      

  const loaderData = useLoaderData();
  const step = Number(loaderData.searchParams.get('etape'));
  const { efLoader } = useSelector((state) => state.ef);
  
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
          {efLoader && <LoaderCircle /> }
          {(step === 1&& !efLoader) && <Mission step={step} isEfForm />}
          {(step === 2&& !efLoader) && <Transports step={step} />}
          {(step === 3&& !efLoader) && <Hebergement step={step} />}
          {/* {(step === 4) && <Steps step={step} />} */}
          {(step === 4&& !efLoader) && <Steps step={step} />}
          {(step === 5&& !efLoader) && <Signature step={step} />}
        </div>
      </div>
    </div>
  );
};

EfForm.propTypes = {

};

export default EfForm;
