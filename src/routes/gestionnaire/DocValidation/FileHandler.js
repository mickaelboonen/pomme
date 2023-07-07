import React from 'react';
import PropTypes from 'prop-types';
import { FaFilePdf, FaHandPointRight} from 'react-icons/fa';
import { CiCircleCheck, CiCircleRemove} from 'react-icons/ci';

import { getSavedFileName } from 'src/selectors/formDataGetters';
import './style.scss';

const FileHandler = ({ data, label, field, displayPdf }) => {
  
  const handleClick = (event) => {
    displayPdf(data)
  }
  return (
  <div className='file-form'>
    <form className='file-form__head'>
      <p className='file-form__head-label'>{label}</p>
      <select className='file-form__head-select' name="" id="">
        <option className='file-form__head-select-option' value="">Non vérifié</option>
        <option className='file-form__head-select-option' value="">Validé</option>
        <option className='file-form__head-select-option' value="">Rejeté</option>
      </select>
    </form>
    <div className='file-form__body'>
      <FaHandPointRight className='file-form__body-icon' />
      <p className='file-form__body-file' id={field} onClick={handleClick}>Fichier à checker</p>
    </div>
  </div>
);}

FileHandler.propTypes = {

};

export default FileHandler;
