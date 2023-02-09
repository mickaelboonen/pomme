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
  const { steps, loader } = useSelector((state) => state.omForm);
  

  const loaderData = useLoaderData();
  
  const step = Number(loaderData.searchParams.get('etape'));
  const id = Number(loaderData.searchParams.get('id'));
  console.log(steps)

  return (
    <>
      <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} />
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Création d'un Ordre de Mission</PageTitle>
        </div>
        <div className="form-page__container">
          
          {loader && <div>Loading</div>}

          {(step === 1 && !loader) && <Mission step={step} isEfForm={false} />}
          {(step === 2 && !loader) && <Transports step={step} />}
          {(step === 3 && !loader) && <Accomodations step={step} />}
          {(step === 4 && !loader) && <Avance step={step} />}
          {(step === 5 && !loader) && <Signature step={step} />}
          {(step === 6 && !loader) && <Identity step={step} />}
        </div>
      </div>
    </>
  );
};

export default OMForm;
