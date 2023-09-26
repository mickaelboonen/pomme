import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

import './style.scss';

// Components
import Other from './Other';
import Mission from './Mission';
import StagesAndRib from './StagesAndRib';
import PdfReader from '../PdfReader';
import Validation from './Validation';
import FormLayout from './FormLayout';
import Transports from './Transports';
import Accomodations from './Accomodations';
import PageTitle from 'src/components/PageTitle';
import ThreadAsTabs from 'src/components/ThreadAsTabs';
import LoaderCircle from 'src/components/LoaderCircle';

// Actions
import { clearMessage } from 'src/reducer/app';
import { resetOmsOnDisplay } from 'src/reducer/omManager';


const EfValidation = () => {  
  const location = useLocation();
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  const navigate = useNavigate();


  const { omForm : { omLoader, currentOM},
    app: { apiMessage },
    agent: { user },
    omManager: { pendingDocs, efSteps, loader}
  } = useSelector((state) => state);

  
  useEffect(() => {
    console.log(apiMessage);
    if (apiMessage.response && apiMessage.response.status === 200) {
      setTimeout(() => {
        dispatch(clearMessage());
        dispatch(resetOmsOnDisplay());
      }, "950")
      setTimeout(() => {
        const explodedUrl =  loaderData.pathname.split('/');
        navigate(`/${explodedUrl[1]}/${explodedUrl[2]}/${encodeURIComponent('états-de-frais-à-signer')}`);
        
      }, "1000")
    }
  }, [apiMessage]);
  
  useEffect(() => {
    if (apiMessage.response) {
      dispatch(clearMessage());
    }
  }, [location.search])

  const step = Number(loaderData.searchParams.get('etape'));
  const id = Number(loaderData.searchParams.get('id'));
  // console.log(pendingDocs, id);
  const currentEf = pendingDocs.find((ef) => ef.id === id);
  const [docToShow, setDocToShow] = useState('');

  const displayPdf = (url) => {
    setDocToShow(url);
  }

  const toggleViewer = () => {
    setDocToShow('')
  }
  
  return (
    <>
      <ThreadAsTabs step={step} tabs={efSteps} urlData={loaderData} />
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>{currentEf !== undefined ? currentEf.name : 'Document validé'}</PageTitle>
        </div>
        {(currentEf === undefined  || loader) && (
          <div className="form-page__container">
            <LoaderCircle />
          </div>
        )}
        {(step < 5 && !loader )&& (
          <div className="form-page__container">
            <FormLayout
              step={step}
              user={user}
              url={loaderData}
              doc={currentEf}
            >
              <div className="form-layout__data">
                {step === 1 && <Mission entity="EfMission" displayPdf={displayPdf} ef={currentEf}  />}
                {step === 2 && <Transports entity="EfTransports" displayPdf={displayPdf} data={currentEf.transports} />}
                {step === 3 && <Accomodations entity="EfAccomodations" displayPdf={displayPdf} missionRegion={currentEf.mission.region} data={currentEf.accomodations} />}
                {step === 4 && <StagesAndRib entity="EfRib" displayPdf={displayPdf} rib={currentEf.rib} stages={currentEf.stages}  />}
              </div>
              <PdfReader docToShow={docToShow} toggleViewer={toggleViewer} />
            </FormLayout>
          </div>
        )}
        {step === 5 && (
          <div className="form-page__container">
            {!loader && <Validation data={currentEf} />}
            {loader && <p>Données en cours de chargement</p>}
          </div>
        )}
      </div>
    </>
  );
};

export default EfValidation;
