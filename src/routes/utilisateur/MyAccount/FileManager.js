import React from 'react';
import PropTypes from 'prop-types';

import { FaDownload, FaUpload, FaTrash, FaEdit } from "react-icons/fa";


import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleDocModal } from 'src/reducer/otherDocuments';

const FileManager = ({ icon, filename, label, id, needsSelect, data }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDownload = (event) => {
    console.log('handleDownload')

    const { id } = event.currentTarget.dataset;
  };

  const handleUplaod = (event) => {
    console.log('handleUplaod')
    console.log(event.currentTarget.dataset.id)
    const { id } = event.currentTarget.dataset;

    if (id === 'cars') {

    }
    else {
      
      dispatch(toggleDocModal({ action: 'add', type: label}));
    }
  };

  const handleEdit = (event) => {
    console.log('handleEdit')
    console.log(event.currentTarget.dataset.id)
    const { id } = event.currentTarget.dataset;
    if (id === 'cars') {
      
      const { value } = document.querySelector('select');
      
      if (!isNaN(value)) {
        navigate('/utilisateur/mboone01/mes-documents/modifier-un-véhicule/' + value)
      }
      else {
        window.alert("Veuillez sélectionner un véhiculer à modifier.")
      }
    }
    else {
      
      dispatch(toggleDocModal({ action: 'edit', type: label}));
    }
  };

  const handleDelete = (event) => {
    console.log('handleDelete')
    console.log(event.currentTarget.dataset.id)
    const { id } = event.currentTarget.dataset;

    if (window.confirm("Voulez-vous supprimer ce document ?")) {

      if (id === 'cars') {
        
        const { value } = document.querySelector('select');
        
        if (!isNaN(value)) {
          // TODO
        }
        else {
          window.alert("Veuillez sélectionner un véhiculer à supprimer.")
        }
      }
    }
  };
  return (
  <div className='file-manager'>
    <div className='file-manager__file'>
      <label className="form__section-field-label" htmlFor={id}>
        {label}
      </label>
     
        <div className='file-displayer'>
          <div className='file-displayer__icon-container'>
            {icon}
          </div>
           {!needsSelect && (
              <div className='file-displayer__name'>
                { filename === '' ? 'Aucun fichier enregistré' : filename}
              </div>  
            )}
          {needsSelect && (
            <select className='file-displayer__select'>
              <option>Aucun véhicule sélectionné</option>
              {data.map((car) => <option key={car}>{car}</option>)}
            </select>
          )}
        </div>
    

    </div>
    <div className='file-manager__buttons'>
      {!needsSelect && (
        <button
          className='file-manager__buttons-button'
          onClick={handleDownload}
          data-id={id}
          type="button"
        >
          <FaDownload/>
        </button>
      )}
      
      <button
        className='file-manager__buttons-button'
        onClick={handleUplaod}
        data-id={id}
        type="button"
      >
        <FaUpload/>
      </button>
      
      <button
        className='file-manager__buttons-button'
        onClick={handleEdit}
        data-id={id}
        type="button"
      >
        <FaEdit/>
      </button>
      <button
        className='file-manager__buttons-button'
        onClick={handleDelete}
        data-id={id}
        type="button"
      >
        <FaTrash
      />
      </button>

    </div>
  </div>
);}

FileManager.propTypes = {
};

FileManager.defaultProps = {
  needsSelect: false,
  data: null,
};

export default FileManager;
