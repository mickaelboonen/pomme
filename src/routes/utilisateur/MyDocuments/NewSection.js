import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import './style.scss';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';

import { showDocStatus, fetchOMs, fetchEfs } from 'src/reducer/agent';
import DocButtons from './DocButtons';
import { MdRefresh } from 'react-icons/md'

const Section = ({ id, data, user, steps, currentDoc, loader, isOm}) => {
  
  const dispatch = useDispatch();
  const {
    register,
  } = useForm({
    defaultValues: {
      selectInput: currentDoc.hasOwnProperty('id') ? currentDoc.id : ''
    },
  });

  const handleChange = (event) => {
    dispatch(showDocStatus({doc: event.target.value, type: isOm ? 'oms' : 'efs'}));   
  }

  let isDocFinished = false;
  const unfinishedStep = steps.find((step) => !step.status)

  if (!unfinishedStep) {
    isDocFinished = true;
  }

  const refreshData = () => {
    if (isOm) {
      dispatch(fetchOMs(user));
    }
    else {
      dispatch(fetchEfs(user))
    }
  };
  
  return (
    <section id={id} className="my-documents__files">
      <SelectField
        data={data}
        register={register}
        handler={handleChange}
        formField="selectInput"
        id="list"
        label={`Liste des ${isOm ? 'ordres de mission' : 'états de frais'}`}
        blankValue="Aucun document sélectionné"
      />
      <div className="my-documents__files-buttons">
        <button style={{width: 'fit-content'}} onClick={refreshData}>
          <MdRefresh className={classNames('my-documents__files-buttons-icon', {'my-documents__files-buttons-icon--animated': loader})} />  {!loader ? 'Rafraîchir la liste' : ''}
        </button>
      </div>
      {(currentDoc.hasOwnProperty('id') && currentDoc.status === 1) && (
        <div className='om-status'>
          <FormSectionTitle>Statut des différentes étapes</FormSectionTitle>
          <div className='om-status__steps'>
            {steps.map((step) => (
              <div key={step.name} className={classNames("om-status__steps-step", {
                "om-status__steps-step--validated" : step.status,
                "om-status__steps-step--not-validated" : !step.status && step.name !== 'étapes',
                "om-status__steps-step--steps" : step.name === 'étapes',
              })}>
                {step.name}
              </div>
            ))}
          </div>
          {currentDoc.comments !== '' && (
            <div className='om-status__message'>
              <FormSectionTitle>Réserves ou commentaires du Gestionnaire</FormSectionTitle>
              {currentDoc.comments}
            </div>
          )}
        </div>
      )}
      {currentDoc.hasOwnProperty('id') && (
        <DocButtons isOm={isOm} {...currentDoc} isDocFinished={isDocFinished} />
      )}
    </section>
  );
};

Section.propTypes = {

};

Section.defaultProps = {
  isOm: false,
};

export default Section;
