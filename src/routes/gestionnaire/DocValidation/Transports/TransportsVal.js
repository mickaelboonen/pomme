import React from 'react';

import '../style.scss';

// Components
import FileHandler from '../FileHandler';
import InputValueDisplayer from '../InputValueDisplayer';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Reducer


const TransportsVal = ({ displayPdf, data }) => {
  let trainData = {}
  if (data.transport_type.indexOf('train') >= 0) {
    trainData = {
      category: data.transport_class.find((payment) => payment.includes('first') || payment.includes('second')).includes('first') ? 'Première classe' : 'Deuxième classe',
      payment: data.transport_payment.find((payment) => payment.includes('train')).includes('agent') ? "Avancé par l'agent" : "Payé par Unîmes",
      file: data.dispensations.find((dis) => dis.type.includes('train')).file
    }
  }

  let planeData = {}
  if (data.transport_type.indexOf('plane') >= 0) {
    planeData = {
      category: data.transport_class.find((payment) => payment.includes('eco') || payment.includes('business')).includes('business') ? 'Classe affaire' : 'Classe économique',
      payment: data.transport_payment.find((payment) => payment.includes('plane')).includes('agent') ? "Avancé par l'agent" : "Payé par Unîmes",
      file: data.dispensations.find((dis) => dis.type.includes('avion')).file
    }
  }
  
  let otherTransports = '';
  if (data.ferry) {
    otherTransports += 'Ferry. '
  }
  if (data.taxi) {
    otherTransports += 'Taxi. '
  }
  return (
    <>
      <div className="form__section">
        {trainData.hasOwnProperty('category') && (
          <>
            <FormSectionTitle>Train</FormSectionTitle>
            <InputValueDisplayer
              label="Classe du transport"
              value={trainData.category}
            />
            <InputValueDisplayer
              label="Règlement du train"
              value={trainData.payment}
            />
            {trainData.file && (
              <FileHandler
                key={"1"}
                label="Demande de dérogation pour le train"
                data={trainData.file}
                displayPdf={displayPdf}
              />
            )}
          </>
        )}
      </div>
      <div className="form__section">
        {planeData.hasOwnProperty('category') && (
          <>
            <FormSectionTitle>Avion</FormSectionTitle>
            <InputValueDisplayer
              label="Classe du transport"
              value={trainData.category}
            />
            <InputValueDisplayer
              label="Règlement du transport"
              value={trainData.payment}
            />
            {planeData.file && (
              <FileHandler
                key={"1"}
                label="Demande de dérogation pour l'avion"
                data={planeData.file}
                displayPdf={displayPdf}
              />
            )}
          </>
        )}
      </div>
      <div className="form__section">
        <FormSectionTitle>Véhicule</FormSectionTitle>
        {data.authorizations.map((file) => (
          <FileHandler
            key={data.authorizations.indexOf(file)}
            label="Demande préalable d'utilisation d'un véhicule"
            data={file.file}
            displayPdf={displayPdf}
          />
        ))}
        <InputValueDisplayer
          label="Parking"
          value={data.parking ? 'Oui' : 'Non'}
        />
        <InputValueDisplayer
          label="Péage"
          value={data.toll ? 'Oui' : 'Non'}
        />
      </div>
      <div className="form__section">
        <FormSectionTitle>Déplacement durant la mission</FormSectionTitle>
            
        <InputValueDisplayer
          label="Transports en commun"
          value={data.public_transports ? 'Oui' : 'Non'}
        />
        <InputValueDisplayer
          label="Autres types de transports"
          value={otherTransports}
        />
        {data.taxi && (
          <FileHandler
            label="Demande de dérogation"
            data={"data.dispensations.find((dis) => dis.type.includes('taxi')).file"}
            displayPdf={displayPdf}
          />
        )}
      </div>

    </>
    
  );
};

TransportsVal.propTypes = {

};

export default TransportsVal;
