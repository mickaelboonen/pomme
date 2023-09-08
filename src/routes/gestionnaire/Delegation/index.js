import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import './style.scss';

// Components
import PageTitle from 'src/components/PageTitle';
import PdfMessage from '../PdfMessage';
import OmVisa from './OmVisa';
import { clearMessage } from 'src/reducer/app';
import { resetOmsOnDisplay } from 'src/reducer/omManager'

const Delegation = () => {  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = Number(useLoaderData().searchParams.get('id'));
  const url = useLoaderData();
  
  const { app: { apiMessage }, agent: { agent, user }, omManager: { pendingDocs, showPdfMessage } } = useSelector((state) => state);
  const currentOM = pendingDocs.find((om) => om.id === id);
  
  useEffect(() => {
    if (apiMessage.response && apiMessage.response.status === 200) {
      setTimeout(() => {
        dispatch(clearMessage());
        dispatch(resetOmsOnDisplay())
      }, "950")
      setTimeout(() => {
        const explodedUrl =  url.pathname.split('/');
        navigate(`/${explodedUrl[1]}/${explodedUrl[2]}/documents-a-signer`);
        
      }, "1000")
    }
  }, [apiMessage]);
  return (
    <div className='form-container'>
      <div className="form-page__title">
        <PageTitle>{currentOM !== undefined ? currentOM.name : 'OM validé'}</PageTitle>
      </div>
      <OmVisa user={user} data={currentOM} agent={agent} />
      {/* {showPdfMessage && <PdfMessage om={currentOM} />} */}
    </div>
  );
};

export default Delegation;
