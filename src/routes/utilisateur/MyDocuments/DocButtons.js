import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaDownload, FaTrash } from 'react-icons/fa';

import './style.scss';

import { deleteOm } from 'src/reducer/omForm';
import { deleteEf } from 'src/reducer/ef';

const DocButtons = ({ id, status, peche, name, om, file, transports, isDocFinished, isOm}) => {
  
  let buttons = [];
  const dispatch = useDispatch();
  
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
        label: "Passer à l'étape finale",
        status: [1],
      },
      {
        name: 'delete',
        link: "#",
        label: 'Prendre connaissance du refus et supprimer',
        status: [0],
      },
      // {
      //   name: 'ef',
      //   link: `/utilisateur/${encodeURIComponent('mes-états-de-frais')}`,
      //   label: "Créer l'état de frais",
      //   status: [9, 10],
      // },
    ];
  }
  else {
    const link = peche ? `/modifier-un-document/${encodeURIComponent('état-de-frais')}-de-vacataire` : `/modifier-un-document/${encodeURIComponent('état-de-frais')}`
    const query = peche ? `id=${id}` : `id=${id}&om=${om ? om.id : null}`;
    console.log(link, query);
    buttons = [
      {
        name: 'modify',
        link: link + '?etape=1&' + query,
        label: 'Reprendre / Modifier',
        status: [1],
      },
      {
        name: 'submit',
        link: link + '?etape=6' + query,
        label: "Passer à l'étape finale",
        status: [1],
      },
    ];
  };
  // console.log(isOm, (transports.transport_type.indexOf('plane') !== -1 || transports.transport_type.indexOf('train') !== -1));
  if (isOm && (transports.transport_type.indexOf('plane') !== -1 || transports.transport_type.indexOf('train') !== -1)) {
    buttons.push({
        name: 'transports',
        link: "/utilisateur/demande-de-transports?om=" + id,
        label: 'Faire une demande de billets',
        status: [10],
      });
  }
  if (transports.authorizations) {
    try {

      transports.authorizations.forEach((auth) => {
        if (auth.type === 'company-car') {
          const x = {
            name: 'demat-car',
            link: "https://demat.unimes.fr/direction-du-patrimoine/reservation-de-vehicule/ticket?sector=1&service=2",
            label: 'Faire une demande de véhicule de service',
            status: [10, 11],
          };
          buttons.push(x);
          throw new Error("Break the loop.")
        }
      })
    }
    catch(error) {

    }
  }
  const handleClickOnDelete = () => {
    if (window.confirm("Confirmez-vous la suppression de l'ordre de mission " + name + " ? ")) {
      if (isOm) {
        dispatch(deleteOm(id));
      }
      else {
        dispatch(deleteEf(id));
      }


    }
    
  }
  // console.log(buttons);
  
  return (
    <div className="my-documents__files-buttons">
      {buttons.map((button) => {

        if (button.status.indexOf(status) >= 0) {
          if (button.name !== "submit" || (button.name === "submit" && isDocFinished)) {
            if (button.link.slice(0, 8) === 'https://') {
              return (
                <a
                  href={button.link}
                  target="_blank"
                >
                  {button.label} Dérogation au GDM
                </a>
              );
              
            }
            return (
              <Link key={button.name} to={button.link}>
                {button.label}
              </Link>
            )
          }
        }
      })}
      {status > 1 && <a href={file} download={name + '.pdf'} style={{textAlign: 'center'}}> <FaDownload className='my-documents__files-buttons-icon' /> {isOm ? 'Ordre de Mission' : 'État de Frais'}</a>}
      {(isOm && status >= 1 )&& transports.dispensations.map((dispensation) => (
        <a
          href={dispensation.file}
          download="dérogation.pdf"
        >
          <FaDownload className='my-documents__files-buttons-icon' /> Dérogation au GDM
        </a>
      ))}
      {(isOm && status >= 1 && transports.authorizations.length > 0 && transports.authorizations[0].file !== "pending") && (
        <a
          href={transports.authorizations[0].file}
          download="demande-d-utilisation-de-vehicule.pdf"
        >
          <FaDownload className='my-documents__files-buttons-icon' /> Demande de véhicule
        </a>
      )}
      {status === 1 && <button type="button" style={{width: 'fit-content'}} onClick={handleClickOnDelete}><FaTrash className='my-documents__files-buttons-icon' /> Supprimer le document</button>}
    </div>
  );
}

DocButtons.propTypes = {

};

export default DocButtons;
