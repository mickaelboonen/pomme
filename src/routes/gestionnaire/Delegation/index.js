import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import './style.scss';

// Components
import PageTitle from 'src/components/PageTitle';
import OmVisa from './OmVisa';
import { clearMessage } from 'src/reducer/app';
import { resetOmsOnDisplay } from 'src/reducer/omManager'

const Delegation = () => {  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = useLoaderData();
  const id = Number(url.searchParams.get('id'));
  const explodedUrl = url.pathname.split('/');
  const returnLink = `/${explodedUrl[1]}/${explodedUrl[2]}/documents-a-signer`;
  // console.log(returnLink);
  
  const { app: { apiMessage }, agent: { agent, user }, omManager: { pendingDocs } } = useSelector((state) => state);
  const currentOM = pendingDocs.find((om) => om.id === id);
  
  useEffect(() => {
    if (apiMessage.response && apiMessage.response.status === 200) {
      setTimeout(() => {
        dispatch(clearMessage());
        dispatch(resetOmsOnDisplay())
      }, "950")
      setTimeout(() => {
        navigate(returnLink);
        
      }, "1000")
    }
  }, [apiMessage]);

  return (
    <div className='form-container'>
      <div className="form-page__title">
        <PageTitle>{currentOM !== undefined ? currentOM.name : "OM non trouvé"}</PageTitle>
      </div>
      {pendingDocs.length > 0 && <OmVisa user={user} data={currentOM} agent={agent} />}
      {pendingDocs.length === 0 && <Link to={returnLink}>Veuillez retourner sur le menu des ordres de mission</Link>}
    </div>
  );
};

export default Delegation;
