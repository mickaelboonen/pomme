import React from 'react';
import classNames from 'classnames';
import { useForm } from "react-hook-form";

import { Link, useLoaderData } from 'react-router-dom';

import TextareaField from 'src/components/Fields/TextareaField';
import HiddenField from 'src/components/Fields/HiddenField';

import { updateGestComments } from 'src/reducer/omManager';

import './style.scss';
import { useDispatch } from 'react-redux';

const FormLayout = ({ step, children, user, url, doc }) => {

  // const loaderData = useLoaderData();
  const dispatch = useDispatch();
  const omId = url.searchParams.get('id');
  const {
    register, watch, formState: { errors }
  } = useForm({
    defaultValues: {
      comments: doc.comments
    }
  });


  const setNewSearch = (url, step) => {
    return '?etape=' + step + url.search.slice(8);
  }

  const saveComments = () => {
    const data = watch();
    
    if (data.comments !== doc.comments) {
      dispatch(updateGestComments(data))
    }

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
        placeholder="Facultatif"
      />
      <HiddenField
        value={omId}
        id="docId"
        register={register}
      />
      <div className="form__section-field-buttons__row">
        <Link to={step === 1 ? `/gestionnaire/${user}/documents-a-signer` : url.pathname + setNewSearch(url, step - 1)} onMouseDown={saveComments}>{'Retour'}</Link>
        <Link to={url.pathname + setNewSearch(url, step + 1)} onMouseDown={saveComments}>{'Suivant'}</Link>

      </div>
      
    </form>
  </div>
);}

FormLayout.propTypes = {

};

export default FormLayout;
