import React from 'react';
import classNames from 'classnames';
import { useForm } from "react-hook-form";

import { Link } from 'react-router-dom';

import TextareaField from 'src/components/Fields/TextareaField';

import './style.scss';

const FormLayout = ({ step, children, user, url }) => {

  const {
    register, formState: { errors }
  } = useForm();


  const setNewSearch = (url, step) => {
    return '?etape=' + step + url.search.slice(8);
  }

  return (
  <div className='validation-form'>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {children}
    </div>
    <div className="validation-form__separator" />
    <form action="">
      <TextareaField 
        id="comments-field"
        label="Commentaires"
        formField="comments"
        register={register}
        placeholder="plop"
      />
      <div className="form__section-field-buttons__row">
        <Link to={step === 1 ? `/gestionnaire/${user}/documents-a-signer` : url.pathname + setNewSearch(url, step - 1)}>{'Retour'}</Link>
        <Link to={url.pathname + setNewSearch(url, step + 1)}>{'Suivant'}</Link>
      </div>
      
    </form>
  </div>
);}

FormLayout.propTypes = {

};

export default FormLayout;
