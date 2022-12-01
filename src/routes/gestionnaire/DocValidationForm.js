import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Link, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';

import './style.scss';
import FileField from 'src/components/Fields/FileField';
import SelectField from 'src/components/Fields/SelectField';
import DoubleAuthentication from './DoubleAuthentication';

const DocValidationForm = ({ role = "DGS"}) => {
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const budget = ['1', '2', '3'];

  const isOm = params.slug === 'ordre-de-mission' ? true : false;
  const { id } = params;


  const handleClickOnSubmit = () => {

    // TODO : faire des verifs ici - ou alors le faire en submit direct
    const authElement = document.querySelector('.form__section-authentication');
    authElement.classList.add('form__section-authentication--open');
  }
  return (
  <main className="form-page">
    <PageTitle>Valider un document</PageTitle>
    {role}
    <form className='form' style={{'margin': 'auto'}}>
      
      <FormSectionTitle>Document à signer</FormSectionTitle>
      <div className="form__section-container-button">
        {/* TODO : button to download doc ou link in new tab ?  */}
        <Link to="/documents/autorisation-de-vehicule/nouveau?etape=1">Voir le document</Link>
      </div>
      <FormSectionTitle>Imputations budgétaires</FormSectionTitle>
      <SelectField
        data={budget}
        register={register}
        formField="imputation"
        id="budget-imputation"
        label="Choisir l'imputation budgétaire"
        blankValue={"Pas d'imputation budgétaire sélectionnée"}
      />
      <FormSectionTitle>Signature</FormSectionTitle>
      <FileField
        id="signature"
        formField="signature-file"
        register={register}
      />  
      <div className="form__section-container-button form__section-container-button--hidden">
        <Link to="#">Double authentification CAS</Link>
      </div>
      <div className='form__section-authentication'>
        <DoubleAuthentication />
      </div>
      <FormSectionTitle>Décision</FormSectionTitle>
      <div className="form__section">
        <div className="form__section-container-button form__section-field-buttons--validation">
          <button id="submit-button" type="button" onClick={handleClickOnSubmit}>Signer en tant que {role}</button>
        </div>
      </div>
      {isOm && (
        <div className="form__section form__section-refusal">
          <Link to={`/gestionnaire/${role}/refuser-un-ordre-de-mission/${id}`}>Refuser le document en l'état</Link>
          <Link to={`/gestionnaire/${role}/refuser-un-ordre-de-mission/${id}`}>Refuser le document définitivement</Link>
        </div>
      )}
    </form>
  </main>
);}

DocValidationForm.propTypes = {

};

export default DocValidationForm;
