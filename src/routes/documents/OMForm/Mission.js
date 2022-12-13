import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Map from 'src/assets/images/map.svg';
import Pin from 'src/assets/images/pin.svg';

import './style.scss';

// Components
import FormSectionTitle from 'src/components/FormSectionTitle';
import TextFieldWithIcon from 'src/components/Fields/TextFieldWithIcon';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import SelectField from 'src/components/Fields/SelectField';
import DateField from 'src/components/Fields/DateField';
import HiddenField from 'src/components/Fields/HiddenField';
import EfMission from '../EfForm/Mission';

// Selectors 
import { handleRegionFields, handleWorkAddressSelect } from 'src/selectors/formValidationsFunctions';
import { toggleIsHiddenOnWorkAddressesList, displayRegionFieldsInFormMission } from 'src/selectors/domManipulators';

// Reducer
import { saveMissionFormData } from 'src/reducer/omForm';
import { enableMissionFormFields } from 'src/reducer/efForm';

const Mission = ({ step, isEfForm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useLoaderData();
  
  
  const { isMissionFormDisabled } = useSelector((state) => state.efForm);
  
  
  const [searchParams] = useSearchParams();

  const omId = searchParams.get('id');
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    formState:
    { errors },
  } = useForm({
    defaultValues: loader,
  });
  
  const onSubmit = (data) => {
    console.log('----------------------------------------------------------');
    console.log('submitted data: ', data);

    // TODO - ERROR : 
    //A non-serializable value was detected in an action, in the path: `payload.missionGoalFile`. Value: FileList {length: 0} 
    
    // TODO : save file first then save data with the path of the file
    data.missionGoalFile = 'path';

    // Enregistrer dans la BDD directement
    if (isEfForm) {
      // console.log(step++);
      // dispatch(saveMissionFormData(data));
      const nextStep = step + 1;
      navigate('/nouveau-document/état-de-frais?etape=' + nextStep + '&id=' + omId);

    }
    else {
      dispatch(saveMissionFormData(data));
      const nextStep = step + 1;
      navigate('/nouveau-document/ordre-de-mission?etape=' + nextStep + '&id=' + omId);

    }
  };

  const advance = () => {
    const data = JSON.parse(localStorage.getItem('mission'));
    dispatch(saveMissionFormData(data));
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  const [region , departurePlace, returnPlace] = watch(['region', 'departurePlace', 'returnPlace' ]);
  const modificationSwitch = watch('modificationSwitch');
  console.log(modificationSwitch);
  
  useEffect(() => {
    console.log('modification switch : ', modificationSwitch);
    if (modificationSwitch) {
      // register('missionGoalFile', {
      //   required: "Joindre impérativement convocation, mail ou tout autre document en attestant.",
      // });
      register('departurePlace', {
        required: "Merci de sélectionner l'option qui correspond.",
      });
      register('returnPlace', {
        required: "Merci de sélectionner l'option qui correspond.",
      });
      register('region', {
        required: "Joindre impérativement convocation, mail ou tout autre document en attestant.",
      });
      register('modificationJustifications', {
        required: 'Merci de justifier la ou les modifications.',
      });
      register('modificationFiles', {
        required: 'Merci de fournir la ou les pièces justifiant la modification des champs.',
      });
    }
  })

  useEffect(() => {
    handleWorkAddressSelect(returnPlace, register, unregister);
  }, [returnPlace]);

  useEffect(() => {
    handleWorkAddressSelect(departurePlace, register, unregister);
  }, [departurePlace]);
  
  useEffect(() => {
    handleRegionFields(region, register, unregister);
  }, [unregister, region]);


  const handleRegionClick = () => {
    displayRegionFieldsInFormMission();
  };
  
  const adresses = [
    'adresse Vauban', 
    'adresse Carmes', 
    'adresse Hoche', 
    'adresse XYZ', 
  ];

  const handleClickonRadio = () => {
    toggleIsHiddenOnWorkAddressesList();
  }

  const toggleDisabledFields = (event) => {
    
    const justificationTextareaField = document.getElementById('justifications');
    justificationTextareaField.classList.toggle('form__section-field--hidden');

    const justificationFileField = document.getElementById('modification-files-input');
    justificationFileField.classList.toggle('form__section-field--hidden');
    
    dispatch(enableMissionFormFields(event.currentTarget.checked));
  }
  console.log('isEfForm : ', isEfForm, 'isMissionFormDisabled : ', isMissionFormDisabled);
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
    {/* // <form className="form" onSubmit={handleSubmitManually}> */}
      <div className="form__section">
        <FormSectionTitle>Raison de la mission</FormSectionTitle>

        <TextField
          id="motif"
          disabled={isEfForm && isMissionFormDisabled}
          formField="missionGoal"
          label="Motif de la mission"
          register={register}
          error={errors.missionGoal}
        />
        <FileField
          disabled={isEfForm && isMissionFormDisabled}
          id="mission-goal"
          formField="missionGoalFile"
          register={register}
          error={errors.missionGoalFile}
          pieces="Joindre impérativement convocation, mail ou tout autre document en attestant"
        />
        <HiddenField id="omId" value={omId} register={register} />
      </div>
      <div className="form__section">
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="form__section form__section--split">
          <div className="form__section-half">
            <DateField
              disabled={isEfForm && isMissionFormDisabled}
              type="datetime-local"
              id="departure"
              label="Jour et Heure de départ"
              register={register}
              formField="departure"
              error={errors.departure}
              required="Veuillez renseigner le jour et l'heure de départ."
            />
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Lieu de départ</label>
              <RadioInput
                disabled={isEfForm && isMissionFormDisabled}
                id="departure-home"
                formField="departurePlace"
                label="Résidence familiale"
                register={register}
                // required="Merci de sélectionner l'option qui correspond"
                handler={handleClickonRadio}
              />
              <RadioInput
                disabled={isEfForm && isMissionFormDisabled}
                id="departure-work"
                formField="departurePlace"
                label="Résidence administrative"
                register={register}
                // required="Merci de sélectionner l'option qui correspond"
                handler={handleClickonRadio}
              />
              <p className={classNames("form__section-field-error", { "form__section-field-error--open": errors.departurePlace?.message.length > 0 })}>{errors.departurePlace?.message}</p> 
            </div>
          </div>
          <div className="form__section-half form__section-half--separator" />
          <div className="form__section-half">
            <DateField
              disabled={isEfForm && isMissionFormDisabled}
              type="datetime-local"
              id="return"
              label="Jour et Heure de retour"
              register={register}
              formField="return"
              error={errors.return}
              required="Veuillez renseigner le jour et l'heure du retour."
            />
            <div className="form__section-field">
              <label className="form__section-field-label" htmlFor="departure-place">Lieu de retour</label>
              <RadioInput
                disabled={isEfForm && isMissionFormDisabled}
                id="return-home"
                formField="returnPlace"
                label="Résidence familiale"
                register={register}
                // required="Merci de sélectionner l'option qui correspond"
                handler={handleClickonRadio}
              />
              <RadioInput
                disabled={isEfForm && isMissionFormDisabled}
                id="return-work"
                formField="returnPlace"
                label="Résidence administrative"
                register={register}
                // required="Merci de sélectionner l'option qui correspond"
                handler={handleClickonRadio}
              />
              <p className={classNames("form__section-field-error", { "form__section-field-error--open": errors.returnPlace?.message.length > 0 })}>{errors.returnPlace?.message}</p> 
            </div>
          </div>
        </div>
        <SelectField
          isHidden
          disabled={isEfForm && isMissionFormDisabled}
          data={adresses}
          register={register}
          // validators={{leavesFromWork: leavesFromWork}}
          error={errors.listWorkAddresses}
          formField="listWorkAddresses"
          id="work-address-select"
          label="Adresse administrative"
          // required="Merci de sélectionner une adresse administrative."
          blankValue={"Veuillez sélectionner l'adresse administrative qui vous correspond"}
        />
      </div>
      <div className='form__section'>
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>
        <div className="form__section form__section--split">
          <RadioInput
            disabled={isEfForm && isMissionFormDisabled}
            id="métropole"
            formField="region"
            label="France Métropolitaine"
            register={register}
            // required="Merci de sélectionner l'option qui correspond"
            handler={handleRegionClick}
          />
          <RadioInput
            disabled={isEfForm && isMissionFormDisabled}
            id="dom-tom"
            formField="region"
            label="DOM / TOM (*)"
            register={register}
            // required="Merci de sélectionner l'option qui correspond"
            handler={handleRegionClick}
          />
          <RadioInput
            disabled={isEfForm && isMissionFormDisabled}
            id="étranger"
            formField="region"
            label="Étranger (*)(**)"
            register={register}
            // required="Merci de sélectionner l'option qui correspond"
            handler={handleRegionClick}
          />
        </div>
        <p className={classNames("form__section-field-error", { "form__section-field-error--open": errors.region?.message.length > 0 })}>{errors.region?.message}</p> 
        <TextFieldWithIcon
          disabled={isEfForm && isMissionFormDisabled}
          isHidden={false}
          id={"missionAdress"}
          name="Adresse de la mission"
          icon={Pin}
          register={register}
          required="Merci de renseigner l'adresse de la mission"
          error={errors.missionAdress}
        />
        <TextFieldWithIcon
          disabled={isEfForm && isMissionFormDisabled}
          isHidden={true}
          id="country"
          name="Pays de la mission"
          icon={Map}
          register={register}
          error={errors.country}
        />
        <div className="form__section-field form__section-field--hidden" id="abroad-field">
          <p className="form__section-field-label">(*) Préciser : </p>
          <RadioInput
            register={register}
            formField="abroadCosts"
            id="per-diem"
            label="Per diem"
          />
          <RadioInput
            register={register}
            formField="abroadCosts"
            id="frais-reels"
            label="Frais réels"
          />
          <p className={classNames("form__section-field-error", { "form__section-field-error--open": errors.abroadCosts?.message.length > 0 })}>{errors.abroadCosts?.message}</p> 
        </div>
        <div className="form__section-field form__section-field--hidden" id="abroad-report">
          <p className="form__section-field-label">(**) Compte rendu à fournir au retour de la mission sur financement RI</p>
        </div>
      </div>
      {isEfForm && <EfMission modificationSwitch={modificationSwitch} watch={watch} register={register} unregister={unregister} errors={errors} handler={toggleDisabledFields} />}
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
      <button type='button' onClick={advance}>Click</button>
    </form>
    
  );
};

Mission.propTypes = {

};

export default Mission;
