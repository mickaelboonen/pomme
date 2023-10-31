import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';

import PageTitle from 'src/components/PageTitle';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import {
  FaUserCircle, FaAt,
} from "react-icons/fa";

import './style.scss';
import FileManager from '../FileManager';
import { useSelector } from 'react-redux';
import { toggleViewer } from 'src/selectors/pdfFunctions';
import TravelerCardPdf from '../../../../components/PDF/TravelerCardPdf';

const TravelInfo = () => {
  const { agent : { user, agent, agentPersonalAddress}, docs: { programs }} = useSelector((state) => state);
  
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
  return (
    <>
      <main className="my-documents">
        <PageTitle>Informations de voyage</PageTitle>
        <div className='form'>
          <div className='form__section'>
            <FormSectionTitle>Mon Profil Voyageur</FormSectionTitle>




            <div className="form__section-field-buttons">
              <BlobProvider document={
                <Document>
                  <TravelerCardPdf agent={agent} contacts={contacts} agentAddress={agentPersonalAddress} programs={programs} />

                </Document>
              }>
                {({ blob }) => {          
                  const file = new File([blob], "monitoring-om-" +' om.id', {type: 'pdf'});

                  return (
                    <div className="form__section-field-buttons__row">
                      <button style={{margin: 'auto'}}type="button" onClick={() => { const data = watch(); data.file = file; submitFunction(data)}}>
                        Valider la demande
                      </button>
                      <button type="button" id="viewer-opener" onClick={handleShowDoc} style={{marginLeft: '1rem'}}>
                        Visualiser <br /> le document
                      </button>
                    </div>
                  );
                }}
              </BlobProvider>
            </div>







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
              <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
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
