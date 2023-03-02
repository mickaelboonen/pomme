import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';

// Selectors 
import { equalizeFields, toggleSwitchOnOtherExpenses } from 'src/selectors/domManipulators';
import { applyRegisterFromData } from 'src/selectors/formValidationsFunctions';

const Transports = ({ step }) => {
  
  const [searchParams] = useSearchParams();

  const omId = searchParams.get('id');
  const { transportsFields } = useSelector((state) => state.ef)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState:
    { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    const nextStep = step + 1;
    localStorage.setItem('transportsEf', JSON.stringify(data));
    navigate('/nouveau-document/état-de-frais?etape=' + nextStep + '&id=' + omId)
  };

  const fieldsName = transportsFields.map((field) => field.formField);
  const [plane, train, personalCar, rentCar, fuel, toll, parking, taxi, publicTransports, research] = watch(fieldsName);
  const otherAmount = watch('otherAmount');
  
  const validationArray = [
    {
      name: 'plane',
      value: plane,
      fileField: 'planeFiles'
    },
    {
      name: 'train',
      value: train,
      fileField: 'trainFiles'
    },
    {
      name: 'personalCar',
      value: personalCar,
      fileField: 'personalCarFiles'
    },
    {
      name: 'rentCar',
      value: rentCar,
      fileField: 'rentCarFiles'
    },
    {
      name: 'fuel',
      value: fuel,
      fileField: 'fuelFiles'
    },
    {
      name: 'parking',
      value: parking,
      fileField: 'parkingFiles'
    },
    {
      name: 'toll',
      value: toll,
      fileField: 'tollFiles'
    },
    {
      name: 'taxi',
      value: taxi,
      fileField: 'taxiFiles'
    },
    {
      name: 'publicTransports',
      value: publicTransports,
      fileField: 'publicTransportsFiles'
    },
    {
      name: 'research',
      value: research,
      fileField: 'researchFiles'
    },
  ]

  const omTransports = JSON.parse(localStorage.getItem('transports'));

  const handleSwitch = (event) => {
    toggleSwitchOnOtherExpenses(event.target.checked);
  }

  useEffect(() => {
    // applyRegisterFromData(omTransports, register);

    validationArray.forEach((field) => {
      if (Number(field.value) > 0) {
        register(field.fileField, {
          required: 'Veuillez saisir le montant payé pour ce transport.'
        })
      }
    })

    if (Number(otherAmount) > 0) {
      register('other', {
        required: 'Veuillez saisir la raison de ce montant.'
      })
      register('otherAmountFiles', {
        required: 'Veuillez saisir les pièces justifiant cette dépense.'
      })
    }
  });

  useEffect(() => {
    equalizeFields();
    trigger();
  }, []);


  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        {transportsFields.map( (field) => (
          <div className='form__section form__section--documents' key={field.id}>
            <div className='form__section-half'>
              <TextField
                isNumber
                min='0'
                register={register}
                formField={field.formField}
                id={field.id}
                label={field.label}
                error={errors[field.formField]}
                placeholder="Montant"
              />
            </div>
            <div className='form__section-half'>
              <FileField
                register={register}
                formField={`${field.formField}Files`}
                id={`${field.formField}-files`}
                multiple
                label={field.filelabel}
                placeholder=""
                error={errors[`${field.formField}Files`]}
              />
            </div>
          </div>
        ))}
        <SwitchButton
          handler={handleSwitch}
          formField="otherSwitch"
          isInForm
          register={() => {}}
          label="Autres (à préciser)"
        />
        <TextField
          placeholder=""
          id="other-field"
          isHidden
          label="Noms des autres dépenses"
          formField="other"
          register={register}
          error={errors.other}
        />
        <div className='form__section form__section--documents form__section--hidden' id="other-fields">
          <div className='form__section-half'>
            <TextField
              isNumber
              min='0'
              register={register}
              formField="otherAmount"
              id="other-amount-field"
              label="Montant total des autres dépenses"
              placeholder="Montant"
            />
          </div>
          <div className='form__section-half'>
            <FileField
              register={register}
              formField="otherAmountFiles"
              id="other-amount-field-files"
              multiple
              label="Justificatifs de paiements, factures"
              placeholder=""
              error={errors.otherAmountFiles}
            />
          </div>
        </div>
      </div>
      {/* <Buttons step={step} /> */}
    </form>
    
  );
};

Transports.propTypes = {

};

export default Transports;
