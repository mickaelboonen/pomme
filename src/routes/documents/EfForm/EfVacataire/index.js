import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
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


// Actions & Selectors
import { clearMessage } from 'src/reducer/app';
import { checkStepsStatus } from 'src/selectors/formDataGetters';

const EfVacataire = () => {      

  const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm();
  const {
    omManager : { departments },
    agent: { user }
  } = useSelector((state) => state);

  const onSubmit = (data) => {

    if (!data.peche instanceof File) {
      setError('peche', {type: 'custom', message: "Veuillez fournir votre fiche individuelle de service définitif disponible dans Pêche"})
      return;
    }
    console.log(data);
  }

  return (
    <div className='form-root'>
      {/* <ThreadAsTabs step={step} tabs={tabs} urlData={loaderData} /> */}
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
              id="user"
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
          <div className='form__section-buttons'>
            <ButtonElement
              type="submit"
              label='Valider'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

EfVacataire.propTypes = {

};

export default EfVacataire;
