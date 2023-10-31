import React, { useEffect, useState } from 'react';
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

  const [isPlaneVisible, setIsPlaneVisible] = useState('');
  const [isTrainVisible, setIsTrainVisible] = useState('');
  const [plane, train] = watch(['flightType', 'trainType']);
  useEffect(() => {
    if (plane) {
      if (plane.includes('ar')) {
        setIsPlaneVisible('ar')
      }
      else {
        setIsPlaneVisible('multi')
      }
  
    }
    if (train) {
      if (train.includes('ar')) {
        setIsTrainVisible('ar')
      }
      else {
        setIsTrainVisible('multi')
      }
  
    }
  }, [plane, train])


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


const onSubmit = (data) => {
  console.log(data);
}
  const handleClick = (event) => {
    const { id } = event.target;
    const el = document.getElementById(id + '-section');
    el.classList.toggle('form__section-category__body--open');
  }

  const [flights, setFlights] = useState([1]);
  const addFlight = () => {
    const newFlights = flights;
    const lastFlightNumber = flights[flights.length - 1];
    const newNumber = lastFlightNumber + 1;
    newFlights.push(newNumber);
    setFlights(newFlights);
    // console.log(newFlights);
  }

  
  const [trains, setTrains] = useState([1]);
  const addTrain = () => {
    const newTrains = trains;
    const lastTrainNumber = trains[trains.length - 1];
    const newNumber = lastTrainNumber + 1;
    newTrains.push(newNumber);
    setTrains(newTrains);
    // console.log(newFlights);
  }

  
  return (
    <>
      {/* <ThreadAsTabs step={step} tabs={steps} isOm urlData={loaderData} /> */}
      <div className='form-container'>
        <div className="form-page__title">
          <PageTitle>Demande de Billets pour une mission</PageTitle>
        </div>
        <form className="form" style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
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
              {isPlaneVisible === 'ar' && (
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
              )}
              {isPlaneVisible === 'multi' && (
              <div className="form__section-field">
                <label className="form__section-field-label" htmlFor="departure-place">MULTI-DESTINATIONS</label>
                {flights.map((id) => (
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
                <button type="button" onClick={addFlight}>Ajouter un vol</button>
              </div>
              )}
            </div>
          </div>
          <div className='form__section-category'>
            <FormSectionTitle needsClarity id="train" handler={handleClick}>TRAIN</FormSectionTitle>
            <div className='form__section-category__body' id="train-section">
              <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Type de vol</label>
              <RadioInput
                id="ar-train"
                formField="trainType"
                label="Aller-retour simple"
                register={register}
              />
              <RadioInput
                id="multi-train"
                formField="trainType"
                label="Multi-destinations"
                register={register}
              />
              </div>
              {isTrainVisible === 'ar' && (
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
              )}
              {isTrainVisible === 'multi' && (
              <div className="form__section-field">
                <label className="form__section-field-label" htmlFor="departure-place">MULTI-DESTINATIONS</label>
                {trains.map((id) => (
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
                <button type="button" onClick={addTrain}>Ajouter un train</button>
              </div>
              )}
            </div>
          </div>

          <div>
            <button>Valider</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Tickets;
