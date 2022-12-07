import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom';

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

const VehicleUseForm = () => {
  const { search } = useLocation();
  const step = Number(search.slice(search.length - 1));
  
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

    // TODO : Process Data

    // Next Step
    const nextStep = step++;
    navigate('/nouveau-document/ordre-de-mission?etape=' + step++);

    
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

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
    toggleIsHiddenOnNextFormSection(event.target);
  };

  const handleExternalUserCar = (event) => {
    toggleIsHiddenOnNextFormSection(event.target);

    const validateButton = document.querySelector('.form').lastChild.lastChild;
    if (event.target.checked) {
      validateButton.classList.add('form__section-field--hidden')
    }
    else {
      validateButton.classList.remove('form__section-field--hidden')
    }

  };

  const handleNewCar = (event) => {
    const children = Array.from(event.target.closest('.form__section').childNodes);
    for (let i = 0; i < 3; i++) {
      children.shift();
    }
    if (event.target.value === "Nouveau véhicule") {
      children.forEach((child) => {
        child.classList.remove('form__section-field--hidden');
      }) 
    }
    else {
      children.forEach((child) => {
        child.classList.add('form__section-field--hidden');
      }) 
    }
  }

  const handleVehicleType = () => {
    const personalCarElement = document.querySelector('#personnal-car');
    const switchSection = document.querySelector('#public-transports').closest('.form__section-field');

    if (personalCarElement.checked) {
      switchSection.classList.remove('form__section-field--hidden');
      toggleIsHiddenOnNextFormSection(personalCarElement);
    }
    else {
      switchSection.classList.add('form__section-field--hidden');
      toggleIsHiddenOnNextFormSection(switchSection);
      toggleIsHiddenOnNextFormSection(personalCarElement);
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
          <div className="form__section-field">
            <label className="form__section-field-label" htmlFor="departure-place">Type de véhicule</label>
            <RadioInput
              id="personnal-car"
              formField="car-type"
              label="Véhicule personnel, de prêt (*)"
              register={register}
              handler={handleVehicleType}
            />
            <RadioInput
              id="rent-car"
              formField="car-type"
              label="Véhicule de location"
              register={register}
              handler={handleVehicleType}
            />
            <RadioInput
              id="company-car"
              formField="car-type"
              label="Véhicule de service"
              register={register}
              handler={handleVehicleType}
            />
            <p>(*) Produire obligatoirement la photocopie de la carte grise et de l'attestation d'assurance</p>
          </div>
          {/*  TODO : select est in */}
          <SelectField 
            register={register}
            blankValue="Pas de véhicule enregistré"
            data={['1', '2', '3', 'Nouveau véhicule']}
            id="vehicles-list"
            isHidden
            handler={handleNewCar}
            formField="preregistered-vehicle"
            label="Sélectionner un véhicule déjà enregistré"
          />
          <TextField
            isHidden
            id="car-brand"
            label="Marque du véhicule"
            formField="car-brand"
            register={register}
          />
          <TextField
            isHidden
            id="car-registration"
            label="Numéro d'immatriculation"
            formField="car-registration"
            register={register}
          />
          <TextField
            isHidden
            id="car-rating"
            label="Puissance fiscale"
            formField="car-rating"
            register={register}
            isNumber
            min="0"
          />
          <TextField
            isHidden
            id="car-insurance"
            label="Compagnie d'assurance"
            formField="car-insurance"
            register={register}
          />
          <TextField
            isHidden
            id="police-number"
            label="Numéro Police"
            formField="police-number"
            register={register}
          />
          <div className="form__section-field-button form__section-field--hidden">
            <ButtonElement
              isHidden
              type="button"
              label="Enregistrer le véhicule"          
            />
          </div>
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
            formField="other-reason"
            register={register}
            isHidden
          />
        </div>
        <div className="form__section">
          <FormSectionTitle>Documents</FormSectionTitle>
          <FileField
            register={register}
            formField="car-registration-file"
            id="car-registration-document"
            label="Carte grise"
          />
          <FileField
            register={register}
            formField="car-insurance-file"
            id="car-insurance-file"
            label="Attestation d'assurance"
          />
        </div>
        <div className="form__section">
          <FormSectionTitle>Signatures</FormSectionTitle>
          <FileField
            register={register}
            formField="signature"
            id="user-signature"
            label="Signature"
          />
        </div>
        <div className="form__section">
          <FormSectionTitle>Dernière étape</FormSectionTitle>
          <div className="form__section-field form__section-field--hidden">
            <SwitchButton
              formField="external-signature"
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
