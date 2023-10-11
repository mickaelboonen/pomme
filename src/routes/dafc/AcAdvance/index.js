import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

// import './style.scss';

// Components
import PageTitle from 'src/components/PageTitle';
import AdvanceVisa from './AdvanceVisa';
import { clearMessage } from 'src/reducer/app';
import { resetOmsOnDisplay } from 'src/reducer/omManager'

const AcAdvance = ({ isOm }) => {  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = useLoaderData();
  const id = Number(url.searchParams.get('id'));
  // const explodedUrl = url.pathname.split('/');
  // const endpoint = encodeURIComponent((isOm ? 'ordres-de-mission' : 'états-de-frais') + '-à-signer');
  // const returnLink = `/gestionnaire/${endpoint}`;
  
  const { app: { apiMessage }, agent: { agent, user }, dafc: { pendingDocs }, tmp: { loader } } = useSelector((state) => state);

  const om = pendingDocs.find((om) => om.id === id);
  
  useEffect(() => {
    if (apiMessage.response && apiMessage.response.status === 200) {
      setTimeout(() => {
        dispatch(clearMessage());
        dispatch(resetOmsOnDisplay())
      }, "950")
      setTimeout(() => {
        navigate("/dafc/demandes-d-avance");
        
      }, "1000")
    }
  }, [apiMessage]);

  return (
    <div className='form-container'>
      <div className="form-page__title">
        <PageTitle>{om !== undefined ? om.name : "Document non trouvé"}</PageTitle>
      </div>
      {(pendingDocs.length > 0 && !loader) && <AdvanceVisa user={user} data={om} gest={agent} isOm={isOm} om={om}/>}
      {(pendingDocs.length > 0 && loader) && <p>Donnée en cours de chargement</p>}
      {pendingDocs.length === 0 && <Link to="/dafc/demandes-d-avance">Veuillez retourner sur le menu des ordres de mission</Link>}
    </div>
  );
};

AcAdvance.propTypes = {
  // isOm: PropTypes.bool.isRequired,
}

export default AcAdvance;
