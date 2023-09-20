import React from 'react';
import PropTypes from 'prop-types';
import { FaHandPointRight} from 'react-icons/fa';

import { changeFileStatus } from 'src/reducer/omForm';
import './style.scss';
import { useDispatch } from 'react-redux';

const FileHandler = ({ status, dataLink, label, displayPdf, url, entity, entityId }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    displayPdf(dataLink)
  }

  const handleStatusChange = (event) => {
    
    dispatch(changeFileStatus({url: url, status: event.target.value, entity: entity, entityId: entityId}))
  };
  
  const statusToShow = status ? '1' : status === false ? '0' : '';

  return (
  <div className='file-form'>
    <form className='file-form__head'>
      <p className='file-form__head-label'>{label}</p>
      <select className='file-form__head-select' name="" id="file-status" onChange={handleStatusChange} value={statusToShow}>
        <option className='file-form__head-select-option' value=''>Non vérifié</option>
        <option className='file-form__head-select-option' value="1">Validé</option>
        <option className='file-form__head-select-option' value="0">Rejeté</option>
      </select>
    </form>
    <div className='file-form__body'>
      <FaHandPointRight className='file-form__body-icon' />
      <p className='file-form__body-file' id={'d'} onClick={handleClick}>Fichier à checker</p>
    </div>
  </div>
);}

FileHandler.propTypes = {
  dataLink: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  url : PropTypes.string.isRequired,
  entity : PropTypes.string.isRequired,
  entityId : PropTypes.number.isRequired,
  displayPdf: PropTypes.func.isRequired,
};

export default FileHandler;
