import React, { useEffect } from 'react';

import { useLoaderData, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Avance from './Avance';
import Mission from './Mission';
import Identity from './Identity';
import Signature from './Signature';
import Transports from './Transports';
import Accomodations from './Accomodations';
import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';

import { clearMessage } from 'src/reducer/app';

import './style.scss';
import LoaderCircle from 'src/components/LoaderCircle';

const OMForm = () => {  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loaderData = useLoaderData();

  const { omForm :{ omForm, steps, omLoader, currentOM},
    app: { appLoader, apiMessage },
  } = useSelector((state) => state);

  useEffect(() => {
    if (apiMessage.response) {
      dispatch(clearMessage());
    }
  }, [location.search])


  const step = Number(loaderData.searchParams.get('etape'));
  const id = Number(loaderData.searchParams.get('id'));
  
  // If we are in the Identity step for the OM, supposedly the OM is finished
  // We check that and redirect the user if the OM is not finished
  const checkIfDocIsFinished = (step) => {
    let docState = {};

    if (step ===6) {
      const omStepsWithStatus = [
        {
          name: 'mission',
          step: 1,
          status: (currentOM.hasOwnProperty('mission') && currentOM.mission.status) ? currentOM.mission.status : false
        },
        {
          name: 'transports',
          step: 2,
          status: (currentOM.hasOwnProperty('transports') && currentOM.transports.status) ? currentOM.transports.status : false
        },
        {
          name: 'hébergement',
          step: 3,
          status: (currentOM.hasOwnProperty('accomodations') && currentOM.accomodations.status) ? currentOM.accomodations.status : false
        },
        {
          name: 'avance',
          step: 4,
          status: (currentOM.hasOwnProperty('advance') && currentOM.advance.status) ? currentOM.advance.status : false
        },
        {
          name: 'signature',
          step: 5,
          status: (currentOM.hasOwnProperty('signature') && currentOM.signature.status) ? currentOM.signature.status : false
        },
      ];
      
      const unfinishedStep = omStepsWithStatus.filter((step) => !step.status);

      if (!unfinishedStep) {
        docState.isFinished = true
      }
      else {
        docState = unfinishedStep;
      }
    }

    return docState;
  }

  const docState = checkIfDocIsFinished(step);

  useEffect(() => {
    if (apiMessage.response && apiMessage.response.status === 200) {
      setTimeout(() => {

        dispatch(clearMessage());
      }, "950")
      setTimeout(() => {
        const nextStep = step + 1;
        navigate(loaderData.pathname + '?etape=' + nextStep + '&id=' + id);
      }, "1000")
    }
  }, [apiMessage]);
  
  return (
    <>
      <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} />
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Création d'un Ordre de Mission</PageTitle>
        </div>
        <div className="form-page__container">
          
          {omLoader && <LoaderCircle />}
          {(step === 1 && !omLoader) && <Mission step={step} isEfForm={false} />}
          {(step === 2 && !omLoader) && <Transports step={step} />}
          {(step === 3 && !omLoader) && <Accomodations step={step} />}
          {(step === 4 && !omLoader) && <Avance step={step} />}
          {(step === 5 && !omLoader) && <Signature step={step} />}
          {(step === 6 && !omLoader && docState.length === 0) && <Identity step={step} />}
          {(step === 6 && !omLoader && docState.length > 0) && (
            <div className='form'>
                <p className='form__text'>Merci de terminer les étapes précédentes pour accéder à cette étape.</p>
                <p className='form__text'>Il vous reste à valider :</p>
                <p className='form__text'>{docState.map((missingStep) => {
                  if (docState.indexOf(missingStep) === docState.length -1 ) {
                    return <Link key={missingStep.step} to={loaderData.pathname + "?etape=" + missingStep.step + "&id=" + id}>{missingStep.name.toUpperCase()}</Link>;
                  }
                  return <Link key={missingStep.step} to={loaderData.pathname + "?etape=" + missingStep.step + "&id=" + id}>{missingStep.name.toUpperCase() + ' - '}</Link>;
                  })}
                </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OMForm;
