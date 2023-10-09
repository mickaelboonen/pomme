import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import './style.scss';

// Components
import PageTitle from 'src/components/PageTitle';
import OmVisa from './OmVisa';
import { clearMessage } from 'src/reducer/app';
import { resetOmsOnDisplay } from 'src/reducer/omManager'

const Delegation = ({ isOm }) => {  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = useLoaderData();
  const id = Number(url.searchParams.get('id'));
  // const explodedUrl = url.pathname.split('/');
  const endpoint = encodeURIComponent((isOm ? 'ordres-de-mission' : 'états-de-frais') + '-à-signer');
  const returnLink = `/gestionnaire/${endpoint}`;
  // console.log(returnLink);
  
  const { app: { apiMessage }, agent: { agent, user }, omManager: { pendingDocs } } = useSelector((state) => state);
  const currentOM = pendingDocs.find((om) => om.id === id);
  
  console.log(agent);
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
        <PageTitle>{currentOM !== undefined ? currentOM.name : "Document non trouvé"}</PageTitle>
      </div>
      {pendingDocs.length > 0 && <OmVisa user={user} data={currentOM} gest={agent} isOm={isOm} om={currentOM}/>}
      {pendingDocs.length === 0 && <Link to={returnLink}>Veuillez retourner sur le menu des ordres de mission</Link>}
    </div>
  );
};

Delegation.propTypes = {
  isOm: PropTypes.bool.isRequired,
}

export default Delegation;

// START TRANSACTION; 
// UPDATE `om` SET `type` = 'formation' WHERE id = 32;
// UPDATE `om` SET `type` = 'formation' WHERE id = 33;
// UPDATE `om` SET `type` = 'formation' WHERE id = 34;
// UPDATE `om` SET `type` = 'formation' WHERE id = 86;
// UPDATE `om` SET `type` = 'formation' WHERE id = 104;
// UPDATE `om` SET `type` = 'formation' WHERE id = 105;
// UPDATE `om` SET `type` = 'formation' WHERE id = 116;
// UPDATE `om` SET `type` = 'formation' WHERE id = 118;
// UPDATE `om` SET `type` = 'formation' WHERE id = 119;
// UPDATE `om` SET `type` = 'formation' WHERE id = 134;
// UPDATE `om` SET `type` = 'formation' WHERE id = 134;
// UPDATE `om` SET `type` = 'formation' WHERE id = 144;
// UPDATE `om` SET `type` = 'formation' WHERE id = 151;
// UPDATE `om` SET `type` = 'formation' WHERE id = 153;
// UPDATE `om` SET `type` = 'formation' WHERE id = 154;
// UPDATE `om` SET `type` = 'formation' WHERE id = 155;
// UPDATE `om` SET `type` = 'formation' WHERE id = 156;
// UPDATE `om` SET `type` = 'formation' WHERE id = 157;
// UPDATE `om` SET `type` = 'formation' WHERE id = 158;
// COMMIT ;

