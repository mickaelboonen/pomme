import React from 'react';

import '../style.scss';

// Components
import FileHandler from '../FileHandler';
import InputValueDisplayer from '../InputValueDisplayer';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Reducer


const TransportsVal = ({ displayPdf, data, entity }) => {
  
  let otherTransports = '';
  if (data.ferry) {
    otherTransports += 'Ferry. '
  }
  if (data.taxi) {
    otherTransports += 'Taxi. '
  }
  

  const getTransportsData = (data, type) => {

    const { transport_type, transport_class, transport_payment, dispensations } = data;
    const transport = {
      file: []
    };

    if (type === 'train' && transport_type.indexOf(type) >= 0) {
      
      transport.category = transport_class.find((payment) => payment.includes('first') || payment.includes('second')).includes('first') ? 'Première classe' : 'Deuxième classe';
      const transportPaymentValue = transport_payment.find((payment) => payment.includes(type));
      transport.payment = transportPaymentValue.includes('agent') ? "Avancé par l'agent" : transportPaymentValue.includes('free') ? "Réglé par un autre organisme" : "Payé par Unîmes";

      dispensations.forEach((dis) => {
        if (dis.type.includes(type)) {
          transport.file.push(dis);
        }
      });
    }
    else if (type === 'plane' && transport_type.indexOf(type) >= 0) {      
      transport.category  = data.transport_class.find((payment) => payment.includes('eco') || payment.includes('business')).includes('business') ? 'Classe affaire' : 'Classe économique';
      const transportPaymentValue = transport_payment.find((payment) => payment.includes(type));
      transport.payment = transportPaymentValue.includes('agent') ? "Avancé par l'agent" : transportPaymentValue.includes('free') ? "Réglé par un autre organisme" : "Payé par Unîmes";

      dispensations.forEach((dis) => {
        if (dis.type.includes('avion')) {
          transport.file.push(dis);
        }
      });
    }
    else if (type === 'taxi') {
      dispensations.forEach((dis) => {
        if (dis.type.includes(type)) {
          transport.file.push(dis);
        }
      })
    }
    return transport;
  }

  const planeData = getTransportsData(data, 'plane');
  const trainData = getTransportsData(data, 'train');
  const taxiData = getTransportsData(data, 'taxi');
  console.log(data);
  return (
    <>
      {trainData.hasOwnProperty('category') && (
        <div className="form__section">
          <FormSectionTitle>Train</FormSectionTitle>
          <InputValueDisplayer
            label="Classe du transport"
            value={trainData.category}
          />
          <InputValueDisplayer
            label="Règlement du train"
            value={trainData.payment}
          />
          {trainData.file.map((file) => (
            <FileHandler
              key={trainData.file.indexOf(file) + '-train'}
              label="Demande de dérogation pour le train"
              dataLink={file.dataFile}
              displayPdf={displayPdf}
              url={file.file}
              entity={entity}
              entityId={data.id}
              status={file.status}
              
            />
          ))}
        </div>
      )}
      {planeData.hasOwnProperty('category') && (
        <div className="form__section">
          <FormSectionTitle>Avion</FormSectionTitle>
          <InputValueDisplayer
            label="Classe du transport"
            value={planeData.category}
          />
          <InputValueDisplayer
            label="Règlement du transport"
            value={planeData.payment}
          />
          {planeData.file.map((file) => (
            <FileHandler
              key={planeData.file.indexOf(file) + '-plane'}
              label="Demande de dérogation pour l'avion"
              dataLink={file.dataFile}
              displayPdf={displayPdf}
              url={file.file}
              entity={entity}
              entityId={data.id}
              status={file.status}
            />
          ))}
        </div>
      )}
      {data.authorizations.length > 0 && (
        <div className="form__section">
          <FormSectionTitle>Véhicule</FormSectionTitle>
          {data.authorizations.map((file) => (
            <FileHandler
              key={data.authorizations.indexOf(file) + '-car'}
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
      )}
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
        {taxiData.file.map((file) => (
          <FileHandler
            key={taxiData.file.indexOf(file) + '-taxi'}
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
