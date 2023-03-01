import React, { useEffect } from 'react';

import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { ColorRing } from 'react-loader-spinner';

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
import LoaderCircle from '../../../components/LoaderCircle';

const OMForm = () => {  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { omForm :{ steps, omLoader, currentOM},
    app: { appLoader, apiMessage },
  } = useSelector((state) => state);
  
  // If we are in the Identity step for the OM, supposedly the OM is finished
  // We check that and redirect the user if the OM is not finished
  

  const checkIfDocIsFinished = () => {
    let docState = {};

    if (step ===6) {
      const omStepsWithStatus = [
        {
          name: 'mission',
          status: (currentOM.hasOwnProperty('mission') && currentOM.mission.status) ? currentOM.mission.status : false
        },
        {
          name: 'transports',
          status: (currentOM.hasOwnProperty('transports') && currentOM.transports.status) ? currentOM.transports.status : false
        },
        {
          name: 'hébergement',
          status: (currentOM.hasOwnProperty('accomodations') && currentOM.accomodations.status) ? currentOM.accomodations.status : false
        },
        {
          name: 'avance',
          status: (currentOM.hasOwnProperty('advance') && currentOM.advance.status) ? currentOM.advance.status : false
        },
        {
          name: 'signature',
          status: (currentOM.hasOwnProperty('signature') && currentOM.signature.status) ? currentOM.signature.status : false
        },
      ]
      
      const unfinishedStep = omStepsWithStatus.find((step) => !step.status);

      if (!unfinishedStep) {
        docState.isFinished = true
      }
      else {
        docState = unfinishedStep;
      }
    }

    return docState;
  }

  const docState = checkIfDocIsFinished();
  console.log("ETAT DE TOUTES LES ETAPES : ", docState);
  console.log("YA isFinished ? : ",docState.hasOwnProperty('isFinished'));

  const loaderData = useLoaderData();
  
  const step = Number(loaderData.searchParams.get('etape'));
  const id = Number(loaderData.searchParams.get('id'));

  useEffect(() => {
    if (apiMessage.status && apiMessage.status === 200) {
      setTimeout(() => {

        dispatch(clearMessage());
      }, "950")
      setTimeout(() => {
        const nextStep = step + 1;
        navigate(loaderData.pathname + '?etape=' + nextStep + '&id=' + id);
      }, "1000")
    }
  }, [apiMessage]);

  // console.log("JE SUIS DANS LINDEX : ", currentOM);
  return (
    <>
      <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} />
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Création d'un Ordre de Mission</PageTitle>
        </div>
        <div className="form-page__container">
          
          {(omLoader || appLoader) && (
            <LoaderCircle />
          )}
          {(step === 1 && !omLoader) && <Mission step={step} isEfForm={false} />}
          {(step === 2 && !omLoader) && <Transports step={step} />}
          {(step === 3 && !omLoader) && <Accomodations step={step} />}
          {(step === 4 && !omLoader) && <Avance step={step} />}
          {(step === 5 && !omLoader) && <Signature step={step} />}
          {(step === 6 && !appLoader && !omLoader && docState.hasOwnProperty('isFinished')) && <Identity step={step} />}
          {(step === 6 && !appLoader && !omLoader && !docState.hasOwnProperty('isFinished')) && <div>Pouet</div>}
        </div>
      </div>
    </>
  );
};

export default OMForm;
