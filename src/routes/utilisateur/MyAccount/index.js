import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

import './style.scss';
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import FileField from 'src/components/Fields/FileField';
import SelectField from 'src/components/Fields/SelectField';
import Logo from '../../../assets/images/pdf.svg';
import { Link, useNavigate } from 'react-router-dom';

const MyAccount = () => {
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
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <FormSectionTitle>Identité</FormSectionTitle>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <FileField
            register={register}
            formField="identity-card"
            id="cni"
            label="CNI"
            placeholder="Votre carte d'identité"
          />
        </div>
        <div className='form__section-half'>
          <img src={Logo} alt="" />
          <p>{'Nom du fichier'}</p>

        </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <FileField
            register={register}
            formField="passport"
            id="passport"
            label="Passeport"
            placeholder="Votre passeport"
          />
        </div>
        <div className='form__section-half'>
          <img src={Logo} alt="" />
          <p>{'Nom du fichier'}</p>

        </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <FileField
            register={register}
            formField="signature"
            id="signature"
            label="Votre signature personnelle"
            placeholder="Votre signature personnelle"
          />
        </div>
        <div className='form__section-half'>
          <img src={Logo} alt="" />
          <p>{'Nom du fichier'}</p>

        </div>
      </div>
      <FormSectionTitle>Véhicules</FormSectionTitle>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <FileField
            register={register}
            formField="driving-license"
            id="driving-license"
            label="Permis de conduire"
            placeholder="Votre permis de conduire"
          />
        </div>
        <div className='form__section-half'>
          <img src={Logo} alt="" />
          <p>{'Nom du fichier'}</p>

        </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <FileField
            register={register}
            formField="registration"
            id="car-registration-document"
            label="Carte grise"
            placeholder="Votre carte grise"
          />
        </div>
        <div className='form__section-half'>
          <img src={Logo} alt="" />
          <p>{'Nom du fichier'}</p>

        </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <FileField
            register={register}
            formField="insurance"
            id="car-insurance"
            label="Votre attestation d'assurance"
            placeholder="Votre attestation d'assurance"
          />
        </div>
        <div className='form__section-half'>
          <img src={Logo} alt="" />
          <p>{'Nom du fichier'}</p>

        </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <SelectField
            register={() => {}}
            data={['1', '2', '3']}
            blankValue="Aucun véhicule sélectionné"
            formField="cars"
            id="input-cars"
            label="Vos véhicules enregistrés"
            placeholder="Vos véhicules enregistrés"
          />
        </div>
        <div className='form__section-half'>
          <button type='button' onClick={handleClick} id="add">Add</button>
          <button type='button' onClick={handleClick} id="edit">Edit</button>
          <button type='button' onClick={handleClick} id="delete">Delete</button>
        </div>
      </div>
      <div className='form__section-container-button'>
        <button id="documents-validation">Valider les changements</button>
      </div>

    </form>
    <button className="form-page__container-link" type='button'>Retour</button>
  </main>
);}

MyAccount.propTypes = {

};

export default MyAccount;
