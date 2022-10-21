import React from 'react';
import PropTypes from 'prop-types';
import File from '../../assets/images/file.svg';

import './style.scss';

const FileDisplay = ({ name }) => (
  <div className="file-display">
    <img className="file-display__image" src={File} alt="" />
    <p className="file-display__name">{name}</p>
</div>
);

FileDisplay.propTypes = {

};

export default FileDisplay;
