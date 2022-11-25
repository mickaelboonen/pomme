import React from 'react';
import PropTypes from 'prop-types';

import Logo from 'src/assets/images/pdf.svg';

import './style.scss';

const FileProof = ({ id }) => (
  <div className='file-proof'>
    <img className='file-proof__image' key={id} src={Logo} alt="" />
    <p className='file-proof__name'>Nom du fichier</p>
  </div>
);

FileProof.propTypes = {

};

export default FileProof;
