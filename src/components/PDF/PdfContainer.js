import React from 'react';
import PropTypes from 'prop-types';

// import './style.scss';
import { Document } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';

const PdfContainer = ({ children }) => {
  const { agent: { user } } = useSelector((state) => state);
  return (
    <Document>
      {children}
    </Document>
  );
}

PdfContainer.propTypes = {

};

export default PdfContainer;
