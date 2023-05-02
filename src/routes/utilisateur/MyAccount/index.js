import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaCar,
  FaCreditCard,
  FaFilePdf,
  FaIdCard,
  FaPassport,
  FaSignature,
  FaPlaneDeparture,
  FaTrain,
  FaTaxi
} from "react-icons/fa";

import './style.scss';

// Components
import FileManager from './FileManager';
import OneFileForm from 'src/components/OneFileForm';
import ApiResponse from 'src/components/ApiResponse';
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Actions
import { clearMessage } from 'src/reducer/app';

const MyAccount = () => {
  
  const dispatch = useDispatch();

  const {docs: { isModalOpen, agentDocs },
  app: { apiMessage },
  agent: { user },
    vehicle: { vehicles },
  } = useSelector((state) => state);


  const docs = {
    cni: agentDocs.find((doc) => doc.type === 'cni'),
    passport: agentDocs.find((doc) => doc.type === 'passport'),
    signature: agentDocs.find((doc) => doc.type === 'signature'),
    rib: agentDocs.find((doc) => doc.type === 'rib'),
    drivingLicense: agentDocs.find((doc) => doc.type === 'driving-license'),
    insurance: agentDocs.find((doc) => doc.type === 'insurance'),
    registration: agentDocs.find((doc) => doc.type === 'registration'),
  }
  
  useEffect(() => {
    dispatch(clearMessage())
  }, []);
  
  return (
  <main className="my-documents">
    <PageTitle>Pièces justificatives de {user}</PageTitle>
    <div className='form'>
      <div className='form__section'>
        <FormSectionTitle>Identité</FormSectionTitle>

        <FileManager
          icon={<FaIdCard
            className='file-displayer__icon-container-icon'
          />}
          id="cni"
          label="CNI"
          file={docs.cni}
          handler={null}
          user={user}
        />
        <FileManager
          icon={<FaPassport
            className='file-displayer__icon-container-icon'
          />}
          id="passport"
          label="Passeport"
          file={docs.passport}
          handler={null}
          user={user}
        />
        <FileManager
          icon={<FaSignature
            className='file-displayer__icon-container-icon'
          />}
          id="signature"
          label="Signature"
          file={docs.signature}
          handler={null}
          user={user}
        />
        <FileManager
          icon={<FaCreditCard
            className='file-displayer__icon-container-icon'
          />}
          id="rib"
          label="RIB"
          file={docs.rib}
          handler={null}
          user={user}
        />
      </div>
      
      {user === 'mboone01' && (
        <div className='form__section'>
          <FormSectionTitle>Demandes permanentes</FormSectionTitle>

          <FileManager
            icon={<FaCar
              className='file-displayer__icon-container-icon'
            />}
            id="permanent-car-authorization"
            label="Autorisation d'utilisation de véhicule"
            file={docs.permanentCarAuthorization}
            handler={null}
            user={user}
          />

          <FileManager
            icon={<FaTrain
              className='file-displayer__icon-container-icon'
            />}
            id="permanent-train-dispensation"
            label="Dérogation 1ère classe en train"
            file={docs.permanentTrainDispensation}
            handler={null}
            user={user}
          />

          <FileManager
            icon={<FaPlaneDeparture
              className='file-displayer__icon-container-icon'
            />}
            id="permanent-plane-dispensation"
            label="Dérogation classe affaires en avion"
            file={docs.permanentPlaneDispensation}
            handler={null}
            user={user}
          />
          <FileManager
            icon={<FaTaxi
              className='file-displayer__icon-container-icon'
            />}
            id="permanent-taxi-dispensation"
            label="Dérogation pour le taxi"
            file={docs.permanentTaxiDispensation}
            handler={null}
            user={user}
          />
        </div>
      )}
      
      <div className='form__section'>
        <FormSectionTitle>Véhicules</FormSectionTitle>

        <FileManager
          icon={<FaFilePdf
            className='file-displayer__icon-container-icon'
          />}
            id="driving-license"
          label="Permis de conduire"
          file={docs.drivingLicense}
          handler={null}
          user={user}
        />
      </div>

      <div className='form__section'>
        <FileManager
          icon={<FaCar
            className='file-displayer__icon-container-icon'
          />}
          id="cars"
          label="Mes véhicules enregistrés"
          filename=""
          handler={null}
          user={user}
          needsSelect
          data={vehicles}
        />
      </div>
    </div>
    <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
    {isModalOpen && <OneFileForm />}
  </main>
);}

MyAccount.propTypes = {

};

export default MyAccount;
