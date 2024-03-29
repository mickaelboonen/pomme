import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaDownload, FaEye, FaEyeSlash } from "react-icons/fa";

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
import { requestTickets } from 'src/reducer/otherDocuments';

import './style.scss';

import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';
import AddProgram from './AddProgram';
// import  { getDDMMYY }from 'src/selectors/dateFunctions';

const Tickets2 = () => {  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const url = useLoaderData();

  const { omForm :{ omLoader},
    app: { apiMessage },
    agent: { oms, user, agent },
    docs: {currentPassport, programs, loader, pv}
  } = useSelector((state) => state);
  
  const id = Number(url.searchParams.get('om'));

  const { transports, mission } = oms.find((om) => om.id === id);

  // console.log(programs);
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

    // console.log(currentPassport)
    data.transports = setTransportsForEmail(data.transportsMeans)
    data.user = user;
    data.agent = agent.firstname + ' ' + agent.lastname.toUppercase();
    data.om = id;

    if (data.savedPassport) {
      data.passport = currentPassport.id;
      delete data.savedPassport;
    }

    if (window.confirm('You sure ?')) {
      console.log('data = ', data);

      if (data.passport instanceof File) {
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
      {/* <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} /> */}
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Demande de Billets pour une mission</PageTitle>
        </div>
        {loader && <LoaderCircle />}
        {(!loader && pv) && (
          <form className="form" style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
            <div className='form__section'>
              <FormSectionTitle>Profil Voyageur</FormSectionTitle>
              <HiddenField
                register={register}
                id="pv"
                value={pv.id}
              />
              <div style={{display: 'flex'}}>
                <p>Controler le profil Voyageur :</p>
                {viewer === '' && <FaEye onClick={handleClick} style={{cursor: 'pointer'}} className='my-documents__files-buttons-icon'/>}
                {viewer !== '' && <FaEyeSlash onClick={handleClick} style={{cursor: 'pointer'}} className='my-documents__files-buttons-icon'/>}
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
            {/* <div style={{backgroundColor: '#fff', padding: '1rem', margin: '1rem'}}> */}
              {/* <FormSectionTitle>En-tête</FormSectionTitle> */}
              {/* <p>Bonjour Madame, Monsieur</p> */}
              {/* <p></p> */}
              {/* <p>Dans l'éventualité où les billets de train en première classe seraient moins chers que ceux de la seconde classe, merci de privilégier les billets de la première classe sans tenir compte de la classe renseignée dans les modalités de la mission.</p> */}
            {/* </div> */}
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
              <TextareaField
                id="tickets-field"
                label="Demande de billets"
                formField="tickets"
                register={register}
                placeholder="Veuillez renseigner votre demande de billets à destionation de l'Agence."
                rows={10}
                required="Veuillez renseigner votre demande de billets à destination de l'Agence."
                error={errors.tickets}

              />
              <InputValueDisplayer
                label="Format à respecter pour les billets (une ligne par billet svp) :"
                value="Départ …………………  le …../…../2023 à …..h…… arrivée à …………….."
              />
              {/* <HiddenField
                // id='agent'
                // register={register}
                // value={agent.firstname + ' ' + agent.lastname.toUppercase()}
              // /> */}
              {/* <HiddenField
                // id='om'
                // register={register}
                // value={id}
              // /> */}
            </div>
            <div className='form__section'>
              <FormSectionTitle>Rappel des Modalités de la mission validée par l'ordonnateur</FormSectionTitle>
              <p>Transports demandés pour la mission : </p>
              <ul>
                {type.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p style={{marginTop: '1rem'}}>Dates de la mission : </p>
              <p>du {getDDMMYYDate(new Date(mission.departure))} au {getDDMMYYDate(new Date(mission.comeback))}</p>
              <p style={{marginTop: '1rem'}}>Lieu{mission.addresses.length > 1 ? 'x': ''} de la mission :</p>
              <ul>
                {mission.addresses.map((a) => (
                  <li key={a.id}>{a.city}</li>
                ))}
              </ul>
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
