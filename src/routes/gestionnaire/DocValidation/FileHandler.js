import React from 'react';
import PropTypes from 'prop-types';
import { FaFilePdf } from 'react-icons/fa';

import { getSavedFileName } from 'src/selectors/formDataGetters';
import './style.scss';

const FileHandler = ({ data, label }) => {
  
  return (
  <div className='file-form'>
    <form className='file-form__head'>
      <p>{label}</p>
      <select name="" id="">
        <option value="">Non vérifié</option>
        <option value="">Validé</option>
        <option value="">Rejeté</option>
      </select>
    </form>
    <div className='file-form__body'>
      <p><FaFilePdf />{getSavedFileName(data)}</p>
    </div>
  </div>
);}

FileHandler.propTypes = {

};

export default FileHandler;
