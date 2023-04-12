import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import './style.scss';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';

import { displayOmStatus } from 'src/reducer/omForm';
import { displayEfStatus } from 'src/reducer/ef';
import { showDocStatus } from 'src/reducer/agent';
import DocButtons from './DocButtons';
import LoaderCircle from '../../../components/LoaderCircle';

const Section = ({ id, data, steps, currentDoc, loader, isOm}) => {
  
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
  console.log(currentDoc);
  
  return (
    <section id={id} className="my-documents__files">
    { loader && <LoaderCircle />}
    { !loader && (
      <SelectField
        data={data}
        register={register}
        handler={handleChange}
        formField="selectInput"
        id="list"
        label={`Liste des Ordres de Missions`}
        blankValue="Aucun document sélectionné"
      />
    )}
      {currentDoc.hasOwnProperty('id') && (
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
