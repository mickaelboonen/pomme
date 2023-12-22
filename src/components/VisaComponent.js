import React, { useState } from 'react';
import { FaEye, FaDownload } from 'react-icons/fa';
import {  Document, PDFViewer } from '@react-pdf/renderer';

import './style.scss';

// Components
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';

// Actions
import classNames from 'classnames';

const VisaComponent = ({data, user, gest, watch, isOm}) => {

  const [viewer, setViewer] = useState('');
  // console.log(data);
  // console.log(data.file);
  const isFileTooLong = data.file.length > 2000000 ? true : false;

  const handleClick = () => {
    viewer === '' ? setViewer(data.file) : setViewer('');
  }
  
  return (
    <div className='viseur'>
      <div className={classNames('viseur__buttons', {'viseur__buttons--no-docs': isFileTooLong && viewer !== ''})}>
        <div className='my-documents__files-buttons'>
          { !isFileTooLong && (
            <button onClick={handleClick} type="button">
              <FaEye className='my-documents__files-buttons-icon'/>
              <p>{viewer === '' ? (`Voir l'${isOm ? 'OM' : 'EF'}`) : "Voir les visas"}</p>
            </button>
          )}
          <a href={data.file} download={`${data.name}.pdf`} >
            <FaDownload className='my-documents__files-buttons-icon' /> Télécharger l'{isOm ? 'OM' : 'EF'}
          </a>
          {isFileTooLong && <p style={{textAlign: 'center', marginBottom: '1rem'}}>Le fichier est trop lourd pour être visualisé dans le navigateur. Veuillez le télécharger.</p>}
        </div>
      </div>
      {(!isFileTooLong  && viewer !== '') && (
        <div style={{height: '600px', width: '68%'}}>
          <div style={{height: '600px', marginBottom: '1rem'}}>
            <embed
              className="form-layout__viewer-pdf__embed"
              src={viewer}
              width="100%"
              height="1200px"
              type="application/pdf"
            />
          </div>
        </div>
      )}
      {viewer === '' && (
        <div style={{height: '600px', width: '68%'}}>
          <PDFViewer>
            <Document>
              <ValidationMonitoringPdf
                om={data}
                user={user}
                agent={gest}
                isGest={false}
                gestData={watch()}
                isOm={isOm}
              />
            </Document>
          </PDFViewer>
        </div>
      )}
    </div>

  );
}

VisaComponent.propTypes = {

};

export default VisaComponent;
