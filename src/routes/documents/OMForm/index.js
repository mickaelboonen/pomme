import React, { useEffect } from 'react';

import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avance from './Avance';
import Mission from './Mission';
import Identity from './Identity';
import Signature from './Signature';
import Transports from './Transports';
import Accomodations from './Accomodations';
import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';

import './style.scss';

const OMForm = () => {  
  const { omForm :{ steps, omLoader},
    app: { appLoader},
  } = useSelector((state) => state);
  

  const loaderData = useLoaderData();
  
  const step = Number(loaderData.searchParams.get('etape'));
  const id = Number(loaderData.searchParams.get('id'));

  console.log('IN IDENTITY : ', step === 6, appLoader, omLoader, (step === 6 && !appLoader && !omLoader));
  return (
    <>
      <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} />
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Création d'un Ordre de Mission</PageTitle>
        </div>
        <div className="form-page__container">
          
          {(omLoader || appLoader) && <div>Loading</div>}
          {(step === 1 && !omLoader) && <Mission step={step} isEfForm={false} />}
          {(step === 2 && !omLoader) && <Transports step={step} />}
          {(step === 3 && !omLoader) && <Accomodations step={step} />}
          {(step === 4 && !omLoader) && <Avance step={step} />}
          {(step === 5 && !omLoader) && <Signature step={step} />}
          {(step === 6 && !appLoader && !omLoader) && <Identity step={step} />}
        </div>
      </div>
    </>
  );
};

export default OMForm;
