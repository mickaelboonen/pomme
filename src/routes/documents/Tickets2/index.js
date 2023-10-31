import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import { useLoaderData, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import LoaderCircle from 'src/components/LoaderCircle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FileField from 'src/components/Fields/FileField';
import TextareaField from 'src/components/Fields/TextareaField';

import { getSavedFileName } from 'src/selectors/formDataGetters';

import { clearMessage } from 'src/reducer/app';

import './style.scss';

import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';
// import  { getDDMMYY }from 'src/selectors/dateFunctions';

const Tickets2 = () => {  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const url = useLoaderData();

  const { omForm :{ omLoader},
    app: { apiMessage },
    agent: { oms },
    docs: {currentPassport, loader}
  } = useSelector((state) => state);
  const id = Number(url.searchParams.get('om'));

  const { transports, mission } = oms.find((om) => om.id === id);

  console.log(currentPassport);
  const {
    register, handleSubmit, watch,
    setValue,  setError, clearErrors,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (currentPassport.hasOwnProperty('url')) {
      setValue('savedPassport', true)
    }
  }, [currentPassport])


  const onSubmit = (data) => {
    console.log('data = ', data);
    // console.log();
  }



  // useEffect(() => {
  //   if (apiMessage.response) {
  //     dispatch(clearMessage());
  //   }
  // }, [location.search])



  
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

  return (
    <>
      {/* <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} /> */}
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Demande de Billets pour une mission</PageTitle>
        </div>
        {loader && <LoaderCircle />}
        {!loader && (
        <form className="form" style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
        <div style={{backgroundColor: '#fff', padding: '1rem', margin: '1rem'}}>
          <FormSectionTitle>En-tête</FormSectionTitle>
          <p>Bonjour Madame, Monsieur</p>
          <p></p>
          <p>Dans l'éventualité où les billets de train en première classe seraient moins chers que ceux de la seconde classe, merci de privilégier les billets de la première classe sans tenir compte de la classe renseignée dans les modalités de la mission.</p>
        </div>
        <div style={{backgroundColor: '#fff', padding: '1rem', margin: '1rem'}}>
          <FormSectionTitle>Modalité de la mission validée par l'ordonnateur</FormSectionTitle>
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
        <div style={{backgroundColor: '#fff', padding: '1rem', margin: '1rem'}}>
          <FormSectionTitle>Faites votre demande</FormSectionTitle>
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
      </div>
    </>
  );
};

export default Tickets2;
