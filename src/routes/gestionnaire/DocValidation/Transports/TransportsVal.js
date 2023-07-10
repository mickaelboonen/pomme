import React from 'react';

import '../style.scss';

// Components
import FileHandler from '../FileHandler';
import InputValueDisplayer from '../InputValueDisplayer';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Reducer


const TransportsVal = ({ displayPdf, data, entity }) => {
  let trainData = []
  let planeData = []
  let taxiData = []
  let trainCategory = '';
  let trainPayment = '';
  let planeCategory = '';
  let planePayment = '';

  data.dispensations.forEach((dis) => {
    if (dis.type.includes('taxi')) {
      taxiData.push(dis);
    }
    else if (dis.type.includes('avion')) {
      planeData.push(dis);
      planeCategory = data.transport_class.find((payment) => payment.includes('eco') || payment.includes('business')).includes('business') ? 'Classe affaire' : 'Classe économique';
      planePayment = data.transport_payment.find((payment) => payment.includes('plane')).includes('agent') ? "Avancé par l'agent" : "Payé par Unîmes";

    }
    else if (dis.type.includes('train')) {
      trainData.push(dis);
      trainCategory = data.transport_class.find((payment) => payment.includes('first') || payment.includes('second')).includes('first') ? 'Première classe' : 'Deuxième classe';
      trainPayment = data.transport_payment.find((payment) => payment.includes('train')).includes('agent') ? "Avancé par l'agent" : "Payé par Unîmes";

    }
  })
  
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
        {trainData.length > 0 && (
          <>
            <FormSectionTitle>Train</FormSectionTitle>
            <InputValueDisplayer
              label="Classe du transport"
              value={trainCategory}
            />
            <InputValueDisplayer
              label="Règlement du train"
              value={trainPayment}
            />
            {trainData.file && (
              <FileHandler
                key={trainData.indexOf(file)}
                label="Demande de dérogation pour le train"
                dataLink={trainData.file}
                displayPdf={displayPdf}
                url={trainData.url}
                entity={entity}
                entityId={data.id}
                status={'file.file.status'}
                
              />
            )}
            {trainData.map((file) => (
              <FileHandler
                label="Demande de dérogation pour le train"
                dataLink={file.dataFile}
                displayPdf={displayPdf}
                url={file.file}
                entity={entity}
                entityId={data.id}
                status={file.status}
                
              />
            ))}
          </>
        )}
      </div>
      <div className="form__section">
        {planeData.length > 0 && (
          <>
            <FormSectionTitle>Avion</FormSectionTitle>
            <InputValueDisplayer
              label="Classe du transport"
              value={planeCategory}
            />
            <InputValueDisplayer
              label="Règlement du transport"
              value={planePayment}
            />
            {planeData.map((file) => (
              <FileHandler
                key={planeData.indexOf(file)}
                label="Demande de dérogation pour l'avion"
                dataLink={file.dataFile}
                displayPdf={displayPdf}
                url={file.file}
                entity={entity}
                entityId={data.id}
                status={file.status}
              />
            ))}
          </>
        )}
      </div>
      <div className="form__section">
        <FormSectionTitle>Véhicule</FormSectionTitle>
        {data.authorizations.map((file) => (
          <FileHandler
            key={data.authorizations.indexOf(file)}
            label="Demande préalable d'utilisation d'un véhicule"
            dataLink={file.dataFile}
            url={file.file}
            displayPdf={displayPdf}
            entity={entity}
            entityId={data.id}
            status={file.status}
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
        {taxiData.map((file) => (
          <FileHandler
            key={taxiData.indexOf(file)}
            label="Demande de dérogation"
            dataLink={file.dataFile}
            displayPdf={displayPdf}
            url={file.file}
            entity={entity}
            entityId={data.id}
            status={file.status}
          />
        ))}
      </div>

    </>
    
  );
};

TransportsVal.propTypes = {

};

export default TransportsVal;
