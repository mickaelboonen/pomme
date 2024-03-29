import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

// Components
import NewSection from './NewSection';
import Tabs from 'src/components/Tabs';
import PageTitle from 'src/components/PageTitle';

import { toggleModal } from 'src/reducer/app';
import { addNewOM, clearOMTarget, selectOmData} from 'src/reducer/omForm';
import { selectEfData, clearEfTarget } from 'src/reducer/ef';

import { selectDocumentsList } from 'src/reducer/agent';


import './style.scss';
import Modal from '../../../components/Modal';


const MyDocuments = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  
  

  const { omForm: { currentOM, nextOMTarget, OMTabs, userOms, omLoader },
    ef: { nextEfTarget, currentEf, efLoader, EFTabs },
    app: { isModalOpen, apiMessage },
    agent: { agent, user, documentsList, loader, currentDoc }
  } = useSelector((state) => state);
  
  useEffect(() => {
    if (nextOMTarget !== '') {
      dispatch(toggleModal());
      dispatch(clearOMTarget());
      navigate(nextOMTarget);
    }
    else if (nextEfTarget !== '') {
      dispatch(toggleModal());
      dispatch(clearEfTarget());
      navigate(nextEfTarget);

    }
  }, [nextOMTarget, nextEfTarget])

  useEffect(() => {
    dispatch(selectDocumentsList({id: location.pathname.includes('ordres') ? 'oms' : 'efs', target: 'ec'}))
  }, [location])
  
  const pageData = (path, user) => {
    let pageData = {};

    if (path.includes('ordres-de-mission')) {
      pageData.isOm = true;
      pageData.title = 'Mes Ordres de Mission';
      pageData.slug = 'ordre-de-mission'
    }
    else {
      pageData.isOm = false;
      pageData.title = 'Mes États de Frais';
      pageData.slug = 'état-de-frais'
    }

    return pageData;
  }

  const { isOm, title, slug } = pageData(location.pathname, user);
  
  

  /**
   * Toggles the section according to the clicked tab
   * @param object event 
   */
   const displayWantedSection = (event) => {
    dispatch(selectDocumentsList({id: location.pathname.includes('ordres') ? 'oms' : 'efs', target: event.currentTarget.id}))
  }

  const handleClickOnNewOM = () => {
    dispatch(toggleModal())
  }

  let steps = [
    {
      name: 'mission',
      status: (currentDoc.hasOwnProperty('mission') && currentDoc.mission.status) ? currentDoc.mission.status : false
    },
    {
      name: 'transports',
      status: (currentDoc.hasOwnProperty('transports') && currentDoc.transports.status) ? currentDoc.transports.status : false
    },
    {
      name: 'hébergement',
      status: (currentDoc.hasOwnProperty('accomodations') && currentDoc.accomodations.status) ? currentDoc.accomodations.status : false
    },
  ]

  
  if (!isOm) {
    steps = steps.concat([
      {
        name: 'étapes',
        status: null
      },
      {
        name: 'rib',
        status: (currentDoc.hasOwnProperty('rib') && currentDoc.rib.status) ? currentDoc.rib.status : false
      },
    ])
  }
  else {
    steps = steps.concat([
      {
        name: 'avance',
        status: (currentDoc.hasOwnProperty('advance') && currentDoc.advance.status) ? currentDoc.advance.status : false
      },
      {
        name: 'autre',
        status: (currentDoc.hasOwnProperty('more') && currentDoc.more.status) ? currentDoc.more.status : false
      },
    ])
  }

  const omThatCanBeRefunded = userOms.filter((om) => om.status === 9 || om.status === 10);

  return (
    <main className="my-documents">
      <PageTitle>{title}</PageTitle>
      <div className="my-documents__button">
        <button type="button" onClick={handleClickOnNewOM}>NOUVEAU</button>
      </div>
      {isOm && <Tabs tabs={OMTabs} handler={displayWantedSection} />}
      {!isOm && <Tabs tabs={EFTabs} handler={displayWantedSection} />}
      <NewSection loader={loader} data={documentsList} user={user} steps={steps} currentDoc={currentDoc} isOm={isOm} />
      <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
      {isModalOpen && <Modal target={slug.replace(/-/g, ' ')} user={user} loader={loader} userOms={omThatCanBeRefunded} agent={agent} apiMessage={apiMessage} />}
    </main>
  );
};

MyDocuments.propTypes = {

};

export default MyDocuments;
