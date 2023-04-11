import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';

import './style.scss';

// Components 
import Steps from './Steps';
import Signature from './Signature';
import Transports from './Transports';
import Accomodations from './Accomodations';
import Recap from './Recap';
import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';
import LoaderCircle from 'src/components/LoaderCircle';
import Mission from 'src/routes/documents/OMForm/Mission';
import { clearMessage } from 'src/reducer/app';
import { checkStepsStatus } from '../../../selectors/formDataGetters';
import DocMissingStepsRecap from '../../../components/docMissingsStepsRecap';

const EfForm = () => {      

  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const step = Number(loaderData.searchParams.get('etape'));
  const id = Number(loaderData.searchParams.get('id'));
  const om = Number(loaderData.searchParams.get('om'));

  const { ef: { efLoader, currentEf },
    app: { apiMessage },
  } = useSelector((state) => state);

  useEffect(() => {
    if (step === 4 && !currentEf.currentEf.has_steps && !currentEf.is_teaching) {
      const stepIndex = loaderData.search.indexOf(4);
      let redirectUrl = loaderData.pathname;
      redirectUrl+= loaderData.search.slice(0, 7) + 5 + loaderData.search.slice(stepIndex + 1);

      navigate(redirectUrl)
    }
  }, [])

  
  useEffect(() => {
    if (apiMessage.response && apiMessage.response.status === 200) {
      setTimeout(() => {

        dispatch(clearMessage());
      }, "950")
      setTimeout(() => {
        const nextStep = step + 1;
        navigate(loaderData.pathname + '?etape=' + nextStep + '&id=' + id + '&om=' + om);
      }, "1000")
    }
  }, [apiMessage]);

  useEffect(() => {
    if (apiMessage.hasOwnProperty('response')) {
      dispatch(clearMessage());
    }
  }, [step])

  const docState = checkStepsStatus(step, currentEf);
  
  let tabs = [
    {
      name: 'Mission',
      id: 1,
    },
    {
      name: 'Transports',
      id: 2,
    },
    {
      name: 'Hébergements & repas',
      id: 3,
    },
    {
      name: 'Étapes',
      id: 4,
    },
    {
      name: 'Signature & RIB',
      id: 5,
    },
    {
      name: 'Recap',
      id: 6,
    },
  ];

  if (!currentEf.has_steps && !currentEf.is_teaching) {
    tabs = tabs.filter((tab) => tab.id !== 4);
  }
  return (
    <div className='form-root'>
      <ThreadAsTabs step={step} tabs={tabs} urlData={loaderData} />
      <PageTitle>{step === 6 ? "Recapitulatif de l'État de frais" : "Création d'un État de frais"}</PageTitle>
      <div className='form-root__container'>
        <div className="form-page__container">
          {efLoader && <LoaderCircle /> }
          {(step === 1 && !efLoader) && <Mission step={step} isEfForm />}
          {(step === 2 && !efLoader) && <Transports step={step} />}
          {(step === 3 && !efLoader) && <Accomodations step={step} />}
          {((step === 4 && !efLoader) &&  (currentEf.has_steps || currentEf.is_teaching))  && <Steps step={step} />}
          {(step === 5 && !efLoader) && <Signature step={step} />}
          {(step === 6 && !efLoader && docState.length === 0) && <Recap step={step} />}
          {(step === 6 && !efLoader && docState.length > 0) && <DocMissingStepsRecap url={loaderData} id={id} docState={docState} /> }
        </div>
      </div>
    </div>
  );
};

EfForm.propTypes = {

};

export default EfForm;
