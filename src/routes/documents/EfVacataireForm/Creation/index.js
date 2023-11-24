import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";

// import './style.scss';
var lodash = require('lodash/collection');

// Components 
import PageTitle from 'src/components/PageTitle';
import FileField from 'src/components/Fields/FileField';
import SelectField from 'src/components/Fields/SelectField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';
import DateField from 'src/components/Fields/DateField';


// Actions & Selectors
import { createEfVacataire } from 'src/reducer/ef';
import { uploadFile } from 'src/reducer/omForm';
import { Link } from 'react-router-dom';

const EfVacataire = () => {      

  const dispatch = useDispatch()
  const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm();
  const {
    omManager : { departments },
    app: {apiMessage },
    agent: { user, agent }
  } = useSelector((state) => state);

  const rearrangeDate = (date) => {
    const rearrangedDate = date.split('-');
    return rearrangedDate[2] + '.' + rearrangedDate[1] + '.' + rearrangedDate[0];
  }
  const onSubmit = (data) => {

    if (data.peche instanceof File) {
      data.status = 1;
      data.url = 'path';
      data.name = agent.firstname.slice(0,1) + '.' + agent.lastname.toUpperCase() + '-EF-VACATION-' + rearrangeDate(data.beginning) + '-' + rearrangeDate(data.ending);
      data.type = 'deve-' + departments.find((dep) => dep.id === Number(data.department)).shortName;

      delete data.department;
      delete data.beginning;
      delete data.ending;

      dispatch(uploadFile({data: data, step: 'vacataire', docType: 'ef-vacataire'}));
      // dispatch(createEfVacataire(data));
    }
    else {
      setError('peche', {type: 'custom', message: "Veuillez fournir votre fiche individuelle de service définitif disponible dans Pêche"})
      return;
    }
  }
  
  console.log(apiMessage);

  return (
    <div className='form-root'>
      <PageTitle>État de frais - Vacataires</PageTitle>
      <div className='form-root__container'>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className='form__section'>
            <FormSectionTitle>Département du Vacataire</FormSectionTitle>
            <SelectField
              data={lodash.sortBy(departments, ['name'])}
              register={register}
              formField="department"
              handler={() => {}}
              id="department-select"
              label="Sélectionner le département"
              blankValue="--Veuillez sélectionner un département"
              required="Merci de sélectionner le département concerné"
              error={errors.department}
            />
            <HiddenField
              id="missioner"
              value={user}
              register={register}
            />            
          </div>
          <div className='form__section'>
            <FormSectionTitle>Contrat de Vacation</FormSectionTitle>
            <HiddenField
              id="missioner"
              value={user}
              register={register}
            />
            <FileField
              register={register}
              formField="peche"
              id="peche-field"
              label="Fiche individuelle de service définitif"
              error={errors.peche}
              setValue={setValue}
            />
            
          </div>
          <FormSectionTitle>Période de remboursement souhaitée</FormSectionTitle>
          <div className="form__section form__section--split">
            <div className="form__section-half">
              <DateField
                type="date"
                id="beginning"
                label="Début de la période de l'état de frais"
                register={register}
                formField="beginning"
                error={errors.beginning}
                required="{errorMessages.beginning}"
              />
            </div>
            <div className="form__section-half">
              <DateField
                type="date"
                id="ending"
                label="Fin de la période de l'état de frais"
                register={register}
                formField="ending"
                error={errors.ending}
                required="{errorMessages.ending}"
              />
            </div>
          </div>
          <div className='form__section-field-buttons'>
            <div className='form__section-field-buttons__row'>
              {!apiMessage.hasOwnProperty('response') && (
                <ButtonElement
                  type="submit"
                  label="Créer l'EF"
                />
              )}
              {/* <div style={{width: '1rem'}} /> */}
              {(apiMessage.hasOwnProperty('response') && apiMessage.response.status === 200) && (
                <Link to={`/modifier-un-document/${encodeURIComponent('état-de-frais-de-vacataire')}?etape=1&id=${apiMessage.id}`}>Saisir mes frais de mission</Link>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

EfVacataire.propTypes = {

};

export default EfVacataire;
