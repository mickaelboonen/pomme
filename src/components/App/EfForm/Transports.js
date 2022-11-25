import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import SwitchButton from 'src/components/SwitchButton';
import TextField from 'src/components/Fields/TextField';

const Transports = ({ step }) => {
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
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  const fields = [
    {
      formField: 'plane',
      id: 'plane-field',
      max: '',
      label: 'Avion',
      filename: 'Avion.png',
      filelabel:"Billets d'avion (si non payé par Unîmes)",
    },
    {
      formField: 'train',
      id: 'train-field',
      max: '',
      label: 'Train',
      filename: 'train.pdf',
      filelabel:'Billets de train (si non payé par Unîmes)',
    },
    {
      formField: 'personal-car',
      id: 'personal-car-field',
      max: '',
      label: 'Véhicule personnel (sur autorisation préalable)',
      filename: 'A changer',
      filelabel:'A voir, champs supplémentaires',
    },
    {
      formField: 'rent-car',
      id: 'rent-car-field',
      max: '',
      label: 'Véhicule de location (sur autorisation préalable)',
      filename: 'Filename.pdf',
      filelabel:'Facture nominative acquittée du loueur',
    },
    {
      formField: 'fuel',
      id: 'fuel-field',
      max: '',
      label: 'Carburant pour véhicule personnel ou de location (sur autorisation préalable)',
      filename: 'Facture',
      filelabel:'Facture',
    },
    {
      formField: 'toll',
      id: 'toll-field',
      max: '',
      label: 'Frais de péage',
      filename: 'filename.pdf',
      filelabel:'Reçu ou ticket',
    },
    {
      formField: 'parking',
      id: 'parking-field',
      max: '',
      label: 'Parking',
      filename: 'filename.pdf',
      filelabel:'Reçu ou ticket',
    },
    {
      formField: 'Taxi',
      id: 'taxi-field',
      max: '',
      label: 'Taxi',
      filename: 'filename.pdf',
      filelabel:'Facture nominative acquittée',
    },
    {
      formField: 'public-transports',
      id: 'public-transports-field',
      max: '',
      label: 'Bus, RER, métro',
      filename: 'filename.pdf',
      filelabel:'Ticket',
    },
    {
      formField: 'research',
      id: 'research-field',
      max: '',
      label: "Frais d'inscription à un colloque ou réunion / séminaire scientifique (*)",
      filename: 'filename.pdf',
      filelabel:'Facture nominative acquittée et programme',
    },
  ];


  const handleSwitch = (event) => {
    const otherFieldsGroupElement = document.getElementById('other-fields');
    const otherTextFieldElement = document.getElementById('other');
    const { checked } = event.target;

    if (checked) {
      otherFieldsGroupElement.classList.remove('form__section--hidden');
      otherTextFieldElement.classList.remove('form__section-field--hidden');
    }
    else {
      otherFieldsGroupElement.classList.add('form__section--hidden');
      otherTextFieldElement.classList.add('form__section-field--hidden');
    }
  } 

  useEffect(() => {
      const allHalves = document.querySelectorAll('.form__section--documents');

        let heights = [];

      Array.from(allHalves).forEach((section) => {
        // console.log(section);
        const currentHalves = [];
        const labels = Array.from(section.querySelectorAll('label'));
        // console.log(labels);
        labels.forEach((currentLabel) => {
          currentHalves.push(currentLabel.offsetHeight);
        })
        

        if (currentHalves[0] > currentHalves[1]) {
          labels[1].style.height = `${currentHalves[0]}px`;
          labels[1].style.display = 'flex';
          labels[1].style.alignItems = 'flex-end';
        }
        else if (currentHalves[1] > currentHalves[0]) {
          labels[0].style.display = 'flex';
          labels[0].style.alignItems = 'flex-end';

        }
        heights.push(currentHalves);

      })
        console.log(heights);

  }, [])
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        {fields.map( (field) => (
          <div className='form__section form__section--documents' key={field.id}>
            <div className='form__section-half'>
              <TextField
                isNumber
                min='0'
                register={register}
                formField={field.formField}
                id={field.id}
                label={field.label}
                placeholder="Montant"
              />
            </div>
            <div className='form__section-half'>
              <FileField
                register={register}
                formField={`${field.formField}-files`}
                id={`${field.formField}-files`}
                multiple
                label={field.filelabel}
                placeholder=""
              />
            </div>
          </div>
        ))}
        <SwitchButton
          handler={handleSwitch}
          formField="ds"
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
        />
        <div className='form__section form__section--documents form__section--hidden' id="other-fields">
          <div className='form__section-half'>
            <TextField
              isNumber
              min='0'
              register={register}
              formField="other-amount"
              id="other-amount-field"
              label="Montant total des autres dépenses"
              placeholder="Montant"
            />
          </div>
          <div className='form__section-half'>
            <FileField
              register={register}
              formField="other-amount-files"
              id="other-amount-field-files"
              multiple
              label="Justificatifs de paiements, factures"
              placeholder=""
            />
          </div>
        </div>
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Transports.propTypes = {

};

export default Transports;
