import React, { useEffect, useState } from 'react';

import { useLoaderData, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Advance from './Advance';
import Mission from './Mission/MissionVal';
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
import FormLayout from './FormLayout';
import { PDFViewer } from '@react-pdf/renderer';

const OMForm = () => {  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loaderData = useLoaderData();

  const { omForm :{ omForm, steps, omLoader},
    app: { appLoader, apiMessage },
    agent: { user, agent },
    omManager: { pendingDocs }
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



  // useEffect(() => {
  //   if (apiMessage.response && apiMessage.response.status === 200) {
  //     setTimeout(() => {

  //       dispatch(clearMessage());
  //     }, "950")
  //     setTimeout(() => {
  //       const nextStep = step + 1;
  //       if (nextStep === 7) {
  //         navigate('/');
  //       }
  //       else {
  //         navigate(loaderData.pathname + '?etape=' + nextStep + '&id=' + id);
  //       }
        
  //     }, "1000")
  //   }
  // }, [apiMessage]);

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
  const currentOM = pendingDocs.find((om) => om.id === id);
  console.log(currentOM);

  const [docToShow, setDocToShow] = useState('');

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
        <div className="form-page__container">
          <FormLayout>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{width: '48%', padding: '1rem'}}>
                {step === 1 && <Mission step={step} isEfForm={false} data={currentOM.mission} />}
              </div>
              {/* {docToShow === '' && (
                <div style={{width: '40%'}}>
                  caché
                </div>
              )} */}
              {docToShow === '' && (
                <div style={{width: '48%'}}>
                  <embed src={currentOM.file} width="100%" height="600px" type="application/pdf" />
                </div>
              )}
            </div>
          </FormLayout>
        </div>
        {/* {currentOM.status < 2 && (
          <div className="form-page__container">
            <div className='form'>
              <p className='form__text'>Cet Ordre de Mission n'a pas encore été terminé par l'agent. Vous ne pouvez pas encore le contrôler. </p>
              <div className='form__section-container-button' style={{textAlign: 'center', width: 'fit-content', margin: 'auto'}}>
              <ButtonElement
                type
                label="Retourner au menu des Ordres de Mission"
                isLink
                link={`/utilisateur/${user}/mes-ordres-de-mission`}
              />
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default OMForm;
