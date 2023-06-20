import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';

import './style.scss';

// Components 
import Stages from './Stages';
import Rib from './Rib';
import Transports from './Transports';
import Accomodations from './Accomodations';
import Recap from './Recap';
import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';
import LoaderCircle from 'src/components/LoaderCircle';
import Mission from 'src/routes/documents/OMForm/Mission';
import { clearMessage } from 'src/reducer/app';
import { checkStepsStatus } from 'src/selectors/formDataGetters';
import DocMissingStepsRecap from 'src/components/docMissingsStepsRecap';

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
    if (apiMessage.response && apiMessage.response.status === 200) {
      setTimeout(() => {

        dispatch(clearMessage());
      }, "950")
      setTimeout(() => {
        let nextStep = step + 1;

        if (nextStep === 4 && (!currentEf.has_steps || !currentEf.is_teaching)) {
          nextStep = 5;
        }
        
        if (nextStep === 7) {
          navigate('/');
        }
        else {
          navigate(loaderData.pathname + '?etape=' + nextStep + '&id=' + id + '&om=' + om);
        }
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
      name: 'RIB',
      id: 5,
    },
    {
      name: 'Recap',
      id: 6,
    },
  ];

  // if (!currentEf.has_steps && !currentEf.is_teaching) {
  //   tabs = tabs.filter((tab) => tab.id !== 4);
  // }
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
          {/* {((step === 4 && !efLoader) &&  (currentEf.has_steps || currentEf.is_teaching))  && <Steps step={step} />} */}
          {((step === 4 && !efLoader))  && <Stages step={step} />}
          {(step === 5 && !efLoader) && <Rib step={step} />}
          {(step === 6 && !efLoader && docState.length === 0) && <Recap />}
          {(step === 6 && !efLoader && docState.length > 0) && <DocMissingStepsRecap url={loaderData} id={id} docState={docState} /> }
        </div>
      </div>
    </div>
  );
};

EfForm.propTypes = {

};

export default EfForm;
