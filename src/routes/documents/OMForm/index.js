import React, { useEffect } from 'react';

import { useLoaderData, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Advance from './Advance';
import Mission from './Mission';
import Identity from './Identity';
import Other from './Other';
import Transports from './Transports';
import Accomodations from './Accomodations';
import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';
import ButtonElement from 'src/components/Fields/ButtonElement';

import { clearMessage } from 'src/reducer/app';

import './style.scss';
import LoaderCircle from 'src/components/LoaderCircle';
import { fetchOm } from 'src/reducer/omForm';

const OMForm = () => {  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loaderData = useLoaderData();

  const { omForm :{ omForm, steps, omLoader, currentOM},
    app: { appLoader, apiMessage },
    agent: { user, agent },
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
          name: 'autre',
          step: 5,
          status: (currentOM.hasOwnProperty('more') && currentOM.more.status) ? currentOM.more.status : false
        },
      ];
      
      const unfinishedStep = omStepsWithStatus.filter((step) => !step.status);
      
      // if (currentOM.transports && currentOM.transports.vehicle_authorization === 'pending') {
        // const transportsStep = unfinishedStep.find((step) => step.name === 'transports');
        // transportsStep.name = 'transports (autorisation de véhicule signée manquante)'
      // }
      if (!unfinishedStep) {
        docState.isFinished = true
      }
      else {
        docState = unfinishedStep;
      }
    }
    else {
      return [];
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
        if (nextStep === 7) {
          navigate('/');
        }
        else {
          navigate(loaderData.pathname + '?etape=' + nextStep + '&id=' + id);
        }
        
      }, "1000")
    }
  }, [apiMessage]);

  const showLastStep = (loader, unfinishedSteps, agent) => {
    if (!loader) { // if the loader === false, we have the om data
      if (unfinishedSteps.length === 0) { // if length === 0, all steps have been validated bu agent
        if (agent.hasOwnProperty('lastname')) { // if true, agent's data has been fetched
          return true;
        }
      }
    }
    
    return false;
  }
  
  return (
    <>
      <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} />
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Création d'un Ordre de Mission</PageTitle>
        </div>
        {(!currentOM.hasOwnProperty('status')  && omLoader) && (
          <div className="form-page__container">
            <LoaderCircle />
          </div>
        )}
        {currentOM.status === 1  && (
          <div className="form-page__container">
            
            {omLoader && <LoaderCircle />}
            {(step === 1 && !omLoader) && <Mission step={step} isEfForm={false} />}
            {(step === 2 && !omLoader) && <Transports step={step} />}
            {(step === 3 && !omLoader) && <Accomodations step={step} />}
            {(step === 4 && !omLoader) && <Advance step={step} />}
            {(step === 5 && !omLoader) && <Other step={step} />}
            {(step === 6 && showLastStep(omLoader, docState, agent)) && <Identity step={step} />}
            {(step === 6 && !showLastStep(omLoader, docState, agent)) && (
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
        )}
        {currentOM.status === 2 && (
          <div className="form-page__container">
            <div className='form'>
              <p className='form__text'>Vous ne pouvez plus modifier cet OM. Si vous pensez avoir fait une erreur, veuillez vous rapprocher de votre Gestionnaire. </p>
              <div className='form__section-container-button' style={{textAlign: 'center', width: 'fit-content', margin: 'auto'}}>
              <ButtonElement
                type
                label="Retourner au menu des Ordres de Mission"
                isLink
                link={`/utilisateur/mes-ordres-de-mission`}
              />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OMForm;
