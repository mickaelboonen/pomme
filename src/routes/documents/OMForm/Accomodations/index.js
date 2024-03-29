import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';


import '../style.scss';

// Components
import ApiResponse from 'src/components/ApiResponse';
import Buttons from 'src/components/Fields/Buttons';
import SwitchButton from 'src/components/SwitchButton';
import StatusChecker from 'src/components/StatusChecker';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import { turnAccomodationDataToDbFormat } from 'src/selectors/dataToDbFormat';
import { updateAccomodations } from 'src/reducer/omForm';
import { getMaxMealsAndNights } from 'src/selectors/formValidationsFunctions';
import NumberField from 'src/components/Fields/NumberField';
import Rules from '../../../../components/Rules';

const Accomodations = ({ step }) => {
  
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const omId = loader.searchParams.get('id');
  
  const { omForm: { omForm } } = useSelector((state) => state);

  const accomodationsData = omForm.find((omStep) => omStep.step === 'accomodations');

  const defaultValues = accomodationsData.data;
  
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    data.omId = omId;
    
    const mealsErrorElement = document.getElementById('meals-error');
    const nightsErrorElement = document.getElementById('nights-error');
    const totalMeals = Number(data.mealsInAdminRestaurants) + Number(data.mealsPaidByAgent);

    if (totalMeals > maxMealsNumber) {
      mealsErrorElement.textContent = "Vous avez saisi plus de repas qu'autorisé. Vous avez le droit à : " + maxMealsNumber+ ' repas dans le cadre de votre mission.';
      mealsErrorElement.classList.add('form__section-field-error--open')
    }
    else if (data.nightsNumber > maxNightsNumber) {
      nightsErrorElement.textContent = "Vous avez saisi plus de nuits qu'autorisé. Vous avez le droit à : " + maxNightsNumber+ ' nuits dans le cadre de votre mission.';
      nightsErrorElement.classList.add('form__section-field-error--open')

    }
    else {
      if (totalMeals < maxMealsNumber) {
        const mealConfirmation = `Les repas sont remplis à titre déclaratif. Tout repas non saisi sera considéré comme repas gratuit, et donc non soumis à un remboursement de la part de l'établissement. Vous avez actuellement : ${maxMealsNumber - totalMeals} repas gratuits. Confirmez-vous votre saisie ?`;
        if (!window.confirm(mealConfirmation)) {
          return;
        }
      }
      nightsErrorElement.textContent = "";
      mealsErrorElement.textContent = "";
      nightsErrorElement.classList.remove('form__section-field-error--open')
      mealsErrorElement.classList.remove('form__section-field-error--open')

      delete data.maxMealsNumber;
      
      data.status = 1;
      const dataToBeSubmitted = turnAccomodationDataToDbFormat(data);

      dispatch(updateAccomodations(dataToBeSubmitted));
    }    
  };

  const missionData = omForm[0].data;

  const maxMealsNumber = getMaxMealsAndNights(missionData);
  const maxNightsNumber = getMaxMealsAndNights(missionData, true);

  const [isHotelSelected, setIsHotelSelected] = useState(defaultValues.hotel);

  const handleHotelSwitch = (event) => {
    setIsHotelSelected(event.target.checked);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StatusChecker status={defaultValues.status} />
      <div className="form__section">
        <FormSectionTitle>Hébergement</FormSectionTitle>
        <HiddenField id="omId" value={omId} register={register} />
        <div className="form__section-field">
          <SwitchButton
            register={register}
            handler={handleHotelSwitch}
            isInForm
            formField="hotel"
            label="Hotel :"
          />
        </div>
        {isHotelSelected && (
          <>
            <Rules
              title="Règle de remboursement de l'hébergement"
              id="night-rules"
            >
              <p className="rules__body-text">Les frais d’hébergement sont remboursés au réel sur production de justificatifs de dépenses, dans la limite de :</p>
              <ul className="rules__body-list">
                <li>90 € pour la province pour les villes de moins de 200.000 habitants</li>
                <li>120 € pour la province pour les villes de plus de 200.000 habitants</li>
                <li>140 € pour Paris, l’Ile de France</li>
                <li>120 € pour les agents reconnu en qualité de travailleurs handicapés et en situation de mobilité réduite.</li>

                <li style={{marginTop: '1rem'}}>120 € pour la Martinique, la Guadeloupe, la Guyane, La Réunion, Saint-Barthélemy, Saint-Pierre-et-Miquelon, Saint-Martin et Mayotte</li>
                <li>120 € ou 14 320 F.CFP pour la Nouvelle-Calédonie, les îles Wallis et Futuna, la Polynésie française,</li>

              </ul>
              <div className="rules__body-separator" />
              <p className="rules__body-text"><span className='rules__body-text__span'>CAS PARTICULIER DES MISSIONS REALISEES DANS LE CADRE DES
      REUNIONS CNU SUR CONVOCATION </span></p>
              <p className="rules__body-text"> Conformément au décret N°2006-781 du 03 juillet 2006, les frais d’hébergement sont
      pris en charge aux frais réels, dans les limites suivantes :</p>
              <p className="rules__body-text">Pour les réunions de sections du CNU ou du CNAP :</p>
              <ul className="rules__body-list">
                <li>83 € la nuitée dans les villes de province</li>
                <li>90 € la nuitée dans les villes de province de plus de 200 000 habitants et les communes de la métropole du Grand Paris</li>
                <li>110 € la nuitée à Paris</li>
              </ul>
              <p className="rules__body-text">120 € la nuitée pour les réunions de la CP-CNU</p>
              <p className="rules__body-text rules__body-text--infos"><span className='rules__body-text__span'>NOTA BENE :</span> Ce montant, fixé par le ministère, peut évoluer.</p>
            </Rules>
            <div className='rules' id="nights-rules">
              <p className="rules__body-text" style={{marginTop: '0'}}><span className='rules__body-text__span'>POUR VOTRE MISSION </span></p>
              { (!isNaN(maxNightsNumber) && isHotelSelected) && <p className="rules__body-text">Selon vos dates de mission, vous avez le droit à un total de : <span>{maxNightsNumber}</span> nuits à l'hôtel.</p>}
              {isHotelSelected && <p className="rules__body-text">Pour que l'hôtel vous soit bien remboursé, veillez à ce que la facture ne soit pas à l'ordre de l'Université mais bien bien à votre nom.</p>}
            </div>
            <NumberField
              id="nights-number-field"
              formField="nightsNumber"
              register={register}
              max={maxNightsNumber}
              required="Merci de renseigner le nombre de nuits d'hôtel."
              error={errors.nightsNumber}
              label="Nombre de nuits"
              placeholder="Vous ne pouvez saisir plus de nuits que le nombre calculé selon vos dates de missions."
            />
            <div className="form__section-field">
              <p className="form__section-field-label">Réglement</p>
              <RadioInput id="unimes" formField="hotelPayment" label="Payé par Unîmes" register={register} required="Merci de renseigner le champ." />
              <RadioInput id="agent" formField="hotelPayment" label="Avancé par l'agent" register={register} required="Merci de renseigner le champ." />
              {errors.hotelPayment && <p className='form__section-field-error form__section-field-error--open'>{errors.hotelPayment.message}</p>}
            </div>
          </>
        )}
      </div>
      {maxNightsNumber < 0 && <p id="nights-error" className="form__section-field-error form__section-field-error--open">Les dates saisies pour la mission sont incorrectes. Merci de les corriger pour pouvoir procéder à cette étape.</p>}
      <p id="nights-error" className="form__section-field-error"/>
      <div className="form__section">
        <FormSectionTitle>Repas</FormSectionTitle>
        <Rules
          title="Règle de déclaration des repas"
          id="meals-rules"
        >
          <p className="rules__body-text"><span className='rules__body-text__span'>NON VACATAIRE :</span>Pour pouvoir bénéficier d’un remboursement de ses frais de repas et d’hébergement, le voyageur doit être en déplacement sur les créneaux complets suivants :</p>
          <ul className="rules__body-list">
            <li>Pour le midi : entre 12h00 et 14h00</li>
            <li>Pour le soir : entre 19h00 et 21h00</li>
          </ul>
          { !isNaN(maxMealsNumber) && <p className="rules__body-text">D'après les dates fournies à l'étape <span>MISSION</span>, vous pouvez demander jusqu'à : <span>{maxMealsNumber}</span> repas.</p>}
          <div />
          <p className="rules__body-text"><span className='rules__body-text__span'>VACATAIRE :</span>Les frais de repas ne pourront être pris en compte que pour les intervenants dispensant des cours le matin et l’après-midi d’une même journée. La prise en charge est alors faite au tarif « passager » en vigueur du CROUS.</p>
          <p className="rules__body-text rules__body-text--infos"><span className='rules__body-text__span'>NOTA BENE :</span> Merci de ne pas déclarer les repas gratuits ou non pris par l'agent.</p>
      </Rules>
        <NumberField
          id="outside-meals-number-field"
          formField="mealsPaidByAgent"
          register={register}
          max={maxMealsNumber}
          label="Nombre de repas payés par l'agent"
          required="Merci de renseigner le nombre de repas prévus à la charge de l'agent"
          placeholder={"Limite maximale de repas à saisir : " + maxMealsNumber + "."}
          error={errors.mealsPaidByAgent}
        />
        <NumberField
          id="admin-meals-number-field"
          formField="mealsInAdminRestaurants"
          register={register}
          max={maxMealsNumber}
          label="Nombre de repas payés par l'agent en restaurant administratif"
          required="Merci de renseigner le nombre de repas en restaurant administratif"
          placeholder={"Limite maximale de repas à saisir : " + maxMealsNumber + "."}
          error={errors.mealsInAdminRestaurants}
        />
      </div>
      <p id="meals-error" className="form__section-field-error"/>
      {maxNightsNumber < 0 && <p id="nights-error" className="form__section-field-error form__section-field-error--open">Les dates saisies pour la mission sont incorrectes. Merci de les corriger pour pouvoir procéder à cette étape.</p>}
      <Buttons
        step={step}
        id={omId}
        url={loader}
        watch={watch}
        trigger={trigger}
        update={updateAccomodations}
      />
    </form>
    
  );
};

Accomodations.propTypes = {

};

export default Accomodations;
