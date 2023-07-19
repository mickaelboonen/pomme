import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';

import './style.scss';

// Components
import Other from './Other';
import Mission from './Mission';
import Advance from './Advance';
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

const OMForm = () => {  
  const location = useLocation();
  const dispatch = useDispatch();
  const loaderData = useLoaderData();

  const { omForm : { omLoader},
    app: { apiMessage },
    agent: { user },
    omManager: { pendingDocs, omSteps}
  } = useSelector((state) => state);
  
  useEffect(() => {
    if (apiMessage.response) {
      dispatch(clearMessage());
    }
  }, [location.search])

  const step = Number(loaderData.searchParams.get('etape'));
  const id = Number(loaderData.searchParams.get('id'));

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
      <ThreadAsTabs step={step} tabs={omSteps} isOm urlData={loaderData} />
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
              doc={currentOM}
            >
                <div className="form-layout__data">
                  {step === 1 && <Mission entity="OmMission" displayPdf={displayPdf} data={currentOM.mission} />}
                  {step === 2 && <Transports entity="OmTransports" displayPdf={displayPdf} data={currentOM.transports} />}
                  {step === 3 && <Accomodations data={currentOM.accomodations} />}
                  {step === 4 && <Advance entity="OmAdvance" displayPdf={displayPdf} data={currentOM.advance} />}
                  {step === 5 && <Other entity="OmMore" displayPdf={displayPdf} data={currentOM.more} />}
                </div>
                {(step === 1 || step === 2)  && (
                  <PdfReader docToShow={docToShow} toggleViewer={toggleViewer} />
                )}
                {(step === 4 && currentOM.advance.advance)  && (
                  <PdfReader docToShow={docToShow} toggleViewer={toggleViewer} />
                )}
                {(step === 5 && currentOM.more.files.length > 0)  && (
                  <PdfReader docToShow={docToShow} toggleViewer={toggleViewer} />
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
      </div>
    </>
  );
};

export default OMForm;
