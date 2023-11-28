import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaDownload } from 'react-icons/fa'
import { getSavedFileName } from 'src/selectors/formDataGetters';

import './../style.scss';

import VacationPdf from 'src/assets/docs/ef-etapes-vacation.pdf';

// Components
// import Step from './Step';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import StatusChecker from 'src/components/StatusChecker';

// Actions
import { uploadFile } from 'src/reducer/omForm';
import { updateEfSteps } from 'src/reducer/ef';

const Steps = ({ step }) => {
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const docId = loader.searchParams.get('id');

  const { 
    agent: { user},
    ef: { currentEf }
  } = useSelector((state) => state);
  
  let defaultValues = currentEf.steps;
  let filenames= '';

  if (defaultValues.steps_files.length === 1) {
    filenames = getSavedFileName(defaultValues.steps_files[0]);
  }
  else if (defaultValues.steps_files.length > 1) {
    defaultValues.steps_files.forEach((file) => {
      filenames += getSavedFileName(file) + ' - ';
    })
  }
    
  const {
    register, handleSubmit, watch,
    setValue,  setError, clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    const file = data.stepsFiles.length > 0 ? data.stepsFiles.find((file) => file instanceof File) : null;

    if (file) {
      clearErrors('files');
      data.status = 1;
      dispatch(uploadFile({data: data, step: 'steps', docType: 'ef'}))

    }
    else {
      if (window.confirm("Aucun tableau d'étapes n'a été ajouté. Confirmez-vous l'absence d'étapes lors de votre déplacement ?")) {
        data.status = 1;
        data.stepsFiles = [];

        dispatch(updateEfSteps(data))
      }
      else {
        setError('stepsFiles', {type: "custom", message: "Veuillez fournir le tableau des étapes."})
      }
 
    }
    
  };
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StatusChecker status={defaultValues.status} />
      <div className='form__section'>
        <FormSectionTitle>Tableau des étapes</FormSectionTitle>
        <div className='my-documents__files-buttons'>
          <a href={VacationPdf} download={`${user}-tableau-vacation.pdf`} >
            <FaDownload className='my-documents__files-buttons-icon' /> Télécharger le tableau
          </a>
        </div>
        <FileField
          register={register}
          formField="stepsFiles"
          id="files-field"
          multiple
          fileName={filenames}
          label="Tableaux des jours de vacation"
          error={errors.stepsFiles}
          setValue={setValue}
          accept='pdf'
        />
        <HiddenField id="docId" value={docId} register={register} />
      </div>
      <div className="form__section-field form__section-field--infos-container">
        <p className="form__section-message">Si vous <strong>n'avez pas </strong> d'étapes de voyage à déclarer, veuillez quand même <strong>valider la saisie </strong> pour valider cette étape et ne pas bloquer la création de l'EF.</p>
      </div>
      <Buttons
        step={step}
        id={docId}
        url={loader}
        watch={watch}
        type="ef"
      />
    </form>
    
  );
};

Steps.propTypes = {

};

export default Steps;
