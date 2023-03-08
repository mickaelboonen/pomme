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
import { selectEfData } from 'src/reducer/ef';


import './style.scss';
import Modal from '../../../components/Modal';


const MyDocuments = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const loaderData = useLoaderData();
  

  const { omForm: { currentOM, nextOMTarget, OMTabs, userOms, dataToSelect, omLoader },
    ef: { nextEfTarget, currentEf, efPerSelectedStatus, efLoader, EFTabs },
    app: { isModalOpen, agent}
  } = useSelector((state) => state);
  
  useEffect(() => {
    if (nextOMTarget !== '') {
      dispatch(toggleModal());
      dispatch(clearOMTarget());
      navigate(nextOMTarget);
    }
  }, [nextOMTarget])
  
  const pageData = (path, user) => {
    let pageData = {};

    if (path.includes('ordres-de-mission')) {
      pageData.isOm = true;
      pageData.title = 'Ordres de Mission de ' + user;
      pageData.slug = 'ordre-de-mission'
    }
    else {
      pageData.isOm = false;
      pageData.title = `États de Frais de ${user}`;
      pageData.slug = 'état-de-frais'
    }

    return pageData;
  }

  const { isOm, title, slug } = pageData(location.pathname, params.slug);
  
  

  /**
   * Toggles the section according to the clicked tab
   * @param object event 
   */
   const displayWantedSection = (event) => {

    if (isOm) {
      dispatch(selectOmData(event.currentTarget.id));
    }
    else {
      dispatch(selectEfData(event.currentTarget.id));
    }
  }

  const handleClickOnNewOM = () => {
    dispatch(toggleModal())
  }

  const steps = [
    {
      name: 'mission',
      status: (currentOM.hasOwnProperty('mission') && currentOM.mission.status) ? currentOM.mission.status : false
    },
    {
      name: 'transports',
      status: (currentOM.hasOwnProperty('transports') && currentOM.transports.status) ? currentOM.transports.status : false
    },
    {
      name: 'hébergement',
      status: (currentOM.hasOwnProperty('accomodations') && currentOM.accomodations.status) ? currentOM.accomodations.status : false
    },
    {
      name: 'avance',
      status: (currentOM.hasOwnProperty('advance') && currentOM.advance.status) ? currentOM.advance.status : false
    },
    {
      name: 'signature',
      status: (currentOM.hasOwnProperty('signature') && currentOM.signature.status) ? currentOM.signature.status : false
    },
  ]

  return (
    <main className="my-documents">
      <PageTitle>{title}</PageTitle>
      <div className="my-documents__button">
        <button type="button" onClick={handleClickOnNewOM}>NOUVEAU</button>
      </div>
      {isOm && <Tabs tabs={OMTabs} handler={displayWantedSection} />}
      {!isOm && <Tabs tabs={EFTabs} handler={displayWantedSection} />}
      {isOm && <NewSection data={dataToSelect} steps={steps} currentDoc={currentOM} loader={omLoader} isOm />}
      {!isOm && <NewSection data={efPerSelectedStatus} steps={steps} currentDoc={currentEf} loader={efLoader} />}
      <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
      {isModalOpen && <Modal target={slug.replace(/-/g, ' ')} user={params.slug} userOms={userOms} agent={agent} />}
    </main>
  );
};

MyDocuments.propTypes = {

};

export default MyDocuments;
