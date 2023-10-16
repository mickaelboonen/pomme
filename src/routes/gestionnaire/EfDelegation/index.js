import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import './style.scss';

// Components
import PageTitle from 'src/components/PageTitle';
import Visa from './Visa';
import { clearMessage } from 'src/reducer/app';
import { resetOmsOnDisplay } from 'src/reducer/omManager'

const EfDelegation = ({ isOm }) => {  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = useLoaderData();
  const id = Number(url.searchParams.get('id'));
  // const explodedUrl = url.pathname.split('/');
  const endpoint = encodeURIComponent((isOm ? 'ordres-de-mission' : 'états-de-frais') + '-à-signer');
  const returnLink = `/gestionnaire/${endpoint}`;
  // console.log(returnLink);
  
  const { app: { apiMessage }, agent: { agent, user }, omManager: { pendingDocs }, tmp: { loader } } = useSelector((state) => state);
  const currentEf = pendingDocs.find((ef) => ef.id === id);

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

  // console.log(agent);
  // console.log("----------------------------------------------------------------------");
  return (
    <div className='form-container'>
      <div className="form-page__title">
        <PageTitle>{currentEf !== undefined ? currentEf.name : "Document non trouvé"}</PageTitle>
      </div>
      {(pendingDocs.length > 0 && !loader) && <Visa user={user} data={currentEf} gest={agent} isOm={isOm} ef={currentEf}/>}
      {loader && <p>Donnée en cours de chargement</p>}
      {pendingDocs.length === 0 && <Link to={returnLink}>Veuillez retourner sur le menu des ordres de mission</Link>}
    </div>
  );
};

EfDelegation.propTypes = {
  isOm: PropTypes.bool.isRequired,
}

export default EfDelegation;

