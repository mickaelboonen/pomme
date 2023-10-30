import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";

import { useLoaderData, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';
import RadioInput from 'src/components/Fields/RadioInput';

import { clearMessage } from 'src/reducer/app';

import './style.scss';
import LoaderCircle from 'src/components/LoaderCircle';
import Trip from './Trip';
import { fetchOm } from 'src/reducer/omForm';

const Tickets = () => {  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loaderData = useLoaderData();

  const {
    register, handleSubmit, watch,
    setValue,  setError,
    formState: { errors },
  } = useForm();


  const { omForm :{ omLoader},
    app: { apiMessage },
    agent: { oms },
  } = useSelector((state) => state);
  const id = Number(loaderData.searchParams.get('om'));

  const { transports } = oms.find((om) => om.id === id);
  console.log(transports);

  useEffect(() => {
    if (apiMessage.response) {
      dispatch(clearMessage());
    }
  }, [location.search])



  const handleClick = (event) => {
    const { id } = event.target;
    const el = document.getElementById(id + '-section');
    el.classList.toggle('form__section-category__body--open');
  }
  return (
    <>
      {/* <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} /> */}
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Demande de Billets pour une mission</PageTitle>
        </div>
        <form className="form" style={{width: '100%'}}>
          <div className='form__section-category'>

            <FormSectionTitle needsClarity id="plane" handler={handleClick}>AVION</FormSectionTitle>

            <div className='form__section-category__body' id="plane-section">
            <div className="form__section-field">
                <label className="form__section-field-label" htmlFor="departure-place">Classe</label>
                <RadioInput
                  id="ar-plane"
                  formField="flightType"
                  label="Aller-retour simple"
                  register={register}
                />
                <RadioInput
                  id="multi-plane"
                  formField="flightType"
                  label="Multi-destinations"
                  register={register}
                />
              </div>
              <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">ALLER-RETOUR SIMPLE</label>
              <Trip
                register={register}
                stepNumber={1}
                errors={errors}
                step={1}
                deleteStep={() => {}}
                isAr
              />
            </div>
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">MULTI-DESTINATIONS</label>
              {[1, 2, 3, 4].map((id) => (
                <Trip
                  key={id}
                  register={register}
                  stepNumber={id}
                  errors={errors}
                  step={id}
                  deleteStep={() => {}}
                  // isAr
                />
              ))}
            </div>


            </div>
            <div>
            {transports.transport_type.map((t) => <p key={t}>{t}</p>)}
            {transports.transport_payment.map((t) => <p key={t}>{t}</p>)}
            {transports.transport_class.map((t) => <p key={t}>{t}</p>)}
            </div>
          </div>

            {omLoader && <LoaderCircle />}
        </form>
      </div>
    </>
  );
};

export default Tickets;
