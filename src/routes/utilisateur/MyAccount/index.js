import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import './style.scss';
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import FileField from 'src/components/Fields/FileField';
import SelectField from 'src/components/Fields/SelectField';
import Logo from '../../../assets/images/pdf.svg';
import { Link, useNavigate } from 'react-router-dom';


import { FaCar, FaCreditCard, FaFilePdf, FaEdit,FaTrash,FaDownload,FaUpload, FaIdCard, FaPassport, FaSignature } from "react-icons/fa";
import FileManager from './FileManager';
import OneFileForm from '../../../components/OneFileForm';

const MyAccount = () => {
  

  const { omForm: { currentOM, nextOMTarget, OMTabs, userOms, dataToSelect },
    efForm: { nextEFTarget, EFTabs },
    docs: { isModalOpen }
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const userName = 'mboone01';

  const handleClick = (event) => {
    const { id } = event.target;
    const selectedVehicle = document.querySelector('#input-cars').value;

    if (id === "add") {
      
      navigate(`/utilisateur/${userName}/mes-documents/ajouter-un-véhicule`);
      return;
    }
    if (selectedVehicle !== "") {
      
      if (id === "edit") {
        navigate(`/utilisateur/${userName}/mes-documents/modifier-un-véhicule/${selectedVehicle}`);
      }
      else if (id === "delete") {
        
      }
    }
    else {
      window.alert(`Vous n'avez pas sélectionner de véhicule à ${id}`);
    }
  }
  
  return (
  <main className="my-documents">
    <PageTitle>Pièces justificatives de {'mboone01'}</PageTitle>
    <div className='form'>
      <div className='form__section'>
        <FormSectionTitle>Identité</FormSectionTitle>

        <FileManager
          icon={<FaIdCard
            className='file-displayer__icon-container-icon'
          />}
          id="cni"
          label="CNI"
          filename=""
          handler={null}
        />
        <FileManager
          icon={<FaPassport
            className='file-displayer__icon-container-icon'
          />}
          id="passport"
          label="Passeport"
          filename=""
          handler={null}
        />
        <FileManager
          icon={<FaSignature
            className='file-displayer__icon-container-icon'
          />}
          id="signature"
          label="Signature"
          filename=""
          handler={null}
        />
        <FileManager
          icon={<FaCreditCard
            className='file-displayer__icon-container-icon'
          />}
          id="rib"
          label="RIB"
          filename=""
          handler={null}
        />
      </div>
      
      <div className='form__section'>
        <FormSectionTitle>Véhicules</FormSectionTitle>

        <FileManager
          icon={<FaFilePdf
            className='file-displayer__icon-container-icon'
          />}
            id="driving-license"
          label="Permis de conduire"
          filename=""
          handler={null}
        />
        <FileManager
          icon={<FaFilePdf
            className='file-displayer__icon-container-icon'
          />}
          id="registration"
          label="Carte grise"
          filename=""
          handler={null}
        />
        <FileManager
          icon={<FaFilePdf
            className='file-displayer__icon-container-icon'
          />}
          id="insurance"
          label="Attestation d'assurance"
          filename=""
          handler={null}
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
          needsSelect
          data={['1', '2', '3']}
        />
      </div>
    </div>
    <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
      {isModalOpen && <OneFileForm />}
      {isModalOpen && <p>LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>}
      
  </main>
);}

MyAccount.propTypes = {

};

export default MyAccount;
