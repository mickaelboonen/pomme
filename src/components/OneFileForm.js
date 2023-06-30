import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import './modalStyle.scss';

// Components 
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';
import FileField from 'src/components/Fields/FileField';

// Actions
import { toggleDocModal, addPermFile, editPermFile } from 'src/reducer/otherDocuments';

import './style.scss';

const OneFileForm = () => {
  
  const { docs: { action, type, agentDocs},
    agent: { user }
  } = useSelector((state) => state)

  const docToUpdate = agentDocs.find((doc) => doc.type === type);

  const dispatch = useDispatch();
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState:
    { errors },
  } = useForm();

  const setTitle= () => {
    if (action === 'add') {
      return 'Ajouter un nouveau fichier - ' + type;
    }
    else if (action === 'edit') {
      return 'Modifier un fichier - ' + type;
    }
  }



  const close = () => {
    dispatch(toggleDocModal({ action: '', type: ''}));
  }
  
  const onSubmit = (data) => {
    
    if (data.file instanceof File) {
      if (action === "add") {
        dispatch(addPermFile({data: data, type: type, user: user}));
      }
      else if (action === 'edit') {
        dispatch(editPermFile({data: data, type: type, user: user, id: docToUpdate.id}));
      }
    }
    else {
      setError('file', { type: 'custom', message: 'Merci de sélectionner un fichier à télécharger.'})
    }
  }

  return (
  <div className='modal modal--file'>
    <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>{setTitle()}</FormSectionTitle>
        <div className="form__section-field">
          <FileField
            register={register}
            formField="file"
            id="lol"
            fileName={docToUpdate ? docToUpdate.name : ''}
            label="Sélectionner un fichier à télécharger"
            setValue={setValue}
            error={errors.file}
          />
        </div>
      </div>
      <div className="form__section-field-buttons" id="modal-button">
        <ButtonElement
          type="submit"
          label="Valider"
          />
        <ButtonElement
          type="button"
          label="Annuler"
          handler={close}
        />
      </div>
    </form>
  </div>
);}

OneFileForm.propTypes = {

};

export default OneFileForm;
