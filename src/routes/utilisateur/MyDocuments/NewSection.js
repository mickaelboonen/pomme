import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './style.scss';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';

import { displayOmStatus } from 'src/reducer/omForm';
import DocButtons from './DocButtons';

const Section = ({ id, data, steps, currentDoc}) => {
  
  const dispatch = useDispatch();
  const {
    register,
  } = useForm({
    defaultValues: {
      selectInput: currentDoc.hasOwnProperty('id') ? currentDoc.id : ''
    },
  });

  const handleChange = (event) => {
    dispatch(displayOmStatus(event.target.value));
  }

  let isDocFinished = false;
  const unfinishedStep = steps.find((step) => !step.status)

  if (!unfinishedStep) {
    isDocFinished = true;
  }

  console.log('CURRENT DOC PLEASE : ', currentDoc);
  return (
    <section id={id} className="my-documents__files">
      <SelectField
        data={data}
        register={register}
        handler={handleChange}
        formField="selectInput"
        id="list"
        label={`Liste des Ordres de Missions`}
        blankValue="Aucun document sélectionné"
      />
      {currentDoc.hasOwnProperty('id') && (
        <div className='om-status'>
          <FormSectionTitle>Statut des différentes étapes</FormSectionTitle>
          <div className='om-status__steps'>
            {steps.map((step) => (
              <div key={step.name} className={classNames("om-status__steps-step", {
                "om-status__steps-step--validated" : step.status,
                "om-status__steps-step--not-validated" : !step.status,
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
        <DocButtons {...currentDoc} isDocFinished={isDocFinished} />
      )}
    </section>
  );
};

Section.propTypes = {

};

export default Section;
