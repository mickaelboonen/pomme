import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaDownload, FaEye, FaEyeSlash } from "react-icons/fa";

import * as DOMPurify from 'dompurify';

import { useLoaderData, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import LoaderCircle from 'src/components/LoaderCircle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FileField from 'src/components/Fields/FileField';
import TextareaField from 'src/components/Fields/TextareaField';
import InputValueDisplayer from 'src/routes/gestionnaire/DocValidation/InputValueDisplayer';
import HiddenField from 'src/components/Fields/HiddenField';

import { getSavedFileName } from 'src/selectors/formDataGetters';

import { clearMessage } from 'src/reducer/app';
import { requestTickets, requestTicketsWithFile } from 'src/reducer/otherDocuments';

import './style.scss';

import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';

import TextEditor from '../../../components/TextEditor';
import Rules from 'src/components/Rules'
// -------------------------------------

const Tickets2 = () => {  

  const dispatch = useDispatch();
  const url = useLoaderData();

  const { omForm :{ omLoader},
    app: { apiMessage },
    agent: { oms, user, agent },
    docs: {currentPassport, programs, loader, pv}
  } = useSelector((state) => state);
  
  const id = Number(url.searchParams.get('om'));

  const { transports, mission } = oms.find((om) => om.id === id);

  const {
    register, handleSubmit, watch,
    setValue,  setError, clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transportsMeans: []
    }
  });


  useEffect(() => {
    if (currentPassport.hasOwnProperty('url')) {
      setValue('savedPassport', true)
    }
  }, [currentPassport])


  const onSubmit = (data) => {

    let errorCount = 0;
    // console.log(currentPassport)
    data.transports = setTransportsForEmail(data.transportsMeans);
    data.user = user;
    data.pv = pv.id;
    data.agent = agent.gender + ' ' + agent.firstname + ' ' + agent.lastname.toUpperCase();
    data.om = id;

    const tickets = document.querySelector('.ql-editor').innerHTML;
    let ticketsWithTags = tickets.replaceAll('&lt;', '<').replaceAll('&gt;', '>');

    const ticketsWithAllowedTags = DOMPurify.sanitize(ticketsWithTags, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
    });

    data.tickets = ticketsWithAllowedTags;

    if (data.tickets === '<p><br></p>' || data.tickets === '<p> </p>') {
      setError('tickets', { type: 'custom', message: "Veuillez renseigner votre demande de billets à destination de l'Agence."});
      errorCount++;
    }

    if (errorCount > 0) {
      return;
    }

    if (data.savedPassport) {
      data.passport = currentPassport.id;
      delete data.savedPassport;
    }

    if (window.confirm('You sure ?')) {
      console.log('data = ', data);

      if (data.passport instanceof File) {
        dispatch(requestTicketsWithFile(data))

      }
      else {
        dispatch(requestTickets(data))
      }
  
    }

  }

  const [viewer, setViewer] = useState('');
  const handleClick = () => {
    viewer === '' ? setViewer(pv.file) : setViewer('');
  }
  
  let type = [];
  transports.transport_type.forEach((t) => {
    let means = '';
    if (t === 'plane') {
      means += 'Avion, ';
      const planeClass = transports.transport_class.find((c) =>  c.includes('eco') || c.includes("business"));
      means += planeClass === 'eco-class' ? 'en classe économique.': 'en classe affaires.';
    }
    if (t === 'train') {
      means += 'Train.';
      const trainClass = transports.transport_class.find((c) =>  c.includes('first') || c.includes("second"));
      means += trainClass === 'first-class' ? 'en première classe.': 'en seconde classe.';
    
    }
    type.push(means);

  })

  const filename = currentPassport ? getSavedFileName(currentPassport.url) : '';
  const savedPassport = watch('savedPassport');

  const handlePassport = () => {
    clearErrors('passport');
  }

  const setTransportsForEmail = (transports) => {
    let train = '';
    let plane = '';
    transports.forEach((t) => {
      if (t === 'train') {
        train = 'de train';
      }
      if (t === 'plane') {
        plane = "d'avion";
      }
    })

    return transports.length === 2 ? train + ' et ' + plane : train + plane;
  }
  return (
    <>
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Demande de Billets pour une mission</PageTitle>
        </div>
        {loader && <LoaderCircle />}
        {(!loader && pv) && (
          <form className="form" style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
            <div className='form__section'>
              <FormSectionTitle>Profil Voyageur</FormSectionTitle>
              <div className="my-documents__files-buttons" onClick={handleClick}>
                <p className='my-documents__files-buttons-label'>Controler le profil Voyageur : </p>
                {viewer === '' ? <FaEye className='my-documents__files-buttons-icon my-documents__files-buttons-icon--colored'/> : <FaEyeSlash className='my-documents__files-buttons-icon my-documents__files-buttons-icon--colored'/>}
              </div>
              <p className='file-manager__message'>Dans le cas où les informations du Profil Voyageur ne seraient plus correctes. Merci de mettre à jour votre profil en cliquant sur ce lien : <Link to="/utilisateur/mes-documents/profil-voyageur"><span style={{textDecoration: 'underline', display: 'block', marginTop: '0.5rem'}}>Aller sur le profil voyageur</span></Link></p>
              {viewer !== '' && (
                <div style={{height: '600px', marginBottom: '1rem'}}>
                  <embed
                    className="form-layout__viewer-pdf__embed"
                    src={viewer}
                    width="100%"
                    height="1200px"
                    type="application/pdf"
                  />
                </div>
              )}
            </div>
            <div className='form__section'>
              <FormSectionTitle>Faites votre demande</FormSectionTitle>
              <div className="form__section-field">
                <label>Type.s de transports voulus</label>
                <CheckboxInput
                  register={register}
                  formField="transportsMeans"
                  handler={() => {}}
                  id="train"
                  label="Train"
                />  
                <CheckboxInput
                  register={register}
                  formField="transportsMeans"
                  handler={() => {}}
                  id="plane"
                  label="Avion"
                />  
              </div>
              <InputValueDisplayer
                label="Format à respecter pour les billets (une ligne par billet svp) :"
                value="[AVION/TRAIN] - [ALLER/RETOUR] : Départ de ______ le __/__/____ à __h__. Arrivée à _______."
              />

              <p className='form__section-field-label'>Demande de billets</p>
              <TextEditor clearErrors={clearErrors} error={errors} />
              <p className='file-manager__message'>Dans l'éventualité où les billets de train en première classe seraient moins chers que ceux de la seconde classe, merci de privilégier les billets de la première classe sans tenir compte de la classe renseignée dans les modalités de la mission. Une demande de dérogation sera générée automatiquement lors de la validation de la commande.</p>
              {errors.tickets && <p className='form__section-field-error form__section-field-error--open' id='tickets-message'>{errors.tickets.message}</p>}

            </div>
            <div className='form__section'>
              <FormSectionTitle>Rappel des Modalités de la mission validée par l'ordonnateur</FormSectionTitle>
              <p>Transports demandés pour la mission : {type.map((t) => t + ' ')} </p>
              <p style={{marginTop: '1rem'}}>Dates de la mission : du {getDDMMYYDate(new Date(mission.departure))} au {getDDMMYYDate(new Date(mission.comeback))}</p>
              <p style={{marginTop: '1rem', marginBottom: '1rem'}}>Lieu{mission.addresses.length > 1 ? 'x': ''} de la mission : {mission.addresses.map((a) => a.city + ' - ')}</p>
            </div>

            {mission.region !== 'métropole' && (
              <div className="form__section">
                <FormSectionTitle>Passeport</FormSectionTitle>
                <div className="form__section-field">
                  <CheckboxInput
                    register={register}
                    formField="savedPassport"
                    handler={handlePassport}
                    id="saved-rib-field"
                    label="Utiliser le passeport enregistré dans mon profil"
                  />
                </div>
                {!savedPassport && (
                  <FileField 
                    register={register}
                    formField="passport"
                    id="rib-field"
                    error={errors.passport}
                    setValue={setValue}
                    fileName={filename}
                  />
                )}
              </div>
            )}

            <div>
              <button>Valider</button>
            </div>
          </form>
        )}
        {(!loader && !pv) && (
          <div className='form'>
            <div className='form__section'>
              <FormSectionTitle>Profil Voyageur</FormSectionTitle>
              Vous n'avez pas encore créé votre Profil Voyageur, veuillez vous rendre à l'adresse suivante pour enregistrer vos informations de voyage.
              <div className='my-documents__files-buttons'>
                <Link to="/utilisateur/mes-documents/profil-voyageur">Aller sur le Profil Voyageur</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tickets2;
