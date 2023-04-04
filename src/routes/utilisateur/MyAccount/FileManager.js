import React from 'react';
import PropTypes from 'prop-types';

import { FaDownload, FaUpload, FaTrash, FaEdit } from "react-icons/fa";


import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleDocModal, deletePermFile } from 'src/reducer/otherDocuments';
import { displayVehicle, deleteVehicle  } from '../../../reducer/vehicle';

const FileManager = ({ icon, file, label, id, needsSelect, data, user = '' }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDownload = (event) => {
    const { id } = event.currentTarget.dataset;
  };

  const handleUplaod = (event) => {
    const { id } = event.currentTarget.dataset;

    if (id === 'cars') {
      navigate(`/utilisateur/${user}/mes-documents/ajouter-un-véhicule` )

    }
    else {
      
      dispatch(toggleDocModal({ action: 'add', type: id}));
    }
  };

  const handleEdit = (event) => {
    const { id } = event.currentTarget.dataset;
    if (id === 'cars') {
      
      const { value } = document.querySelector('select');
      
      if (!isNaN(value)) {
        dispatch(displayVehicle(value))
        navigate(`/utilisateur/${user}/mes-documents/modifier-un-véhicule/` + value)
      }
      else {
        window.alert("Veuillez sélectionner un véhiculer à modifier.")
      }
    }
    else {
      
      dispatch(toggleDocModal({ action: 'edit', type: id}));
    }
  };

  const handleDelete = (event) => {
    
    const { id } = event.currentTarget.dataset;

    if (window.confirm("Voulez-vous supprimer ce document ?")) {

      if (id === 'cars') {
        
        const { value } = document.querySelector('select');
        
        if (!isNaN(value)) {
          // TODO
          dispatch(deleteVehicle(value));
        }
        else {
          window.alert("Veuillez sélectionner un véhiculer à supprimer.")
        }
      }
      else {
        if (file === undefined) {
          window.alert("Il n'y a pas de document à supprimer.");
        }
        else {
          dispatch(deletePermFile(file));
        }
      }
    }
  };

  const filename = file ? file.name : '';
  console.log(file);
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
              {data.map((car) => <option key={car.id} value={car.id}>{car.name}</option>)}
            </select>
          )}
        </div>
    

    </div>
    <div className='file-manager__buttons'>
      {(!needsSelect && user === 'mboone01') && (
        <a
          className='file-manager__buttons-button'
          // onClick={handleDownload}
          data-id={id}
          type="button"
          href={file ? file.url : ''}
          download={file ? file.name : ''}
        >
          <FaDownload/>
        </a>
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
