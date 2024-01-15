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

const OneFileForm = ({ onUserPage }) => {
  
  const { docs: { action, type, agentDocs},
    tmp: { signature },
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

  let filename = '';
  if (onUserPage) {
    filename = docToUpdate ? docToUpdate.name : '';
  }
  else {
    filename = signature.name;
  }

  // console.log(filename);

  const close = () => {
    dispatch(toggleDocModal({ action: '', type: ''}));
  }
  
  const onSubmit = (data) => {
    
    if (data.file instanceof File) {

      const fileSizeInKB = data.file.size / 1024;
      const maxSizeInKB = 2048; // Limite de 2048 KiB (2 Mo) 

      // Vérifiez si la taille du fichier est inférieure à la limite souhaitée (en kilo-octets)
      if (fileSizeInKB > maxSizeInKB) {
        alert('Le fichier est trop volumineux. Veuillez choisir un fichier de taille inférieure à 2 Mo.');
        return;
    }

    if (action === "add") {
        dispatch(addPermFile({data: data, type: type, user: user, onUserPage: onUserPage, docs}));
      }
      else if (action === 'edit') {
        dispatch(editPermFile({data: data, type: type, user: user, onUserPage: onUserPage, id: onUserPage ? docToUpdate.id : signature.id}));
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
        <div className="form__section-field" style={{marginBottom: 0}}>
          <FileField
            register={register}
            formField="file"
            id="lol"
            fileName={filename}
            label="Sélectionner un fichier à télécharger"
            setValue={setValue}
            error={errors.file}
            pieces="Le fichier ne doit pas excéder 2Mo."
          />
        </div>
      </div>
      <a href="https://www.ilovepdf.com/fr/compresser_pdf" target="_blank" style={{textDecoration: 'underline', textAlign: 'center', display: 'block', marginTop: '-1rem', marginBottom: '2rem', fontStyle: 'italic'}} className="form__section-field-label">Fichier trop lourd ? Compressez votre PDF</a>

      <div className="form__section-field-buttons" id="modal-button">
        <div className="form__section-field-buttons__row" id="modal-button">
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
      </div>
    </form>
  </div>
);}

OneFileForm.propTypes = {

};
OneFileForm.defaultProps = {
  onUserPage: true,
};

export default OneFileForm;
