import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

import PageTitle from '../../generics/PageTitle';
import FormSectionTitle from '../../generics/FormSectionTitle';
import RadioInput from '../OMForm/Fields/RadioInput';
import ButtonElement from '../OMForm/Fields/ButtonElement';
import Logo from '../../../assets/images/pdf.svg';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';
import FileField from '../OMForm/Fields/FileField';
import TextField from '../OMForm/Fields/TextField';
import SwitchButton from '../../generics/SwitchButton';
import TicketRequestSection from './TicketRequestSection';

const TicketRequest = () => {
  
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
  const message = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eos rem possimus expedita dolores odio qui voluptas architecto culpa nobis.'
  const id = 1
  const trainTickets = false;
  //TODO : verif train / avion

  const handleSwitch = (event) => {
    const { checked } = event.target;
    const section = document.querySelector('#passport-section');

    if (checked) {
      section.classList.remove('form__section-field--hidden');
    }
    else {
      section.classList.add('form__section-field--hidden');
    }

  }
  return (

    <main className="form-page">
      <div className="form-page__title">
        <PageTitle>Demander un déplacement</PageTitle>
        <PageTitle>Ordre de mission N° {id} </PageTitle>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {trainTickets && <FormSectionTitle>Gare</FormSectionTitle>}
        {trainTickets && <TicketRequestSection mode="Gare" ticketClass="1ère classe" register={register} />}
        {!trainTickets && <FormSectionTitle>Aéroport</FormSectionTitle>}
        {!trainTickets && <TicketRequestSection mode="Aéroport" ticketClass="Classe affaire" register={register} />}
        <FormSectionTitle>Informations transports</FormSectionTitle> 
        <div className="split-fields">
          <RadioInput
            id="subscription"
            formField="benefits"
            label="Abonnement"
            register={register}
            // handler={handleRegionClick}
          />
          <RadioInput
            id="loyalty"
            formField="benefits"
            label="Fidélité"
            register={register}
            // handler={handleRegionClick}
          />
        </div>
        <TextField 
          id="number"
          formField="number-input"
          label="Numéro de carte"
          register={register}
        />
        <TextField 
          id="type"
          formField="type-input"
          label="Type de carte"
          register={register}
        />
        <TextField 
          id="expiration"
          formField="expiration-input"
          label="Date d'expiration"
          register={register}
        />
        <FormSectionTitle>Déplacement à l'étranger</FormSectionTitle> 
          
        <SwitchButton
          register={register}
          isInForm
          handler={handleSwitch}
          formField="class-input"
          label="Déplacement à l'étranger"
        />
        
        <div id="passport-section" className='form__section form__section--documents form__section-field--hidden'>
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
        <div className="form__section-field-button">
          <ButtonElement
            type="submit"
            label="Faire la demande"          
          />
        </div>
      </form>
      <button className="form-page__container-link" type='button'>Retour à l'accueil</button>
    </main>
  );
};

TicketRequest.propTypes = {

};

export default TicketRequest;
