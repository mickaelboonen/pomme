import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';
import { FaDownload, FaEye, FaFilePdf } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";


import PageTitle from 'src/components/PageTitle';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import {
  FaUserCircle, FaAt,
} from "react-icons/fa";

import './style.scss';
import FileManager from '../FileManager';
import { useDispatch, useSelector } from 'react-redux';
import { toggleViewer } from 'src/selectors/pdfFunctions';
import TravelerCardPdf from 'src/components/PDF/TravelerCardPdf';
import { useForm } from 'react-hook-form';
import InputValueDisplayer from 'src/routes/gestionnaire/DocValidation/InputValueDisplayer';

import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';
import { addPermFile, editPermFile } from 'src/reducer/otherDocuments';
// import { split } from 'lodash';

const TravelInfo = () => {
  const dispatch = useDispatch();
  const { watch, formState: { errors } } = useForm();
  const { agent : { user, agent, agentPersonalAddress}, docs: { programs, pv }} = useSelector((state) => state);

  const onSubmit = (data) => {
 // console.log("IN SUBMIT = ", data);
    // return;

    if (pv) {
      dispatch(editPermFile({data: data, type: 'pv', user: user, id: pv.id}));
    }
    else {
      dispatch(addPermFile({data: data, type: 'pv', user: user}));
    }


  }
  
  const [isPdfVisible, setIsPdfVisible] = useState(false)

  const contacts =  [
    {
      id: 1,
      name: 'Yann Egea',
      phone: '46.44',
      icon: <FaUserCircle className='file-displayer__icon-container-icon' style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />,
    },
    {
      id: 2,
      name: 'Sabine Tjollyn',
      phone: '45.82',
      icon: <FaUserCircle className='file-displayer__icon-container-icon' style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />,
    },
    {
      id: 3,
      name: 'Delphine Brigliano',
      phone: '46.15',
      icon: <FaUserCircle className='file-displayer__icon-container-icon' style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />,
    },
    {
      id: 4,
      name: 'financier.depenses@unimes.fr',
      phone: '',
      icon: <FaAt className='file-displayer__icon-container-icon' style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />,
    },
  ]

  const handleShowDoc = (event) => {
    toggleViewer(event, setIsPdfVisible)
  }

  const getDateFromName = (name) => {
    const fullDate = name.slice(12, 26);
    const splitDate = fullDate.split('T');
    return splitDate[0].replaceAll('-', '/') + ' à ' + splitDate[1].replace('-', 'H');
  }

  const pvMessage = pv ? `Dernier profil voyageur généré le ${getDateFromName(pv.name)}` : "Aucun PDF n'a été généré pour le Profil Voyageur";


  const [message, setMessage] = useState('');
  const handleHover = (event) => {
    const { id } = event.target.firstChild;
    let message = '';
    if (id === 'show') {
      message = 'Simuler un nouveau profil voyageur';
    }
    else if (id === 'generate') {
      message = 'Générer ' + (pv ? 'un nouveau' : 'votre') + ' profil voyageur';

    } else if (id === 'download') {
      message = 'Télécharger votre profil voyageur existant';
    }

    setMessage(message)
  }
  const handleHoverOut = () => {
    setMessage('')
  }
  return (
    <>
      <main className="my-documents">
        <PageTitle>Informations de voyage</PageTitle>
        <div className='form'>
          <div className='form__section'>
            <FormSectionTitle>Mon Profil Voyageur</FormSectionTitle>
            <InputValueDisplayer
              label="Profil Voyageur en format PDF"
              value={pvMessage}
            />
            <div className="file-manager">
              <BlobProvider document={
                <Document>
                  <TravelerCardPdf agent={agent} contacts={contacts} agentAddress={agentPersonalAddress} programs={programs} />
                </Document>
              }>
              {({ blob }) => {
                  const dateObj = new Date();   
                  const date = getDDMMYYDate(dateObj);
                  const time = getHHMMTime(dateObj);
                  const file = new File([blob], "pv_" + user + '_' + date.replaceAll('/','-') + 'T' + time, {type: 'pdf'});

                  return (
                    <>
                    <div className='file-manager__buttons'>
                      {pv && pv.file && (
                        <button
                          className='file-manager__buttons-button'
                          type="button"
                          onMouseLeave={handleHoverOut}
                          onMouseEnter={handleHover}
                        >
                          <a download href={pv.file} id="download"><FaDownload /></a>
                        </button>
                      )}
                      <button
                        className='file-manager__buttons-button'
                        type="button"
                        onMouseLeave={handleHoverOut}
                        onMouseEnter={handleHover}
                        id="viewer-opener"
                        onClick={handleShowDoc}
                      >
                        <FaEye id="show"/>
                      </button>
                      <button
                        className='file-manager__buttons-button'
                        type="button"
                        onMouseLeave={handleHoverOut}
                        onMouseEnter={handleHover}
                        onClick={() => { const data = watch(); data.file = file; onSubmit(data)}}
                      >
                        <FaFilePdf id="generate"/>
                         {/* {!pv ? 'Générer' : 'Mettre  à jour'} le Profil Voyageur */}
                      </button>
                    </div>
                    {message !== '' && <p className='file-manager__message'>{message}</p>}
                    </>                    
                  );
              }}
            </BlobProvider>
          </div>
        </div>
        <div className='form__section'>
          <FormSectionTitle>Abonnements & cartes de fidélité</FormSectionTitle>
          <FileManager
            icon={<FaUserCircle
              className='file-displayer__icon-container-icon'
            />}
            id="programs"
            label="Liste des cartes d'abonnement ou de fidélité"
            filename=""
            handler={null}
            user={user}
            needsSelect="programme"
            data={programs}
          />
        </div>
        <div className='form__section'>
          <FormSectionTitle>Mes contacts</FormSectionTitle>
          <ul className='form__section-list'>
            {contacts.map((contact) => (
              <li className='form__section-list-item' key={contact.id}> {contact.icon} {contact.name}{contacts.indexOf(contact) !== contacts.length -1 ? ' - ' + contact.phone : ''}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
        {isPdfVisible && (
          <div className="pdf-viewer">
            <div className="pdf-viewer__nav">
              <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={handleShowDoc}>Fermer la fenêtre</p>
            </div>
            <PDFViewer className='form__section-recap'>
              <Document>
                <TravelerCardPdf agent={agent} contacts={contacts} agentAddress={agentPersonalAddress} programs={programs}/>
              </Document>
            </PDFViewer>
          </div>
        )}
    </>                
  );
}

TravelInfo.propTypes = {

};

export default TravelInfo;
