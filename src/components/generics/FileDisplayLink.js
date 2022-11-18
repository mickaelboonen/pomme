import React from 'react';
import PropTypes from 'prop-types';
import File from '../../assets/images/pdf.svg';

import './style.scss';
import { Link } from 'react-router-dom';

const FileDisplayLink = ({ name, id, docType, role}) => (
  <Link to={`/gestionnaire/${role}/valider-un-document/${docType}/${id}`} className="file-display-link">
    <img className="file-display__image" src={File} alt="" />
    <p className="file-display__name">{name}</p>
  </Link>
);

FileDisplayLink.propTypes = {

};

export default FileDisplayLink;
