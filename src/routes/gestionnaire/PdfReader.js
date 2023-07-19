import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const PdfReader = ({ docToShow, toggleViewer }) => (
  <div className={classNames("form-layout__viewer", { "form-layout__viewer--empty": docToShow === ''})}>
    <div className='form-layout__viewer-pdf'>
      <div className="form-layout__viewer-pdf__nav">
        <p className="form-layout__viewer-pdf__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer le PDF</p>
      </div>
      <embed
        className="form-layout__viewer-pdf__embed"
        src={docToShow}
        width="100%"
        height="600px"
        type="application/pdf"
      />
      <p className="form-layout__viewer-pdf__instruction">Veuillez sélectionner une pièce jointe à afficher.</p>
    </div>
  </div>
);

PdfReader.propTypes = {

};

export default PdfReader;
