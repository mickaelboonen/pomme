import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FaDownload } from 'react-icons/fa';

import './style.scss';
import PdfDownloadButton from '../../../components/pdfDownloadButton';

const DocButtons = ({ id, status, name, om, file, transports, isDocFinished, isOm}) => {
  const downloadFileStatusArray = [2, 8];
  let buttons = [];
  
  if (isOm) {
    buttons = [
      {
        name: 'modify',
        link: "/modifier-un-document/ordre-de-mission?etape=1&id=" + id,
        label: 'Reprendre / Modifier',
        status: [1],
      },
      {
        name: 'submit',
        link: "/modifier-un-document/ordre-de-mission?etape=6&id=" + id,
        label: "Soumettre l'ordre de mission",
        status: [1],
      },
      {
        name: 'transport-request',
        link: "#",
        label: 'Faire une demande de déplacement',
        status: [8],
      },
      {
        name: 'delete',
        link: "#",
        label: 'Prendre connaissance du refus et supprimer',
        status: [0],
      },
      {
        name: 'delete',
        link: "#",
        label: 'Prendre connaissance du refus et supprimer',
        status: [0],
      },
      {
        name: 'delete',
        link: "#",
        label: 'Prendre connaissance du refus et supprimer',
        status: [0],
      },
    ];
  }
  else {
    buttons = [
      {
        name: 'modify',
        link: `/modifier-un-document/${encodeURIComponent('état-de-frais')}?etape=1&id=${id}&om=${om ? om.id : null}`,
        label: 'Reprendre / Modifier',
        status: [1],
      },
      {
        name: 'submit',
        link: `/modifier-un-document/${encodeURIComponent('état-de-frais')}?etape=6&id=${id}&om=${om ? om.id : null}`,
        label: "Soumettre l'ordre de mission",
        status: [1],
      },
    ];
  };
  
  return (
    <div className="my-documents__files-buttons">
      {buttons.map((button) => {

        if (button.status.indexOf(status) >= 0) {
          if (button.name !== "submit" || (button.name === "submit" && isDocFinished)) {

            return (
              <Link key={button.name} to={button.link}>
                {button.label}
              </Link>
            )
          }
        }
      })}
      {downloadFileStatusArray.indexOf(status) >= 0 && <a href={file} download={name + '.pdf'} style={{textAlign: 'center'}}> <FaDownload className='my-documents__files-buttons-icon' /> {isOm ? 'Ordre de Mission' : 'État de Frais'}</a>}
      {isOm && downloadFileStatusArray.indexOf(status) >= 0 && transports.dispensations.map((dispensation) => (
        <a
          key={dispensation.id}
          href={dispensation.file}
          download="dérogation.pdf"
        >
          <FaDownload className='my-documents__files-buttons-icon' /> Dérogation au GDM
        </a>
      ))}
      {isOm && downloadFileStatusArray.indexOf(status) >= 0 && transports.authorizations.length > 0 && transports.authorizations[0].file !== "pending" && (
        <a
          key={transports.authorizations[0].id}
          href={transports.authorizations[0].file}
          download="demande-d-utilisation-de-vehicule.pdf"
        >
          <FaDownload className='my-documents__files-buttons-icon' /> Demande de véhicule
        </a>
      )}
    </div>
  );
}

DocButtons.propTypes = {

};

export default DocButtons;
