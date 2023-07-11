import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import classNames from 'classnames';

import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import Mission from './Mission';
import Advance from './Advance';
import Validation from './Validation';
import FormLayout from './FormLayout';
import Transports from './Transports';
import Accomodations from './Accomodations';
import LoaderCircle from 'src/components/LoaderCircle';

import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';

import { clearMessage } from 'src/reducer/app';

import './style.scss';
import Other from './Other';

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

  const {
    register, formState: { errors }
  } = useForm();

  const step = Number(loaderData.searchParams.get('etape'));
  const id = Number(loaderData.searchParams.get('id'));

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

  const [docToShow, setDocToShow] = useState('');

  const displayPdf = (url) => {
    setDocToShow(url);
  }

  const toggleViewer = () => {
    setDocToShow('')
  }

  return (
    <>
      <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} />
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>{currentOM.name}</PageTitle>
        </div>
        {(!currentOM.hasOwnProperty('status')  && omLoader) && (
          <div className="form-page__container">
            <LoaderCircle />
          </div>
        )}
        {step < 6 && (
          <div className="form-page__container">
            <FormLayout
              step={step}
              user={user}
              url={loaderData}
            >
                <div className="form-layout__data">
                  {step === 1 && <Mission entity="OmMission" displayPdf={displayPdf} data={currentOM.mission} />}
                  {step === 2 && <Transports entity="OmTransports" displayPdf={displayPdf} data={currentOM.transports} />}
                  {step === 3 && <Accomodations data={currentOM.accomodations} />}
                  {step === 4 && <Advance entity="OmAdvance" displayPdf={displayPdf} data={currentOM.advance} />}
                  {step === 5 && <Other entity="OmMore" displayPdf={displayPdf} data={currentOM.more} />}
                </div>
                {step !== 3 && (
                  <div className={classNames("form-layout__viewer", { "form-layout__viewer--empty": docToShow === ''})}>
                    <div className='form-layout__viewer-pdf'>
                      <div className="form-layout__viewer-pdf__nav">
                        <p className="form-layout__viewer-pdf__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer le PDF</p>
                      </div>
                      <embed
                        className="form-layout__viewer-pdf__embed"
                        src={docToShow}
                        width="100%"
                        height="600px"
                        type="application/pdf"
                      />
                      <p className="form-layout__viewer-pdf__instruction">Veuillez sélectionner une pièce jointe à afficher.</p>
                    </div>
                  </div>
                )}
            </FormLayout>
          </div>
        )}
        {step === 6 && (
          <div className="form-page__container">
            {!omLoader && <Validation />}
            {omLoader && <p>Loading</p>}
          </div>
        )}
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
