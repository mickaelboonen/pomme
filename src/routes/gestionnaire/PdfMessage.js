import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';
import FileField from 'src/components/Fields/FileField';

import './style.scss';
import classNames from 'classnames';
import { MdRefresh } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateMonitorPdf } from 'src/reducer/omManager'

const PdfMessage = ({ om }) => {
  const { register, watch } = useForm()
  const dispatch = useDispatch()

  const handleSubmit = (data) => {

    console.log(data);
  }
  useEffect(() => {
    
    const el = document.getElementById('plop');
    const data = watch();
    console.log(data);
  }, [])
  return (
  <div className='pdf-message'>
    <p>Mise à Jour de l'Ordre de Mission en cours</p>
    <MdRefresh className='my-documents__files-buttons-icon my-documents__files-buttons-icon--animated'></MdRefresh>
      <BlobProvider document={<ValidationMonitoringPdf om={om}/>}>
        {({ blob }) => {          
          const file = new File([blob], "blol", {type: 'pdf'});
          
          const fileUrl = URL.createObjectURL(file);
          const data = watch();
          data.file = file;
          
          return (
            <>
              <button type="button" onClick={() => { const data = watch(); data.file = file; handleSubmit(data)}}>
                Valider la demande
              </button>
            </>
          );
        }}
      </BlobProvider>
    </div>
);}

PdfMessage.propTypes = {

};

export default PdfMessage;
