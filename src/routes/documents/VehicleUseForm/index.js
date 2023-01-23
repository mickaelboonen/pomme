import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useLoaderData } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RadioInput from 'src/components/Fields/RadioInput';
import TextField from 'src/components/Fields/TextField';
import PageTitle from 'src/components/PageTitle';
import SelectField from 'src/components/Fields/SelectField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import { toggleIsHiddenOnNextFormSection } from '../../../selectors/domManipulators';
import FileField from 'src/components/Fields/FileField';
import SwitchButton from 'src/components/SwitchButton';
import ButtonElement from 'src/components/Fields/ButtonElement';
import { useState } from 'react';
import VehicleData from './VehicleData';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { displayVehicle } from '../../../reducer/app';

const VehicleUseForm = () => {
  console.log('rendu');
  const url = useLoaderData();
  const dispatch = useDispatch();
  const carId = url.searchParams.get('vehicle');
  const omId = url.searchParams.get('omId');

  const [showCarList, setShowCarList] = useState(true);

  const { vehicles, currentVehicle , formDefaultValues} = useSelector((state) => state.app);
  
  const navigate = useNavigate();
  console.log(formDefaultValues);
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm({ defaultValues: formDefaultValues});

  const [carType] = watch(['carType']);
  
  const onSubmit = (data) => {
    console.log(data);
  };

  const reasons = [
    {
      id: "time",
      label: "Gain de temps",
    },
    {
      id: "no-public-transports",
      label: "Absence de transport en commun",
    },
    {
      id: "materials-transporting",
      label: "Obligation de transport de matériel lourd, encombrat, fragile",
    },
    {
      id: "handicap",
      label: "Handicap",
    },
    {
      id: "carpooling",
      label: "Transport d'autres missionnaires",
    },
  ];

  const handleOtherReason = (event) => {
    // toggleIsHiddenOnNextFormSection(event.target);
  };

  const handleExternalUserCar = (event) => {
    // toggleIsHiddenOnNextFormSection(event.target);

    // const validateButton = document.querySelector('.form').lastChild.lastChild;
    // if (event.target.checked) {
    //   validateButton.classList.add('form__section-field--hidden')
    // }
    // else {
    //   validateButton.classList.remove('form__section-field--hidden')
    // }

  };

  const handleNewCar = (event) => {
    console.log(event.target.value);
    dispatch(displayVehicle(event.target.value));
  }

  const handleVehicleType = (event) => {
    const { value } = event.target;

    if (value === 'rent-car') {
      setShowCarList(false);
    }
    else {

      setShowCarList(true);
    }
  }
  return (
    <div className="form-page__container">
      <div className="form-page__title">
        <PageTitle>Demande d'autorisation préalable d'utilisation d'un véhicule</PageTitle>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__section">
          <FormSectionTitle>Voiture</FormSectionTitle>
          <label className="form__section-field-label" htmlFor="departure-place">Type de véhicule</label>

          <div className="form__section  form__section--split">
            {/* <label className="form__section-field-label" htmlFor="departure-place">Type de véhicule</label> */}
            <RadioInput
              id="personal-car"
              formField="carType"
              label="Véhicule personnel, de prêt (*)"
              register={register}
              handler={handleVehicleType}
            />
            <RadioInput
              id="rent-car"
              formField="carType"
              label="Véhicule de location"
              register={register}
              handler={handleVehicleType}
            />
            <RadioInput
              id="company-car"
              formField="carType"
              label="Véhicule de service"
              register={register}
              handler={handleVehicleType}
            />
          </div>
          <p className="form__section-field-label form__section-field-label--infos">(*) Produire obligatoirement la photocopie de la carte grise et de l'attestation d'assurance</p>
          {showCarList && (
            <SelectField 
              register={register}
              blankValue="Pas de véhicule enregistré"
              data={vehicles}
              id="vehicles-list"
              handler={handleNewCar}
              formField="selectedVehicle"
              label="Sélectionner un véhicule déjà enregistré"
            />
          )}
          <VehicleData register={register} carType={carType} errors={errors} />
        </div>
        <div className="form__section">
          <FormSectionTitle>Raison</FormSectionTitle>
          <div className="form__section-field">
            <label className="form__section-field-label" htmlFor="departure-place">Raison(s) justifiant l'utilisation d'un véhicule</label>
            {reasons.map((reason) => (
              <CheckboxInput
                key={reason.id}
                id={reason.id}
                label={reason.label}
                formField="reasons"
                register={register}
              />
            ))}
            <CheckboxInput
              id="other"
              label="Autre raison (à préciser)"
              formField="reasons"
              register={register}
              handler={handleOtherReason}
            />
          </div>
          <TextField
            id="other-reason"
            label="Autre raison"
            formField="otherReason"
            register={register}
            isHidden
          />
        </div>
        <div className="form__section">
          <FormSectionTitle>Documents</FormSectionTitle>
          <FileField
            register={register}
            formField="car-registration-file"
            id="carRegistrationDocument"
            label="Carte grise"
          />
          <FileField
            register={register}
            formField="car-insurance-file"
            id="carInsuranceFile"
            label="Attestation d'assurance"
          />
        </div>
        <div className="form__section">
          <FormSectionTitle>Signatures</FormSectionTitle>
          <FileField
            register={register}
            formField="signature"
            id="userSignature"
            label="Signature"
          />
        </div>
        <div className="form__section">
          <FormSectionTitle>Dernière étape</FormSectionTitle>
          <div className="form__section-field form__section-field--hidden">
            <SwitchButton
              formField="externalSignature"
              isInForm
              register={register}
              handler={handleExternalUserCar}
              label="Est-ce qu'une personne extérieure doit signer le document ?"
            />
          </div>
          <div className="form__section-field form__section-field--hidden">
            <div className="form__section-field-button">
              <ButtonElement 
                type="button"
                label="Générer le PDF de la demande"
              />
              <p>Veuillez télécharger le PDF de la demande et le faire signer aux personnes extérieures concernées</p>
              <a href="">Retourner au formulaire de l'ordre de mission</a>
            </div>
          </div>
          <div className="form__section-field">
            <div className="form__section-field-button">
              <ButtonElement 
                type="submit"
                label="Valider la demande"
              />
            </div>
          </div>
          
        </div>
      </form>
      </div>
    );
  };

VehicleUseForm.propTypes = {

};

export default VehicleUseForm;
