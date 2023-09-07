import React from 'react';
import PropTypes from 'prop-types';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import './style.scss';
import ValidationMonitoringPdf from '../../components/PDF/ValidationMonitoringPdf';
import { useSelector } from 'react-redux';

const SuiviPdf = () => {
  const { omManager: { pendingDocs }} = useSelector((state) => state);
  return (
    <div style={{width:"100%", height:"100vh"}}>
      <PDFViewer>
        <ValidationMonitoringPdf om={pendingDocs[0]}/>
      </PDFViewer>

    </div>
);}

SuiviPdf.propTypes = {

};

export default SuiviPdf;
